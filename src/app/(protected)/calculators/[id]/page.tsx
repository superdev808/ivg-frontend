"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import CalculatorContainer from "@/components/secure/calculator";
import AllOnXCalculator from "@/components/secure/calculator/AllOnX";
import FeedbackDialog from "@/components/secure/calculator/Feedback/FeedbackDialog";
import { CALCULATOR_MAPPINGS } from "@/constants/calculators";
import { event as gaEvent } from "@/lib/gtag";
import { calculatorIO as tabItems } from "@/helpers/util";

export default function CalculatorPage() {
  // const router = useRouter();
  const searchParams = useParams();
  const tabId = decodeURIComponent(searchParams.id as string);

  const selectedType = useMemo(() => {
    return tabItems.find((item) => item.type === tabId);
  }, [tabId]);

  const componentMapping: { [key: string]: JSX.Element } = {
    [CALCULATOR_MAPPINGS.ALL_ON_X_CALCULATOR]: <AllOnXCalculator />,
    [CALCULATOR_MAPPINGS.CUSTOM_COMBINATION]: <AllOnXCalculator isCustom />,
  };

  return (
    <>
      {componentMapping[tabId] || (
        <div className="flex flex-grow-1">
          <div className="w-full">
            <div className="flex flex-column align-items-center justify-content-center">
              <CalculatorContainer
                option={searchParams.id as string}
                input={selectedType?.input || []}
                output={selectedType?.output || []}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
