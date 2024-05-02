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
import React, { useEffect, useState, useMemo, useCallback } from "react";

import PieChartProgressBar from "@/components/shared/PieChartProgressbar";
import {
  BRAND_IMAGES,
  SHOULD_DISPLAY_TEXT_ONLY,
} from "@/constants/calculators";
import { ANSWER_TYPE, InputOutputValues } from "@/types/calculators";

import PopupOutput from "./Result/Outputs/Popup";

import styles from "./quiz.module.scss";
import { isPopup, serializeColInfo } from "@/helpers/calculators";

const cx = classNames.bind(styles);

interface QuizProps {
  calculatorName?: string;
  question: InputOutputValues;
  secondaryQuestions: InputOutputValues[];
  currentAnswer: ANSWER_TYPE | null | undefined;
  answers: ANSWER_TYPE[];
  disabled?: boolean;
  progress?: number;
  onGoBack?: () => void;
  onSelectAnswer: (e: ANSWER_TYPE) => void;
}

const Quiz: React.FC<QuizProps> = ({
  calculatorName,
  question,
  secondaryQuestions,
  currentAnswer,
  answers,
  progress,
  disabled,
  onGoBack,
  onSelectAnswer,
}) => {
  const [searchValue, setSearchVaule] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");

  const isActionQuestion = useMemo(() => {
    return /^action/gi.test(question.groupText);
  }, [question]);

  const filteredAnswers = useMemo(() => {
    return (
      answers?.filter((answer) =>
        answer[question.colIndex]?.includes(selectedSuggestion)
      ) || []
    );
  }, [answers, selectedSuggestion, question]);

  const questionName = useMemo(() => {
    if (/^action/gi.test(question.groupText)) {
      return `Action: ${answers?.[0][question.colIndex] || ""}`;
    }

    return question.groupText;
  }, [question, answers]);

  const options = useMemo(() => {
    let availableOptions = filteredAnswers;

    if (!showAll) {
      availableOptions =
        availableOptions.length > 6
          ? availableOptions.slice(0, 6)
          : availableOptions;
    }

    if (availableOptions.length === 0) {
      return [];
    }

    if (/^\d/gi.test(availableOptions[0][question.colIndex])) {
      return orderBy(
        availableOptions,
        (option) => parseFloat(option[question.colIndex]),
        ["asc"]
      );
    } // else {
    //   return orderBy(availableOptions, (option) => option, ["asc"]);
    // }
    return availableOptions;
  }, [filteredAnswers, showAll, question]);

  const dropdownOptionTemplate = (option: string) => {
    const image = BRAND_IMAGES[String(option).toLowerCase()];

    return (
      <div className="flex align-items-center justify-content-center">
        <div className="w-12 flex align-items-center gap-8 pl-2">
          {image && (
            <Image
              alt={option}
              src={image}
              imageStyle={{ height: 60, width: 160, objectFit: "contain" }}
            />
          )}
          <div>{option}</div>
        </div>
      </div>
    );
  };

  const handleSearchChange = (e: AutoCompleteChangeEvent) => {
    setSearchVaule(e.value);

    if (!e.value) {
      setSelectedSuggestion("");
    }
  };

  const handleAutoCompleteMethod = (e: AutoCompleteCompleteEvent) => {
    const filteredSuggestions = answers
      .map((item) => item[question.colIndex])
      .filter((item) => item.toLowerCase().includes(e.query.toLowerCase()))
      .sort((a, b) => a.localeCompare(b));

    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (e: AutoCompleteSelectEvent) => {
    setSelectedSuggestion(e.value);
  };

  const handleDisplayAll = () => {
    setShowAll((prevState) => !prevState);
  };

  useEffect(() => {
    if (answers && answers.length) {
      setSuggestions(
        answers
          .map((item) => item[question.colIndex])
          .filter((item) => item) // while loading, `answers` object doesn't hold `question.colIndex` field and becomes null
          .sort()
      );
    }
  }, [answers, question]);

  const popupComponentHOC = useCallback(
    (answer: ANSWER_TYPE) => (
      <PopupOutput
        data={secondaryQuestions.reduce((result, secondaryQuestion) => {
          let key = serializeColInfo(secondaryQuestion);
          if (isPopup(key) === true)
            return {
              ...result,
              [key]: answer[secondaryQuestion.colIndex],
            };
          return result;
        }, {})}
        size={24}
      />
    ),
    [secondaryQuestions]
  );

  return (
    <>
      <div className="col-12 flex flex-column justify-content-center align-items-center relative">
        {onGoBack && (
          <Button
            icon="pi pi-arrow-left"
            className="absolute left-0 ml-2 mt-5 px-5 md:ml-4 text-6xl bg-light-green"
            disabled={disabled}
            onClick={onGoBack}
          />
        )}

        {calculatorName && <h1 className="underline">{calculatorName}</h1>}
        {suggestions.length > 0 && (
          <h1
            className={cx(
              "heading",
              "flex gap-3 line-height-3 md:align-items-center md:text-center"
            )}
          >
            {question.colText && (
              <PopupOutput
                className="text-2xl"
                data={{
                  [SHOULD_DISPLAY_TEXT_ONLY]: question.colText,
                }}
                size={48}
              />
            )}
            {questionName}
          </h1>
        )}
      </div>

      {answers?.length > 6 && (
        <div className="col-12 sm:col-8 sm:col-offset-2 xl:col-4 xl:col-offset-4 md:mb-6">
          <AutoComplete
            value={searchValue}
            suggestions={suggestions}
            onChange={handleSearchChange}
            placeholder={`Search all ${answers.length} available options...`}
            className="w-full"
            inputClassName="w-full"
            completeMethod={handleAutoCompleteMethod}
            onSelect={handleSelect}
            itemTemplate={dropdownOptionTemplate}
            dropdown
          />
        </div>
      )}

      <div className="relative md:absolute flex align-items-center justify-content-center w-full md:w-2 md:col-offset-10">
        <PieChartProgressBar percentage={progress || 0} />
      </div>

      {!disabled && (
        <>
          {isActionQuestion ? (
            <div className="flex align-items-start justify-content-around flex-wrap w-12">
              <div className="m-2 w-12 md:w-3 flex gap-1">
                {popupComponentHOC(answers[0])}
                <div
                  className={cx(
                    "quiz-card",
                    "border-3 border-round-xl w-full p-0 flex justify-content-center cursor-pointer bg-white"
                  )}
                  style={{ height: 50 }}
                  onClick={() => {
                    if (!disabled) {
                      onSelectAnswer(answers[0]);
                    }
                  }}
                >
                  <div className="w-full m-1 text-3xl flex align-items-center justify-content-center text-center">
                    Next
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex align-items-start justify-content-around flex-wrap w-12">
                {options.map((answer, index) => {
                  const image = BRAND_IMAGES[`${answer}`.toLowerCase()];

                  return (
                    <div
                      key={`${question.colName}-${answer}-${index}`}
                      className="m-2 w-12 md:w-3 flex gap-1"
                    >
                      {popupComponentHOC(answer)}
                      <div
                        className={cx(
                          "quiz-card",
                          "border-3 border-round-xl w-full p-0 flex justify-content-center cursor-pointer bg-white",
                          {
                            "quiz-card--selected":
                              currentAnswer &&
                              currentAnswer[question.colIndex] ===
                                answer[question.colIndex],
                          }
                        )}
                        style={{ height: 200 }}
                        onClick={() => {
                          if (!disabled) {
                            onSelectAnswer(answer);
                          }
                        }}
                      >
                        {image ? (
                          <Image
                            src={image}
                            width="100%"
                            height="100%"
                            imageClassName="p-4"
                            imageStyle={{ objectFit: "contain" }}
                            alt={answer[question.colIndex]}
                          />
                        ) : (
                          <div className="w-full m-1 text-3xl flex align-items-center justify-content-center text-center">
                            {answer[question.colIndex]}
                          </div>
                        )}
                      </div>

                      {image && (
                        <p className="w-full text-3xl text-center">
                          {answer[question.colIndex]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {answers?.length > 6 && (
                <div className="flex align-items-start justify-content-around flex-wrap w-12">
                  <div className="m-2 w-12 md:w-3 flex flex-column" />
                  <div className="m-2 w-12 md:w-3 flex flex-column">
                    <Button
                      label={
                        showAll ? "Hide" : `Display All (${answers.length})`
                      }
                      onClick={handleDisplayAll}
                    />
                  </div>
                  <div className="m-2 w-12 md:w-3 flex flex-column" />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Quiz;
