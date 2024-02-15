import cx from "classnames";

export type FormErrorMessageProps = {
  message?: string;
  className?: string;
};

export const FormErrorMessage = ({
  message,
  className,
}: FormErrorMessageProps) => {
  if (!message)
    return (
      <div className={cx("m-1", className)}>
        <small className="p-error">&nbsp;</small>
      </div>
    );

  return (
    <div className={cx("m-1", className)}>
      <small className="p-error">{message}</small>
    </div>
  );
};
