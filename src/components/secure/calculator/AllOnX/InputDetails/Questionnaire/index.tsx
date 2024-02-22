import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";

import Quiz from "../../../quiz";
import ComponentDetails from "../../ComponentDetails";
import {
  AUTO_POPULATE_OPTIONS,
  AutoPopulateData,
  InputOutputValues,
  Site,
  SiteData,
  ItemData,
} from "../../constants";

import AutoPopulatePromt from "./AutoPopulatePromt";
import QuestionNavbar from "./QuestionNavbar";

interface InputProps {
  site: Site;
  input: InputOutputValues[];
  option: string;
  showAutopopulatePrompt: boolean;
  autoPopulateData: AutoPopulateData | null;
  sitesData: SiteData;
  responseOrder: string[];
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
  onUpdateQuantity: (quantity: number, itemName: string) => void;
}

const Questionnaire: React.FC<InputProps> = ({
  site,
  input,
  option,
  showAutopopulatePrompt,
  autoPopulateData,
  sitesData,
  responseOrder,
  onInputSelect,
  onAutopopulate,
  onQuizResponse,
  onUpdateQuantity,
}) => {
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
  }, [autoPopulateData, onAutopopulate]);

  const { isLoading } = useQuery(
    [input, answers, option, site],
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

      try {
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
            const msg: string =
              res?.message?.message || res?.message || "Something went wrong";
            (toastRef.current as any).show({
              severity: "error",
              summary: res?.status,
              detail: msg,
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
      } catch (error: any) {
        (toastRef.current as any).show({
          severity: "error",
          summary: error?.status,
          detail: error?.message,
          life: 5000,
        });
      }
    },
    { refetchOnWindowFocus: false, retry: false }
  );

  const questions: InputOutputValues[] = useMemo(() => {
    return autoQuestions || input.slice(0, level + 1);
  }, [input, level, autoQuestions]);

  const handleSelectAnswer = (index: number) => (value: string) => {
    setAutoQuestions(null);

    if (autoPopulate === AUTO_POPULATE_OPTIONS[0].value) {
      setIsAutoPopulatedAnswersChanged(true);
    }
    if (value === "" && questions[index].name === "") {
      new Promise((resolve) => {
        setLevel(index);
        setTimeout(() => resolve(true), 1000);
      }).then(() => {
        setLevel(index + 1);
      });
    } else {
      setLevel(index + 1);
    }

    const newAnswers = answers.slice(0, index);
    newAnswers[index] = value;
    setAnswers(newAnswers);

    if (!(questions[index].name === "" && questions[index].text === "")) {
      onInputSelect(site, questions[index], newAnswers[index]);
    }
  };

  const handlePopulateResponse = (value: string) => {
    setAutoPopulate(value);
    setIsAutoPopulatedAnswersChanged(false);

    if (value === AUTO_POPULATE_OPTIONS[0].value) {
      onAutopopulate({ site, questions, answerOptions, answers });
    }
  };

  const handleChange = (index: number) => {
    setLevel(index);
  };

  const handleShowSummary = () => {
    setLevel(input.length);
  };

  const quiz = useMemo(() => {
    const res: { question: string; answer: string }[] = [];

    answers.forEach((answer, answerIdx) => {
      if (answer) {
        res.push({
          question: input[answerIdx].text || input[answerIdx].name,
          answer,
        });
      }
    });

    return res;
  }, [answers, input]);

  const answeredAllQuestions = Boolean(
    input.length > 0 && answers.length === input.length
  );

  const showSummary = level === input.length;

  return (
    <div className="my-3">
      <QuestionNavbar
        questions={input}
        answers={answers}
        isSummaryReady={answeredAllQuestions}
        onShowSummary={handleShowSummary}
        onChange={handleChange}
      />

      <div className="grid">
        {questions.map((quiz, index) => {
          if (index !== level) {
            return null;
          }

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
              handleSelectAnswer(index)("");
            }
            return null;
          }

          if (!quiz.text || !quiz.name || !answerOptions[index]) {
            return null;
          }

          return (
            <Quiz
              key={`quiz-${index}`}
              question={quiz.name}
              answers={answerOptions[index]}
              currentAnswer={answers[index]}
              disabled={isLoading}
              progress={Math.floor((index / input.length) * 100)}
              onSelectAnswer={handleSelectAnswer(index)}
            />
          );
        })}

        {showAutopopulatePrompt && answeredAllQuestions && (
          <AutoPopulatePromt
            autoPopulate={autoPopulate}
            onPopulateResponse={handlePopulateResponse}
            showRefreshButton={isAutoPopulatedAnswersChanged}
          />
        )}

        {answeredAllQuestions &&
          showSummary &&
          sitesData[site.name]?.componentDetails && (
            <ComponentDetails
              quiz={quiz}
              componentDetails={sitesData[site.name]?.componentDetails}
              responseOrder={responseOrder}
              onUpdateQuantity={onUpdateQuantity}
            />
          )}

        {(isLoading ||
          (input[level] && !Boolean(answerOptions[level]?.length))) && (
          <div className="w-12 flex justify-content-center">
            <ProgressSpinner className="w-1" />
          </div>
        )}

        <Toast ref={toastRef} position="top-right" />
      </div>
    </div>
  );
};

export default Questionnaire;
