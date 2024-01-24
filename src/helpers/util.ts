export function isUrl(str: string) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(str);
}

export const calculatorIO = [
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
    },
    {
        type: "ChairSidePickUp",
        label: "Chairside Pick-Up Materials",
        description: "This calculator provides recommended materials to perform chairside pick-ups on the day of surgery.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Do you need to purchase materials for chairside pick-up?",
                text: "Do you need to purchase materials for chairside pick-up?"
            }
        ],
        output: [
            {
                name: "Luting Agent Name",
                text: "Luting Agent Name"
            },
            {
                name: "Luting Agent Link to Purchase",
                text: "Luting Agent Link to Purchase"
            },
            {
                name: "Teflon Tape",
                text: "Teflon Tape"
            },
            {
                name: "Teflon Tape Link to Purchase",
                text: "Teflon Tape Link to Purchase"
            },
            {
                name: "Material to close screw access hole Name",
                text: "Material to close screw access hole Name"
            },
            {
                name: "Material to close screw access hole link to purchase",
                text: "Material to close screw access hole link to purchase"
            }
        ]
    },
    {
        type: "DrillKitAndSequence",
        label: "Drill Kits and Drill Sequences",
        description: "This calculator displays surgical drill kits, drills, and drill sequences based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Implant Length",
                text: "Implant Length"
            },
            {
                name: "Drill Kit Type",
                text: "Drill Kit Type"
            }
        ],
        output: [
            {
                name: "Drill Kit Name",
                text: "Drill Kit Name"
            },
            {
                name: "Drill Kit Item Number",
                text: "Drill Kit Item Number"
            },
            {
                name: "Drill Kit Link to Purchase",
                text: "Drill Kit Link to Purchase"
            },
            {
                name: "Drill 1 Name",
                text: "Drill 1 Name"
            },
            {
                name: "Drill 1 Item Number",
                text: "Drill 1 Item Number"
            },
            {
                name: "Drill 1 Link to Purchase",
                text: "Drill 1 Link to Purchase"
            },
            {
                name: "Manufacturer Recommendations",
                text: "Manufacturer Recommendations"
            },
            {
                name: "Drill 2 Name",
                text: "Drill 2 Name"
            },
            {
                name: "Drill 2 Item Number",
                text: "Drill 2 Item Number"
            },
            {
                name: "Drill 2 Link to Purchase",
                text: "Drill 2 Link to Purchase"
            },
            {
                name: "Drill 3 Name",
                text: "Drill 3 Name"
            },
            {
                name: "Drill 3 Item Number",
                text: "Drill 3 Item Number"
            },
            {
                name: "Drill 3 Link to Purchase",
                text: "Drill 3 Link to Purchase"
            },
            {
                name: "Drill 4 Name",
                text: "Drill 4 Name"
            },
            {
                name: "Drill 4 Item Number",
                text: "Drill 4 Item Number"
            },
            {
                name: "Drill 4 Link to Purchase",
                text: "Drill 4 Link to Purchase"
            },
            {
                name: "Drill 5 Name",
                text: "Drill 5 Name"
            },
            {
                name: "Drill 5 Item Number",
                text: "Drill 5 Item Number"
            },
            {
                name: "Drill 5 Link to Purchase",
                text: "Drill 5 Link to Purchase"
            },
            {
                name: "Drill 6 Name",
                text: "Drill 6 Name"
            },
            {
                name: "Drill 6 Item Number",
                text: "Drill 6 Item Number"
            },
            {
                name: "Drill 6 Link to Purchase",
                text: "Drill 6 Link to Purchase"
            },
            {
                name: "Drill 7 Name",
                text: "Drill 7 Name"
            },
            {
                name: "Drill 7 Item Number",
                text: "Drill 7 Item Number"
            },
            {
                name: "Drill 7 Link to Purchase",
                text: "Drill 7 Link to Purchase"
            },
            {
                name: "Drill 8 Name",
                text: "Drill 8 Name"
            },
            {
                name: "Drill 8 Item Number",
                text: "Drill 8 Item Number"
            },
            {
                name: "Drill 8 Link to Purchase",
                text: "Drill 8 Link to Purchase"
            },
            {
                name: "Drill 9 Name",
                text: "Drill 9 Name"
            },
            {
                name: "Drill 9 Item Number",
                text: "Drill 9 Item Number"
            },
            {
                name: "Drill 9 Link to Purchase",
                text: "Drill 9 Link to Purchase"
            }
        ]
    },
    {
        type: "BoneReduction",
        label: "Bone Reduction Instruments",
        description: "This calculator provides recommended instruments to perform bone reduction and denture conversions.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Will you perform bone reduction?",
                text: "Will you perform bone reduction?"
            }
        ],
        output: [
            {
                name: "Bur Kit Name (Bone Reduction)",
                text: "Bur Kit Name (Bone Reduction)"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            },
            {
                name: "Bur Kit (Denture Conversion) Name",
                text: "Bur Kit (Denture Conversion) Name"
            },
            {
                name: "Bur Link to Purchase",
                text: "Bur Link to Purchase"
            }
        ]
    },
    {
        type: "RestroativeDirectToImplant",
        label: "Drivers (Restorative, Direct to Implant)",
        description: "This calculator displays restorative drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Implant Length",
                text: "Implant Length"
            },
            {
                name: "Authentic or Generic",
                text: "Authentic or Generic"
            },
            {
                name: "Driver Length",
                text: "Driver Length"
            },
            {
                name: "One Piece or Torque Attachment",
                text: "One Piece or Torque Attachment"
            },
            {
                name: "Driver Size",
                text: "Driver Size"
            },
            {
                name: "Abutment Angulation",
                text: "Abutment Angulation"
            },
            {
                name: "Machine or Manual",
                text: "Machine or Manual"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "RestorativeMultiUnitAbutments",
        label: "Drivers (Restorative, on Multi-Unit Abutments)",
        description: "This calculator displays restorative drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Machine or Manual",
                text: "Machine or Manual"
            },
            {
                name: "Driver Length",
                text: "Driver Length"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "HealingAbutments",
        label: "Healing Abutments",
        description: "This calculator displays healing abutments based on desired implant brand and size, as well as links to purchase this equipment.",
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
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Authentic or Generic",
                text: "Authentic or Generic"
            },
            {
                name: "Abutment Height",
                text: "Abutment Height"
            },
            {
                name: "Collar Height",
                text: "Collar Height"
            },
            {
                name: "Emergence Profile",
                text: "Emergence Profile"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "ImplantAnalogs",
        label: "Implant Analogs",
        description: "This calculator displays implant analogs for stone (lab) and digital (IOS) models based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Authentic or Generic",
                text: "Authentic or Generic"
            },
            {
                name: "Digital or Lab Analog",
                text: "Digital or Lab Analog"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "ImplantScrews",
        label: "Implant Screws",
        description: "This calculator displays screws based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Authentic or Generic",
                text: "Authentic or Generic"
            },
            {
                name: "Abutment Type",
                text: "Abutment Type"
            },
            {
                name: "Restoration Type",
                text: "Restoration Type"
            },
            {
                name: "Screw Length",
                text: "Screw Length"
            },
            {
                name: "Screw Material",
                text: "Screw Material"
            },
            {
                name: "Abutment Angulation",
                text: "Abutment Angulation"
            },
            {
                name: "Open or Closed Tray",
                text: "Open or Closed Tray"
            },
            {
                name: "Type of Head",
                text: "Type of Head"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "Implants",
        label: "Implants",
        description: "This calculator displays implants based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Implant Length",
                text: "Implant Length"
            },
            {
                name: "Implant Surface Treatment",
                text: "Implant Surface Treatment"
            },
            {
                name: "Do you need to purchase an implant?",
                text: "Do you need to purchase an implant?"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "ImpressingCopingsDirectToImplants",
        label: "Impression Copings (Direct to Implant)",
        description: "This calculator displays impression copings for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Open or Closed Tray",
                text: "Open or Closed Tray"
            },
            {
                name: "Angulation",
                text: "Angulation"
            },
            {
                name: "Engaging or Non-Engaging",
                text: "Engaging or Non-Engaging"
            },
            {
                name: "Impression Coping Length",
                text: "Impression Coping Length"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "ImpressingCopingsMUAs",
        label: "Impression Copings (Multi-Unit Abutments)",
        description: "This calculator displays impression copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Open or Closed Tray",
                text: "Open or Closed Tray"
            },
            {
                name: "Impression Coping Length",
                text: "Impression Coping Length"
            },
            {
                name: "Hexed or Non-Hexed",
                text: "Hexed or Non-Hexed"
            },
            {
                name: "Engaging or Non-Engaging",
                text: "Engaging or Non-Engaging"
            },
            {
                name: "Abutment Type",
                text: "Abutment Type"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "MUAs",
        label: "Multi-Unit Abutments",
        description: "This calculator displays multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Abutment Angulation",
                text: "Abutment Angulation"
            },
            {
                name: "Abutment Engaging Type",
                text: "Abutment Engaging Type"
            },
            {
                name: "Abutment Diameter",
                text: "Abutment Diameter"
            },
            {
                name: "Abutment Height",
                text: "Abutment Height"
            },
            {
                name: "Collar Height",
                text: "Collar Height"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "ScanbodyMUAs",
        label: "Scanbodies (Mult-Unit Abutments)",
        description: "This calculator displays scanbodies for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Authentic or Generic",
                text: "Authentic or Generic"
            },
            {
                name: "Manufacturer Name",
                text: "Manufacturer Name"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "ScanbodyDriversDirectToImplants",
        label: "Scanbody Drivers (Direct to Implant)",
        description: "This calculator displays scanbody drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Driver Length",
                text: "Driver Length"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "ScanbodyDriversMUAs",
        label: "Scanbody Drivers (MUAs)",
        description: "This calculator displays scanbody drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Driver Length",
                text: "Driver Length"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "StockAbutments",
        label: "Stock Abutments",
        description: "This calculator displays stock abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Material",
                text: "Material"
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
                text: "Restoration Type"
            },
            {
                name: "Hexed or Non-Hexed",
                text: "Hexed or Non-Hexed"
            },
            {
                name: "Angulation",
                text: "Angulation"
            },
            {
                name: "Abutment Diameter",
                text: "Abutment Diameter"
            },
            {
                name: "Collar Height",
                text: "Collar Height"
            },
            {
                name: "Emergence Profile",
                text: "Emergence Profile"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "TemporaryCopingsDirectToImplants",
        label: "Temporary Copings (Direct to Implant)",
        description: "This calculator displays stock abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Engaging or Non Engaging",
                text: "Engaging or Non Engaging"
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
                name: "Hexed or Non-Hexed",
                text: "Hexed or Non-Hexed"
            },
            {
                name: "Collar Height",
                text: "Collar Height"
            },
            {
                name: "Restoration Type",
                text: "Restoration Type"
            },
            {
                name: "Restoration Material",
                text: "Restoration Material"
            },
            {
                name: "Temporary Coping Height",
                text: "Temporary Coping Height"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "TemporaryCopingsMUAs",
        label: "Temporary Copings (Multi-Unit Abutments)",
        description: "This calculator displays temporary copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Abutment Diameter",
                text: "Abutment Diameter"
            },
            {
                name: "Abutment Type",
                text: "Abutment Type",
            },
            {
                name: "Restoration Type",
                text: "Restoration Type",
            },
            {
                name: "Material",
                text: "Material"
            },
            {
                name: "Length",
                text: "Length"
            },
            {
                name: "Diameter",
                text: "Diameter"
            },
            {
                name: "Hexed or Non Hexed",
                text: "Hexed or Non Hexed"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "TiBasesDirectToImplants",
        label: "Ti Bases (Direct to Implant)",
        description: "This calculator displays Ti Bases for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Engaging or Non-Engaging",
                text: "Engaging or Non-Engaging"
            },
            {
                name: "Abutment Diameter",
                text: "Abutment Diameter",
            },
            {
                name: "Angulation",
                text: "Angulation",
            },
            {
                name: "Abutment Height",
                text: "Abutment Height"
            },
            {
                name: "Cementable Area",
                text: "Cementable Area"
            },
            {
                name: "Collar Height",
                text: "Collar Height"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    },
    {
        type: "TiBasesMUAs",
        label: "Ti Bases (Direct to Implant)",
        description: "This calculator displays Ti Bases for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        input: [
            {
                name: "Implant Brand",
                text: "Implant Brand"
            },
            {
                name: "Implant Model",
                text: "Implant Model"
            },
            {
                name: "Implant Diameter",
                text: "Implant Diameter"
            },
            {
                name: "Implant Platform",
                text: "Implant Platform"
            },
            {
                name: "Engaging or Non-Engaging",
                text: "Engaging or Non-Engaging"
            },
            {
                name: "MUA Type",
                text: "MUA Type"
            },
            {
                name: "Abutment Diameter",
                text: "Abutment Diameter"
            },
            {
                name: "Abutment Height",
                text: "Abutment Height"
            },
            {
                name: "Collar Height",
                text: "Collar Height"
            },
            {
                name: "Angulation",
                text: "Angulation"
            }
        ],
        output: [
            {
                name: "Item Name",
                text: "Item Name"
            },
            {
                name: "Item Number",
                text: "Item Number"
            },
            {
                name: "Link to Purchase",
                text: "Link to Purchase"
            }
        ]
    }
];