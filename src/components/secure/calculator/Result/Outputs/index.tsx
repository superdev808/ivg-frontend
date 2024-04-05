import Link from "next/link";
import { Button } from "primereact/button";
import { ConfirmPopup } from "primereact/confirmpopup";
import { InputNumber } from "primereact/inputnumber";
import React, { useMemo } from "react";

import { INFORMATIONAL_CALCULATOR_NAMES } from "@/constants/calculators";
import { isValidUrl } from "@/helpers/calculators";
import { ItemData } from "@/types/calculators";

import GenericOutput from "./Generic";
import PopupOutput from "./Popup";

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
      <ConfirmPopup />

      {filteredItems.map(({ label, info }) =>
        info.map((item, itemIdx) => (
          <div
            key={`${label}-${itemIdx}`}
            className="flex flex-column justify-content-between gap-4 p-3 border-2 border-light-green border-round-md md:flex-row md:align-items-center"
          >
            {item.reasoning || item.supportingArticle ? (
              <PopupOutput item={item} />
            ) : (
              <GenericOutput label={label} item={item} />
            )}

            {!INFORMATIONAL_CALCULATOR_NAMES.includes(label) && (
              <div className="flex align-items-center gap-4">
                <InputNumber
                  value={item.quantity}
                  onValueChange={({ value }) =>
                    onUpdateQuantity(value as number, item.itemName || "")
                  }
                  showButtons
                  buttonLayout="horizontal"
                  step={1}
                  size={1}
                  min={0}
                  incrementButtonIcon="pi pi-plus text-xs"
                  decrementButtonIcon="pi pi-minus text-xs"
                  inputClassName="py-0 text-xs"
                  incrementButtonClassName="px-0 text-xs"
                  decrementButtonClassName="px-0 text-xs"
                />

                {item.link && isValidUrl(item.link) ? (
                  <Link href={item.link} target="_blank">
                    <Button
                      style={{ width: 172 }}
                      label="Click to Purchase"
                      size="small"
                    />
                  </Link>
                ) : (
                  <div className="text-center" style={{ width: 172 }}>
                    Please contact your
                    <br />
                    distributor to purchase.
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Outputs;
