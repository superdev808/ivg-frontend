import React, { useState, useEffect, useMemo } from "react";
import { Button } from "primereact/Button";
import { AutoComplete } from "primereact/autocomplete";
import { Dropdown } from "primereact/dropdown";

interface QuizProps {
  question: string;
  selectedAnswer: string | null;
  answers: Array<any>;
  handleSelectAnswer: (e: any) => void;
  handleBack?: () => void;
  disabled?: boolean;
}

export default function Quiz(props: QuizProps) {
  const [searchValue, setSearchVaule] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const filteredAnswers = useMemo(() => {
    return (
      props.answers?.filter((answer) => answer.includes(selectedSuggestion)) ||
      []
    );
  }, [props.answers, selectedSuggestion]);

  const firstOptions =
    filteredAnswers.length > 6 ? filteredAnswers.slice(0, 6) : filteredAnswers;
  const dropdownOptions =
    filteredAnswers.length > 6
      ? filteredAnswers.slice(6, filteredAnswers.length)
      : [];

  const handleSearchChange = (e: any) => {
    setSearchVaule(e.value);
    if (!e.value) {
      setSelectedSuggestion("");
    }
  };

  const handleAutoCompleteMethod = (e: any) => {
    const filteredSuggestions = props.answers?.filter((item) =>
      item.toLowerCase().includes(e.query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (e: any) => {
    setSelectedSuggestion(e.value);
  };

  return (
    <>
      <div className="col-12 flex justify-content-center relative">
        {props.handleBack && (
          <Button
            icon="pi pi-arrow-left"
            className="absolute left-0 ml-4 mt-3"
            onClick={props.handleBack}
          />
        )}
        <h2>Select {props.question}</h2>
      </div>
      <div className="col-8 col-offset-2 mb-6">
        <AutoComplete
          value={searchValue}
          suggestions={suggestions}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full"
          inputClassName="w-full"
          completeMethod={handleAutoCompleteMethod}
          onSelect={handleSelect}
        />
      </div>
      <div className="flex align-items-center justify-content-around flex-wrap w-12">
        {firstOptions.map((answer, index) => (
          <Button
            key={`${props.question}-${answer}-${index}`}
            className="mb-4 p-4"
            style={{ width: "30%", height: "200px" }}
            onClick={() => props.handleSelectAnswer(answer)}
            text
            raised
          >
            {answer}
          </Button>
        ))}
      </div>
      {dropdownOptions.length > 0 && (
        <div className="col-8 col-offset-2 mt-6">
          <Dropdown
            options={dropdownOptions}
            className="w-full"
            onChange={(e: any) => props.handleSelectAnswer(e.value)}
            value={props.selectedAnswer}
            placeholder="Select"
          />
        </div>
      )}
    </>
  );
}
