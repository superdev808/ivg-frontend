"use client";

import { useParams, useSearchParams } from "next/navigation";

import CalculatorContainer from "@/components/secure/calculator";
import AllOnXCalculator from "@/components/secure/calculator/AllOnX";
import { CALCULATOR_MAPPINGS } from "@/constants/calculators";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";

export default function CalculatorPage() {
  // const router = useRouter();
  const params = useParams();
  const search = useSearchParams();
  const { calcInfoMap } = useCalculatorsInfo();
  const tabId = decodeURIComponent(params.id as string);
  const defaultParam = search.get("default");
  const defaultAnswers = defaultParam
    ? defaultParam.split(",").map(decodeURIComponent)
    : [];

  const selectedType = calcInfoMap[tabId];

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
                defaultAnswers={defaultAnswers}
                option={tabId as string}
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
