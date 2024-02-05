"use client";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { Card } from "primereact/card";
import CalculatorContainer from "@/components/secure/calculator";
import { CALCULATOR_MAPPINGS } from "../constants";
import AllOnXCalculator from "@/components/secure/calculator/AllOnX/AllOnX";
import { calculatorIO as tabItems } from "@/helpers/util";

export default function CalculatorPage() {
  // const router = useRouter();
  const searchParams = useParams();
  const tabId = decodeURIComponent(searchParams.id as string);
  const selectedType = useMemo(() => {
    return tabItems.find((item) => item.type === tabId);
  }, [searchParams.id]);

  const componentMapping: { [key: string]: JSX.Element } = {
    [CALCULATOR_MAPPINGS.ALL_ON_X_CALCULATOR]: <AllOnXCalculator />,
    [CALCULATOR_MAPPINGS.ALL_ON_X_CUSTOM_COMBINATION]: (
      <AllOnXCalculator isCustom={true} />
    ),
  };

  return (
    componentMapping[tabId] || (
      <div className="nav-offset flex flex-grow-1">
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
    )
  );
}
