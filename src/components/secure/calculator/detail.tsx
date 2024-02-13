import { Button } from "primereact/button";
import { useMemo, useState } from "react";

import Slide from "./slide";

interface DetailViewProps {
  calculatorName: string;
  items: Array<Record<string, string>>;
  fields: Array<{ name: string; text: string }>;
  questions: Array<{ name: string; text: string }>;
  answers: string[];
  onGoBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({
  calculatorName,
  items,
  fields,
  questions,
  answers,
  onGoBack,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = items[activeIndex];

  const itemInfo = useMemo(() => {
    return fields.reduce((acc, field) => {
      if (activeItem[field.name]) {
        acc[field.text] = activeItem[field.text];
      }

      return acc;
    }, {} as Record<string, string>);
  }, [fields, activeItem]);

  const quiz = useMemo(() => {
    return questions.reduce((acc, question, idx) => {
      if (answers[idx]) {
        acc[question.text] = answers[idx];
      }

      return acc;
    }, {} as Record<string, string>);
  }, [questions, answers]);

  const handleGoPrev = () => setActiveIndex((prevState) => prevState - 1);

  const handleGoNext = () => setActiveIndex((prevState) => prevState + 1);

  return (
    <>
      <div className="relative md:p-2 md:text-center">
        <Button
          icon="pi pi-arrow-left"
          className="left-0 md:mt-3 md:absolute lg:ml-3"
          onClick={onGoBack}
        />
        <h2>{calculatorName} Calculator</h2>
      </div>

      <div className="flex flex-column align-items-center justify-content-center relative md:px-0">
        <Slide
          calculatorName={calculatorName}
          itemInfo={itemInfo}
          quiz={quiz}
        />

        {items.length > 1 && (
          <div className="flex gap-4 mt-6">
            <Button
              icon="pi pi-caret-left"
              rounded
              text
              size="large"
              disabled={activeIndex === 0}
              onClick={handleGoPrev}
            />

            <Button
              icon="pi pi-caret-right"
              rounded
              text
              size="large"
              disabled={activeIndex === items.length - 1}
              onClick={handleGoNext}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailView;
