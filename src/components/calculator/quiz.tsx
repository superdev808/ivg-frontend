import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";

interface QuizProps {
  question: string;
  selectedAnswer: string | null;
  answers: Array<any>;
  handleSelectAnswer: (e: any) => void;
}

export default function Quiz(props: QuizProps) {
  return (
    <>
      <div className="col-3 flex align-items-center">{props.question}</div>
      <div className="col-9">
        <Dropdown
          value={props.selectedAnswer}
          onChange={props.handleSelectAnswer}
          options={props.answers}
          placeholder={"Select"}
          className="w-full"
        />
      </div>
    </>
  );
}
