
export type FormErrorMessageProps = {
	message?: string;
};

export const FormErrorMessage = ({ message }: FormErrorMessageProps) => {

	if (!message)
		return (
			<div className="m-1">
				<small className="p-error">&nbsp;</small>
			</div>
		);
	
	return (
		<div className="m-1">
			<small className="p-error">{message}</small>
		</div>
	);
};
