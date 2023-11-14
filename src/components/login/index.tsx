'use client';

import React, { useState } from 'react';

import { LoginForm } from './LoginForm';

export const LoginComponent = () => {
	return (
		<>
			<div className="flex align-items-center justify-content-center h-full pb-8">
				<div className="p-4  border-round w-full lg:w-3">
					
					<LoginForm />
				</div>
			</div>
		</>
	);
};
