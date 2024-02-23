import compact from "lodash/compact";
import get from "lodash/get";
import { InputNumber } from "primereact/inputnumber";
import React, { useMemo } from "react";

import { ItemInsights, TotalQuantities } from "../../constants";

export interface Summary extends ItemInsights {
  description: string;
  brand: string;
}

interface ComponentSummaryProps {
  summary: Summary[];
  onUpdateQuantity: (quantity: number, itemName: string) => void;
}

const ComponentSummary: React.FC<ComponentSummaryProps> = ({
  summary,
  onUpdateQuantity,
}) => {
  const showManufacturer = useMemo(() => {
    if (!summary || summary.length === 0) {
      return false;
    }

    return summary.some(
      (item) => item.manufacturer && item.manufacturer !== item.brand
    );
  }, [summary]);

  if (!summary || summary.length === 0) {
    return null;
  }

  const columns: Array<{ id: string; name: string }> = compact([
    { id: "description", name: "Description" },
    { id: "itemName", name: "Name" },
    { id: "itemNumber", name: "Number" },
    showManufacturer ? { id: "manufacturer", name: "Manufacturer" } : null,
    { id: "quantity", name: "Quantity" },
  ]);

  const renderCell = (columnId: string, item: Summary) => {
    if (columnId === "manufacturer") {
      return item.manufacturer && item.manufacturer !== item.brand
        ? item.manufacturer
        : "";
    }

    if (columnId === "quantity") {
      return (
        <InputNumber
          value={item.quantity}
          onValueChange={({ value }) =>
            onUpdateQuantity(value || 0, item.itemName)
          }
          showButtons
          buttonLayout="horizontal"
          step={1}
          size={1}
          min={1}
          incrementButtonIcon="pi pi-plus text-xs"
          decrementButtonIcon="pi pi-minus text-xs"
          inputClassName="py-0 text-xs"
          incrementButtonClassName="px-0 text-xs"
          decrementButtonClassName="px-0 text-xs"
        />
      );
    }

    return get(item, columnId) || "";
  };

  return (
    <div>
      <h3 className="mb-3">Options: </h3>

      <div className="flex border-left-1 border-top-1 border-gray-400 w-fit">
        {columns.map((column) => (
          <div key={column.name} className="flex flex-column">
            <div
              style={{ height: 45 }}
              className="flex align-items-center px-3 border-right-1 border-bottom-1 border-gray-400 font-bold"
            >
              {column.name}
            </div>

            {summary.map((item) => (
              <div
                key={item.id}
                style={{ height: 45 }}
                className="flex align-items-center px-3 border-right-1 border-bottom-1 border-gray-400"
              >
                {renderCell(column.id, item)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentSummary;
