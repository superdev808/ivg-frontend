import { ProgressSpinner } from "primereact/progressspinner";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { getCalculatorName } from "@/helpers/util";

import DetailView from "./detail";
import Quiz from "./quiz";
import FeedbackDialogWrapper from "./Feedback/FeedbackDialogWrapper";

interface QuizOption {
  name: string;
  text: string;
}
interface CalculatorContainerProps {
  option: string;
  input: QuizOption[];
  output: QuizOption[];
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

  const calculatorType = decodeURI(option);

  const { isLoading } = useQuery(
    [input, level, answers, option],
    async () => {
      if (level > input.length) {
        return;
      }

      const quiz = {} as any;

      answers.forEach((answer, index) => {
        quiz[input[index].name] = answer;
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
            fields: input[level]?.name
              ? [input[level]?.name]
              : output.map((item) => item.name),
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
    setLevel(index + 1);
    const newAnswers = answers.slice(0, index);
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleBack = (index: number) => () => {
    const lastAnswerIndex = answers
      .slice(0, index)
      .findLastIndex((answer) => answer !== "");
    setLevel(lastAnswerIndex);
    setAnswers((prevSate) => prevSate.slice(0, lastAnswerIndex));
    setAnswerOptions((prevState) => prevState.slice(0, lastAnswerIndex));
  };

  const handleBackFromResult = () => {
    setItems([]);
    handleBack(level)();
  };

  const showLoader =
    isLoading || (input[level] && !Boolean(answerOptions[level]?.length));

  return (
    <>
      <div className="flex w-full justify-content-center mb-8">
        <div className="w-12 flex px-2 py-2 border-round bg-white flex-column">
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
                  calculatorName={getCalculatorName(calculatorType)}
                  question={quiz.text}
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
          ) : <FeedbackDialogWrapper label={getCalculatorName(calculatorType)} />}

          {showLoader && (
            <div className="w-12 flex justify-content-center">
              <ProgressSpinner className="w-1" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CalculatorContainer;
