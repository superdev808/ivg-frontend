import React, { useState, useEffect, useMemo } from "react";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { calculatorImages } from "@/helpers/util";
import PieChartProgressBar from "@/components/shared/PieChartProgressbar";

interface QuizProps {
  question: string;
  selectedAnswer: string | null;
  answers: Array<any>;
  handleSelectAnswer: (e: any) => void;
  progress?: number;
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

  const dropdownOptionTemplate = (option: any) => {
    return (
      <div className="flex align-items-center justify-content-center">
        <div className="w-12 md:w-4 flex align-items-center">
          <Image
            alt={option.name}
            src={calculatorImages[`${option}`.toLowerCase()]}
            className={`mr-8`}
            imageStyle={{ width: "24px" }}
          />
          <div>{option}</div>
        </div>
      </div>
    );
  };

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
      <div className="col-12 md:col-6 md:col-offset-3 mb-6">
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
      <div className="relative md:absolute flex align-items-center justify-content-center w-full md:w-2 md:col-offset-10">
        <PieChartProgressBar percentage={props.progress || 0} />
      </div>
      <div className="flex align-items-start justify-content-around flex-wrap w-12">
        {firstOptions.map((answer, index) => {
          const image = calculatorImages[`${answer}`.toLowerCase()];
          return (
            <div
              key={`${props.question}-${answer}-${index}`}
              className="m-2 w-12 md:w-3 flex flex-column"
              onClick={() => props.handleSelectAnswer(answer)}
            >
              <div className="border-3 border-300 w-full p-0 flex justify-content-center">
                {image ? (
                  <Image
                    src={image}
                    width="100%"
                    height="200px"
                    imageClassName="p-4"
                    alt={answer}
                  />
                ) : (
                  <div
                    className="w-full m-1 text-3xl flex align-items-center justify-content-center text-center"
                    style={{ height: "200px" }}
                  >
                    {answer}
                  </div>
                )}
              </div>
              {image && <p className="w-full text-3xl text-center">{answer}</p>}
            </div>
          );
        })}
      </div>
      {dropdownOptions.length > 0 && (
        <div className="col-12 md:col-6 md:col-offset-3 mb-6">
          <Dropdown
            options={dropdownOptions}
            className="w-full"
            onChange={(e: any) => props.handleSelectAnswer(e.value)}
            value={props.selectedAnswer}
            placeholder="Other"
            itemTemplate={dropdownOptionTemplate}
          />
        </div>
      )}
    </>
  );
}
