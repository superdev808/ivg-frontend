import classNames from "classnames/bind";
import omit from "lodash/omit";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import Link from "next/link";
import { useRef } from "react";

import { isUrl } from "@/helpers/util";
import {
  useGetUserInfoQuery,
  useSaveResultMutation,
} from "@/redux/hooks/apiHooks";

import styles from "./slide.module.scss";

const cx = classNames.bind(styles);

interface SlideProps {
  itemInfo: Record<string, string>;
  quiz: Record<string, string>;
}

const Slide: React.FC<SlideProps> = ({ itemInfo, quiz }) => {
  const { refetch } = useGetUserInfoQuery({});
  const [saveResult, { isLoading: isSavingResult }] = useSaveResultMutation();

  const toastRef = useRef(null);

  const itemName = itemInfo["Item Name"] || itemInfo["Drill Kit Name"];
  const itemImage = itemInfo["Item Image"];
  const purchaseLink =
    itemInfo["Link to Purchase"] || itemInfo["Drill Kit Link to Purchase"];

  const details = omit(itemInfo, [
    "Item Name",
    "Item Image",
    "Link to Purchase",
    "Drill Kit Name",
    "Drill Kit Link to Purchase",
  ]);

  const handleSave = async () => {
    const payload = {
      mainInfo: {
        "Item Name": itemName,
        "Item Image": itemImage,
        "Link to Purchase": purchaseLink,
      },
      quiz,
      details,
    };

    try {
      await saveResult(payload).unwrap();
      refetch();

      (toastRef.current as any).show({
        severity: "success",
        summary: "Saved result",
        detail: "Go to profile page",
        life: 3000,
      });
    } catch (error) {
      (toastRef.current as any).show({
        severity: "error",
        summary: "Error",
        detail: "Failed to save result",
        life: 3000,
      });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <div className="w-12 py-2 align-items-start gap-1 md:flex lg:w-10 xl:w-7">
        <div className="flex-1">
          {itemName && <h1 className="m-0">{itemName}</h1>}
          {itemImage && (
            <div className="mt-4">
              <Image src={itemImage} alt={itemName} width="200px" />
            </div>
          )}
        </div>

        <div className="flex flex-column align-items-center lg:align-items-end">
          <div
            className={cx(
              "bg-white flex flex-column gap-3 shadow-6 p-4 mt-4 md:mt-0",
              "answers"
            )}
          >
            {Object.keys(quiz).map((text) => (
              <div key={text} className="flex gap-1">
                <div className="text-left" style={{ maxWidth: "50%" }}>
                  {text}
                </div>
                <div className="flex-1 text-right">{quiz[text]}</div>
              </div>
            ))}
          </div>

          {Object.keys(details).length > 0 && (
            <div
              className={cx(
                "bg-white flex flex-column gap-3 p-4 mt-6 border-2 border-gray-300",
                "details"
              )}
            >
              {Object.keys(details).map((text) => (
                <div key={text} className="flex align-items-center gap-4">
                  <div className="text-left" style={{ maxWidth: "50%" }}>
                    {text}
                  </div>
                  <div className="flex-1 text-right">
                    {isUrl(details[text].trim()) ? (
                      <Link
                        href={details[text]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ wordBreak: "break-word" }}
                      >
                        <Button
                          label="Click to Purchase"
                          size="small"
                          link
                          className="px-0"
                        />
                      </Link>
                    ) : (
                      details[text]
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 w-full mt-6 justify-content-center">
            <Button label="Email" className="px-3" />
            <Button label="Export" className="px-3" />
            <Button
              label="Save"
              className="px-3"
              loading={isSavingResult}
              onClick={handleSave}
            />
            {purchaseLink && (
              <Link href={purchaseLink} target="_blank">
                <Button
                  label="Click to Purchase"
                  rel="noopener noreferrer"
                  className="px-3"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slide;
