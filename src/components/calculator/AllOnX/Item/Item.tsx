import {
  ItemData,
  ItemInsights,
  QUANTITY_VISIBILITY_STATE,
} from "@/components/secure/calculator/AllOnX/constants";
import { isValidUrl } from "../AllOnXUtills";
import { InputNumber } from "primereact/inputnumber";

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
                  {quantity && (
                    <>
                      {quantityVisibilityState ===
                        QUANTITY_VISIBILITY_STATE.SHOW && (
                        <span className="w-1 p-2 border-right-1 surface-border flex align-items-center justify-content-center">
                          {quantity}
                        </span>
                      )}
                      {quantityVisibilityState ===
                        QUANTITY_VISIBILITY_STATE.EDITABLE && (
                        <div className="w-1 p-2 border-right-1 surface-border">
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
                        </div>
                      )}
                    </>
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
