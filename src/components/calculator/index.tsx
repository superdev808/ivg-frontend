import React, { useEffect, useMemo, useState } from "react";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { useGetCalcOperationsQuery } from "@/redux/services/calcOperationsApi";
import _ from "lodash";
import Quiz from "./quiz";
import DetailView from "./detail";

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
  const { input, output } = props;
  const {
    isLoading,
    data: calculatorOperations,
    error,
  } = useGetCalcOperationsQuery(props.option);

  const [level, setLevel] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [itemInfo, setItemInfo] = useState<any[]>([]);

  useEffect(() => {
    if (!calculatorOperations || level > input.length) {
      return;
    }
    const filteredRows = calculatorOperations.filter((operation: any) => {
      let isFineFlag = true;
      for (let i = 0; i <= level; i++) {
        if (answers[i] && operation[input[i].name] !== answers[i]) {
          isFineFlag = false;
          break;
        }
      }
      return isFineFlag;
    });
    if (level < input.length) {
      const question = input[level].name;
      const newAnswerOptions = _.uniq(
        filteredRows.map((field: any) => field[question])
      );
      const originalAnswerOptions: any[] = answerOptions.slice(0, level);
      if (newAnswerOptions.length) {
        setAnswerOptions([...originalAnswerOptions, newAnswerOptions]);
        setItemInfo([]);
      } else {
        setItemInfo(filteredRows);
      }
    } else {
      setItemInfo(filteredRows);
    }
  }, [input, level, calculatorOperations, answers]);

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
      {isLoading ? (
        <ProgressSpinner />
      ) : (
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
        </Card>
      )}
    </div>
  );
}
