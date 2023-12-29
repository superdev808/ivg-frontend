import React from "react";
import { exists, validIcons } from "../svg";

interface ToothProps {
  name: string;
  value: number;
  isSelected: boolean;
  onClickHandler: (teeth: number) => void;
}

export const Tooth = (props: ToothProps) => {
  const { name, value, isSelected, onClickHandler } = props;
  const toothHandler: () => void = () => {
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
                  index === 0 && isSelected
                    ? { ...path.style, fill: "lightgreen" }
                    : path.style
                }
                fill={index === 0 && isSelected ? "green" : "inherit"}
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
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  lineHeight: "125%",
                  letterSpacing: "0px",
                  wordSpacing: "0px",
                  fill: "rgba(0, 0, 0, 0.87)",
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
