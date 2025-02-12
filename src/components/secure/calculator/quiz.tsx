import classNames from "classnames/bind";
import orderBy from "lodash/orderBy";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import Image from "next/image";
import React, { useEffect, useState, useMemo, useCallback } from "react";

import PieChartProgressBar from "@/components/shared/PieChartProgressbar";
import QuizRestartButton from "@/components/shared/QuizRestartButton"
import {
  BRAND_IMAGES,
  BRAND_IMAGES_MAP_ADDITIONAL,
  QUESTION_ANSWER_BRAND_MAP,
  SHOULD_DISPLAY_TEXT_ONLY,
} from "@/constants/calculators";
import { ANSWER_TYPE, InputOutputValues } from "@/types/calculators";

import PopupOutput from "./Result/Outputs/Popup";

import styles from "./quiz.module.scss";
import { isPopup, serializeColInfo } from "@/helpers/calculators";
import VideoPlayer from "@/components/shared/VideoPlayer";

const cx = classNames.bind(styles);

const getImageForAnswerOption = (
  answer: string,
  question?: InputOutputValues
) => {
  const lowerCaseAnswer = answer.toLocaleLowerCase();
  if (BRAND_IMAGES[lowerCaseAnswer]) {
    return BRAND_IMAGES[lowerCaseAnswer];
  }

  const anotherName = BRAND_IMAGES_MAP_ADDITIONAL[lowerCaseAnswer];
  if (anotherName && BRAND_IMAGES[anotherName]) {
    return BRAND_IMAGES[anotherName];
  }

  if (!question) return "";

  const answerMap = QUESTION_ANSWER_BRAND_MAP[question.colName];
  const brand = answerMap?.[lowerCaseAnswer];
  if (brand) {
    return BRAND_IMAGES[brand];
  }

  return "";
};

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

  const dropdownOptionTemplate = (
    option: string,
    question: InputOutputValues
  ) => {
    const image = getImageForAnswerOption(option, question);

    return (
      <div className="flex align-items-center justify-content-center">
        <div className="w-12 flex align-items-center gap-8 pl-2">
          {image && (
            <Image
              alt={option}
              src={image}
              width={120}
              height={45}
              objectFit="contain"
              style={{
                width: 160,
                height: 60
              }}
              quality={40}
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
      .filter((item) => item && item.toLowerCase().includes(e.query.toLowerCase()))
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
          {calculatorName && 
            <h1 className={cx("calculator-name", "underline")}>{calculatorName}</h1>
          }
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
            itemTemplate={(option) => dropdownOptionTemplate(option, question)}
            dropdown
          />
        </div>
      )}

      {!disabled && (
        <>
          <div className="relative md:absolute flex align-items-center justify-content-center w-full md:w-2 md:col-offset-9">
            { progress !== undefined && progress > 0 && 
              <div className="mt-3">
                <QuizRestartButton />
              </div> 
            }
            <PieChartProgressBar percentage={progress || 0} />
          </div>
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
                  const image = getImageForAnswerOption(
                    answer[question.colIndex],
                    question
                  );

                  return (
                    answer[question.colIndex] && (
                      <div
                        key={`${question.colName}-${answer}-${index}`}
                        className="m-2 w-12 md:w-3 flex gap-1"
                      >
                        {popupComponentHOC(answer)}
                        <div className="flex flex-column w-full justify-content-center">
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
                                objectFit="contain"
                                width={384}
                                height={256}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain"
                                }}
                                // quality={30}
                                className="p-4"
                                alt={answer[question.colIndex]}
                              />
                            ) : (
                              <div className="w-full m-1 text-3xl flex align-items-center justify-content-center text-center">
                                {answer[question.colIndex]}
                              </div>
                            )}
                          </div>

                          {image && (
                            <p className="w-full text-3xl text-center align-self-center">
                              {answer[question.colIndex]}
                            </p>
                          )}
                        </div>
                      </div>
                    )
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
      {question.calculatorType === "ImpressionCopingsDirectToImplant" &&
        questionName === "Engaging or Non-Engaging" && (
          <div className="w-full flex justify-content-center mt-4">
            <div className="w-4">
              <VideoPlayer
                forbidden={false}
                videoSrc={
                  "https://ivoryguide.s3.us-west-1.amazonaws.com/images/videos/Engaging+vs+nonengaging.mp4"
                }
                zoomOnClick={false}
                startTime={2}
                title="Ivory Insight"
                subtitle="from Dr. Kyle Stanley"
              />
            </div>
          </div>
        )}
    </>
  );
};

export default Quiz;
