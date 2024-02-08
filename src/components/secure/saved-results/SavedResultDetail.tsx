import classNames from "classnames/bind";
import Link from "next/link";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Image } from "primereact/image";
import React from "react";

import { formatDate, isUrl } from "@/helpers/util";

import styles from "./SavedResultDetail.module.scss";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

type SavedResult = {
  mainInfo: Record<string, string>;
  quiz: Record<string, string>;
  details: Record<string, string>;
  id: string;
  date: string;
};

interface SavedResultsListProps {
  savedResult: SavedResult;
  isDeleting: boolean;
  onDelete: () => void;
}

const SavedResultDetail: React.FC<SavedResultsListProps> = ({
  savedResult,
  isDeleting,
  onDelete,
}) => {
  const router = useRouter();

  const itemName = savedResult.mainInfo["Item Name"];
  const itemImage =
    savedResult.mainInfo["Item Image"] ||
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Alpha+Bio+Tec.png";
  const purchaseLink = savedResult.mainInfo["Link to Purchase"];

  const handleGoBack = () => {
    router.push("/settings/saved-results");
  };

  const handleShowDeleteConfirm = () => {
    if (isDeleting) {
      return;
    }

    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: onDelete,
    });
  };

  return (
    <div className="w-12 lg-w-10 xl:w-7 pt-4">
      <ConfirmDialog />
      <div className="border-bottom-2 border-green-800 pb-2 flex align-items-center justify-content-between mb-4">
        <Button
          icon="pi pi-arrow-left"
          disabled={isDeleting}
          onClick={handleGoBack}
        />

        <div className="flex align-items-center gap-2">
          Saved Date: {formatDate(savedResult.date)}{" "}
          <Button
            icon="pi pi-trash"
            size="small"
            loading={isDeleting}
            onClick={handleShowDeleteConfirm}
          />
        </div>
      </div>

      <div className="gap-4 md:flex">
        <div className="flex-1">
          <h1 className="m-0">{itemName}</h1>

          <div className="flex gap-2 mt-4">
            <Button label="Email" size="small" disabled={isDeleting} />
            <Button label="Export" size="small" disabled={isDeleting} />
          </div>

          {itemImage && (
            <div className="mt-4">
              <Image src={itemImage} alt={itemName} width="200px" />
            </div>
          )}
        </div>

        <div className="flex flex-column align-items-center lg:align-items-end">
          <div
            className={cx(
              "bg-white flex flex-column gap-3 shadow-6 p-4 mt-4 border-2 border-green-800 md:mt-0",
              "answers"
            )}
          >
            {Object.keys(savedResult.quiz).map((text) => (
              <div key={text} className="flex gap-1">
                <div className="text-left" style={{ maxWidth: "50%" }}>
                  {text}
                </div>
                <div className="flex-1 text-right">
                  {savedResult.quiz[text]}
                </div>
              </div>
            ))}
          </div>

          {Object.keys(savedResult.details).length > 0 && (
            <div
              className={cx(
                "bg-white flex flex-column gap-3 p-4 mt-6 border-2 border-green-800",
                "details"
              )}
            >
              {Object.keys(savedResult.details).map((text) => (
                <div key={text} className="flex align-items-center gap-4">
                  <div className="text-left" style={{ maxWidth: "50%" }}>
                    {text}
                  </div>
                  <div className="flex-1 text-right">
                    {isUrl(savedResult.details[text].trim()) ? (
                      <Link
                        href={savedResult.details[text]}
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
                      savedResult.details[text]
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {purchaseLink && (
            <div className="flex mt-6 justify-content-center">
              <Link href={purchaseLink} target="_blank">
                <Button
                  disabled={isDeleting}
                  label="Click to Purchase"
                  rel="noopener noreferrer"
                  className="px-3"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedResultDetail;
