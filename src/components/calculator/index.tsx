import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { useGetCalcOperationsQuery } from "@/redux/services/calcOperationsApi";
import Quiz from "./quiz";
import DetailView from "./detail";
interface CalculatorContainerProps {
  option: string;
}

export default function CalculatorContainer(props: CalculatorContainerProps) {
  const {
    isLoading,
    data: calculatorOperations,
    error,
  } = useGetCalcOperationsQuery(props.option);

  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});

  const handleAnswerClick = (nextQuestionKey: string) => {
    const index = questions.findIndex((item) => {
        const answerIndex = item.quiz.answers.findIndex((answer: { next: string; }) => answer.next === nextQuestionKey)
        return answerIndex >= 0;
    });
    let newQuestions = [...questions].slice(0, index + 1);
    newQuestions = [
        ...newQuestions,
        { key: nextQuestionKey, quiz: calculatorOperations[nextQuestionKey] },
    ];

    setQuestions(newQuestions);
  };

  const handleSelectAnswer = (quizKey: string) => (text: string) => {
    const newAnswer: any = {};
    const standardCount = quizKey.split("-").length;

    Object.keys(answers).forEach(keyItem => {
      const levelCount = keyItem.split("-").length;
      if (levelCount < standardCount)
        newAnswer[keyItem] = answers[keyItem];
    })
    newAnswer[quizKey] = text;
    setAnswers(newAnswer);
  }

  useEffect(() => {
    if (calculatorOperations) {
      setQuestions([{ key: "start", quiz: calculatorOperations["start"] }]);
      setAnswers({});
    }
  }, [calculatorOperations]);

  return (
    <div className="w-12 md:w-8 flex justify-content-center mt-6">
      {isLoading ? (
        <ProgressSpinner />
      ) : (
        <Card className="w-12 flex px-4 py-2 border-round bg-white flex-column">
          {questions.map((item, index) =>
            item.quiz.question ? (
              <Quiz
                key={`quiz-${index}`}
                question={item.quiz.question}
                answers={item.quiz.answers}
                selectedAnswer={answers[item.key] || null}
                handleSelectAnswer={handleSelectAnswer(item.key)}
                handleAnswer={handleAnswerClick}
              />
            ) : (
              <DetailView
                key={`detail-${index}`}
                img={item.quiz.img}
                url={item.quiz.url}
                text={item.quiz.text}
              />
            )
          )}
        </Card>
      )}
    </div>
  );
}
