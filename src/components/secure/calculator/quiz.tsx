import { useEffect } from "react";
import classNames from "classnames/bind";
import orderBy from "lodash/orderBy";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import React, { useState, useMemo } from "react";

import PieChartProgressBar from "@/components/shared/PieChartProgressbar";
import { calculatorImages } from "@/helpers/util";

import styles from "./quiz.module.scss";

const cx = classNames.bind(styles);

interface QuizProps {
  calculatorName?: string;
  question: string;
  currentAnswer: string;
  answers: string[];
  disabled?: boolean;
  progress?: number;
  onGoBack?: () => void;
  onSelectAnswer: (e: string) => void;
}

const Quiz: React.FC<QuizProps> = ({
  calculatorName,
  question,
  currentAnswer,
  answers,
  progress,
  disabled,
  onGoBack,
  onSelectAnswer,
}) => {
  const [searchValue, setSearchVaule] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");

  const filteredAnswers = useMemo(() => {
    return (
      answers?.filter((answer) => answer.includes(selectedSuggestion)) || []
    );
  }, [answers, selectedSuggestion]);

  const options = useMemo(() => {
    const availableOptions =
      filteredAnswers.length > 6
        ? filteredAnswers.slice(0, 6)
        : filteredAnswers;

    if (availableOptions.length === 0) {
      return [];
    }

    if (availableOptions[0].endsWith(" mm")) {
      return orderBy(
        availableOptions,
        (option) => Number(option.split(" ")[0]),
        ["asc"]
      );
    }

    return availableOptions;
  }, [filteredAnswers]);

  const dropdownOptionTemplate = (option: any) => (
    <div className="flex align-items-center justify-content-center">
      <div className="w-12 flex align-items-center gap-8">
        <Image
          alt={option.name}
          src={calculatorImages[`${option}`.toLowerCase()]}
          imageStyle={{ height: 48, width: 96, objectFit: "contain" }}
        />
        <div>{option}</div>
      </div>
    </div>
  );

  const handleSearchChange = (e: AutoCompleteChangeEvent) => {
    setSearchVaule(e.value);

    if (!e.value) {
      setSelectedSuggestion("");
    }
  };

  const handleAutoCompleteMethod = (e: AutoCompleteCompleteEvent) => {
    const filteredSuggestions = answers?.filter((item) =>
      item.toLowerCase().includes(e.query.toLowerCase())
    ).sort();

    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (e: AutoCompleteSelectEvent) => {
    setSelectedSuggestion(e.value);
  };

  useEffect(() => {
    setSuggestions(answers.sort());
  }, [answers]);

  return (
    <>
      <div className="col-12 flex flex-column justify-content-center align-items-center relative">
        {onGoBack && (
          <Button
            icon="pi pi-arrow-left"
            className="absolute left-0 ml-2 mt-5 px-5 md:ml-4 text-6xl"
            disabled={disabled}
            onClick={onGoBack}
          />
        )}

        {calculatorName && <h1 className="underline">{calculatorName}</h1>}
        <h1>Select {question}</h1>
      </div>

      <div className="col-12 sm:col-8 sm:col-offset-2 xl:col-4 xl:col-offset-4 md:mb-6">
        <AutoComplete
          value={searchValue}
          suggestions={suggestions}
          onChange={handleSearchChange}
          placeholder="Search all available options..."
          className="w-full"
          inputClassName="w-full"
          completeMethod={handleAutoCompleteMethod}
          onSelect={handleSelect}
          itemTemplate={dropdownOptionTemplate}
          dropdown
        />
      </div>

      <div className="relative md:absolute flex align-items-center justify-content-center w-full md:w-2 md:col-offset-10">
        <PieChartProgressBar percentage={progress || 0} />
      </div>

      <div className="flex align-items-start justify-content-around flex-wrap w-12">
        {options.map((answer, index) => {
          const image = calculatorImages[`${answer}`.toLowerCase()];

          return (
            <div
              key={`${question}-${answer}-${index}`}
              className="m-2 w-12 md:w-3 flex flex-column"
              onClick={() => {
                if (!disabled) {
                  onSelectAnswer(answer);
                }
              }}
            >
              <div
                className={cx(
                  "border-3 border-300 hover:border-teal-300 border-round-xl w-full p-0 flex justify-content-center cursor-pointer",
                  { "quiz-card--selected": currentAnswer === answer }
                )}
                style={{ height: 200 }}
              >
                {image ? (
                  <Image
                    src={image}
                    width="100%"
                    height="100%"
                    imageClassName="p-4"
                    imageStyle={{ objectFit: "contain" }}
                    alt={answer}
                  />
                ) : (
                  <div className="w-full m-1 text-3xl flex align-items-center justify-content-center text-center">
                    {answer}
                  </div>
                )}
              </div>

              {image && <p className="w-full text-3xl text-center">{answer}</p>}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Quiz;
