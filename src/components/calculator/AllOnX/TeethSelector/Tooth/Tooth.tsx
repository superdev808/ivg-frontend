import React, { useMemo } from "react";
import { exists, validIcons } from "../svgUtills";

interface ToothProps {
  name: string;
  value: number;
  isSelected: boolean;
  onClickHandler: (teeth: number) => void;
}

/**
 * The `Tooth` component renders an SVG icon and a text label based on the provided props.
 * @param {ToothProps} props - The `props` parameter is an object that contains the following
 * properties:
 * @returns The `Tooth` component is returning a JSX element. It conditionally renders a group (`g`)
 * element containing paths and text elements based on the existence of a valid icon for the given
 * `name` prop. The paths are rendered with different styles and fills based on the `isSelected` prop.
 * The text element displays the `value` prop.
 */
export const Tooth: React.FC<ToothProps> = (props: ToothProps) => {
  const { name, value, isSelected, onClickHandler } = props;
  const handleToothClick: () => void = () => {
    onClickHandler(value);
  };

  const isExists = useMemo(() => exists(validIcons[name]), [name])

  return (
    <>
      {isExists && (
        <>
          <g onClick={() => handleToothClick()} style={{ pointerEvents: "fill" }}>
            {validIcons[name].paths.map((path: any, index: number) => (
              <React.Fragment key={path.id}>
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
              </React.Fragment>
            ))}
          </g>
          <g>
            {validIcons[name].paths.map((path: any) => (
              <React.Fragment key={path.id}>
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
      )}
    </>
  );
};
