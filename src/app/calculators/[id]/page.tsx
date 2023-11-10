"use client";

import { useGetCalculatorsQuery } from "@/redux/services/calculatorsApi";
import { useRouter, useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import CalculatorContainer from "@/components/calculator";

const tabItems = [
  {
    type: "Scanbodies",
    label: "scanbody",
    placeholder: "Select Manufacturer",
    description:
      "This calculator will provide the correct scanbody for you to use based on the implant (manufacturer, system, size) that was placed.",
    value: 0,
  },
  {
    type: "Implant Drivers",
    label: "implant driver",
    placeholder: "Select Manufacturer",
    description:
      "This calculator will provide the correct implant driver for you to use based on the implant (manufacturer, system, size) that was placed.",
    value: 1,
  },
  {
    type: "Implant Screws",
    label: "implant screw",
    placeholder: "Select Implant Manufacturer",
    description:
      "This calculator will provide you with the correct implant screw to use based on the implant (manufacturer, system, size) that was placed.",
    value: 2,
  },
];

export default function CalculatorPage() {
  const {
    isLoading,
    data: calculatorOptions,
    error: calcError,
  } = useGetCalculatorsQuery(null);

  // const router = useRouter();
  const searchParams = useParams();
  const selectedType = useMemo(() => {
    const tabId = decodeURIComponent(searchParams.id as string);
    return tabItems.find((item) => item.type === tabId);
  }, [searchParams.id]);

  const selectedOptions = useMemo(() => {
    if (!calculatorOptions) {
      return [];
    }
    return calculatorOptions
      .filter((option) => option.category === selectedType?.value)
      .sort((a, b) => a.value.localeCompare(b.value));
  }, [calculatorOptions, selectedType]);

  const [scanBodyOption, setScanBodyOption] = useState<string | null>(null);

  return (
    <div className="flex flex-column align-items-center justify-content-center mt-6">
      {isLoading ? (
        <ProgressSpinner />
      ) : (
        <>
          <Card
            className="w-12 md:w-5 flex px-4 py-2 border-round bg-white flex-column"
            title={`What type of ${selectedType?.label} do you want?`}
            subTitle={selectedType?.description}
          >
            <Dropdown
              value={scanBodyOption}
              onChange={(e) => setScanBodyOption(e.value)}
              options={selectedOptions}
              optionLabel="value"
              optionValue="value"
              placeholder={selectedType?.placeholder}
              className="w-full"
            />
          </Card>
          {scanBodyOption && <CalculatorContainer option={scanBodyOption.replaceAll(" ", "_")} />}
        </>
      )}
    </div>
  );
}
