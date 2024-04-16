import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

import { EXPLORE_DATA_ITEM } from "@/types/calculators";

const cx = classNames.bind({});

interface ItemsListProps {
  item: EXPLORE_DATA_ITEM;
  renderItems: Function;
}

const ItemsList: React.FC<ItemsListProps> = ({ item, renderItems }) => {
  const router = useRouter();

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
    return Array.isArray(item.items) && item.items.length > 0;
  }, [item]);

  return (
    <div className="flex flex-column gap-1">
      <div
        className={cx("cursor-pointer", {
          "font-bold": hasItems || item.isHighlighted,
        })}
        onClick={handleToggle}
      >
        {item.name} {hasItems && (isOpened ? "-" : "+")}
      </div>

      {isOpened && hasItems && renderItems(item.items)}
    </div>
  );
};

export default ItemsList;