import React, { useEffect, useMemo, useState } from "react";
import {
  AUTO_POPULATE_OPTIONS,
  AutoPopulateData,
  InputOutputValues,
  Site,
  SiteData,
  ItemData,
  QUANTITY_VISIBILITY_STATE,
} from "../../constants";
import { useQuery } from "react-query";
import { ProgressSpinner } from "primereact/progressspinner";
import Quiz from "@/components/calculator/quiz";
import { RadioButtonChangeEvent } from "primereact/radiobutton";
import AutoPopulatePromt from "./AutoPopulatePromt";
import Item from "../../Item";
import { Divider } from "primereact/divider";

interface InputProps {
  site: Site;
  input: InputOutputValues[];
  option: string;
  showAutopopulatePrompt: boolean;
  autoPopulateData: AutoPopulateData | null;
  sitesData: SiteData;
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
 * @param {func} onInputSelect
 * @param {func} onAutopopulate
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

  useEffect(() => {
    if (autoPopulateData) {
      const { questions, answerOptions, answers } = autoPopulateData;
      setAnswerOptions(answerOptions);
      setAnswers(answers);
      setAutoQuestions(questions);
      setTimeout(() => {
        onAutopopulate(null);
      }, 1000);
    }
  }, [autoPopulateData]);

  const { isLoading } = useQuery(
    [input, level, answers, option],
    async () => {
      if (level > input.length || autoPopulateData !== null) {
        return;
      }

      const quiz = {} as any;

      answers.forEach((answer, index) => {
        quiz[input[index].name] = answer;
      });

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

      const {
        data: { result: newAnswerOptions, quizResponse = null },
      } = await response.json();

      const originalAnswerOptions: string[][] = answerOptions.slice(0, level);
      if (!input[level]) {
        return;
      }
      if (newAnswerOptions.length) {
        setAnswerOptions([...originalAnswerOptions, newAnswerOptions]);
      }
      if (quizResponse) {
        onQuizResponse(site, quizResponse, input[level]?.outputFrom ?? "");
      }
    },
    { refetchOnWindowFocus: false }
  );

  const questions: InputOutputValues[] = useMemo(() => {
    return autoQuestions ? autoQuestions : input.slice(0, level + 1);
  }, [input, level, autoQuestions]);

  const handleSelectAnswer = (index: number) => (e: any) => {
    setAutoQuestions(null);
    setLevel(index + 1);
    const newAnswers = answers.slice(0, index);
    newAnswers[index] = e.value;
    setAnswers(newAnswers);
    onInputSelect(site, questions[index], newAnswers[index]);
  };

  const handlePopulateResponse = (e: RadioButtonChangeEvent) => {
    const value = e.value;
    setAutoPopulate(value);
    if (value === AUTO_POPULATE_OPTIONS[0].value) {
      onAutopopulate({ site, questions, answerOptions, answers });
    }
  };

  return (
    <div className="mt-3 mb-3">
      <div className="grid">
        {questions.map((quiz: any, index: number) => {
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
            return null;
          }
          const outputCollection: string = questions[index]?.outputFrom || "";
          const componentDetails: ItemData[] =
            sitesData[site.name]?.componentDetails[outputCollection] || [];
          return (
            <React.Fragment key={`quiz-${index}`}>
              {componentDetails.length > 0 && (
                <>
                  <Divider />
                  {componentDetails.map((data: ItemData, i: number) => {
                    return (
                      <Item
                        key={`${data.label}-${i}`}
                        label={data.label}
                        info={data.info}
                        quantityVisibilityState={QUANTITY_VISIBILITY_STATE.HIDE}
                      />
                    );
                  })}
                  <Divider />
                </>
              )}

              {!!(quiz.text && quiz.name) && (
                <div className="col-12 flex">
                  <Quiz
                    key={`quiz-${index}`}
                    question={quiz.text}
                    answers={answerOptions[index]}
                    selectedAnswer={answers[index] || null}
                    handleSelectAnswer={handleSelectAnswer(index)}
                    disabled={isLoading}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
        {showAutopopulatePrompt && !input[level + 1] && (
          <AutoPopulatePromt
            autoPopulate={autoPopulate}
            onPopulateResponse={handlePopulateResponse}
          />
        )}
      </div>
      <div className="w-12 flex justify-content-center">
        {isLoading && <ProgressSpinner className="w-1" />}
      </div>
    </div>
  );
};

export default Questionnaire;
