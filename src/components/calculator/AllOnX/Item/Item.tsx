import {
  ItemData,
  ItemInsights,
  QUANTITY_VISIBILITY_STATE,
} from "@/components/secure/calculator/AllOnX/constants";
import { isValidUrl } from "../AllOnXUtills";
import { InputNumber } from "primereact/inputnumber";

interface ItemDataParams extends ItemData {
  quantityVisibilityState: QUANTITY_VISIBILITY_STATE;
}

const Item: React.FC<ItemDataParams> = ({
  label = "",
  info = [],
  quantityVisibilityState = QUANTITY_VISIBILITY_STATE.HIDE,
}: ItemDataParams) => {
  return (
    <>
      {info.length > 0 && (
        <div className="flex my-2 ml-3">
          <div className="w-3">{label}</div>
          <div className="w-9">
            {info.map((item: ItemInsights, i: number) => {
              const { itemName, link, quantity } = item;
              return (
                <div key={`${itemName}-${i}`} className="flex mb-2">
                  <span className="w-5">{itemName}</span>
                  {isValidUrl(link) && (
                    <a
                      className="w-6"
                      style={{ wordBreak: "break-all" }}
                      href={link}
                    >
                      {link}
                    </a>
                  )}
                  {quantityVisibilityState ===
                    QUANTITY_VISIBILITY_STATE.SHOW && (
                    <span className="w-1 text-right">{quantity}</span>
                  )}
                  {quantityVisibilityState ===
                    QUANTITY_VISIBILITY_STATE.EDITABLE && (
                    <div className="w-1 text-center">
                      <InputNumber
                        inputStyle={{ width: "4rem", textAlign: "center" }}
                        className="w-1 text-right"
                        maxLength={3}
                        value={quantity}
                      />
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
