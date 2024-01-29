'use client';

import React, { useState } from 'react';
import { ForgotHeader } from './ForgotHeader';
import ForgotForm from './ForgotForm';
import { ForgotComplete } from './ForgotComplete';

export const ForgotComponent = () => {
	const [requestedEmail, setRequestedEmail] = useState<string | null>(null);
	return (
		<>
			<div className="background-gradient"></div>
			<div className="container ">
				<div className="wrapper h-full flex flex-column align-items-center justify-content-center">
					{!requestedEmail  ? (
						<>
							<ForgotHeader />
							<ForgotForm setRequestedEmail={setRequestedEmail} />
						</>
					) : (
						<><ForgotComplete requestedEmail={requestedEmail}/></>
					)}
				
				</div>
			</div>
		</>
	);
};
