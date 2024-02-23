import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import React, { useMemo } from "react";

import { ItemInsights } from "../../constants";

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

  const renderManufacturer = (item: Summary) => {
    return item.manufacturer && item.manufacturer !== item.brand
      ? item.manufacturer
      : "";
  };

  const renderQuantity = (item: Summary) => {
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
  };

  return (
    <div>
      <h3 className="mb-3">Options: </h3>

      <DataTable
        value={summary}
        tableStyle={{ minWidth: "50rem" }}
        showGridlines
      >
        <Column field="description" header="Description" />
        <Column field="itemName" header="Name" />
        <Column field="itemNumber" header="Number" />
        {showManufacturer && (
          <Column
            field="manufacturer"
            header="Manufacturer"
            body={renderManufacturer}
          />
        )}
        <Column field="quantity" header="Quantity" body={renderQuantity} />
      </DataTable>
    </div>
  );
};

export default ComponentSummary;
