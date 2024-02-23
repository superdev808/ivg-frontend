import React from "react";

import {
  MultiSavedResult as MultiSavedResultType,
  SingleSavedResult as SingleSavedResultType,
} from "@/types/calculators";

import SingleSavedResult from "./SingleSavedResult";
import MultiSavedResult from "./MultiSavedResult";

interface SavedResultsListProps {
  savedResult: SingleSavedResultType | MultiSavedResultType;
  isDeleting: boolean;
  onDelete: () => void;
}

const SavedResultDetail: React.FC<SavedResultsListProps> = ({
  savedResult,
  isDeleting,
  onDelete,
}) => {
  if (savedResult.type === "single") {
    return (
      <SingleSavedResult
        savedResult={savedResult}
        isDeleting={isDeleting}
        onDelete={onDelete}
      />
    );
  }

  return (
    <MultiSavedResult
      savedResult={savedResult}
      isDeleting={isDeleting}
      onDelete={onDelete}
    />
  );
};

export default SavedResultDetail;
