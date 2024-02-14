import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { useMemo } from "react";

import { getCalculatorName } from "@/helpers/util";

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
  const items = useMemo(() => {
    return props.items.map((item) => {
      return fields.reduce((acc, field) => {
        if (item[field.name]) {
          acc[field.text] = item[field.text];
        }

        return acc;
      }, {} as Record<string, string>);
    });
  }, [fields, props.items]);

  const quiz = useMemo(() => {
    return questions.reduce((acc, question, idx) => {
      if (answers[idx]) {
        acc[question.text] = answers[idx];
      }

      return acc;
    }, {} as Record<string, string>);
  }, [questions, answers]);

  return (
    <>
      <div className="relative md:p-2 md:text-center">
        <Button
          icon="pi pi-arrow-left"
          className="left-0 md:mt-3 md:absolute lg:ml-3 text-6xl px-5"
          onClick={onGoBack}
        />
        <h2>{getCalculatorName(calculatorType)} Calculator</h2>
      </div>

      <div className="flex flex-column align-items-center">
        <div className="w-full relative lg:w-8">
          {items.length > 1 ? (
            <Carousel
              value={items}
              itemTemplate={(item) => (
                <div className="px-3">
                  <Result
                    calculatorType={calculatorType}
                    itemInfo={item}
                    quiz={quiz}
                  />
                </div>
              )}
            />
          ) : (
            <Result
              calculatorType={calculatorType}
              itemInfo={items[0]}
              quiz={quiz}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DetailView;
