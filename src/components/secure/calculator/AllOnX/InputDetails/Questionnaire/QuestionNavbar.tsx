import { TabPanel, TabView, TabViewTabChangeEvent } from "primereact/tabview";
import React, { useMemo } from "react";

import { InputOutputValues } from "../../constants";

interface QuestionNavbarProps {
  questions: InputOutputValues[];
  answers: string[];
  showSummary?: boolean;
  onChange: (_: number) => void;
}

const QuestionNavbar: React.FC<QuestionNavbarProps> = ({
  questions,
  answers,
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
    onChange(index);
  };

  if (filteredQuestions.length === 0) {
    return null;
  }

  return (
    <TabView activeIndex={-1} scrollable onTabChange={handleTabChange}>
      {filteredQuestions.map((question) => (
        <TabPanel key={question} header={question} />
      ))}
    </TabView>
  );
};

export default QuestionNavbar;
