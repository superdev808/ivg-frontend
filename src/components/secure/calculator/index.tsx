import { ProgressSpinner } from "primereact/progressspinner";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { calculatorIO } from "@/helpers/util";

import DetailView from "./detail";
import Quiz from "./quiz";

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

  const calculatorName = useMemo(() => {
    const selectedCalculator = calculatorIO.find(
      (item) => item.type === calculatorType
    );
    return selectedCalculator?.label || calculatorType;
  }, [calculatorType]);

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
    setLevel(index - 1);
    const newAnswers = answers.slice(0, index - 1);
    setAnswers(newAnswers);
  };

  return (
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
                question={quiz.text}
                answers={answerOptions[index]}
                selectedAnswer={answers[index] || null}
                handleSelectAnswer={handleSelectAnswer(index)}
                handleBack={index > 0 ? handleBack(index) : undefined}
                disabled={isLoading}
                progress={Math.floor((index / input.length) * 100)}
              />
            );
          })}
        </div>

        {items.length > 0 && (
          <DetailView
            calculatorName={calculatorName}
            items={items}
            fields={output}
            questions={input}
            answers={answers}
          />
        )}

        {isLoading && (
          <div className="w-12 flex justify-content-center">
            <ProgressSpinner className="w-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorContainer;
