import {
  ItemData,
  ItemInsights,
  QUANTITY_VISIBILITY_STATE,
} from "@/components/secure/calculator/AllOnX/constants";
import { isValidUrl } from "../AllOnXUtills";
import { InputNumber } from "primereact/inputnumber";
import React from "react";

interface ItemDataParams extends ItemData {
  quantityVisibilityState: QUANTITY_VISIBILITY_STATE;
  isFirst?: boolean;
}

/**
 * Name : Item.
 * Desc : Renders an item with its details and quantity options.
 * @param {string} id
 * @param {string} label
 * @param {object} info
 * @param {object} procedure
 * @param {object} quantityVisibilityState
 * @param {boolean} isFirst
 */
const Item: React.FC<ItemDataParams> = ({
  label = "",
  info = [],
  quantityVisibilityState = QUANTITY_VISIBILITY_STATE.HIDE,
  isFirst,
}: ItemDataParams) => {
  const renderQuantity = React.useCallback(
    (quantity: number) => {
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
            />
          );

        default:
          return null;
      }
    },
    [quantityVisibilityState]
  );

  return (
    <>
      {info.length > 0 && (
        <div
          className={`flex border-bottom-1 ${
            isFirst && "border-top-1"
          } surface-border`}
        >
          <div className="w-3 border-left-1 border-right-1 surface-border p-2 flex align-items-center">
            {label}
          </div>
          <div className="w-9">
            {info.map((item: ItemInsights, i: number) => {
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
                  <span className="w-4 border-right-1 surface-border p-2 flex align-items-center">
                    {isValidUrl(link) && (
                      <a
                        style={{ wordBreak: "break-all" }}
                        href={link}
                        target="_blank"
                      >
                        Link to Purchase
                      </a>
                    )}
                  </span>
                  {quantityVisibilityState !==
                    QUANTITY_VISIBILITY_STATE.HIDE && (
                    <div className="w-1 p-2 border-right-1 surface-border">
                      {quantity && renderQuantity(quantity)}
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
