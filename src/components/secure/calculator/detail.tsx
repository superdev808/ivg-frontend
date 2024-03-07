import trim from "lodash/trim";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { parseItems } from "@/helpers/calculators";
import { getCalculatorName } from "@/helpers/util";
import { event as gaEvent } from "@/lib/gtag";
import { ItemData } from "@/types/calculators";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HelpfulFeedbackDialog from "./Feedback/HelpfulFeedbackDialog";
import Result from "./Result";

interface DetailViewProps {
  calculatorType: string;
  items: Array<Record<string, string>>;
  fields: Array<{ name: string; text: string }>;
  questions: Array<{ name: string; text: string }>;
  answers: string[];
  onGoBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({
  calculatorType,
  fields,
  questions,
  answers,
  onGoBack,
  ...props
}) => {
  const [feedbkackShow, setFeedbackShow] = useState<boolean>(false);

  const [results, setResults] = useState<ItemData[][]>([]);

  useEffect(() => {
    setResults(props.items.map((item) => parseItems(item, calculatorType)));
  }, [props.items, calculatorType]);

  const calculatorName = useMemo(() => {
    return getCalculatorName(calculatorType);
  }, [calculatorType]);

  const quiz = useMemo(() => {
    return questions.reduce((acc, question, idx) => {
      if (answers[idx]) {
        acc.push({ question: trim(question.text), answer: trim(answers[idx]) });
      }

      return acc;
    }, [] as { question: string; answer: string }[]);
  }, [questions, answers]);

  const handleUpdateQuantity = (quantity: number, itemName: string) => {
    setResults((prevState) =>
      prevState.map((result) =>
        result.map((item) => ({
          ...item,
          info:
            item.info[0].itemName === itemName
              ? [{ ...item.info[0], quantity }]
              : item.info,
        }))
      )
    );
  };

  const toastRef = useRef(null);
  const showFeedbackToast = useCallback(() => {
    (toastRef?.current as any)?.show({
      severity: "success",
      summary: "Successfully submitted",
      detail: "Thank you for your feedback",
      life: 5000,
    });
  }, [toastRef.current])
  const onClickThumbUp = () => {
    gaEvent({
      action: "Thumb_Up",
      category: "Button",
      label: calculatorName,
    });
    showFeedbackToast()
  };

  const onClickFeedback = () => {
    gaEvent({
      action: "Thumb_Down",
      category: "Button",
      label: calculatorName,
    });
    setFeedbackShow(true);
  };

  return (
    <>
      <div className="relative md:p-2 md:text-center">
        <Button
          icon="pi pi-arrow-left"
          className="left-0 md:mt-3 md:absolute lg:ml-3 text-6xl px-5"
          onClick={onGoBack}
        />
        <h2>{calculatorName} Calculator</h2>
      </div>

      {results.length > 0 && (
        <div className="flex flex-column align-items-center">
          <div className="w-full relative lg:w-8">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination
              modules={[Navigation, Pagination]}
            >
              {results.map((result, idx) => (
                <SwiperSlide key={idx}>
                  <Result
                    className={
                      results.length > 1 ? "px-6 pb-6 md:px-7" : "px-3"
                    }
                    calculatorType={calculatorType}
                    items={result}
                    quiz={quiz}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
      <div
        className="fixed text-2xl m-1 left-50 bg-green-300 p-3 pb-6 border-round-3xl m-0"
        style={{
          transform: "translate(-50%, -50%)",
          bottom: "-90px",
          zIndex: "100",
        }}
      >
        <i className="pi pi-thumbs-up text-3xl mr-3" onClick={onClickThumbUp} />
        Was this helpful?
        <i
          className="pi pi-thumbs-down text-3xl ml-3"
          onClick={onClickFeedback}
        />
      </div>
      <HelpfulFeedbackDialog
        visible={feedbkackShow}
        setVisible={setFeedbackShow}
        calculatorName={getCalculatorName(calculatorType)}
        quiz={quiz}
      />
      <Toast ref={toastRef} position="top-right" />
    </>
  );
};

export default DetailView;
