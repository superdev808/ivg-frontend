export function isUrl(str: string) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(str);
}

export function getInitials(name: string) {
  return name.split(" ").map((word) => word.charAt(0).toUpperCase())[0];
}

export const calculatorIO = [
  {
    type: "Scanbodies",
    label: "Scanbodies (Single Unit)",
    description:
      "Enter your implant information below to determine compatible authentic and generic scanbodies.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Scanbody Length",
        text: "Scanbody Length",
      },
    ],
    output: [
      {
        name: "Manufacturer",
        text: "Manufacturer",
      },
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Scanbody Item Number",
        text: "Scanbody Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
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
    description:
      "Enter your patient's information below to determine suggested materials for the restoration.",
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
      },
    ],
    output: [
      {
        name: "TOP SUGGESTED MATERIAL",
        text: "TOP SUGGESTED MATERIAL",
      },
      {
        name: "SECONDARY OPTION",
        text: "SECONDARY OPTION",
      },
      {
        name: "THIRD OPTION",
        text: "THIRD OPTION",
      },
      {
        name: "NOTES",
        text: "NOTES",
      },
      {
        name: "SUPPORTING ARTICLES",
        text: "SUPPORTING ARTICLES",
      },
    ],
  },
  {
    type: "ChairSidePickUp",
    label: "Chairside Pick-Up Materials",
    description:
      "This calculator provides recommended materials to perform chairside pick-ups on the day of surgery.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
    ],
    output: [
      {
        name: "Luting Agent Name",
        text: "Luting Agent Name",
      },
      {
        name: "Luting Agent Link to Purchase",
        text: "Luting Agent Link to Purchase",
      },
      {
        name: "Teflon Tape",
        text: "Teflon Tape",
      },
      {
        name: "Teflon Tape Link to Purchase",
        text: "Teflon Tape Link to Purchase",
      },
      {
        name: "Material to Close Screw Access Hole Name",
        text: "Material to Close Screw Access Hole Name",
      },
      {
        name: "Material to Close Screw Access Hole Link to Purchase",
        text: "Material to Close Screw Access Hole Link to Purchase",
      },
    ],
  },
  {
    type: "DrillKitAndSequence",
    label: "Drill Kits and Drill Sequences",
    description:
      "This calculator displays surgical drill kits, drills, and drill sequences based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
      },
      {
        name: "Drill Kit Type",
        text: "Drill Kit Type",
      },
      {
        name: "Drill Sequence Option",
        text: "Drill Sequence Option",
      },
    ],
    output: [
      {
        name: "Drill Kit Name",
        text: "Drill Kit Name",
      },
      {
        name: "Drill Kit Item Number",
        text: "Drill Kit Item Number",
      },
      {
        name: "Drill Kit Link to Purchase",
        text: "Drill Kit Link to Purchase",
      },
      {
        name: "Drill 1 (Extra Short) Name",
        text: "Drill 1 (Extra Short) Name",
      },
      {
        name: "Drill 1 (Extra Short) Item Number",
        text: "Drill 1 (Extra Short) Item Number",
      },
      {
        name: "Drill 1 (Extra Short) Link to Purchase",
        text: "Drill 1 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 1 (Extra Short) Manufacturer Recommendations",
        text: "Drill 1 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 1 (Short) Name",
        text: "Drill 1 (Short) Name",
      },
      {
        name: "Drill 1 (Short) Item Number",
        text: "Drill 1 (Short) Item Number",
      },
      {
        name: "Drill 1 (Short) Link to Purchase",
        text: "Drill 1 (Short) Link to Purchase",
      },
      {
        name: "Drill 1 (Short) Manufacturer Recommendations",
        text: "Drill 1 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 1 (Standard / Medium) Name",
        text: "Drill 1 (Standard / Medium) Name",
      },
      {
        name: "Drill 1 (Standard / Medium) Item Number",
        text: "Drill 1 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 1 (Standard / Medium) Link to Purchase",
        text: "Drill 1 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 1 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 1 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 1 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 1 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 1 (Long) Name",
        text: "Drill 1 (Long) Name",
      },
      {
        name: "Drill 1 (Long) Item Number",
        text: "Drill 1 (Long) Item Number",
      },
      {
        name: "Drill 1 (Long) Link to Purchase",
        text: "Drill 1 (Long) Link to Purchase",
      },
      {
        name: "Drill 1 (Long) Manufacturer Recommendations",
        text: "Drill 1 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 2 (Extra Short) Name",
        text: "Drill 2 (Extra Short) Name",
      },
      {
        name: "Drill 2 (Extra Short) Item Number",
        text: "Drill 2 (Extra Short) Item Number",
      },
      {
        name: "Drill 2 (Extra Short) Link to Purchase",
        text: "Drill 2 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 2 (Extra Short) Manufacturer Recommendations",
        text: "Drill 2 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 2 (Short) Name",
        text: "Drill 2 (Short) Name",
      },
      {
        name: "Drill 2 (Short) Item Number",
        text: "Drill 2 (Short) Item Number",
      },
      {
        name: "Drill 2 (Short) Link to Purchase",
        text: "Drill 2 (Short) Link to Purchase",
      },
      {
        name: "Drill 2 (Short) Manufacturer Recommendations",
        text: "Drill 2 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 2 (Standard / Medium) Name",
        text: "Drill 2 (Standard / Medium) Name",
      },
      {
        name: "Drill 2 (Standard / Medium) Item Number",
        text: "Drill 2 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 2 (Standard / Medium) Link to Purchase",
        text: "Drill 2 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 2 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 2 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 2 (Long) Name",
        text: "Drill 2 (Long) Name",
      },
      {
        name: "Drill 2 (Long) Item Number",
        text: "Drill 2 (Long) Item Number",
      },
      {
        name: "Drill 2 (Long) Link to Purchase",
        text: "Drill 2 (Long) Link to Purchase",
      },
      {
        name: "Drill 2 (Long) Manufacturer Recommendations",
        text: "Drill 2 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 3 (Extra Short) Name",
        text: "Drill 3 (Extra Short) Name",
      },
      {
        name: "Drill 3 (Extra Short) Item Number",
        text: "Drill 3 (Extra Short) Item Number",
      },
      {
        name: "Drill 3 (Extra Short) Link to Purchase",
        text: "Drill 3 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 3 (Extra Short) Manufacturer Recommendations",
        text: "Drill 3 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 3 (Short) Name",
        text: "Drill 3 (Short) Name",
      },
      {
        name: "Drill 3 (Short) Item Number",
        text: "Drill 3 (Short) Item Number",
      },
      {
        name: "Drill 3 (Short) Link to Purchase",
        text: "Drill 3 (Short) Link to Purchase",
      },
      {
        name: "Drill 3 (Short) Manufacturer Recommendations",
        text: "Drill 3 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 3 (Standard / Medium) Name",
        text: "Drill 3 (Standard / Medium) Name",
      },
      {
        name: "Drill 3 (Standard / Medium) Item Number",
        text: "Drill 3 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 3 (Standard / Medium) Link to Purchase",
        text: "Drill 3 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 3 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 3 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 3 (Long) Name",
        text: "Drill 3 (Long) Name",
      },
      {
        name: "Drill 3 (Long) Name",
        text: "Drill 3 (Long) Name",
      },
      {
        name: "Drill 3 (Long) Item Number",
        text: "Drill 3 (Long) Item Number",
      },
      {
        name: "Drill 3 (Long) Link to Purchase",
        text: "Drill 3 (Long) Link to Purchase",
      },
      {
        name: "Drill 3 (Long) Manufacturer Recommendations",
        text: "Drill 3 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 4 (Extra Short) Name",
        text: "Drill 4 (Extra Short) Name",
      },
      {
        name: "Drill 4 (Extra Short) Item Number",
        text: "Drill 4 (Extra Short) Item Number",
      },
      {
        name: "Drill 4 (Extra Short) Link to Purchase",
        text: "Drill 4 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 4 (Extra Short) Manufacturer Recommendations",
        text: "Drill 4 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 4 (Short) Name",
        text: "Drill 4 (Short) Name",
      },
      {
        name: "Drill 4 (Short) Item Number",
        text: "Drill 4 (Short) Item Number",
      },
      {
        name: "Drill 4 (Short) Link to Purchase",
        text: "Drill 4 (Short) Link to Purchase",
      },
      {
        name: "Drill 4 (Short) Manufacturer Recommendations",
        text: "Drill 4 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 4 (Standard / Medium) Name",
        text: "Drill 4 (Standard / Medium) Name",
      },
      {
        name: "Drill 4 (Standard / Medium) Item Number",
        text: "Drill 4 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 4 (Standard / Medium) Link to Purchase",
        text: "Drill 4 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 4 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 4 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 4 (Long) Name",
        text: "Drill 4 (Long) Name",
      },
      {
        name: "Drill 4 (Long) Item Number",
        text: "Drill 4 (Long) Item Number",
      },
      {
        name: "Drill 4 (Long) Link to Purchase",
        text: "Drill 4 (Long) Link to Purchase",
      },
      {
        name: "Drill 4 (Long) Manufacturer Recommendations",
        text: "Drill 4 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 5 (Extra Short) Name",
        text: "Drill 5 (Extra Short) Name",
      },
      {
        name: "Drill 5 (Extra Short) Item Number",
        text: "Drill 5 (Extra Short) Item Number",
      },
      {
        name: "Drill 5 (Extra Short) Link to Purchase",
        text: "Drill 5 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 5 (Extra Short) Manufacturer Recommendations",
        text: "Drill 5 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 5 (Short) Name",
        text: "Drill 5 (Short) Name",
      },
      {
        name: "Drill 5 (Short) Item Number",
        text: "Drill 5 (Short) Item Number",
      },
      {
        name: "Drill 5 (Short) Link to Purchase",
        text: "Drill 5 (Short) Link to Purchase",
      },
      {
        name: "Drill 5 (Short) Manufacturer Recommendations",
        text: "Drill 5 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 5 (Standard / Medium) Name",
        text: "Drill 5 (Standard / Medium) Name",
      },
      {
        name: "Drill 5 (Standard / Medium) Item Number",
        text: "Drill 5 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 5 (Standard / Medium) Link to Purchase",
        text: "Drill 5 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 5 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 5 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 5 (Long) Name",
        text: "Drill 5 (Long) Name",
      },
      {
        name: "Drill 5 (Long) Item Number",
        text: "Drill 5 (Long) Item Number",
      },
      {
        name: "Drill 5 (Long) Link to Purchase",
        text: "Drill 5 (Long) Link to Purchase",
      },
      {
        name: "Drill 5 (Long) Manufacturer Recommendations",
        text: "Drill 5 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 6 (Extra Short) Name",
        text: "Drill 6 (Extra Short) Name",
      },
      {
        name: "Drill 6 (Extra Short) Item Number",
        text: "Drill 6 (Extra Short) Item Number",
      },
      {
        name: "Drill 6 (Extra Short) Link to Purchase",
        text: "Drill 6 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 6 (Extra Short) Manufacturer Recommendations",
        text: "Drill 6 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 6 (Short) Name",
        text: "Drill 6 (Short) Name",
      },
      {
        name: "Drill 6 (Short) Item Number",
        text: "Drill 6 (Short) Item Number",
      },
      {
        name: "Drill 6 (Short) Link to Purchase",
        text: "Drill 6 (Short) Link to Purchase",
      },
      {
        name: "Drill 6 (Short) Manufacturer Recommendations",
        text: "Drill 6 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 6 (Standard / Medium) Name",
        text: "Drill 6 (Standard / Medium) Name",
      },
      {
        name: "Drill 6 (Standard / Medium) Item Number",
        text: "Drill 6 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 6 (Standard / Medium) Link to Purchase",
        text: "Drill 6 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 6 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 6 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 6 (Long) Name",
        text: "Drill 6 (Long) Name",
      },
      {
        name: "Drill 6 (Long) Item Number",
        text: "Drill 6 (Long) Item Number",
      },
      {
        name: "Drill 6 (Long) Link to Purchase",
        text: "Drill 6 (Long) Link to Purchase",
      },
      {
        name: "Drill 6 (Long) Manufacturer Recommendations",
        text: "Drill 6 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 7 (Extra Short) Name",
        text: "Drill 7 (Extra Short) Name",
      },
      {
        name: "Drill 7 (Extra Short) Item Number",
        text: "Drill 7 (Extra Short) Item Number",
      },
      {
        name: "Drill 7 (Extra Short) Link to Purchase",
        text: "Drill 7 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 7 (Extra Short) Manufacturer Recommendations",
        text: "Drill 7 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 7 (Short) Name",
        text: "Drill 7 (Short) Name",
      },
      {
        name: "Drill 7 (Short) Item Number",
        text: "Drill 7 (Short) Item Number",
      },
      {
        name: "Drill 7 (Short) Link to Purchase",
        text: "Drill 7 (Short) Link to Purchase",
      },
      {
        name: "Drill 7 (Short) Manufacturer Recommendations",
        text: "Drill 7 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 7 (Standard / Medium) Name",
        text: "Drill 7 (Standard / Medium) Name",
      },
      {
        name: "Drill 7 (Standard / Medium) Item Number",
        text: "Drill 7 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 7 (Standard / Medium) Link to Purchase",
        text: "Drill 7 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 7 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 7 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 7 (Long) Name",
        text: "Drill 7 (Long) Name",
      },
      {
        name: "Drill 7 (Long) Item Number",
        text: "Drill 7 (Long) Item Number",
      },
      {
        name: "Drill 7 (Long) Link to Purchase",
        text: "Drill 7 (Long) Link to Purchase",
      },
      {
        name: "Drill 7 (Long) Manufacturer Recommendations",
        text: "Drill 7 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 8 (Extra Short) Name",
        text: "Drill 8 (Extra Short) Name",
      },
      {
        name: "Drill 8 (Extra Short) Item Number",
        text: "Drill 8 (Extra Short) Item Number",
      },
      {
        name: "Drill 8 (Extra Short) Link to Purchase",
        text: "Drill 8 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 8 (Extra Short) Manufacturer Recommendations",
        text: "Drill 8 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 8 (Short) Name",
        text: "Drill 8 (Short) Name",
      },
      {
        name: "Drill 8 (Short) Item Number",
        text: "Drill 8 (Short) Item Number",
      },
      {
        name: "Drill 8 (Short) Link to Purchase",
        text: "Drill 8 (Short) Link to Purchase",
      },
      {
        name: "Drill 8 (Short) Manufacturer Recommendations",
        text: "Drill 8 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 8 (Standard / Medium) Name",
        text: "Drill 8 (Standard / Medium) Name",
      },
      {
        name: "Drill 8 (Standard / Medium) Item Number",
        text: "Drill 8 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 8 (Standard / Medium) Link to Purchase",
        text: "Drill 8 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 8 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 8 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 8 (Long) Name",
        text: "Drill 8 (Long) Name",
      },
      {
        name: "Drill 8 (Long) Item Number",
        text: "Drill 8 (Long) Item Number",
      },
      {
        name: "Drill 8 (Long) Link to Purchase",
        text: "Drill 8 (Long) Link to Purchase",
      },
      {
        name: "Drill 8 (Long) Manufacturer Recommendations",
        text: "Drill 8 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 9 (Extra Short) Name",
        text: "Drill 9 (Extra Short) Name",
      },
      {
        name: "Drill 9 (Extra Short) Item Number",
        text: "Drill 9 (Extra Short) Item Number",
      },
      {
        name: "Drill 9 (Extra Short) Link to Purchase",
        text: "Drill 9 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 9 (Extra Short) Manufacturer Recommendations",
        text: "Drill 9 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 9 (Short) Name",
        text: "Drill 9 (Short) Name",
      },
      {
        name: "Drill 9 (Short) Item Number",
        text: "Drill 9 (Short) Item Number",
      },
      {
        name: "Drill 9 (Short) Link to Purchase",
        text: "Drill 9 (Short) Link to Purchase",
      },
      {
        name: "Drill 9 (Short) Manufacturer Recommendations",
        text: "Drill 9 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 9 (Standard / Medium) Name",
        text: "Drill 9 (Standard / Medium) Name",
      },
      {
        name: "Drill 9 (Standard / Medium) Item Number",
        text: "Drill 9 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 9 (Standard / Medium) Link to Purchase",
        text: "Drill 9 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 9 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 9 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 9 (Long) Name",
        text: "Drill 9 (Long) Name",
      },
      {
        name: "Drill 9 (Long) Item Number",
        text: "Drill 9 (Long) Item Number",
      },
      {
        name: "Drill 9 (Long) Link to Purchase",
        text: "Drill 9 (Long) Link to Purchase",
      },
      {
        name: "Drill 9 (Long) Manufacturer Recommendations",
        text: "Drill 9 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 10 (Extra Short) Name",
        text: "Drill 10 (Extra Short) Name",
      },
      {
        name: "Drill 10 (Extra Short) Item Number",
        text: "Drill 10 (Extra Short) Item Number",
      },
      {
        name: "Drill 10 (Extra Short) Link to Purchase",
        text: "Drill 10 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 10 (Extra Short) Manufacturer Recommendations",
        text: "Drill 10 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 10 (Short) Name",
        text: "Drill 10 (Short) Name",
      },
      {
        name: "Drill 10 (Short) Item Number",
        text: "Drill 10 (Short) Item Number",
      },
      {
        name: "Drill 10 (Short) Link to Purchase",
        text: "Drill 10 (Short) Link to Purchase",
      },
      {
        name: "Drill 10 (Short) Manufacturer Recommendations",
        text: "Drill 10 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 10 (Standard / Medium) Name",
        text: "Drill 10 (Standard / Medium) Name",
      },
      {
        name: "Drill 10 (Standard / Medium) Item Number",
        text: "Drill 10 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 10 (Standard / Medium) Link to Purchase",
        text: "Drill 10 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 10 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 10 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 10 (Long) Name",
        text: "Drill 10 (Long) Name",
      },
      {
        name: "Drill 10 (Long) Item Number",
        text: "Drill 10 (Long) Item Number",
      },
      {
        name: "Drill 10 (Long) Link to Purchase",
        text: "Drill 10 (Long) Link to Purchase",
      },
      {
        name: "Drill 10 (Long) Manufacturer Recommendations",
        text: "Drill 10 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 11 (Extra Short) Name",
        text: "Drill 11 (Extra Short) Name",
      },
      {
        name: "Drill 11 (Extra Short) Item Number",
        text: "Drill 11 (Extra Short) Item Number",
      },
      {
        name: "Drill 11 (Extra Short) Link to Purchase",
        text: "Drill 11 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 11 (Extra Short) Manufacturer Recommendations",
        text: "Drill 11 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 11 (Short) Name",
        text: "Drill 11 (Short) Name",
      },
      {
        name: "Drill 11 (Short) Item Number",
        text: "Drill 11 (Short) Item Number",
      },
      {
        name: "Drill 11 (Short) Link to Purchase",
        text: "Drill 11 (Short) Link to Purchase",
      },
      {
        name: "Drill 11 (Short) Manufacturer Recommendations",
        text: "Drill 11 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 11 (Standard / Medium) Name",
        text: "Drill 11 (Standard / Medium) Name",
      },
      {
        name: "Drill 11 (Standard / Medium) Item Number",
        text: "Drill 11 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 11 (Standard / Medium) Link to Purchase",
        text: "Drill 11 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 11 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 11 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 11 (Long) Name",
        text: "Drill 11 (Long) Name",
      },
      {
        name: "Drill 11 (Long) Item Number",
        text: "Drill 11 (Long) Item Number",
      },
      {
        name: "Drill 11 (Long) Link to Purchase",
        text: "Drill 11 (Long) Link to Purchase",
      },
      {
        name: "Drill 11 (Long) Manufacturer Recommendations",
        text: "Drill 11 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 12 (Extra Short) Name",
        text: "Drill 12 (Extra Short) Name",
      },
      {
        name: "Drill 12 (Extra Short) Item Number",
        text: "Drill 12 (Extra Short) Item Number",
      },
      {
        name: "Drill 12 (Extra Short) Link to Purchase",
        text: "Drill 12 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 12 (Extra Short) Manufacturer Recommendations",
        text: "Drill 12 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 12 (Short) Name",
        text: "Drill 12 (Short) Name",
      },
      {
        name: "Drill 12 (Short) Item Number",
        text: "Drill 12 (Short) Item Number",
      },
      {
        name: "Drill 12 (Short) Link to Purchase",
        text: "Drill 12 (Short) Link to Purchase",
      },
      {
        name: "Drill 12 (Short) Manufacturer Recommendations",
        text: "Drill 12 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 12 (Standard / Medium) Name",
        text: "Drill 12 (Standard / Medium) Name",
      },
      {
        name: "Drill 12 (Standard / Medium) Item Number",
        text: "Drill 12 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 12 (Standard / Medium) Link to Purchase",
        text: "Drill 12 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 12 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 12 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 12 (Long) Name",
        text: "Drill 12 (Long) Name",
      },
      {
        name: "Drill 12 (Long) Item Number",
        text: "Drill 12 (Long) Item Number",
      },
      {
        name: "Drill 12 (Long) Link to Purchase",
        text: "Drill 12 (Long) Link to Purchase",
      },
      {
        name: "Drill 12 (Long) Manufacturer Recommendations",
        text: "Drill 12 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 13 Name (Extra Short)",
        text: "Drill 13 Name (Extra Short)",
      },
      {
        name: "Drill 13 (Extra Short) Item Number",
        text: "Drill 13 (Extra Short) Item Number",
      },
      {
        name: "Drill 13 (Extra Short) Link to Purchase",
        text: "Drill 13 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 13 (Extra Short) Manufacturer Recommendations",
        text: "Drill 13 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 13 (Short) Name",
        text: "Drill 13 (Short) Name",
      },
      {
        name: "Drill 13 (Short) Item Number",
        text: "Drill 13 (Short) Item Number",
      },
      {
        name: "Drill 13 (Short) Link to Purchase",
        text: "Drill 13 (Short) Link to Purchase",
      },
      {
        name: "Drill 13 (Short) Manufacturer Recommendations",
        text: "Drill 13 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 13 (Standard / Medium) Name",
        text: "Drill 13 (Standard / Medium) Name",
      },
      {
        name: "Drill 13 (Standard / Medium) Item Number",
        text: "Drill 13 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 13 (Standard / Medium) Link to Purchase",
        text: "Drill 13 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 13 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 13 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 13 (Long) Name",
        text: "Drill 13 (Long) Name",
      },
      {
        name: "Drill 13 (Long) Item Number",
        text: "Drill 13 (Long) Item Number",
      },
      {
        name: "Drill 13 (Long) Link to Purchase",
        text: "Drill 13 (Long) Link to Purchase",
      },
      {
        name: "Drill 13 (Long) Manufacturer Recommendations",
        text: "Drill 13 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 14 (Extra Short) Name",
        text: "Drill 14 (Extra Short) Name",
      },
      {
        name: "Drill 14 (Extra Short) Item Number",
        text: "Drill 14 (Extra Short) Item Number",
      },
      {
        name: "Drill 14 (Extra Short) Link to Purchase",
        text: "Drill 14 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 14 (Extra Short) Manufacturer Recommendations",
        text: "Drill 14 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 14 (Short) Name",
        text: "Drill 14 (Short) Name",
      },
      {
        name: "Drill 14 (Short) Item Number",
        text: "Drill 14 (Short) Item Number",
      },
      {
        name: "Drill 14 (Short) Link to Purchase",
        text: "Drill 14 (Short) Link to Purchase",
      },
      {
        name: "Drill 14 (Short) Manufacturer Recommendations",
        text: "Drill 14 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 14 (Standard / Medium) Name",
        text: "Drill 14 (Standard / Medium) Name",
      },
      {
        name: "Drill 14 (Standard / Medium) Item Number",
        text: "Drill 14 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 14 (Standard / Medium) Link to Purchase",
        text: "Drill 14 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 14 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 14 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 14 (Long) Name",
        text: "Drill 14 (Long) Name",
      },
      {
        name: "Drill 14 (Long) Item Number",
        text: "Drill 14 (Long) Item Number",
      },
      {
        name: "Drill 14 (Long) Link to Purchase",
        text: "Drill 14 (Long) Link to Purchase",
      },
      {
        name: "Drill 14 (Long) Manufacturer Recommendations",
        text: "Drill 14 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 15 (Extra Short) Name",
        text: "Drill 15 (Extra Short) Name",
      },
      {
        name: "Drill 15 (Extra Short) Item Number",
        text: "Drill 15 (Extra Short) Item Number",
      },
      {
        name: "Drill 15 (Extra Short) Link to Purchase",
        text: "Drill 15 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 15 (Extra Short) Manufacturer Recommendations",
        text: "Drill 15 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 15 (Short) Name",
        text: "Drill 15 (Short) Name",
      },
      {
        name: "Drill 15 (Short) Item Number",
        text: "Drill 15 (Short) Item Number",
      },
      {
        name: "Drill 15 (Short) Link to Purchase",
        text: "Drill 15 (Short) Link to Purchase",
      },
      {
        name: "Drill 15 (Short) Manufacturer Recommendations",
        text: "Drill 15 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 15 (Standard / Medium) Name",
        text: "Drill 15 (Standard / Medium) Name",
      },
      {
        name: "Drill 15 (Standard / Medium) Item Number",
        text: "Drill 15 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 15 (Standard / Medium) Link to Purchase",
        text: "Drill 15 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 15 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 15 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 15 (Long) Name",
        text: "Drill 15 (Long) Name",
      },
      {
        name: "Drill 15 (Long) Item Number",
        text: "Drill 15 (Long) Item Number",
      },
      {
        name: "Drill 15 (Long) Link to Purchase",
        text: "Drill 15 (Long) Link to Purchase",
      },
      {
        name: "Drill 15 (Long) Manufacturer Recommendations",
        text: "Drill 15 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 16 (Extra Short) Name",
        text: "Drill 16 (Extra Short) Name",
      },
      {
        name: "Drill 16 (Extra Short) Item Number",
        text: "Drill 16 (Extra Short) Item Number",
      },
      {
        name: "Drill 16 (Extra Short) Link to Purchase",
        text: "Drill 16 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 16 (Extra Short) Manufacturer Recommendations",
        text: "Drill 16 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 16 (Short) Name",
        text: "Drill 16 (Short) Name",
      },
      {
        name: "Drill 16 (Short) Item Number",
        text: "Drill 16 (Short) Item Number",
      },
      {
        name: "Drill 16 (Short) Link to Purchase",
        text: "Drill 16 (Short) Link to Purchase",
      },
      {
        name: "Drill 16 (Short) Manufacturer Recommendations",
        text: "Drill 16 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 16 (Standard / Medium) Name",
        text: "Drill 16 (Standard / Medium) Name",
      },
      {
        name: "Drill 16 (Standard / Medium) Item Number",
        text: "Drill 16 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 16 (Standard / Medium) Link to Purchase",
        text: "Drill 16 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 16 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 16 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 16 (Long) Name",
        text: "Drill 16 (Long) Name",
      },
      {
        name: "Drill 16 (Long) Item Number",
        text: "Drill 16 (Long) Item Number",
      },
      {
        name: "Drill 16 (Long) Link to Purchase",
        text: "Drill 16 (Long) Link to Purchase",
      },
      {
        name: "Drill 16 (Long) Manufacturer Recommendations",
        text: "Drill 16 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 17 (Extra Short) Name",
        text: "Drill 17 (Extra Short) Name",
      },
      {
        name: "Drill 17 (Extra Short) Item Number",
        text: "Drill 17 (Extra Short) Item Number",
      },
      {
        name: "Drill 17 (Extra Short) Link to Purchase",
        text: "Drill 17 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 17 (Extra Short) Manufacturer Recommendations",
        text: "Drill 17 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 17 (Short) Name",
        text: "Drill 17 (Short) Name",
      },
      {
        name: "Drill 17 (Short) Item Number",
        text: "Drill 17 (Short) Item Number",
      },
      {
        name: "Drill 17 (Short) Link to Purchase",
        text: "Drill 17 (Short) Link to Purchase",
      },
      {
        name: "Drill 17 (Short) Manufacturer Recommendations",
        text: "Drill 17 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 17 (Standard / Medium) Name",
        text: "Drill 17 (Standard / Medium) Name",
      },
      {
        name: "Drill 17 (Standard / Medium) Item Number",
        text: "Drill 17 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 17 (Standard / Medium) Link to Purchase",
        text: "Drill 17 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 17 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 17 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 17 (Long) Name",
        text: "Drill 17 (Long) Name",
      },
      {
        name: "Drill 17 (Long) Item Number",
        text: "Drill 17 (Long) Item Number",
      },
      {
        name: "Drill 17 (Long) Link to Purchase",
        text: "Drill 17 (Long) Link to Purchase",
      },
      {
        name: "Drill 17 (Long) Manufacturer Recommendations",
        text: "Drill 17 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 18 (Extra Short) Name",
        text: "Drill 18 (Extra Short) Name",
      },
      {
        name: "Drill 18 (Extra Short) Item Number",
        text: "Drill 18 (Extra Short) Item Number",
      },
      {
        name: "Drill 18 (Extra Short) Link to Purchase",
        text: "Drill 18 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 18 (Extra Short) Manufacturer Recommendations",
        text: "Drill 18 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 18 (Short) Name",
        text: "Drill 18 (Short) Name",
      },
      {
        name: "Drill 18 (Short) Item Number",
        text: "Drill 18 (Short) Item Number",
      },
      {
        name: "Drill 18 (Short) Link to Purchase",
        text: "Drill 18 (Short) Link to Purchase",
      },
      {
        name: "Drill 18 (Short) Manufacturer Recommendations",
        text: "Drill 18 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 18 (Standard / Medium) Name",
        text: "Drill 18 (Standard / Medium) Name",
      },
      {
        name: "Drill 18 (Standard / Medium) Item Number",
        text: "Drill 18 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 18 (Standard / Medium) Link to Purchase",
        text: "Drill 18 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 18 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 18 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 18 (Long) Name",
        text: "Drill 18 (Long) Name",
      },
      {
        name: "Drill 18 (Long) Item Number",
        text: "Drill 18 (Long) Item Number",
      },
      {
        name: "Drill 18 (Long) Link to Purchase",
        text: "Drill 18 (Long) Link to Purchase",
      },
      {
        name: "Drill 18 (Long) Manufacturer Recommendations",
        text: "Drill 18 (Long) Manufacturer Recommendations",
      },
    ],
  },
  {
    type: "BoneReduction",
    label: "Bone Reduction Instruments",
    description:
      "This calculator provides recommended instruments to perform bone reduction and denture conversions.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
    ],
    output: [
      {
        name: "Bur Kit Name (Bone Reduction)",
        text: "Bur Kit Name (Bone Reduction)",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Bur Kit (Bone Reduction) Link to Purchase",
        text: "Bur Kit (Bone Reduction) Link to Purchase",
      },
      {
        name: "Bur Kit (Denture Conversion) Name",
        text: "Bur Kit (Denture Conversion) Name",
      },
      {
        name: "Bur Kit (Denture Conversion) Link to Purchase",
        text: "Bur Kit (Denture Conversion) Link to Purchase",
      },
    ],
  },
  {
    type: "RestroativeDirectToImplant",
    label: "Drivers (Restorative, Direct to Implant)",
    description:
      "This calculator displays restorative drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
      },
      {
        name: "One Piece or Torque Attachment",
        text: "One Piece or Torque Attachment",
      },
      {
        name: "Driver Size",
        text: "Driver Size",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "RestorativeMultiUnitAbutments",
    label: "Drivers (Restorative, on Multi-Unit Abutments)",
    description:
      "This calculator displays restorative drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
      },
      {
        name: "Design",
        text: "Design",
      },
      {
        name: "MUA Type",
        text: "MUA Type",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
      },
      {
        name: "Diameter",
        text: "Diameter",
      },
      {
        name: "One Piece or Torque Attachment",
        text: "One Piece or Torque Attachment",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "HealingAbutments",
    label: "Healing Abutments",
    description:
      "This calculator displays healing abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
      {
        name: "Emergence Profile",
        text: "Emergence Profile",
      },
      {
        name: "Abutment Material",
        text: "Abutment Material",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "ImplantAnalogs",
    label: "Implant Analogs",
    description:
      "This calculator displays implant analogs for stone (lab) and digital (IOS) models based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Digital or Lab Analog",
        text: "Digital or Lab Analog",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "ImplantScrews",
    label: "Implant Screws",
    description:
      "This calculator displays screws based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Design",
        text: "Design",
      },
      {
        name: "Restoration Connection Type",
        text: "Restoration Connection Type",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
      },
      {
        name: "Anterior or Posterior",
        text: "Anterior or Posterior",
      },
      {
        name: "Screw Length",
        text: "Screw Length",
      },
      {
        name: "Screw Material",
        text: "Screw Material",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
      {
        name: "Type of Head",
        text: "Type of Head",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "Implants",
    label: "Implants",
    description:
      "This calculator displays implants based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
      },
      {
        name: "Implant Form",
        text: "Implant Form",
      },
      {
        name: "Mount Option",
        text: "Mount Option",
      },
      {
        name: "Implant Surface Treatment",
        text: "Implant Surface Treatment",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "ImpressingCopingsDirectToImplants",
    label: "Impression Copings (Direct to Implant)",
    description:
      "This calculator displays impression copings for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Impression Coping Diameter",
        text: "Impression Coping Diameter",
      },
      {
        name: "Impression Coping Design",
        text: "Impression Coping Design",
      },
      {
        name: "Impression Coping Length",
        text: "Impression Coping Length",
      },
      {
        name: "Cementable Area",
        text: "Cementable Area",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
      },
      {
        name: "Emergence Profile",
        text: "Emergence Profile",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "ImpressingCopingsMUAs",
    label: "Impression Copings (Multi-Unit Abutments)",
    description:
      "This calculator displays impression copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
      },
      {
        name: "Impression Coping Length",
        text: "Impression Coping Length",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Fixation",
        text: "Fixation",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
      },
      {
        name: "Cementable Area",
        text: "Cementable Area",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "MUAs",
    label: "Multi-Unit Abutments",
    description:
      "This calculator displays multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
      },
      {
        name: "Connection Type",
        text: "Connection Type",
      },
      {
        name: "Abutment Engaging Type",
        text: "Abutment Engaging Type",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Implant or Abutment Level",
        text: "Implant or Abutment Level",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "ScanbodyMUAs",
    label: "Scanbodies (Multi-Unit Abutments)",
    description:
      "This calculator displays scanbodies for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
    ],
    output: [
      {
        name: "Manufacturer Name",
        text: "Manufacturer Name",
      },
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "ScanbodyDriversDirectToImplants",
    label: "Scanbody Drivers (Direct to Implant)",
    description:
      "This calculator displays scanbody drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Implant Form",
        text: "Implant Form",
      },
      {
        name: "Design",
        text: "Design",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "ScanbodyDriversMUAs",
    label: "Scanbody Drivers (MUAs)",
    description:
      "This calculator displays scanbody drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Implant Form",
        text: "Implant Form",
      },
      {
        name: "Design",
        text: "Design",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "StockAbutments",
    label: "Stock Abutments",
    description:
      "This calculator displays stock abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Material",
        text: "Material",
      },
      {
        name: "Impression Type",
        text: "Impression Type",
      },
      {
        name: "Fixation",
        text: "Fixation",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Emergence Profile",
        text: "Emergence Profile",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "TemporaryCopingsDirectToImplants",
    label: "Temporary Copings (Direct to Implant)",
    description:
      "This calculator displays stock abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Connection Type",
        text: "Connection Type",
      },
      {
        name: "Cementable Area",
        text: "Cementable Area",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
      },
      {
        name: "Restoration Material",
        text: "Restoration Material",
      },
      {
        name: "Temporary Coping Height",
        text: "Temporary Coping Height",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "TemporaryCopingsMUAs",
    label: "Temporary Copings (Multi-Unit Abutments)",
    description:
      "This calculator displays temporary copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
      },
      {
        name: "Material",
        text: "Material",
      },
      {
        name: "Length",
        text: "Length",
      },
      {
        name: "Diameter",
        text: "Diameter",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "TiBasesDirectToImplants",
    label: "Ti Bases (Direct to Implant)",
    description:
      "This calculator displays Ti Bases for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Connection Type",
        text: "Connection Type",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Cementable Area",
        text: "Cementable Area",
      },
      {
        name: "Material",
        text: "Material",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "TiBasesMUAs",
    label: "Ti Bases (Multi-Unit Abutments)",
    description:
      "This calculator displays Ti Bases for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
      },
      {
        name: "MUA Type",
        text: "MUA Type",
      },
      {
        name: "Connection",
        text: "Connection",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Material",
        text: "Material",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
    ],
  },
  {
    type: "ImplantTorques",
    label: "Implant Torque Guide",
    description: "",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Product, Component, or Procedure",
        text: "Product, Component, or Procedure",
      },
    ],
    output: [
      {
        name: "Torque Value",
        text: "Torque Value",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
];

export const calculatorImages: any = {
  "ab dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/AB+Dental.png",
  "ace southern":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/acesouthern_logo.png",
  adin: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/adin.png",
  alfagate:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Alfa_Gate_Logo-01.png",
  "alpha bio tec":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/alpha+bio+tec.png",
  "american dental implant":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/american+dental+implant+logo.png",
  argon:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/argon+logo.png",
  "avia biomed":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/avialogo3-1-300x83.png",
  "b&w implant system":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/b%26w+implant+logo.jpeg",
  bhi: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/BHI+logo.webp",
  bicon:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/bicon.png",
  biohorizons:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/biohorizons.png",
  biomedical: "",
  "biotech dental usa": "",
  "blue sky bio":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/blue+sky+bio.png",
  camlog:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/camlog.png",
  cortex:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/cortex.png",
  "cowellmedi co. ltd":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/cowellmedi.jpeg",
  dsi: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dsi.jpeg",
  "dsp biomedical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dsp.png",
  "dental-pro":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dentalpro.png",
  dentis:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dentis-0f23fa.png",
  dentium:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dentium.png",
  "dentsply sirona":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dentsply.svg",
  "dio implant":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dio.png",
  "ditron dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ditron.png",
  euroteknika:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/euroteknika.png",
  "gdt dental implants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/gdt.png",
  gmi: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/gmi.png",
  glidewell:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/glidewell.png",
  "hi-tec":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/hitec.png",
  "hiossen (osstem)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/hiossen.png",
  "i do biotech":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/i+do+biotech.png",
  "ibs implant (innobiosurg)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ibs.png",
  "implant club":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/implant+club.png",
  "implant direct":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ImplantDirect-Logo.png",
  "implant logistics":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/implant+logistics.png",
  "implant part": "",
  "implant vision": "",
  jdentalcare:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/jdental.jpeg",
  "keystone dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/keystone_dental_inc_logo.png",
  "little implant company":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/little+implant+co.png",
  mis: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/mis-implants-logo.png",
  megagen:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/megagen.png",
  neobiotech:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/neo+biotech.png",
  neodent:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/neodent.png",
  neoss:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/neoss.png",
  "nobel biocare":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/nobel+biocare.png",
  "noris medical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/noris.png",
  nova: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/nova.png",
  "oco biomedical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/oco.png",
  osseodent:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Osseodent-Logo-300-dpi.png",
  osstem:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/osstem.png",
  "osteoready llc":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/osteoready.png",
  "paragon implant company":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/paragon-implant-logo-34.webp",
  "park dental implants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/park+dental.png",
  ritter:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ritter.png",
  "s.i.n.":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/SIN.png",
  "sgs dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sgs.png",
  "sis (shinhung implant system)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sis.png",
  "sewon medix":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sewon+medix.jpeg",
  "sigma impants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sigma.png",
  "southern implants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Southern_Implants_North_America_Logo.png",
  "steri-oss":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/steri-oss.png",
  sterngold:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sterngold.png",
  straumann:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Straumann.png",
  surgikor:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/surgikor.png",
  "sweden & martina":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sweden%26martina.png",
  "swiss medical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/swiss+medical.png",
  sydent:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sydent.jpeg",
  "tag dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/tag+dental.png",
  "tatum surgical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/tatum.jpeg",
  "thommen medical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/thommen.png",
  "trinon titanium":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/trinon.jpg",
  uris: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/uris.png",
  zimvie:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimvie (biomet 3i)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimvie (biomet)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimvie (calcitek)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimvie (zimmer)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimmer dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimmer dental (biomet 3i)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  msdi: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/msdi.png",
};

export const formatDate = (date?: Date | null | string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date ? new Date(date) : new Date());

export const formatTime = (date?: Date | null | string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date ? new Date(date) : new Date());

export const productImages: Record<string, string> = {
  BoneReduction:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Meisinger+Drill+Kit+ALV18.png",
  ChairSidePickUp:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Chairside+Pickup+Lufting.png",
  Implants:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Straumann+BL++Implant+RC+D+4.1mm+EL+8mm+0214508.png",
  MUAs: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/MultiUnitAbutment_custom_truabutment_final.png",
  HealingAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Healing+Abutment+D+4.5mm+H+3mm+2213.png",
  ImplantAnalogs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+IOS+Model+Implant+Replica+Conical+RP+38190.png",
  ImplantTorques:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Neodent+CM+Implant+Driver+Torque+Wrench+Long+105074.png",
  ImpressingCopingsMUAs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Impression+Coping+Open+Tray+Multi-Unit+29089.png",
  ImpressingCopingsDirectToImplants:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Temporary+Coping+Multi-Unit+29046.png",
  TemporaryCopingsMUAs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Temporary+Coping+Multi-Unit+29046.png",
  TiBasesMUAs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+30d+MUA+Plus+Conical+RP+H+3.5mm+38895.png",
  CoverScrew:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Straumann+RN+Closure+Cap+D+3.5mm+H+0mm+048371S.png",
  ImplantScrews:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Straumann+NC+Variobase+Abutment+Screw+0252921.png",
  TiBasesDirectToImplants:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Zimmer+TSV+BellaTek+Express+Abutment+D4.5mm+H+4.75mm+Hexed+TE451.png",
  RestroativeDirectToImplant:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Neodent+CM+Implant+Driver+Torque+Wrench+Long+105074.png",
  RestorativeMultiUnitAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Neodent+CM+Implant+Driver+Torque+Wrench+Long+105074.png",
  Scanbodies:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Scanbody+DTI+Generic.png",
  ScanbodyDriversMUAs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Elos+Accurate+Screwdriver+Manual+Mini+0.9+Hex.png",
  ScanbodyDriversDirectToImplants:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Elos+Accurate+Screwdriver+Manual+Mini+0.9+Hex.png",
  DrillKitAndSequence:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Drill+Kit+Generic.png",
  StockAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Stock+Abutment+Generic.png",
  Default:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/No+Image+BW.jpg",
};

export const getCalculatorName = (calculatorType: string) => {
  const selectedCalculator = calculatorIO.find(
    (item) => item.type === calculatorType
  );
  return selectedCalculator?.label || calculatorType;
};

export const socialButtons = [
  {
    icon: "pi pi-facebook",
    ariaLabel: "Facebook Link",
    link: "https://www.facebook.com/profile.php?id=61551773567714",
  },
  {
    icon: "pi pi-instagram",
    ariaLabel: "Instagram Link",
    link: "https://www.instagram.com/ivory.guide?fbclid=IwAR2T81D8g_ICPZCn2uKavFn23VVZBDMZ-xpP-19LpKFHYA5-YqbeFPIL5TQ",
  },
  {
    icon: "pi pi-linkedin",
    ariaLabel: "LinkedIn Link",
    link: "https://www.linkedin.com/company/ivory-guide/?viewAsMember=true",
  },
];

export const invalidPurchaseCalcs = ["Implant Torque Guide"];
