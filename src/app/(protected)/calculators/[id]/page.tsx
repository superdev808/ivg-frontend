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
  const [feedbkackShow, setFeedbackShow] = useState<boolean>(false);

  const selectedType = useMemo(() => {
    return tabItems.find((item) => item.type === tabId);
  }, [tabId]);

  const componentMapping: { [key: string]: JSX.Element } = {
    [CALCULATOR_MAPPINGS.ALL_ON_X_CALCULATOR]: <AllOnXCalculator />,
    [CALCULATOR_MAPPINGS.CUSTOM_COMBINATION]: <AllOnXCalculator isCustom />,
  };

  const onClickFeedback = () => {
    gaEvent({
      action: "Feedback",
      category: "Button",
      label: "Feedback",
    });
    setFeedbackShow(true);
  };

  return (
    <>
      {componentMapping[tabId] || (
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
      )}

      {/* <div
        className="fixed text-2xl m-1 bg-green-300 border-round-3xl m-0 p-3 pl-5"
        style={{
          transform: "rotate(180deg)",
          writingMode: "vertical-rl",
          top: "30%",
          right: "-30px",
          cursor: "pointer",
        }}
        onClick={onClickFeedback}
      >
        Feedback
      </div> */}

      {feedbkackShow && (
        <FeedbackDialog visible={feedbkackShow} setVisible={setFeedbackShow} />
      )}
    </>
  );
}
