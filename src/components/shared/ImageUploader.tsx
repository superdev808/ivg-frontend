import { File } from "buffer";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
} from "primereact/fileupload";
import { Image } from "primereact/image";
import { useRef } from "react";

type ImageUploaderProps = {
  header: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpload: (file: File) => void;
};

const ImageUploader = ({
  header,
  visible,
  setVisible,
  handleUpload,
}: ImageUploaderProps) => {
  const fileUploadRef = useRef<FileUpload>(null);

  const handleFileChange = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.getInput().click();
    }
  };

  const emptyTemplate = () => {
    return (
      <Button
        onClick={handleFileChange}
        className="flex align-items-center flex-column bg-transparent w-full "
      >
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--light-green)",
            color: "var(--beige)",
          }}
        />
        <span
          style={{ fontSize: "1.2em", color: "var(--dark-green)" }}
          className="my-5"
        >
          Choose an image or drag it here.
        </span>
      </Button>
    );
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { chooseButton } = options;

    return <>{chooseButton}</>;
  };

  const itemTemplate = (file, props) => {
    return (
      <div
        className="flex align-items-center justify-content-center "
        onClick={handleFileChange}
      >
        <Button className="bg-white">
          <Image
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            height="150px"
          />
        </Button>
      </div>
    );
  };

  const footerContent = () => {
    return (
      <>
        <div className="flex justify-content-end">
          <Button
            label="Save"
            className="p-button-rounded bg-secondary m-2 p-button-outlined"
            onClick={() => {
              if (fileUploadRef.current) {
                handleUpload(fileUploadRef.current.getFiles()[0]);
              }
            }}
          />
        </div>
      </>
    );
  };

  return (
    <Dialog
      header={header}
      modal
      draggable={false}
      visible={visible}
      onHide={() => {
        setVisible(false);
      }}
      footer={footerContent}
      style={{ width: "30vw" }}
      headerClassName="text-dark-green"
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <span className="text-sm">
        Please attach a clear image of your logo. PNG, JPG, and JPEG file are
        allowed.
      </span>
      <div className="mt-2 h-20rem">
        <FileUpload
          ref={fileUploadRef}
          name="image"
          url="/api/upload"
          accept="image/png, image/jpg, image/jpeg"
          maxFileSize={1000000}
          emptyTemplate={emptyTemplate}
          headerTemplate={headerTemplate}
          chooseOptions={{ className: "hidden" }}
          itemTemplate={itemTemplate}
          pt={{
            root: { className: "h-full hover:cursor-pointer" },
            content: {
              className:
                "flex py-4 h-full justify-content-center align-items-center",
            },
            progressbar: { root: { className: "hidden" } },
          }}
        />
      </div>
    </Dialog>
  );
};

export default ImageUploader;
