import React, { useMemo } from "react";

import { CALCULATOR_NAME_COLLECTION_MAPPINGS } from "@/constants/calculators";
import { ComponentDetail, InputDetail, ItemData } from "@/types/calculators";

import Result from "../../Result";

interface ComponentDetailsProps {
  componentDetails: ComponentDetail;
  responseOrder: string[];
  quiz: InputDetail[];
  onUpdateQuantity: (value: number, itemName: string) => void;
}

const ComponentDetails: React.FC<ComponentDetailsProps> = ({
  componentDetails,
  responseOrder,
  quiz,
  onUpdateQuantity,
}) => {
  const results = useMemo(() => {
    const response: Array<{
      calculatorType: string;
      name: string;
      items: ItemData[];
    }> = [];

    responseOrder.forEach((key) => {
      const calculatorType = CALCULATOR_NAME_COLLECTION_MAPPINGS[key];

      if (!calculatorType || !componentDetails[calculatorType]) {
        return;
      }

      const item = {
        calculatorType,
        name: key,
        items: componentDetails[calculatorType],
      };

      response.push(item);
    });

    return response;
  }, [componentDetails, responseOrder]);

  return (
    <div className="w-full flex flex-column justify-content-center gap-8 mt-4">
      {results.map((result, resultIdx) => (
        <Result
          key={resultIdx}
          name={result.name}
          items={result.items}
          quiz={quiz}
          calculatorType={result.calculatorType}
          hideMenu
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </div>
  );
};

export default ComponentDetails;
