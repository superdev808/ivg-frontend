'use client';

import React, { useState } from 'react';

import { LoginForm } from './LoginForm';
import styles from './Login.module.scss';
export const LoginComponent = () => {
	return (
		<>
			<div className={'flex  align-items-center justify-content-center  ' + styles.background}>
				<div className="p-4  border-round w-full lg:w-3">
					<LoginForm />
				</div>
			</div>
		</>
	);
};
