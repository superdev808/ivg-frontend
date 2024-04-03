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
            className="flex flex-column justify-content-between gap-4 p-3 border-2 border-light-green border-round-md md:flex-row md:align-items-center"
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

              {item.recommendedSingleUnitAbutmentMaterial && (
                <div>
                  <b>Recommended Single Unit Abutment Material:</b>{" "}
                  {item.recommendedSingleUnitAbutmentMaterial}
                </div>
              )}
              {item.recommendedSingleUnitAbutmentReasoning && (
                <div>
                  <b>Reasoning:</b>{" "}
                  {item.recommendedSingleUnitAbutmentReasoning}
                </div>
              )}
              {item.recommendedSingleUnitAbutmentSupportingArticle && (
                <div>
                  <b>Supporting Article:</b>{" "}
                  {item.recommendedSingleUnitAbutmentSupportingArticle}
                </div>
              )}

              {item.recommendedMUAMaterial && (
                <div>
                  <b>Recommended Multi-Unit Abutment (MUA) Material:</b>{" "}
                  {item.recommendedMUAMaterial}
                </div>
              )}
              {item.recommendedMUAMaterialReasoning && (
                <div>
                  <b>Reasoning:</b> {item.recommendedMUAMaterialReasoning}
                </div>
              )}
              {item.recommendedMUAMaterialSupportingArticle && (
                <div>
                  <b>Supporting Article:</b>{" "}
                  {item.recommendedMUAMaterialSupportingArticle}
                </div>
              )}

              {item.recommendedRestorationDesign && (
                <div>
                  <b>Recommended Restoration Design:</b>{" "}
                  {item.recommendedRestorationDesign}
                </div>
              )}
              {item.recommendedRestorationDesignReasoning && (
                <div>
                  <b>Reasoning:</b> {item.recommendedRestorationDesignReasoning}
                </div>
              )}
              {item.recommendedRestorationDesignSupportingArticle && (
                <div>
                  <b>Supporting Article:</b>{" "}
                  {item.recommendedRestorationDesignSupportingArticle}
                </div>
              )}

              {item.recommendedImplantBridgeMaterial && (
                <div>
                  <b>Recommended Implant Bridge Material:</b>{" "}
                  {item.recommendedImplantBridgeMaterial}
                </div>
              )}
              {item.recommendedImplantBridgeMaterialReasoning && (
                <div>
                  <b>Reasoning:</b>{" "}
                  {item.recommendedImplantBridgeMaterialReasoning}
                </div>
              )}
              {item.recommendedImplantBridgeMaterialSupportingArticle && (
                <div>
                  <b>Supporting Article:</b>{" "}
                  {item.recommendedImplantBridgeMaterialSupportingArticle}
                </div>
              )}

              {item.secondRecommendedSingleUnitAbutmentMaterial && (
                <div>
                  <b>Second Recommended Single Unit Abutment Material:</b>{" "}
                  {item.secondRecommendedSingleUnitAbutmentMaterial}
                </div>
              )}
              {item.secondRecommendedRestorationDesign && (
                <div>
                  <b>Second Recommended Restoration Design:</b>{" "}
                  {item.secondRecommendedRestorationDesign}
                </div>
              )}
              {item.secondRecommendedImplantBridgeMaterial && (
                <div>
                  <b>Second Recommended Implant Bridge Material:</b>{" "}
                  {item.secondRecommendedImplantBridgeMaterial}
                </div>
              )}

              {item.recommendedAbutmentMaterial && (
                <div>
                  <b>Recommended Abutment Material:</b>{" "}
                  {item.recommendedAbutmentMaterial}
                </div>
              )}
              {item.recommendedAbutmentMaterialReasoning && (
                <div>
                  <b>Reasoning:</b> {item.recommendedAbutmentMaterialReasoning}
                </div>
              )}
              {item.recommendedAbutmentMaterialSupportingArticle && (
                <div>
                  <b>Supporting Article:</b>{" "}
                  {item.recommendedAbutmentMaterialSupportingArticle}
                </div>
              )}

              {item.recommendedCrownMaterial && (
                <div>
                  <b>Recommended Crown Material:</b>{" "}
                  {item.recommendedCrownMaterial}
                </div>
              )}
              {item.recommendedCrownMaterialReasoning && (
                <div>
                  <b>Reasoning:</b> {item.recommendedCrownMaterialReasoning}
                </div>
              )}
              {item.recommendedCrownMaterialSupportingArticle && (
                <div>
                  <b>Supporting Article:</b>{" "}
                  {item.recommendedCrownMaterialSupportingArticle}
                </div>
              )}

              {item.secondAbutmentMaterialChoice && (
                <div>
                  <b>Second Abutment Material Choice:</b>{" "}
                  {item.secondAbutmentMaterialChoice}
                </div>
              )}
              {item.secondRestorationDesignChoice && (
                <div>
                  <b>Second Restoration Design Choice:</b>{" "}
                  {item.secondRestorationDesignChoice}
                </div>
              )}
              {item.secondCrownMaterialChoice && (
                <div>
                  <b>Second Crown Material Choice:</b>{" "}
                  {item.secondCrownMaterialChoice}
                </div>
              )}

              {item.recommendedBridgeMaterial && (
                <div>
                  <b>Recommended Bridge Material:</b>{" "}
                  {item.recommendedBridgeMaterial}
                </div>
              )}
              {item.recommendedBridgeMaterialReasoning && (
                <div>
                  <b>Reasoning:</b> {item.recommendedBridgeMaterialReasoning}
                </div>
              )}
              {item.recommendedBridgeMaterialSupportingArticle && (
                <div>
                  <b>Supporting Article:</b>{" "}
                  {item.recommendedBridgeMaterialSupportingArticle}
                </div>
              )}

              {item.secondMaterialChoice && (
                <div>
                  <b>Second Material Choice:</b> {item.secondMaterialChoice}
                </div>
              )}
              {item.thirdMaterialChoice && (
                <div>
                  <b>Third Material Choice:</b> {item.thirdMaterialChoice}
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
                    className="text-center text-light-green"
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
