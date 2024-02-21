import { Button } from "primereact/button";
import React from "react";

import Link from "next/link";

import { ResultItem } from "../helpers";

interface OutputsProps {
  name: string;
  items: ResultItem[];
}

const Outputs: React.FC<OutputsProps> = ({ name, items }) => {
  return (
    <div className="flex flex-column gap-4">
      {items.map(({ label, info }) => {
        const item = info[0];

        return (
          <div
            key={label}
            className="flex flex-column justify-content-between gap-4 p-3 border-2 border-gray-300 border-round-md md:flex-row md:align-items-center"
          >
            <div className="flex flex-column gap-2">
              {name && <div>{item.itemName}</div>}
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
            </div>
            {item.link && (
              <Link href={item.link} target="_blank">
                <Button label="Link to Purchase" size="small" />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Outputs;
