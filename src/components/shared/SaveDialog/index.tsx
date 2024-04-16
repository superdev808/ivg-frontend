import { noop } from "lodash";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

interface SaveDialogProps {
  visible: boolean;
  showSaveCalculator?: boolean;
  defaultValue?: string;
  onSaveCalculator?: () => void;
  onSaveResult: (_: string) => void;
  onClose: () => void;
}

const SaveDialog: React.FC<SaveDialogProps> = ({
  visible,
  showSaveCalculator = false,
  defaultValue = "",
  onSaveCalculator = noop,
  onSaveResult,
  onClose,
}) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Dialog
      header="Save Result"
      blockScroll
      className="w-10 md:w-6 xl:w-4"
      visible={visible}
      draggable={false}
      onHide={onClose}
    >
      <div className="flex flex-column gap-4">
        <InputText
          placeholder="Result Name"
          className="p-3"
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
        />

        <div className="flex justify-content-between">
          {showSaveCalculator && (
            <Button
              label="Add Calculator to Favorites"
              size="small"
              onClick={onSaveCalculator}
            />
          )}
          <div className="flex gap-2">
            <Button
              label="Save"
              size="small"
              disabled={!value}
              onClick={() => onSaveResult(value)}
            />
            <Button label="Cancel" size="small" onClick={onClose} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SaveDialog;
