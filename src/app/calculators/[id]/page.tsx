
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
  {
    type: "Crown Materials",
    label: "crownMaterials",
    description: "Enter your implant information below to determine compatible crown materials",
    input: [
      {
        name: "Fixed / Removable",
        text: "Fixed / Removable",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
      },
      {
        name: "Maxilla / Mandible",
        text: "Maxilla / Mandible",
      },
      {
        name: "Tooth Category",
        text: "Tooth Category",
      },
      {
        name: "Are aesthetics a top priority?",
        text: "Are aesthetics a top priority?",
      },
      {
        name: "Does the preparation have retention and resistance form?",
        text: "Does the preparation have retention and resistance form?",
      },
      {
        name: "Are neighboring teeth translucent?",
        text: "Are neighboring teeth translucent?",
      },
      {
        name: "Does the patient have a high occlusal load?",
        text: "Does the patient have a high occlusal load?",
      },
      {
        name: "Does this site have limited occlusal clearance?",
        text: "Does this site have limited occlusal clearance?",
      },
      {
        name: "Is the stump shade light or dark?",
        text: "Is the stump shade light or dark?",
      }
    ],
    output: [
      {
        name: "Is the stump shade light or dark?",
        text: "Is the stump shade light or dark?"
      },
      {
        name: "TOP SUGGESTED MATERIAL",
        text: "TOP SUGGESTED MATERIAL"
      },
      {
        name: "SECONDARY OPTION",
        text: "SECONDARY OPTION"
      },
      {
        name: "THIRD OPTION",
        text: "THIRD OPTION"
      },
      {
        name: "NOTES",
        text: "NOTES"
      },
      {
        name: "SUPPORTING ARTICLES",
        text: "SUPPORTING ARTICLES"
      }
    ]
  }
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
        title={selectedType?.description}
      />
      <CalculatorContainer option={searchParams.id as string} input={selectedType?.input || []} output={selectedType?.output || []} />
    </div>
  );
}
