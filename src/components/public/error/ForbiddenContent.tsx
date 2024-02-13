export const ForbiddenContent = () => {
	return (
		<>
			<div className="bg-secondary h-5rem "></div>
			<div className="flex flex-grow-1">
				<div className="flex flex-column align-items-center justify-content-center flex-grow-1">
					<h1>Forbidden</h1>
					<p>You do not have permission to view this page. Please contact your administrator for access.</p>
				</div>
			</div>
			<div className="h-1rem bg-secondary"></div>
		</>
	);
};