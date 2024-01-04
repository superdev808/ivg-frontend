'use client';

import React, { useState } from 'react';

import  ResetForm  from './ResetForm';

export const ResetComponent = () => {
	return (
		<>
			<div className="flex align-items-center justify-content-center h-full pb-8">
				<div className="p-4  border-round w-full lg:w-5">
					<div className="text-center mb-5">
						
						{/* <span className="text-600 font-medium line-height-3">Don't have an account?</span> */}
						{/* <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a> */}
					</div>
					<ResetForm />
				</div>
			</div>
		</>
	);
};
