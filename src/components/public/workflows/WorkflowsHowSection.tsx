import { Image } from "primereact/image";

import classNames from "classnames/bind";
import styles from "./Workflows.module.scss";

const cx = classNames.bind(styles);

export const WorkflowsHowSection = () => {
  const title = "How it Works";
  const items = [
    {
      content: `Dentists using Workflows are seamlessly guided through complicated processes and decisions. Gain confidence troubleshooting
		roadblocks in your treatment plans or using digital workflows while your patient is in the chair.`,
      image: "/images/workflows/product/workflow-1.png",
    },
    {
      content: `Dental Laboratories frequently face challenging question from their clients, requiring escalation to technicians and slower
		response time. Workflows enable your team to quickly and independently guide dentists through technical processes and questions.`,
      image: "/images/workflows/product/workflow-2.png",
    },
    {
      content: `Workflows provide future dentists and lab technicians with vetted advice and recommendations that bring complicated procedures to life.`,
      image: "/images/workflows/product/workflow-3.png",
    },
  ];

  return (
    <>
      <div className={cx(["public-content-container", "section-container"])}>
        <div className="public-content-wrapper flex-column  align-content-center">
          <div className="text-center mb-6">
            <div className="text-4xl md:text-6xl font-bold">{title}</div>
          </div>
          {items.map((item, index) => {
            return (
              <div key={`how_it_works_${index}`} className="grid  text-center">
                <div
                  className={cx([
                    index === 1
                      ? "flex-order-0 md:flex-order-1 md:pl-8"
                      : "md:pr-8",
                    "col-12 md:col-6 px-0  align-self-center",
                  ])}
                >
                  <span
                    className={cx([
                      "public-section-content-xl font-bold text-gray-600",
                      "text-center md:text-left",
                    ])}
                  >
                    {item.content}
                  </span>
                </div>
                <div
                  className={cx([
                    index === 1
                      ? "flex-order-1 md:flex-order-0 md:pr-8"
                      : "md:pl-8",
                    "col-12 md:col-6 px-0 my-6 md:my-4",
                  ])}
                >
                  <Image
                    src={item.image}
                    alt={`public_workflow_${index}`}
                    width="100%"
                  />
                </div>
              </div>
            );
          })}

          <div className="col-12 md:col-4 md:col-offse-2 px-4 md:px-6 py-4 flex flex-column align-items-center justify-content-center">
            <h5
              className={cx(
                "landing-middle-item-description",
                "mt-2 mb-0 text-xl text-center md:text-left"
              )}
            >
              <b>Dentists</b> using Workflows are seamlessly guided through
              complicated processes and decisions. Gain confidence
              troubleshooting roadblocks in your treatment plans or using
              digital workflows while your patient is in the chair.
            </h5>
          </div>
          <div className="col-12 md:col-4 px-6 py-4 flex flex-column align-items-center relative">
            <div className={cx("landing-middle-image-container")}>
              <div className={cx("landing-middle-image-sub-container")}>
                <Image
                  src="/workflow-1.png"
                  alt="landing page middle image"
                  width="100%"
                  className="relative"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid mb-2 md:mb-6 pb-6 flex justify-content-center flex-column-reverse md:flex-row">
          <div className="col-12 md:col-4 px-6 py-4 flex flex-column align-items-center relative">
            <div className={cx("landing-middle-image-container")}>
              <div className={cx("landing-middle-image-sub-container")}>
                <Image
                  src="/workflow-2.png"
                  alt="landing page middle image"
                  width="100%"
                  className="relative"
                />
              </div>
            </div>
          </div>
          <div className="col-12 md:col-4 md:col-offse-2 px-4 md:px-6 py-4 flex flex-column align-items-center justify-content-center">
            <h5
              className={cx(
                "landing-middle-item-description",
                "mt-2 mb-0 text-xl text-center md:text-left"
              )}
            >
              <b>Dental Laboratories</b> frequently face challenging question
              from their clients, requiring escalation to technicians and slower
              response time. Workflows enable your team to quickly and
              independently guide dentists through technical processes and
              questions.
            </h5>
          </div>
        </div>

        <div className="grid mb-2 md:mb-6 pb-6 flex justify-content-center">
          <div className="col-12 md:col-4 md:col-offse-2 px-4 md:px-6 py-4 flex flex-column align-items-center justify-content-center">
            <h5
              className={cx(
                "landing-middle-item-description",
                "mt-2 mb-0 text-xl  text-center md:text-left"
              )}
            >
              Workflows provide <b>future dentists and lab technicians</b> with
              vetted advice and recommendations that bring complicated
              procedures to life.
            </h5>
          </div>
          <div className="col-12 md:col-4 px-6 py-4 flex flex-column align-items-center relative">
            <div className={cx("landing-middle-image-container")}>
              <div className={cx("landing-middle-image-sub-container")}>
                <Image
                  src="/workflow-3.png"
                  alt="landing page middle image"
                  width="100%"
                  className="relative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
