import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AUTO_POPULATE_OPTIONS,
  AutoPopulateData,
  InputOutputValues,
  Site,
  SiteData,
  ItemData,
  QUANTITY_VISIBILITY_STATE,
  KeyValuePair,
} from "../../constants";
import { useQuery } from "react-query";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import Quiz from "../../../quiz";
import { RadioButtonChangeEvent } from "primereact/radiobutton";
import AutoPopulatePromt from "./AutoPopulatePromt";
import Item from "@/components/calculator/AllOnX/Item";
import { Divider } from "primereact/divider";

interface InputProps {
  site: Site;
  input: InputOutputValues[];
  option: string;
  showAutopopulatePrompt: boolean;
  autoPopulateData: AutoPopulateData | null;
  sitesData: SiteData;
  additionalInputs: KeyValuePair;
  onInputSelect: (
    site: Site,
    question: InputOutputValues,
    answer: string
  ) => void;
  onAutopopulate: (dataToPopulate: AutoPopulateData | null) => void;
  onQuizResponse: (
    site: Site,
    response: ItemData[],
    collection: string
  ) => void;
}

/**
 * Name : Questionnaire.
 * Desc : The `Questionnaire` component is a React functional component that renders a series of quiz
 * questions based on the provided `input` and `option` props. It manages the state of the quiz level,
 * answer options, selected answers, and item information.
 * @param {object} site
 * @param {array} input
 * @param {string} option
 * @param {boolean} showAutopopulatePrompt
 * @param {object} autoPopulateData
 * @param {object} sitesData
 * @param {func} onInputSelect
 * @param {func} onAutopopulate
 * @param {func} onQuizResponse
 * @param {object} additionalInputs
 */
const Questionnaire: React.FC<InputProps> = ({
  site,
  input,
  option,
  showAutopopulatePrompt,
  autoPopulateData,
  sitesData,
  onInputSelect,
  onAutopopulate,
  onQuizResponse,
  additionalInputs,
}: InputProps) => {
  const [level, setLevel] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<string[][]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [autoQuestions, setAutoQuestions] = useState<
    InputOutputValues[] | null
  >(null);
  const [autoPopulate, setAutoPopulate] = useState<string>(
    AUTO_POPULATE_OPTIONS[1].value
  );
  const [isAutoPopulatedAnswersChanged, setIsAutoPopulatedAnswersChanged] =
    useState<boolean>(false);
  const toastRef = useRef(null);

  useEffect(() => {
    if (autoPopulateData) {
      const { questions, answerOptions, answers } = autoPopulateData;
      setAnswerOptions(answerOptions);
      setAnswers(answers);
      setAutoQuestions(questions);
      setLevel(questions.length);
      setTimeout(() => {
        onAutopopulate(null);
        setAutoQuestions(null);
      }, 1000);
    }
  }, [autoPopulateData]);

  useEffect(() => {
    setAnswerOptions([]);
    setAnswers([]);
    setLevel(0);
  }, [additionalInputs]);

  const { isLoading } = useQuery(
    [input, level, answers, option, site],
    async () => {
      if (level > input.length || autoPopulateData !== null) {
        return;
      }

      const quiz = {} as any;

      answers.forEach((answer, index) => {
        if (quiz[input[level]?.name]) {
          delete quiz[input[level]?.name];
        }
        if (answer) {
          quiz[input[index].name] = answer;
        }
      });

      if (!input[level]) {
        return;
      }

      const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/allOnXCalculator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: input[level]?.calculator,
            output: input[level]?.outputFrom,
            quiz,
            fields: input[level]?.name ? [input[level]?.name] : [],
          }),
        }
      );

      if (!response.ok && toastRef.current) {
        response.json().then((res: any) => {
          (toastRef.current as any).show({
            severity: "error",
            summary: res.status,
            detail: res.message,
            life: 5000,
          });
        });
        return;
      }

      const {
        data: { result: newAnswerOptions, quizResponse = null },
      } = await response.json();

      const originalAnswerOptions: string[][] = answerOptions.slice(0, level);

      if (newAnswerOptions.length) {
        setAnswerOptions([...originalAnswerOptions, newAnswerOptions]);
      }
      if (quizResponse) {
        onQuizResponse(site, quizResponse, input[level]?.outputFrom ?? "");
      }
    },
    { refetchOnWindowFocus: false, retry: false }
  );

  const questions: InputOutputValues[] = useMemo(() => {
    return autoQuestions ? autoQuestions : input.slice(0, level + 1);
  }, [input, level, autoQuestions]);

  const handleSelectAnswer = (index: number) => (e: any) => {
    setAutoQuestions(null);
    if (autoPopulate === AUTO_POPULATE_OPTIONS[0].value) {
      setIsAutoPopulatedAnswersChanged(true);
    }
    if (e.value === "" && questions[index].name === "") {
      const promise = new Promise((resolve) => {
        setLevel(index);
        setTimeout(() => resolve(true), 1000);
      });
      promise.then(() => {
        setLevel(index + 1);
      });
    } else {
      setLevel(index + 1);
    }

    const newAnswers = answers.slice(0, index);
    newAnswers[index] = e.value;
    setAnswers(newAnswers);
    onInputSelect(site, questions[index], newAnswers[index]);
  };

  const handlePopulateResponse = (value: string) => {
    setAutoPopulate(value);
    setIsAutoPopulatedAnswersChanged(false);
    if (value === AUTO_POPULATE_OPTIONS[0].value) {
      onAutopopulate({ site, questions, answerOptions, answers });
    }
  };

  return (
    <div className="mt-3 mb-3">
      <React.Fragment>
        {questions.map((quiz: any, index: number) => {
          let noAvailableOptions: boolean = false;
          if (
            answerOptions[index] &&
            answerOptions[index].length === 1 &&
            answerOptions[index][0] === ""
          ) {
            if (
              index <= level &&
              level < input.length &&
              answers[index] !== ""
            ) {
              handleSelectAnswer(index)({ value: "" });
            }
            noAvailableOptions = true;
          }
          const outputCollection: string = questions[index]?.outputFrom || "";
          const componentDetails: ItemData[] =
            sitesData[site.name]?.componentDetails[outputCollection] || [];
          return (
            <React.Fragment key={`quiz-${index}`}>
              {componentDetails.length > 0 && (
                <div className="py-4">
                  {componentDetails.map((data: ItemData, i: number) => {
                    return (
                      <Item
                        key={`${data.label}-${i}`}
                        label={data.label}
                        info={data.info}
                        quantityVisibilityState={QUANTITY_VISIBILITY_STATE.HIDE}
                        isFirst={i === 0}
                      />
                    );
                  })}
                </div>
              )}

              {quiz.displayCalculatorName && (
                <Divider align="left">
                  <div className="inline-flex align-items-center">
                    <i className="pi pi-calculator mr-2"></i>
                    <b>{quiz.displayCalculatorName}</b>
                  </div>
                </Divider>
              )}

              {!!(quiz.text && quiz.name) &&
                !!answerOptions[index] &&
                !noAvailableOptions && (
                  <div className="col-12 flex p-0">
                    <Quiz
                      key={`quiz-${index}`}
                      question={quiz.name}
                      answers={answerOptions[index]}
                      selectedAnswer={answers[index] || null}
                      handleSelectAnswer={handleSelectAnswer(index)}
                      disabled={isLoading || answers[level] === ""}
                    />
                  </div>
                )}
            </React.Fragment>
          );
        })}
        {showAutopopulatePrompt && input.length > 0 && !input[level + 1] && (
          <AutoPopulatePromt
            autoPopulate={autoPopulate}
            onPopulateResponse={handlePopulateResponse}
            showRefreshButton={isAutoPopulatedAnswersChanged}
          />
        )}
      </React.Fragment>
      <div className="w-12 flex justify-content-center">
        {(isLoading || answers[level] === "") && (
          <ProgressSpinner className="w-1" />
        )}
      </div>
      <Toast ref={toastRef} position="top-right" />
    </div>
  );
};

export default Questionnaire;
