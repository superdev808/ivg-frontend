import { TabPanel, TabView, TabViewTabChangeEvent } from "primereact/tabview";
import React, { useMemo } from "react";

import { InputOutputValues } from "../../constants";

interface QuestionNavbarProps {
  questions: InputOutputValues[];
  answers: string[];
  onChange: (_: number) => void;
}

const QuestionNavbar: React.FC<QuestionNavbarProps> = ({
  questions,
  answers,
  onChange,
}) => {
  const haveAnswer = useMemo(() => {
    return answers.filter(Boolean).length > 0;
  }, [answers]);

  if (!haveAnswer) {
    return null;
  }

  const handleTagChange = ({ index }: TabViewTabChangeEvent) => {
    onChange(index);
  };

  return (
    <TabView
      activeIndex={-1}
      renderActiveOnly={false}
      onTabChange={handleTagChange}
    >
      {answers.map((answer, answerIdx) => {
        const question = questions[answerIdx];

        if (!answer || !question || (!question.text && !question.name)) {
          return null;
        }

        return (
          <TabPanel key={answerIdx} header={question.text || question.name} />
        );
      })}
    </TabView>
  );

  return <div>Hi</div>;
};

export default QuestionNavbar;
