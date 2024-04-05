import classNames from "classnames/bind";
import keys from "lodash/keys";
import Link from "next/link";
import { confirmPopup } from "primereact/confirmpopup";
import React from "react";

import { MATERIAL_CALCULATOR_POPUP_OUTPUT_MAPPING } from "@/constants/calculators";
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
        {keys(MATERIAL_CALCULATOR_POPUP_OUTPUT_MAPPING).map((key) => {
          const value = item[key as keyof ItemInsights];
          return (
            <React.Fragment key={key}>
              {value && (
                <div>
                  <b>{MATERIAL_CALCULATOR_POPUP_OUTPUT_MAPPING[key]}:</b>{" "}
                  {value}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default PopupOutput;
