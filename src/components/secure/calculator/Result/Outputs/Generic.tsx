import classNames from "classnames/bind";
import React from "react";

import { CALCS_WITHOUT_PURCHASE } from "@/constants/calculators";
import { ItemInsights } from "@/types/calculators";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface GenericOutputProps {
  label: string;
  item: ItemInsights;
}

const GenericOutput: React.FC<GenericOutputProps> = ({ label, item }) => {
  return (
    <div
      className={cx("flex flex-column gap-2", {
        "w-12": CALCS_WITHOUT_PURCHASE.includes(label),
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
          <b>Second Crown Material Choice:</b> {item.secondCrownMaterialChoice}
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
  );
};

export default GenericOutput;
