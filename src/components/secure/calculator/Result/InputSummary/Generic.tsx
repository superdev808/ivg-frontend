import classNames from "classnames/bind";
import { Image } from "primereact/image";
import React from "react";

import { InputDetail } from "@/types/calculators";

import styles from "../style.module.scss";

const cx = classNames.bind(styles);

interface GenericInputSummaryProps {
  calculatorType: string;
  image?: string;
  name: string;
  quiz: InputDetail[];
}

const GenericInputSummary: React.FC<GenericInputSummaryProps> = ({
  calculatorType,
  image,
  quiz,
  name,
}) => {
  return (
    <div
      className={cx(
        "flex align-items-center gap-4 flex-column text-dark-green pb-6 lg:flex-row",
        {
          "justify-content-between": image,
          "justify-content-center": !image,
        }
      )}
    >
      <div
        className={cx(
          "flex flex-column justify-content-around gap-4 shadow-6 p-4 border-round-md border-2 border-light-green",
          { quizWithoutImage: !image, quizWithImage: image }
        )}
      >
        <h3 className="underline m-0">Input Summary</h3>
        {quiz.map(
          ({ id, question, answer }) =>
            (!id || id === calculatorType) && (
              <div
                key={question}
                className="flex flex-1 align-items-center gap-3"
              >
                <div className="flex-1 text-left text-dark-green">
                  {question}
                </div>
                <div className="text-right">{answer}</div>
              </div>
            )
        )}
      </div>
      {image && (
        <div
          className={cx(
            "flex-1 flex justify-content-center overflow-hidden",
            "image"
          )}
        >
          <Image
            src={image}
            alt={name}
            className="flex-1 flex justify-content-center"
            imageClassName="w-full sm:w-5 lg:w-full lg:h-full"
            imageStyle={{ objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
};
export default GenericInputSummary;
