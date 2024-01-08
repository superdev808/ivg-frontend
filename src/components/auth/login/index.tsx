'use client';

import React, { useState } from 'react';

import { LoginForm } from './LoginForm';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import { LoginHeader } from './LoginHeader';

const cx = classNames.bind(styles);

export const LoginComponent = () => {
	return (
		<>
			<div className="background-gradient"></div>
			<div className="container ">
				<div className="wrapper h-full flex flex-column align-items-center justify-content-center">
					<LoginHeader />
					<LoginForm />
				</div>
			
			</div>
		</>
	);
};
