import classNames from "classnames/bind";
import React from "react";

import { EXPLORE_DATA, EXPLORE_DATA_ITEM } from "@/types/calculators";

import ItemsList from "./items-list";

import styles from "./tab-content.module.scss";

const cx = classNames.bind(styles);

interface TabContentProps {
  datum: EXPLORE_DATA;
}

const TabContent: React.FC<TabContentProps> = ({ datum }) => {
  const renderItems = (items: EXPLORE_DATA_ITEM[]) =>
    items.map((item, itemIndex) => (
      <ItemsList item={item} renderItems={renderItems} key={itemIndex} />
    ));

  return (
    <div className="px-3 pt-2">
      {datum.description && (
        <div className="text-xl text-center white-space-preline text-dark-green font-semibold">
          {datum.description}
        </div>
      )}

      <div className={cx("sections", "mt-6")}>
        {datum.sections.map((section) => (
          <div
            key={section.name}
            className={cx(
              "section",
              "flex flex-column align-items-center gap-4 text-center"
            )}
          >
            <div className="font-bold underline text-2xl">{section.name}</div>

            {section.items && (
              <div className="flex flex-column gap-4">
                {renderItems(section.items)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabContent;
