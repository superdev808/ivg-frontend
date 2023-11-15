'use client';

import React, { useState } from 'react';

import { LoginForm } from './LoginForm';

export const LoginComponent = () => {
	return (
		<>
<<<<<<< HEAD
			<div className="flex align-items-center justify-content-center h-full pb-8">
				<div className="p-4  border-round w-full lg:w-3">
					
=======
			<div className="flex align-items-center justify-content-center  h-full">
				<div className="p-4  border-round w-full lg:w-2">
					<div className="text-center mb-5">
						<div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
						{/* <span className="text-600 font-medium line-height-3">Don't have an account?</span> */}
						{/* <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a> */}
					</div>
>>>>>>> 23b289bfa06a4f5d4b4db64349e8ac9934ab4e3f
					<LoginForm />
				</div>
			</div>
		</>
	);
};
