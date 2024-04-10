import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";

import { AUTO_POPULATE_OPTIONS } from "@/constants/calculators";
import {
  AutoPopulateData,
  InputOutputValues,
  Site,
  SiteData,
  ItemData,
  InputDetail,
} from "@/types/calculators";

import Quiz from "../../../quiz";
import ComponentDetails from "../../ComponentDetails";

import AutoPopulatePromt from "./AutoPopulatePromt";
import QuestionNavbar from "./QuestionNavbar";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
import { parseItems } from "@/helpers/calculators";

interface QuestionnaireProps {
  site: Site;
  input: InputOutputValues[];
  option: string;
  showAutoPopulatePrompt: boolean;
  autoPopulateData: AutoPopulateData | null;
  sitesData: SiteData;
  responseOrder: string[];
  onInputSelect: (
    site: Site,
    question: InputOutputValues,
    answer: string
  ) => void;
  onAutoPopulate: (dataToPopulate: AutoPopulateData | null) => void;
  onQuizResponse: (
    site: Site,
    response: ItemData[],
    collection: string
  ) => void;
  onUpdateQuantity: (quantity: number, groupId: string) => void;
  onAllAnswered: (site: Site) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  site,
  input,
  option,
  showAutoPopulatePrompt,
  autoPopulateData,
  sitesData,
  responseOrder,
  onInputSelect,
  onAutoPopulate,
  onQuizResponse,
  onUpdateQuantity,
  onAllAnswered,
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
  const [canProceed, setCanProceed] = useState<boolean>(true);
  const toastRef = useRef(null);
  const { calcInfoMap } = useCalculatorsInfo()


  const sitesCount = Object.keys(sitesData).length;
  useEffect(() => {
    if (showAutoPopulatePrompt) {
      return;
    }

    if (autoPopulateData) {
      const { questions, answerOptions, answers } = autoPopulateData;

      setAnswerOptions(answerOptions);
      setAnswers(answers);
      setAutoQuestions(questions);

      setLevel(questions.length);
    }
    // else if (sitesCount > 1) {
    //   setAutoQuestions(null);
    //   setLevel(0);
    //   setAnswers([]);
    // }
  }, [
    autoPopulateData,
    showAutoPopulatePrompt,
    sitesCount
  ]);

  const { isLoading } = useQuery(
    [input, level, option, site, canProceed, calcInfoMap],
    async () => {
      if (!canProceed) {
        return;
      }

      if (level >= input.length || autoPopulateData !== null) return;

      const quiz = {} as any;
      const inspectedCalculatorType = input[level].calculatorType;
      const inspectedCalculatorInput = calcInfoMap[inspectedCalculatorType].input;
      const inspectedCalculatorOutput = calcInfoMap[inspectedCalculatorType].output;
      let inspectedCalculatorLevel = 0;

      answers.forEach((answer, index) => {
        if (input[index].isCommon || input[index].calculatorType === inspectedCalculatorType) {
          quiz[input[index].colIndex] = answer;
          inspectedCalculatorLevel += 1;
        }
      });
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/materials`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: encodeURIComponent(inspectedCalculatorType),
              quiz,
              fields: inspectedCalculatorLevel < inspectedCalculatorInput.length
                ? [input[level]?.colIndex]
                : inspectedCalculatorOutput.map((item) => item.colIndex),
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
        const { data: newAnswerOptions } = await response.json();

        const originalAnswerOptions: any[] = answerOptions.slice(0, level);

        if (inspectedCalculatorLevel == inspectedCalculatorInput.length) {
          onQuizResponse(site, newAnswerOptions.map((item: Record<string, string>) => parseItems(item, inspectedCalculatorOutput)).flat(), inspectedCalculatorType);
          setAnswerOptions([...originalAnswerOptions, [""]]);
          return;
        }
        // if (newAnswerOptions.length) {
        setAnswerOptions([...originalAnswerOptions, newAnswerOptions]);
        // }
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

  const handleSelectAnswer = useCallback((index: number) => (value: string) => {
    setCanProceed(true);
    setAutoQuestions(null);
    setAutoPopulate(AUTO_POPULATE_OPTIONS[1].value);
    onAutoPopulate(null);

    if (autoPopulate === AUTO_POPULATE_OPTIONS[0].value) {
      setIsAutoPopulatedAnswersChanged(true);
    }
    setLevel(index + 1);

    const newAnswers = answers.slice(0, index);
    newAnswers[index] = value;
    onInputSelect(site, questions[index], newAnswers[index]);
    setAnswers(newAnswers);
  }, [autoPopulate, questions, site, onInputSelect, answers, onAutoPopulate])

  const handleAutoPopulateChange = useCallback((value: string) => {
    setAutoPopulate(value);
    setIsAutoPopulatedAnswersChanged(false);

    if (value === AUTO_POPULATE_OPTIONS[0].value) {
      onAutoPopulate({ site, questions, answerOptions, answers });
    } else {
      onAutoPopulate(null);
    }
  }, [answerOptions, answers, site, questions, onAutoPopulate]);

  const handleChange = useCallback((index: number) => {
    const answersWithIndex = answers
      .map((answer, idx) => ({ answer, idx }))
      .filter((elem) => Boolean(elem.answer));

    const convertedIdx = answersWithIndex[index]?.idx;

    if (convertedIdx !== undefined) {
      setCanProceed(false);
      setLevel(convertedIdx);
    }
  }, [answers]);

  const handleShowSummary = useCallback(() => {
    setLevel(input.length);
  }, [input.length]);

  const quiz = useMemo(() => {
    return questions.reduce((acc, question, idx) => {
      if (answers[idx]) {
        acc.push({ id: (question.isCommon ? '' : question.calculatorType), question: question.colName, answer: answers[idx] });
      }
      return acc;
    }, [] as InputDetail[]);
  }, [questions, answers]);

  const answeredAllQuestions = Boolean(
    input.length > 0 && answers.length === input.length
  );

  useEffect(() => {
    if (answeredAllQuestions) onAllAnswered(site);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answeredAllQuestions]);

  const showSummary = level === input.length;

  const showLoader =
    isLoading || (input[level] && !Boolean(answerOptions[level]?.length));

  useEffect(() => {
    if (!(level < questions.length) || showLoader)
      return;
    if (
      (answerOptions[level]?.length === 1 &&
        answerOptions[level][0] === "") || input[level].colName == ""
    ) {
      handleSelectAnswer(level)("")
    }
  }, [answerOptions, answers, level, input, handleSelectAnswer, questions.length, showLoader]);


  return (
    <div className="mt-3 relative" style={{ minHeight: 700 }}>
      <Toast ref={toastRef} position="top-right" />

      <QuestionNavbar
        questions={input}
        answers={answers}
        isSummaryReady={answeredAllQuestions}
        onShowSummary={handleShowSummary}
        onChange={handleChange}
      />

      {showLoader ? (
        <ProgressSpinner
          className="w-1 absolute top-50 left-50"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      ) :
        (<div className="px-4 grid">
          {level < questions.length && <Quiz
            key={`quiz-${level}`}
            question={questions[level]}
            calculatorName={calcInfoMap[input[level].calculatorType].label}
            answers={answerOptions[level]}
            currentAnswer={answers[level]}
            disabled={showLoader}
            progress={Math.floor((level / input.length) * 100)}
            onSelectAnswer={handleSelectAnswer(level)}
          />}

          {showAutoPopulatePrompt && answeredAllQuestions && (
            <AutoPopulatePromt
              autoPopulate={autoPopulate}
              onAutoPopulateChange={handleAutoPopulateChange}
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
        </div>
        )}
    </div>
  );
};

export default Questionnaire;
