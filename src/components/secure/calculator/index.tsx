import { ProgressSpinner } from "primereact/progressspinner";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import DetailView from "./detail";
import FeedbackDialogWrapper from "./Feedback/FeedbackDialogWrapper";
import Quiz from "./quiz";
import { InputOutputValues } from "@/types/calculators";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";

interface CalculatorContainerProps {
  defaultAnswers: string[];
  option: string;
  input: InputOutputValues[];
  output: InputOutputValues[];
}

const CalculatorContainer: React.FC<CalculatorContainerProps> = ({
  input,
  output,
  option,
  defaultAnswers,
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
            fields:
              level < input.length
                ? [input[level]?.colIndex]
                : output.map((item) => item.colIndex),
          }),
        }
      );

      const { data: newAnswerOptions } = await response.json();

      const originalAnswerOptions: any[] = answerOptions.slice(0, level);
      if (level == input.length) {
        setItems(newAnswerOptions || []);
        return;
      }
      // if (newAnswerOptions.length) {
      setAnswerOptions([...originalAnswerOptions, newAnswerOptions]);
      setItems([]);
      // }
    },
    { refetchOnWindowFocus: false }
  );

  const questions = useMemo(() => {
    return input.slice(0, level + 1);
  }, [input, level]);

  const handleSelectAnswer = useCallback(
    (index: number) => (value: any) => {
      setCanProceed(true);
      setLevel(index + 1);
      const newAnswers = answers.slice(0, index);
      newAnswers[index] = value;
      setAnswers(newAnswers);
    },
    [answers]
  );

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

  useEffect(() => {
    if (!(level < questions.length) || showLoader) return;
    if (level < defaultAnswers.length)
      handleSelectAnswer(level)(defaultAnswers[level]);
    if (
      answerOptions[level]?.length === 1 &&
      (answerOptions[level][0] === "" ||
        /description/gi.test(questions[level].groupId))
    ) {
      handleSelectAnswer(level)(answerOptions[level][0]);
    }
  }, [
    defaultAnswers,
    answerOptions,
    answers,
    level,
    input,
    handleSelectAnswer,
    questions,
    showLoader,
  ]);

  return (
    <div className="flex w-full justify-content-center mb-8">
      <div className="w-12 flex px-2 py-2 border-round flex-column">
        <div className="grid">
          {level < input.length && (
            <Quiz
              key={`quiz-${level}`}
              calculatorName={calcInfoMap[calculatorType].label}
              question={questions[level]}
              answers={answerOptions[level]}
              currentAnswer={answers[level]}
              disabled={showLoader}
              progress={Math.floor((level / input.length) * 100)}
              onSelectAnswer={handleSelectAnswer(level)}
              onGoBack={level > 0 ? handleBack(level) : undefined}
            />
          )}
        </div>

        {items.length > 0 ? (
          <DetailView
            calculatorType={calculatorType}
            items={items}
            outputFields={output}
            questions={input}
            answers={answers}
            onGoBack={level > defaultAnswers.length ? handleBackFromResult : undefined}
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
