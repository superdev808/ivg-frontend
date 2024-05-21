import classNames from "classnames/bind";
import { Image } from "primereact/image";
import React from "react";

import { InputDetail } from "@/types/calculators";

import styles from "../style.module.scss";
import VideoPlayer from "@/components/shared/VideoPlayer";

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
  const shouldDisplayImage = (calculatorType !== "ImpressionCopingsDirectToImplant");
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
          "flex-1 flex flex-column justify-content-around gap-4 shadow-6 p-4 border-round-md border-2 border-light-green",
          { quizWithoutImage: !image, quizWithImage: image }
        )}
      >
        <h3 className="underline m-0">Input Summary</h3>
        {quiz.map(
          ({ id, question, questionText, answer }) =>
            (!id || id === calculatorType) && (
              <div
                key={question}
                className="flex flex-1 align-items-center gap-3"
              >
                <div className="flex-1 text-left text-dark-green">
                  {questionText}
                </div>
                <div className="text-right">{answer}</div>
              </div>
            )
        )}
      </div>
      {(!shouldDisplayImage || image) && (
        <div
          className={cx(
            "flex-1 flex align-items-center justify-content-center overflow-hidden",
            { "image": shouldDisplayImage }
          )}
        >
          {!shouldDisplayImage ?
            <VideoPlayer
              forbidden={false}
              videoSrc={"https://ivoryguide.s3.us-west-1.amazonaws.com/images/videos/Engaging+vs+nonengaging.mp4"}
              zoomOnClick={false}
              startTime={2}
              title="Ivory Insignts"
              subtitle="from Dr. Kyle Stanley"
            /> :
            <Image
              src={image}
              alt={name}
              className="flex-1 flex justify-content-center"
              imageClassName="w-full sm:w-5 lg:w-full lg:h-full"
              imageStyle={{ objectFit: "contain" }}
            />
          }
        </div>
      )}
    </div>
  );
};
export default GenericInputSummary;
