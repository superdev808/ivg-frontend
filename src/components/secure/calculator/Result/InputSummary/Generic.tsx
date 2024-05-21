import classNames from "classnames/bind";
import { Image } from "primereact/image";
import React, { useRef } from "react";

import { InputDetail, ItemData } from "@/types/calculators";
import { Response } from "@/types/ApiResponseTypes";
import { Messages } from "primereact/messages";
import { Toast } from "primereact/toast";
import { useSubmitItemRequestMutation } from "@/redux/hooks/apiHooks";

import styles from "../style.module.scss";

const cx = classNames.bind(styles);

interface GenericInputSummaryProps {
  calculatorType: string;
  image?: string;
  name: string;
  quiz: InputDetail[];
  items: ItemData[];
}

interface QuestionAnswer {
  question: string;
  answer: string;
}

const GenericInputSummary: React.FC<GenericInputSummaryProps> = ({
  items,
  calculatorType,
  image,
  quiz,
  name,
}) => {
  const [submitItemRequest] = useSubmitItemRequestMutation();
  const msgs = useRef<Messages>(null);
  const noItem = items.length === 0;
  const toastRef = useRef(null);

  const handleSubmitSummary = async () => {
    const questionAnswers: QuestionAnswer[] = [];
    quiz.forEach(({ id, questionText, answer }) => {
      if (!id || id === calculatorType) {
        questionAnswers.push({ question: questionText, answer });
      }
    });

    const res = await submitItemRequest({
      itemName: name,
      inputSummaries: questionAnswers,
    });

    if ((res as Response).data.status === "Success") {
      (toastRef.current as any).show({
        severity: "success",
        detail:
          "Thank you for submitting your feedback! We will add the missing item and reach out if we have any questions.",
        life: 5000,
        className: "mt-8",
      });
    } else {
      (toastRef.current as any).show({
        severity: "error",
        detail: "Something went wrong",
        life: 5000,
        className: "mt-8",
      });
    }
  };

  const content = (
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
          "flex flex-column justify-content-around gap-4 shadow-6 p-4 border-round-md border-2",
          {
            quizWithoutImage: !image,
            quizWithImage: image,
            "border-light-green": !noItem,
            "border-dark-brown": noItem,
          }
        )}
      >
        {noItem ? (
          <h3 className="text-center">
            We're hard at work updating our database, but this item is not
            currently available.
            <br />
            <br />
            Click
            <span
              className={cx("cursor-pointer text-xl mx-2 underline")}
              onClick={handleSubmitSummary}
            >
              HERE
            </span>
            to request your desired item.
          </h3>
        ) : (
          <>
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
          </>
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

  return (
    <>
      {content}
      <Toast ref={toastRef} position="bottom-center" />
    </>
  );
};
export default GenericInputSummary;
