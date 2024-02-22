import { TabPanel, TabView, TabViewTabChangeEvent } from "primereact/tabview";
import React, { useMemo } from "react";

import { InputOutputValues } from "../../constants";

interface QuestionNavbarProps {
  questions: InputOutputValues[];
  answers: string[];
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
  const filteredQuestions = useMemo(() => {
    return questions
      .map((question, questionIdx) => {
        const answer = answers[questionIdx];
        const questionName = question.text || question.name;

        if (answer) {
          return questionName;
        }

        return null;
      })
      .filter(Boolean);
  }, [questions, answers]);

  const handleTabChange = ({ index }: TabViewTabChangeEvent) => {
    if (isSummaryReady && index === filteredQuestions.length) {
      onShowSummary();
    } else {
      onChange(index);
    }
  };

  if (filteredQuestions.length === 0) {
    return null;
  }

  return (
    <TabView activeIndex={-1} scrollable onTabChange={handleTabChange}>
      {filteredQuestions.map((question) => (
        <TabPanel key={question} header={question} />
      ))}
      {isSummaryReady && <TabPanel header="Summary" />}
    </TabView>
  );
};

export default QuestionNavbar;
