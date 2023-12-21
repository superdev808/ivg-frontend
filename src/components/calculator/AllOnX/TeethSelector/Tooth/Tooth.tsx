import React, { useState } from "react";
import { exists, validIcons } from "../svg";

interface ToothProps {
  name: string;
  value: number;
  onClickHandler: (teeth: number) => void;
}

export const Tooth = (props: ToothProps) => {
  const { name, value, onClickHandler, ...rest } = props;
  const [activeTooth, setActiveTooth] = useState<boolean>(false);

  const toothHandler: () => void = () => {
    const activeToothConst: boolean = !activeTooth;

    setActiveTooth(activeToothConst);
    onClickHandler(value);
  };

  return (
    exists(validIcons[name]) && (
      <>
        <g onClick={() => toothHandler()} style={{ pointerEvents: "fill" }}>
          {validIcons[name].paths.map((path: any, index: number) => (
            <React.Fragment key={index}>
              <path
                key={index}
                d={path.d}
                style={
                  index === 0 && activeTooth
                    ? { ...path.style, fill: "#31b431" }
                    : path.style
                }
                fill={index === 0 && activeTooth ? "green" : "inherit"}
              />
            </React.Fragment>
          ))}
        </g>
        <g>
          {validIcons[name].paths.map((path: any, index: number) => (
            <React.Fragment key={index}>
              <text
                xmlSpace="preserve"
                x={validIcons[name].xCordinate}
                y={validIcons[name].yCordinate}
                style={{
                  fontSize: "10.13467216px",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  lineHeight: "125%",
                  letterSpacing: "0px",
                  wordSpacing: "0px",
                  fill: "#000000",
                  fillOpacity: 1,
                  stroke: "none",
                  fontFamily: "Sans",
                  zIndex: "-1",
                }}
              >
                <tspan
                  x={validIcons[name].xCordinate}
                  y={validIcons[name].yCordinate}
                >
                  {value}
                </tspan>
              </text>
            </React.Fragment>
          ))}
        </g>
      </>
    )
  );
};
