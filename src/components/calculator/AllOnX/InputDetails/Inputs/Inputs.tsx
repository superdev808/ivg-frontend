import { useMemo, useState } from "react";
import { InputOutputValues, PROCEDURES, Site } from "../../constants";
import { useQuery } from "react-query";
import { ProgressSpinner } from "primereact/progressspinner";
import Quiz from "@/components/calculator/quiz";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";

interface InputProps {
  procedure: PROCEDURES
  site: Site;
  input: InputOutputValues[];
  output: InputOutputValues[];
  option: string;
  showAutopopulatePrompt: boolean,
  onInputSelect: (site: Site, question: string, answer: string) => void
}

const Inputs: React.FC<InputProps> = ({
  procedure,
  site,
  input,
  output,
  option,
  showAutopopulatePrompt,
  onInputSelect
}: InputProps) => {
  const [level, setLevel] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<string[][]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [itemInfo, setItemInfo] = useState<any[]>([]);

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

      const response = await fetch(
        `/api/calculators/operations/all-on-x`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: option,
            procedure,
            calculator: input[level]?.calculator,
            output: input[level]?.outputFrom,
            quiz,
            fields: input[level]?.name
              ? [input[level]?.name]
              : output.map((item: InputOutputValues) => item.name),
          }),
        }
      );

      const { data: newAnswerOptions } = await response.json();

      const originalAnswerOptions: string[][] = answerOptions.slice(0, level);
      if (!input[level]) {
        setItemInfo(newAnswerOptions);
        return;
      }
      if (newAnswerOptions.length) {
        setAnswerOptions([...originalAnswerOptions, newAnswerOptions]);
        setItemInfo([]);
      }
    },
    { refetchOnWindowFocus: false }
  );

  const questions = useMemo(() => {
    return input.slice(0, level + 1);
  }, [input, level]);

  const handleSelectAnswer = (index: number) => (e: any) => {
    setLevel(index + 1);
    const newAnswers = answers.slice(0, index);
    newAnswers[index] = e.value;
    setAnswers(newAnswers);
    onInputSelect(site, questions[index].text, newAnswers[index])
  };

  return (
    <>
      <div className="">
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
    </>
  );
};

export default Inputs;
