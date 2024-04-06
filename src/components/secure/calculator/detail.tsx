import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { parseItems } from "@/helpers/calculators";
import { event as gaEvent } from "@/lib/gtag";
import { InputOutputValues, ItemData } from "@/types/calculators";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HelpfulFeedbackDialog from "./Feedback/HelpfulFeedbackDialog";
import Result from "./Result";
import HelpfulButton from "./Helpful";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";

interface DetailViewProps {
  calculatorType: string;
  items: Array<Record<string, string>>;
  outputFields: InputOutputValues[];
  questions: InputOutputValues[];
  answers: string[];
  onGoBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({
  calculatorType,
  outputFields,
  questions,
  answers,
  onGoBack,
  ...props
}) => {
  const [feedbkackShow, setFeedbackShow] = useState<boolean>(false);

  const [results, setResults] = useState<ItemData[][]>([]);
  const { calcInfoMap } = useCalculatorsInfo()
  const calculatorName = calcInfoMap[calculatorType].label;

  const toastRef = useRef(null);

  useEffect(() => {
    setResults(props.items.map((item) => parseItems(item, outputFields)));
  }, [props.items, outputFields]);


  const quiz = useMemo(() => {
    return questions.reduce((acc, question, idx) => {
      if (answers[idx]) {
        acc.push({ question: question.colText, answer: answers[idx] });
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

  const showFeedbackToast = useCallback(() => {
    (toastRef?.current as any)?.show({
      severity: "success",
      summary: "Successfully submitted",
      detail: "Thank you for your feedback",
      life: 5000,
    });
    // eslint-disable-next-line
  }, [toastRef.current]);

  const onClickThumbUp = () => {
    gaEvent({
      action: "Thumb_Up",
      category: "Button",
      label: calculatorName,
    });
    showFeedbackToast();
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

      <HelpfulButton
        onClickThumbUp={onClickThumbUp}
        onClickThumbDown={onClickFeedback}
      />

      <HelpfulFeedbackDialog
        visible={feedbkackShow}
        setVisible={setFeedbackShow}
        calculatorName={calculatorName}
        quiz={quiz}
      />

      <Toast ref={toastRef} position="top-right" />
    </>
  );
};

export default DetailView;
