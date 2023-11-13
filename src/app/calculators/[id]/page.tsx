
'use client';
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
    description:
      "Enter your implant information below to determine compatible authentic and generic scanbodies.",
    input: [
      {
        name: "IMPLANT BRAND",
        text: "Implant Brand"
      },
      {
        name: "IMPLANT SYSTEM",
        text: "Implant System"
      },
      {
        name: "EXTERNAL DIAMETER",
        text: "External Diameter"
      },
      {
        name: "PLATFORM",
        text: "Platform"
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic"
      }
    ],
    output: [
      {
        name: "SCANBODY",
        text: "Brand"
      },
      {
        name: "SCANBODY ITEM #",
        text: "Item #"
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase"
      }
    ]
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

  // const router = useRouter();
  const searchParams = useParams();
  const selectedType = useMemo(() => {
    const tabId = decodeURIComponent(searchParams.id as string);
    return tabItems.find((item) => item.type === tabId);
  }, [searchParams.id]);

  return (
    <div className="flex flex-column align-items-center justify-content-center mt-6">
      <Card
        className="w-12 md:w-5 flex px-4 py-2 border-round bg-white flex-column"
        title={`What type of ${selectedType?.label} should you use?`}
        subTitle={selectedType?.description}
      />
      <CalculatorContainer option={searchParams.id as string} input={selectedType?.input || []} output={selectedType?.output || []} />
    </div>
  );
}
