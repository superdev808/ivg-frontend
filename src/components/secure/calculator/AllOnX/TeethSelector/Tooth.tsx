import React, { useMemo } from "react";

import { exists, validIcons } from "./svgUtills";

interface ToothProps {
  name: string;
  value: number;
  isSelected: boolean;
  onClickHandler: (teeth: number) => void;
}

/**
 * Name : Tooth.
 * Desc : The `Tooth` component renders an SVG icon and a text label based on the provided props.
 * @param {string} name
 * @param {number} value
 * @param {boolean} isSelected
 * @param {func} onClickHandler
 */
const Tooth: React.FC<ToothProps> = (props) => {
  const { name, value, isSelected, onClickHandler } = props;

  const handleToothClick: () => void = () => {
    onClickHandler(value);
  };

  const isExists = useMemo(() => exists(validIcons[name]), [name]);

  return (
    <>
      {isExists && (
        <>
          <g
            onClick={() => handleToothClick()}
            style={{ pointerEvents: "fill" }}
          >
            {validIcons[name].paths.map((path: any, index) => (
              <path
                key={path.id}
                d={path.d}
                style={
                  index === 0 && isSelected
                    ? { ...path.style, fill: "lightgreen" }
                    : path.style
                }
                fill={index === 0 && isSelected ? "green" : "inherit"}
              />
            ))}
          </g>

          <g>
            {validIcons[name].paths.map((path: any) => (
              <text
                key={path.id}
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
            ))}
          </g>
        </>
      )}
    </>
  );
};

export default Tooth;
