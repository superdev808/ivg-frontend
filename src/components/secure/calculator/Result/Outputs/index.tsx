import Link from "next/link";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import React, { useMemo } from "react";

import { isValidUrl } from "@/helpers/calculators";
import { ItemData } from "@/types/calculators";
import { invalidPurchaseCalcs } from "@/helpers/util";
import classNames from "classnames/bind";
import styles from "../style.module.scss";

const cx = classNames.bind(styles);

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
      {filteredItems.map(({ label, info }) =>
        info.map((item, itemIdx) => (
          <div
            key={`${label}-${itemIdx}`}
            className="flex flex-column justify-content-between gap-4 p-3 border-2 border-gray-300 border-round-md md:flex-row md:align-items-center"
          >
            <div
              className={cx("flex flex-column gap-2", {
                "w-12": invalidPurchaseCalcs.includes(label),
              })}
            >
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
              {item.torqueValue && (
                <div className="text-center text-2xl">
                  <b>Torque Value:</b> {item.torqueValue}
                </div>
              )}
              {item.notes && (
                <div>
                  <b>Notes:</b> {item.notes}
                </div>
              )}
            </div>

            {!invalidPurchaseCalcs.includes(label) && (
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
                  <div
                    className="text-center text-gray-500"
                    style={{ width: 172 }}
                  >
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
