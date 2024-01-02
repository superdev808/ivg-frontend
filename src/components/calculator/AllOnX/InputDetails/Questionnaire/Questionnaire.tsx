import { useMemo, useState } from "react";
import { InputOutputValues, Site } from "../../constants";
import { useQuery } from "react-query";
import { ProgressSpinner } from "primereact/progressspinner";
import Quiz from "@/components/calculator/quiz";

interface InputProps {
  site: Site;
  input: InputOutputValues[];
  option: string;
  onInputSelect: (site: Site, question: string, answer: string) => void;
}

/**
 * Name : Questionnaire.
 * Desc : The `Questionnaire` component is a React functional component that renders a series of quiz
 * questions based on the provided `input` and `option` props. It manages the state of the quiz level,
 * answer options, selected answers, and item information.
 * @param {object} site
 * @param {array} input
 * @param {string} option
 * @param {func} onInputSelect
 */
const Questionnaire: React.FC<InputProps> = ({
  site,
  input,
  option,
  onInputSelect,
}: InputProps) => {
  const [level, setLevel] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<string[][]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  const { isLoading } = useQuery(
    [input, level, answers, option],
    async () => {
      if (level > input.length) {
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
        data: { result: newAnswerOptions },
      } = await response.json();

      const originalAnswerOptions: string[][] = answerOptions.slice(0, level);
      if (!input[level]) {
        return;
      }
      if (newAnswerOptions.length) {
        setAnswerOptions([...originalAnswerOptions, newAnswerOptions]);
      }
    },
    { refetchOnWindowFocus: false }
  );

  const questions: InputOutputValues[] = useMemo(() => {
    return input.slice(0, level + 1);
  }, [input, level]);

  const handleSelectAnswer = (index: number) => (e: any) => {
    setLevel(index + 1);
    const newAnswers = answers.slice(0, index);
    newAnswers[index] = e.value;
    setAnswers(newAnswers);
    onInputSelect(site, questions[index].text, newAnswers[index]);
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
          return (
            <Quiz
              key={`quiz-${index}`}
              question={quiz.text}
              answers={answerOptions[index]}
              selectedAnswer={answers[index] || null}
              handleSelectAnswer={handleSelectAnswer(index)}
              disabled={isLoading}
            />
          );
        })}
      </div>
      <div className="w-12 flex justify-content-center">
        {isLoading && <ProgressSpinner className="w-1" />}
      </div>
    </div>
  );
};

export default Questionnaire;
