import noop from "lodash/noop";
import { InputNumber } from "primereact/inputnumber";
import React from "react";

import {
  ItemData,
  QUANTITY_VISIBILITY_STATE,
} from "@/components/secure/calculator/AllOnX/constants";

import { isValidUrl } from "./AllOnXUtills";

interface ItemDataProps extends ItemData {
  quantityVisibilityState: QUANTITY_VISIBILITY_STATE;
  isFirst?: boolean;
  onUpdateQuantity?: (value: number, itemName: string) => void;
}

const Item: React.FC<ItemDataProps> = ({
  label = "",
  info = [],
  quantityVisibilityState = QUANTITY_VISIBILITY_STATE.HIDE,
  isFirst,
  onUpdateQuantity = noop,
}) => {
  const renderQuantity = React.useCallback(
    (quantity: number, itemName: string) => {
      switch (quantityVisibilityState) {
        case QUANTITY_VISIBILITY_STATE.SHOW:
          return (
            <span className="flex align-items-center justify-content-center">
              {quantity}
            </span>
          );

        case QUANTITY_VISIBILITY_STATE.EDITABLE:
          return (
            <InputNumber
              inputStyle={{
                width: "3rem",
                padding: 8,
                textAlign: "center",
              }}
              className="w-1"
              maxLength={3}
              value={quantity}
              onValueChange={(e) => onUpdateQuantity(e.value || 0, itemName)}
            />
          );

        default:
          return null;
      }
    },
    [quantityVisibilityState, onUpdateQuantity]
  );

  return (
    <>
      {info.length > 0 && (
        <div
          className={`flex border-bottom-1 ${
            isFirst && "border-top-1"
          } surface-border`}
        >
          <div className="w-4 border-left-1 border-right-1 surface-border p-2 flex align-items-center">
            {label}
          </div>
          <div className="w-8">
            {info.map((item, i) => {
              const { itemName, itemNumber, link, quantity } = item;

              return (
                <div key={`${itemName}-${i}`} className="flex">
                  <span
                    className={`w-${
                      quantityVisibilityState === QUANTITY_VISIBILITY_STATE.HIDE
                        ? 6
                        : 5
                    } border-right-1 surface-border p-2 flex align-items-center`}
                  >
                    {itemName}
                  </span>
                  <span className="w-2 border-right-1 surface-border p-2 flex align-items-center">
                    {itemNumber || "-"}
                  </span>
                  <span
                    className="w-4 border-right-1 surface-border p-2 flex align-items-center"
                    style={{ wordBreak: "break-all" }}
                  >
                    {isValidUrl(link) ? (
                      <a href={link} target="_blank">
                        {link}
                      </a>
                    ) : (
                      link
                    )}
                  </span>
                  {quantityVisibilityState !==
                    QUANTITY_VISIBILITY_STATE.HIDE && (
                    <div className="w-1 py-2 px-1 border-right-1 surface-border">
                      {quantity && renderQuantity(quantity, itemName)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
