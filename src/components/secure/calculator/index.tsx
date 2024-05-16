import { ProgressSpinner } from "primereact/progressspinner";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import DetailView from "./detail";
import FeedbackDialogWrapper from "./Feedback/FeedbackDialogWrapper";
import Quiz from "./quiz";
import { ANSWER_TYPE, InputOutputValues, QUESTION_AVAILABILITY } from "@/types/calculators";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
import { filterValidAnswers, isEmptyAnswer, isPopup, makeEmptyAnswer, serializeColInfo } from "@/helpers/calculators";
import _ from "lodash";

interface CalculatorContainerProps {
  defaultAnswers: string[];
  option: string;
  input: InputOutputValues[];
  output: InputOutputValues[];
}

const CalculatorContainer: React.FC<CalculatorContainerProps> = ({
  input,
  output,
  option,
  defaultAnswers,
}) => {
  const [level, setLevel] = useState(0);
  const [answerLevel, setAnswerLevel] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<ANSWER_TYPE[][]>([]);
  const [answers, setAnswers] = useState<ANSWER_TYPE[]>([]);
  const [items, setItems] = useState<ANSWER_TYPE[]>([]);
  const [canProceed, setCanProceed] = useState<boolean>(true);
  const { calcInfoMap } = useCalculatorsInfo();
  const [questionAvailability, setQuestionAvailability] = useState<QUESTION_AVAILABILITY>({});

  const calculatorType = decodeURI(option);

  const countValidQuestions = useCallback((_questions: InputOutputValues[]) => {
    return _questions.map((q) => questionAvailability[q.colIndex]).filter(flag => flag !== false).length;
  }, [questionAvailability]);

  const { isLoading } = useQuery(
    [input, level, answers, option, canProceed],
    async () => {
      if (!canProceed) {
        return;
      }

      if (level > input.length) {
        return;
      }

      const quiz = filterValidAnswers(_.merge({}, ...answers.slice(0, answerLevel)));
      const originalAnswerOptions: any[] = answerOptions.slice(0, answerLevel);

      // Calculate which inputs to ask in the next step - BEGIN
      let nextInputFields = [], remainingInputFields = [],
        i,
        count = 0, shouldRequest = true;
      for (i = level; i < input.length; ++i) {
        if (isPopup(serializeColInfo(input[i])) == false) {
          count += 1;
          if (count == 2) break;
          if (questionAvailability[input[i].colIndex] === false) // if this is not POPUP_TEXT question but it's already marked as false in questionAvailability, we needn't fetch the request
            shouldRequest = false;
        }
        nextInputFields.push(input[i].colIndex);
      }
      if (shouldRequest === false) {
        setAnswerOptions([...originalAnswerOptions, [makeEmptyAnswer(nextInputFields)]])
        setItems([]);
        return;
      }
      for (; i < input.length; ++i)
        if (questionAvailability[input[i].colIndex] !== false)  // only update if the answer for this question is available
          remainingInputFields.push(input[i].colIndex);
      // Calculate which inputs to ask in the next step - END

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/materials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: option,
            quiz,
            fields:
              level < input.length
                ? nextInputFields
                : output.map((item) => item.colIndex),
            remainingFields: remainingInputFields
          }),
        }
      );

      const { data: {
        data: newAnswerOptions,
        questionAvailability: newQuestionAvailability
      } }: {
        data: {
          data: ANSWER_TYPE[],
          questionAvailability: QUESTION_AVAILABILITY
        }
      } =
        await response.json();

      if (level == input.length) {
        setItems(newAnswerOptions || []);
        return;
      }
      // if (newAnswerOptions.length) {
      setQuestionAvailability({ ...questionAvailability, ...newQuestionAvailability });
      setAnswerOptions([...originalAnswerOptions, newAnswerOptions]);
      setItems([]);
      // }
    },
    { refetchOnWindowFocus: false }
  );

  const questions = useMemo(() => {
    return input.slice(0, level + 1);
  }, [input, level]);

  const handleSelectAnswer = useCallback(
    (value: ANSWER_TYPE) => {
      setCanProceed(true);
      setLevel(level + Object.keys(value).length);
      setAnswers([...answers.slice(0, answerLevel), value]);
      setAnswerLevel(answerLevel + 1);
    },
    [answers, level, answerLevel]
  );

  const handleBack = () => {
    setCanProceed(false);
    let newLevel = level,
      i;
    for (i = answerLevel - 1; i >= 0; i -= 1) {
      newLevel -= Object.keys(answers[i]).length;
      if (!isEmptyAnswer(answers[i])) break;
    }
    setLevel(newLevel);
    setAnswerLevel(i);
    setAnswerOptions(answerOptions.slice(0, i + 1));
    setQuestionAvailability({});
  };

  const handleBackFromResult = () => {
    setItems([]);
    handleBack();
  };

  const showLoader =
    isLoading || (input[level] && !Boolean(answerOptions[answerLevel]?.length));

  useEffect(() => {
    if (!(level < questions.length) || showLoader) return;
    if (level < defaultAnswers.length)
      handleSelectAnswer({
        [questions[level].colIndex]: defaultAnswers[level],
      });
    if (
      answerOptions[answerLevel].length === 1 &&
      isEmptyAnswer(answerOptions[answerLevel][0])
    ) {
      handleSelectAnswer(answerOptions[answerLevel][0]);
    }
  }, [
    defaultAnswers,
    answerOptions,
    answers,
    level,
    input,
    handleSelectAnswer,
    questions,
    showLoader,
    answerLevel,
  ]);

  return (
    <div className="flex w-full justify-content-center mb-8">
      <div className="w-12 flex px-2 py-2 border-round flex-column">
        <div className="grid">
          {level < input.length && (
            <Quiz
              key={`quiz-${level}`}
              calculatorName={calcInfoMap[calculatorType].label}
              question={questions[level]}
              secondaryQuestions={input.slice(
                level,
                level +
                (answerOptions[answerLevel]
                  ? Object.keys(answerOptions[answerLevel][0]).length
                  : 1)
              )}
              answers={answerOptions[answerLevel]}
              currentAnswer={answers[answerLevel]}
              disabled={showLoader}
              progress={Math.floor(((countValidQuestions(questions) - 1) / countValidQuestions(input)) * 100)}
              onSelectAnswer={handleSelectAnswer}
              onGoBack={level > 0 ? handleBack : undefined}
            />
          )}
        </div>

        {items.length > 0 ? (
          <DetailView
            calculatorType={calculatorType}
            items={items}
            outputFields={output}
            questions={input}
            answers={(() => {
              const plainAnswerObject = _.merge({}, ...answers);
              return questions.map(
                (question) => plainAnswerObject[question.colIndex]
              );
            })()}
            onGoBack={
              level > defaultAnswers.length ? handleBackFromResult : undefined
            }
          />
        ) : (
          <FeedbackDialogWrapper
            calculatorName={calcInfoMap[calculatorType].label}
            userAnswers={input.map((inputItem) => ({
              ...inputItem,
              answer: _.merge({}, ...answers)[inputItem.colIndex],
            }))}
          />
        )}

        {showLoader && (
          <div className="w-12 flex justify-content-center">
            <ProgressSpinner className="w-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorContainer;
