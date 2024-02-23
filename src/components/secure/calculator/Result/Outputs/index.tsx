import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import React, { useMemo } from "react";

import Link from "next/link";

import { isValidUrl } from "@/helpers/calculators";
import { ItemData } from "@/types/calculators";

interface OutputsProps {
  items: ItemData[];
  onUpdateQuantity: (quantity: number, itemName: string) => void;
}

const Outputs: React.FC<OutputsProps> = ({ items, onUpdateQuantity }) => {
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.info.length > 0);
  }, [items]);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-column gap-4">
      {filteredItems.map(({ label, info }) => {
        const item = info[0];

        return (
          <div
            key={label}
            className="flex flex-column justify-content-between gap-4 p-3 border-2 border-gray-300 border-round-md md:flex-row md:align-items-center"
          >
            <div className="flex flex-column gap-2">
              {item.itemName && <div>{item.itemName}</div>}
              {item.itemNumber && (
                <div>
                  <b>Item Number:</b> {item.itemNumber}
                </div>
              )}
              {item.manufacturer && (
                <div>
                  <b>Manufacturer:</b> {item.manufacturer}
                </div>
              )}
              {item.manufacturerRecommendations && (
                <div>
                  <b>Manufacturer Recommendations:</b>{" "}
                  {item.manufacturerRecommendations}
                </div>
              )}
            </div>
            <div className="flex align-items-center gap-2">
              <InputNumber
                value={item.quantity}
                onValueChange={({ value }) =>
                  onUpdateQuantity(value as number, item.itemName)
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

              {item.link && isValidUrl(item.link) && (
                <Link href={item.link} target="_blank">
                  <Button label="Link to Purchase" size="small" />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Outputs;
