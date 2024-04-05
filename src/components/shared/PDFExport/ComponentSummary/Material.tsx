import classNames from "classnames/bind";
import React from "react";

import { isValidUrl } from "@/helpers/calculators";
import { Summary } from "@/types/calculators";

import styles from "../InputSummary/styles.module.scss";

const cx = classNames.bind(styles);

interface GenericComponentSummaryProps {
  summary: Summary[];
}

const GenericComponentSummary: React.FC<GenericComponentSummaryProps> = ({
  summary,
}) => {
  return (
    <>
      {summary.map((elem, idx) => {
        if (elem.reasoning && elem.supportingArticle) {
          return (
            <table key={idx} className={cx("striped-table")}>
              <thead>
                <tr>
                  {elem.recommendedSingleUnitAbutmentMaterial && (
                    <th>Recommended Single Unit Abutment Material</th>
                  )}
                  {elem.recommendedMUAMaterial && (
                    <th>Recommended MUA Material</th>
                  )}
                  {elem.recommendedRestorationDesign && (
                    <th>Recommended Restoration Design</th>
                  )}
                  {elem.recommendedImplantBridgeMaterial && (
                    <th>Recommended Implant Bridge Material</th>
                  )}
                  {elem.recommendedAbutmentMaterial && (
                    <th>Recommended Abutment Material</th>
                  )}
                  {elem.recommendedCrownMaterial && (
                    <th>Recommended Crown Material</th>
                  )}
                  {elem.recommendedBridgeMaterial && (
                    <th>Recommended Bridge Material</th>
                  )}
                  <th>Reasoning</th>
                  <th>Supporting Article</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {elem.recommendedSingleUnitAbutmentMaterial && (
                    <td>{elem.recommendedSingleUnitAbutmentMaterial}</td>
                  )}
                  {elem.recommendedMUAMaterial && (
                    <td>{elem.recommendedMUAMaterial}</td>
                  )}
                  {elem.recommendedRestorationDesign && (
                    <td>{elem.recommendedRestorationDesign}</td>
                  )}
                  {elem.recommendedImplantBridgeMaterial && (
                    <td>{elem.recommendedImplantBridgeMaterial}</td>
                  )}
                  {elem.recommendedAbutmentMaterial && (
                    <td>{elem.recommendedAbutmentMaterial}</td>
                  )}
                  {elem.recommendedCrownMaterial && (
                    <td>{elem.recommendedCrownMaterial}</td>
                  )}
                  {elem.recommendedBridgeMaterial && (
                    <td>{elem.recommendedBridgeMaterial}</td>
                  )}
                  <td>{elem.reasoning}</td>
                  <td>
                    {isValidUrl(elem.supportingArticle) ? (
                      <a href={elem.supportingArticle} target="_blank">
                        Supporting Article
                      </a>
                    ) : (
                      elem.reasoning
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          );
        }

        if (
          elem.secondRecommendedSingleUnitAbutmentMaterial ||
          elem.secondRecommendedRestorationDesign ||
          elem.secondRecommendedImplantBridgeMaterial ||
          elem.secondAbutmentMaterialChoice ||
          elem.secondRestorationDesignChoice ||
          elem.secondCrownMaterialChoice ||
          elem.secondMaterialChoice ||
          elem.thirdMaterialChoice
        ) {
          return (
            <table key={idx} className={cx("striped-table")}>
              <thead>
                <tr>
                  {elem.secondRecommendedSingleUnitAbutmentMaterial && (
                    <th>Second Recommended Single Unit Abutment Material</th>
                  )}
                  {elem.secondRecommendedRestorationDesign && (
                    <th>Second Recommended Single Unit Abutment Material</th>
                  )}
                  {elem.secondRecommendedImplantBridgeMaterial && (
                    <th>Second Recommended Implant Bridge Material</th>
                  )}
                  {elem.secondAbutmentMaterialChoice && (
                    <th>Second Abutment Material Choice</th>
                  )}
                  {elem.secondRestorationDesignChoice && (
                    <th>Second Restoration Design Choice</th>
                  )}
                  {elem.secondCrownMaterialChoice && (
                    <th>Second Crown Material Choice</th>
                  )}
                  {elem.secondMaterialChoice && <th>Second Material Choice</th>}
                  {elem.thirdMaterialChoice && <th>Third Material Choice</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {elem.secondRecommendedSingleUnitAbutmentMaterial && (
                    <td>{elem.secondRecommendedSingleUnitAbutmentMaterial}</td>
                  )}
                  {elem.secondRecommendedRestorationDesign && (
                    <td>{elem.secondRecommendedRestorationDesign}</td>
                  )}
                  {elem.secondRecommendedImplantBridgeMaterial && (
                    <td>{elem.secondRecommendedImplantBridgeMaterial}</td>
                  )}
                  {elem.secondAbutmentMaterialChoice && (
                    <td>{elem.secondAbutmentMaterialChoice}</td>
                  )}
                  {elem.secondRestorationDesignChoice && (
                    <td>{elem.secondRestorationDesignChoice}</td>
                  )}
                  {elem.secondCrownMaterialChoice && (
                    <td>{elem.secondCrownMaterialChoice}</td>
                  )}
                  {elem.secondMaterialChoice && (
                    <td>{elem.secondMaterialChoice}</td>
                  )}
                  {elem.thirdMaterialChoice && (
                    <td>{elem.thirdMaterialChoice}</td>
                  )}
                </tr>
              </tbody>
            </table>
          );
        }
      })}
    </>
  );
};

export default GenericComponentSummary;
