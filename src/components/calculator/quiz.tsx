import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";

interface Answer {
  text: string;
  next: string;
}

interface QuizProps {
  question: string;
  selectedAnswer: string | null;
  answers: Array<Answer>;
  handleAnswer: (nextQuestionKey: string) => void;
  handleSelectAnswer: (txt: string) => void;
}

export default function Quiz(props: QuizProps) {
  const handleChange = (e: any) => {
    const answer = props.answers.find((answer) => answer.text === e.value);
    if (answer) {
      props.handleSelectAnswer(answer.text);
      props.handleAnswer(answer.next);
    }
  };

  return (
    <>
      <p>{props.question}</p>
      <Dropdown
        value={props.selectedAnswer}
        onChange={handleChange}
        options={props.answers}
        optionLabel="text"
        optionValue="text"
        placeholder={"Select"}
        className="w-full"
      />
    </>
  );
}
