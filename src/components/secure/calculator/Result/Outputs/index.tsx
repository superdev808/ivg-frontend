import { Button } from "primereact/button";
import React from "react";

import Link from "next/link";

import { getOutputs } from "./helpers";

interface OutputsProps {
  calculatorName: string;
  itemName: string;
  purchaseLink: string;
  details: Record<string, string>;
}

const Outputs: React.FC<OutputsProps> = ({
  calculatorName,
  itemName,
  purchaseLink,
  details,
}) => {
  const outputs = getOutputs(calculatorName, itemName, purchaseLink, details);

  return (
    <div className="flex flex-column gap-4">
      {outputs.map(({ name, link, additionals }) => (
        <div
          key={name}
          className="flex flex-column justify-content-between gap-4 p-3 border-2 border-gray-300 border-round-md md:flex-row md:align-items-center"
        >
          <div className="flex flex-column gap-2">
            {name && <div>{name}</div>}
            {additionals &&
              additionals.map((item: { name: string; value: string }) => (
                <div key={item.name}>
                  <b>{item.name}:</b> {item.value}
                </div>
              ))}
          </div>
          {link && (
            <Link href={link}>
              <Button label="Link to Purchase" size="small" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Outputs;
