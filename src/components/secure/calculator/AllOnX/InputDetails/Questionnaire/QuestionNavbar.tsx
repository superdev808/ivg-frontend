import { TabPanel, TabView, TabViewTabChangeEvent } from "primereact/tabview";
import React, { useMemo } from "react";

import { ANSWER_TYPE, InputOutputValues } from "@/types/calculators";

interface QuestionNavbarProps {
  questions: InputOutputValues[];
  answers: ANSWER_TYPE[];
  isSummaryReady?: boolean;
  onShowSummary: () => void;
  onChange: (_: number) => void;
}

const QuestionNavbar: React.FC<QuestionNavbarProps> = ({
  questions,
  answers,
  isSummaryReady,
  onShowSummary,
  onChange,
}) => {
  const [displayQuestions, visibilityQuestions] = useMemo(() => {
    let resultQuestions: string[] = [],
      resultVisibilities: boolean[] = [],
      currentQuestionIndex = 0;
    for (
      let i = 0;
      i < answers.length && currentQuestionIndex < questions.length;
      ++i
    ) {
      let answeredCounts = Object.keys(answers[i]).length;
      resultQuestions.push(questions[currentQuestionIndex].colName);
      resultVisibilities.push(
        Boolean(answers[i][questions[currentQuestionIndex].colIndex])
      );
      currentQuestionIndex += answeredCounts;
    }
    return [resultQuestions, resultVisibilities];
  }, [questions, answers]);

  const handleTabChange = ({ index }: TabViewTabChangeEvent) => {
    if (isSummaryReady && index === displayQuestions.length) {
      onShowSummary();
    } else {
      onChange(index);
    }
  };

  if (displayQuestions.length === 0) {
    return null;
  }

  const allQuestions = isSummaryReady
    ? [...displayQuestions, "Summary"]
    : displayQuestions;

  return (
    <TabView activeIndex={-1} scrollable onTabChange={handleTabChange}>
      {allQuestions.map(
        (question, idx) =>
          visibilityQuestions[idx] == true && (
            <TabPanel
              key={question}
              header={question}
              headerClassName={
                idx === allQuestions.length - 1
                  ? ""
                  : "border-right-1 border-light-green"
              }
            />
          )
      )}
    </TabView>
  );
};

export default QuestionNavbar;
