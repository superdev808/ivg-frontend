import { useEffect, useMemo, useState } from "react";
import { InputOutputValues, Site } from "../../constants";
import { useQuery } from "react-query";
import { ProgressSpinner } from "primereact/progressspinner";
import Quiz from "@/components/calculator/quiz";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";

interface InputProps {
  site: Site;
  input: InputOutputValues[];
  option: string;
  showAutopopulatePrompt: boolean,
  onInputSelect: (site: Site, question: string, answer: string) => void,
  onAutopopulate: (questions: InputOutputValues[], answerOptions: string[][], answers: string[]) => void
  autoPopulateData: any
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
  showAutopopulatePrompt,
  onInputSelect,
  onAutopopulate,
  autoPopulateData
}: InputProps) => {
  const [level, setLevel] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<string[][]>([]);
  const [answers, setAnswers] = useState<string[]>([]);  
  const [autoQuestions, setAutoQuestions] = useState<any>(null);

  useEffect(()=>{
    if(autoPopulateData){
      const {questions, answerOptions, answers} = autoPopulateData;      
      setAnswerOptions(answerOptions);
      setAnswers(answers)
      setAutoQuestions(questions);
    }    
  }, [autoPopulateData])

  const { isLoading } = useQuery(
    [input, level, option],
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
    return autoQuestions ? autoQuestions : input.slice(0, level + 1);
  }, [input, level, autoQuestions]);

  const handleSelectAnswer = (index: number) => (e: any) => {
    setAutoQuestions(null)
    setLevel(index + 1);
    const newAnswers = answers.slice(0, index);
    newAnswers[index] = e.value;
    setAnswers(newAnswers);
    onInputSelect(site, questions[index].text, newAnswers[index]);
  };

  const [autopopulate, setAutopopulate] = useState("");
  const autoPopulateResponse = (e: RadioButtonChangeEvent) => {
    const value = e.value;
    setAutopopulate(value);
    if(value === "Yes"){
      onAutopopulate(questions, answerOptions, answers);
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
        {(showAutopopulatePrompt && !input[level]) && (
          <>
            <p>Auto-populate these answers for all other sites?</p>
            <div className="flex flex-wrap gap-3">
              <div className="flex align-items-center">
                <RadioButton
                  inputId="Autopopulate1"
                  name="autopopulate"
                  value="Yes"
                  onChange={(e) => autoPopulateResponse(e)}
                  checked={autopopulate === "Yes"}
                />
                <label htmlFor="Autopopulate1" className="ml-2">
                  Yes
                </label>
              </div>
              <div className="flex align-items-center">
                <RadioButton
                  inputId="Autopopulate2"
                  name="autopopulate"
                  value="No"
                  onChange={(e) => autoPopulateResponse(e)}
                  checked={autopopulate === "No"}
                />
                <label htmlFor="Autopopulate2" className="ml-2">
                  No
                </label>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-12 flex justify-content-center">
        {isLoading && <ProgressSpinner className="w-1" />}
      </div>
    </div>
  );
};

export default Questionnaire;
