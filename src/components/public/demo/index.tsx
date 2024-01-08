'use client';

import React, { useState } from 'react';

import { DemoForm } from './DemoForm';
import { relative } from 'path';

export const DemoComponent = () => {
	return (
		<>
			<div  className="flex align-items-center justify-content-center h-full ">
				<div className="flex  border-round w-full h-full lg:w-8  p-6 ">
					<div className="hidden lg:flex lg:w-5 h-full border-1 border-gray-400 bg-gray-200 rounded" >
						
					</div>
					<div className="w-full lg:w-5">
						test{/* <DemoForm /> */}
					</div>
				</div>
			</div>
		</>
	);
};
