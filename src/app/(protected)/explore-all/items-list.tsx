import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

import { EXPLORE_DATA_ITEM } from "@/types/calculators";

import styles from "./items-list.module.scss";
import _ from "lodash";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
import { hasChildrenCalculator } from "@/helpers/calculators";

const cx = classNames.bind(styles);

interface ItemsListProps {
  item: EXPLORE_DATA_ITEM;
  renderItems: Function;
}

const ItemsList: React.FC<ItemsListProps> = ({ item, renderItems }) => {
  const router = useRouter();
  const { calcInfoMap } = useCalculatorsInfo();

  const [isOpened, setIsOpened] = useState<boolean>(
    Boolean(item.openByDefault)
  );

  const handleToggle = () => {
    if (item.href) {
      router.push(item.href);
    } else if (hasItems) {
      setIsOpened((prevState) => !prevState);
    }
  };

  const hasItems = useMemo(() => {
    if (!Array.isArray(item.items)) return false;
    const IS_DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE;
    return hasChildrenCalculator(item, calcInfoMap);
  }, [item, calcInfoMap]);

  return (
    (hasItems || item.href) && (
      <div className="flex flex-column gap-1">
        <div
          className={cx("cursor-pointer text-xl", {
            "font-bold": hasItems || item.isHighlighted,
            "item-with-children": hasItems,
            "item-without-children": !hasItems,
          })}
          onClick={handleToggle}
        >
          {item.name} {hasItems && (isOpened ? "-" : "+")}
        </div>

        {isOpened && hasItems && renderItems(item.items)}
      </div>
    )
  );
};

export default ItemsList;
