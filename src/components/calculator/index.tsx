import React, { useEffect, useMemo, useState } from "react";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import _ from "lodash";
import Quiz from "./quiz";
import DetailView from "./detail";
import { useQuery } from "react-query";

interface QuizOption {
  name: string;
  text: string;
}
interface CalculatorContainerProps {
  option: string;
  input: Array<QuizOption>;
  output: Array<QuizOption>;
}

export default function CalculatorContainer(props: CalculatorContainerProps) {
  const { input, output, option } = props;

  const [level, setLevel] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [itemInfo, setItemInfo] = useState<any[]>([]);

  const { isLoading } = useQuery([input, level, answers, option], async () => {
    if (level > input.length) {
      return;
    }

    const quiz = {} as any;

    answers.forEach((answer, index) => {
      quiz[input[index].name] = answer;
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/materials`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: option,
        quiz,
        fields: input[level]?.name ? [input[level]?.name] : output.map(item => item.name)
      })
    });

    const { data: newAnswerOptions } = await response.json();

    const originalAnswerOptions: any[] = answerOptions.slice(0, level);
    if (!input[level]) {
      setItemInfo(newAnswerOptions);
      return;
    }
    if (newAnswerOptions.length) {
      setAnswerOptions([...originalAnswerOptions, newAnswerOptions]);
      setItemInfo([]);
    }
  }, { refetchOnWindowFocus: false })

  const questions = useMemo(() => {
    return input.slice(0, level + 1);
  }, [input, level]);

  const handleSelectAnswer = (index: number) => (e: any) => {
    setLevel(index + 1);
    const newAnswers = answers.slice(0, index);
    newAnswers[index] = e.value;
    setAnswers(newAnswers);
  };

  return (
    <div className="w-12 md:w-8 flex justify-content-center mt-6 mb-8">
      <Card className="w-12 flex px-4 py-2 border-round bg-white flex-column">
        <div className="grid">
          {questions.map((quiz, index) => {
            if (answerOptions[index] && answerOptions[index].length === 1 && answerOptions[index][0] === '') {
              if (index <= level && level < input.length && answers[index] !== '') {
                handleSelectAnswer(index)({ value: '' });
              }
              return null;
            }
            return <Quiz
              key={`quiz-${index}`}
              question={quiz.text}
              answers={answerOptions[index]}
              selectedAnswer={answers[index] || null}
              handleSelectAnswer={handleSelectAnswer(index)}
              disabled={isLoading}
            />
          })}
        </div>
        {itemInfo.length > 0 && <h2>Compatible {decodeURI(props.option)}</h2>}
        {itemInfo.map((item, index) => (
          <DetailView
            key={`result-item-${index}`}
            data={item}
            fields={output}
          />
        ))}
        <div className="w-12 flex justify-content-center">
          {isLoading && <ProgressSpinner className="w-1" />}
        </div>
      </Card>
    </div>
  );
}
