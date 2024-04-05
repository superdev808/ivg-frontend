import classNames from "classnames/bind";
import Link from "next/link";
import { confirmPopup } from "primereact/confirmpopup";
import React from "react";

import { ItemInsights } from "@/types/calculators";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface PopupOutputProps {
  item: ItemInsights;
}

const PopupOutput: React.FC<PopupOutputProps> = ({ item }) => {
  const handleOpenPopup = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      className: cx("material-popup"),
      style: {
        maxWidth: 600,
      },
      footer: <></>,
      message: (
        <div className="flex flex-column align-items-center gap-4 text-center text-beige -ml-3">
          {item.reasoning && (
            <div>
              <b>Reasoning</b>: {item.reasoning}
            </div>
          )}
          {item.supportingArticle && (
            <Link
              className="text-beige"
              href={item.supportingArticle}
              target="_blank"
            >
              Supporting Article
            </Link>
          )}
        </div>
      ),
    });
  };

  return (
    <>
      <div className="flex gap-2">
        <i
          className="pi pi-question-circle text-light-green cursor-pointer"
          onClick={handleOpenPopup}
        />
        {item.recommendedSingleUnitAbutmentMaterial && (
          <div>
            <b>Recommended Single Unit Abutment Material:</b>{" "}
            {item.recommendedSingleUnitAbutmentMaterial}
          </div>
        )}

        {item.recommendedMUAMaterial && (
          <div>
            <b>Recommended Multi-Unit Abutment (MUA) Material:</b>{" "}
            {item.recommendedMUAMaterial}
          </div>
        )}

        {item.recommendedRestorationDesign && (
          <div>
            <b>Recommended Restoration Design:</b>{" "}
            {item.recommendedRestorationDesign}
          </div>
        )}

        {item.recommendedImplantBridgeMaterial && (
          <div>
            <b>Recommended Implant Bridge Material:</b>{" "}
            {item.recommendedImplantBridgeMaterial}
          </div>
        )}

        {item.recommendedAbutmentMaterial && (
          <div>
            <b>Recommended Abutment Material:</b>{" "}
            {item.recommendedAbutmentMaterial}
          </div>
        )}

        {item.recommendedCrownMaterial && (
          <div>
            <b>Recommended Crown Material:</b> {item.recommendedCrownMaterial}
          </div>
        )}

        {item.recommendedBridgeMaterial && (
          <div>
            <b>Recommended Bridge Material:</b> {item.recommendedBridgeMaterial}
          </div>
        )}
      </div>
    </>
  );
};

export default PopupOutput;
