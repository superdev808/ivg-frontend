import { ProgressSpinner } from "primereact/progressspinner";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";

import DetailView from "./detail";
import FeedbackDialogWrapper from "./Feedback/FeedbackDialogWrapper";
import Quiz from "./quiz";
import { InputOutputValues } from "@/types/calculators";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";

interface CalculatorContainerProps {
  option: string;
  input: InputOutputValues[];
  output: InputOutputValues[];
}

const CalculatorContainer: React.FC<CalculatorContainerProps> = ({
  input,
  output,
  option,
}) => {
  const [level, setLevel] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [canProceed, setCanProceed] = useState<boolean>(true);
  const { calcInfoMap } = useCalculatorsInfo();

  const calculatorType = decodeURI(option);

  const { isLoading } = useQuery(
    [input, level, answers, option, canProceed],
    async () => {
      if (!canProceed) {
        return;
      }

      if (level > input.length) {
        return;
      }

      const quiz = {} as any;

      answers.forEach((answer, index) => {
        quiz[input[index].colIndex] = answer;
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/materials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: option,
            quiz,
            fields: level < input.length
              ? [input[level]?.colIndex]
              : output.map((item) => item.colIndex),
          }),
        }
      );

      const { data: newAnswerOptions } = await response.json();

      const originalAnswerOptions: any[] = answerOptions.slice(0, level);
      if (!input[level]) {
        setItems(newAnswerOptions || []);
        return;
      }
      if (newAnswerOptions.length) {
        setAnswerOptions([...originalAnswerOptions, newAnswerOptions]);
        setItems([]);
      }
    },
    { refetchOnWindowFocus: false }
  );

  const questions = useMemo(() => {
    return input.slice(0, level + 1);
  }, [input, level]);

  const handleSelectAnswer = (index: number) => (value: any) => {
    setCanProceed(true);
    setLevel(index + 1);
    const newAnswers = answers.slice(0, index);
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleBack = (index: number) => () => {
    setCanProceed(false);
    const lastAnswerIndex = answers
      .slice(0, index)
      .findLastIndex((answer) => answer !== "");
    setLevel(lastAnswerIndex);
  };

  const handleBackFromResult = () => {
    setItems([]);
    handleBack(level)();
  };

  const showLoader =
    isLoading || (input[level] && !Boolean(answerOptions[level]?.length));

  return (
    <div className="flex w-full justify-content-center mb-8">
      <div className="w-12 flex px-2 py-2 border-round flex-column">
        <div className="grid">
          {questions.map((quiz, index) => {
            if (index !== level) {
              return null;
            }

            if (
              answerOptions[index] &&
              answerOptions[index].length === 1 &&
              answerOptions[index][0] === ""
            ) {
              if (
                index <= level &&
                level < input.length &&
                answers[index] !== ""
              ) {
                handleSelectAnswer(index)("");
              }
              return null;
            }

            return (
              <Quiz
                key={`quiz-${index}`}
                calculatorName={calcInfoMap[calculatorType].label}
                question={quiz}
                answers={answerOptions[index]}
                currentAnswer={answers[index]}
                disabled={showLoader}
                progress={Math.floor((index / input.length) * 100)}
                onSelectAnswer={handleSelectAnswer(index)}
                onGoBack={index > 0 ? handleBack(index) : undefined}
              />
            );
          })}
        </div>

        {items.length > 0 ? (
          <DetailView
            calculatorType={calculatorType}
            items={items}
            fields={output}
            questions={input}
            answers={answers}
            onGoBack={handleBackFromResult}
          />
        ) : (
          <FeedbackDialogWrapper
            calculatorName={calcInfoMap[calculatorType].label}
            userAnswers={input.map((inputItem, index) => ({
              ...inputItem,
              answer: answers[index],
            }))}
          />
        )}

        {showLoader && (
          <div className="w-12 flex justify-content-center">
            <ProgressSpinner className="w-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorContainer;
