
'use client';
import { useGetCalculatorsQuery } from "@/redux/services/calculatorsApi";
import { useRouter, useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import CalculatorContainer from "@/components/secure/calculator";
import { CALCULATOR_MAPPINGS } from "../constants";
import AllOnXCalculator from "@/components/secure/calculator/AllOnX/AllOnX";
const tabItems = [
  {
    type: "Scanbodies",
    label: "scanbody",
    description:
      "Enter your implant information below to determine compatible authentic and generic scanbodies.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand"
      },
      {
        name: "Implant System",
        text: "Implant System"
      },
      {
        name: "External Diameter",
        text: "External Diameter"
      },
      {
        name: "Platform",
        text: "Platform"
      },
      {
        name: "Authentic or Generic?",
        text: "Authentic or Generic"
      }
    ],
    output: [
      {
        name: "Manufacturer",
        text: "Manufacturer"
      },
      {
        name: "Scanbody Item Number",
        text: "Scanbody Item Number"
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
    description: "Enter your patient's information below to determine suggested materials for the restoration.",
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
  const tabId = decodeURIComponent(searchParams.id as string);
  const selectedType = useMemo(() => {
    return tabItems.find((item) => item.type === tabId);
  }, [searchParams.id]);

  const componentMapping: { [key: string]: JSX.Element } = {
    [CALCULATOR_MAPPINGS.ALL_ON_X_CALCULATOR]: <AllOnXCalculator />,
  };

  return (
    componentMapping[tabId] || (

      <div className="nav-offset">
        <div className="wrapper">

      <div className="flex flex-column align-items-center justify-content-center mt-6">
      <Card
        className="w-12 md:w-8 flex px-4 py-2 border-round bg-white flex-column"
        title={selectedType?.description}
      />
      <CalculatorContainer option={searchParams.id as string} input={selectedType?.input || []} output={selectedType?.output || []} />

      </div>

        </div>

    </div>
    )
  );
}
