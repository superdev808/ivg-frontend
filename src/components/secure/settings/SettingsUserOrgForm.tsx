'use client';
import styles from '@/components/secure/settings/Settings.module.scss';

import { useGetUserInfoAdditionalQuery, usePostUploadLogoMutation } from '@/redux/hooks/apiHooks';

import classNames from 'classnames/bind';

import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

import { use, useEffect, useRef, useState } from 'react';

import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { set } from 'lodash';
import ImageUploader from '@/components/shared/ImageUploader';

const cx = classNames.bind(styles);

type FormValues = {
	organizationName: string;
};

const defaultValues = {
	organizationName: '',
};

export default function SettingsUserOrgForm() {
	const { data, refetch } = useGetUserInfoAdditionalQuery({});
	const [postUploadLogo, { isLoading }] = usePostUploadLogoMutation();
	const [organization, setOrganization] = useState<any>();
	const [updateMessage, setUpdateMessage] = useState('');

	useEffect(() => {
		refetch();
	}, []);

	const [uploadDialog, setUploadDialog] = useState(false);
	useEffect(() => {
		if (!data) return;
		const orgData = data.data;
		setOrganization(orgData);
		setUpdateMessage('');
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

	const onUploadHandler = async (file) => {
		const formData = new FormData();
		formData.append('image', file);

		try {
			const response = await postUploadLogo(formData).unwrap();

			refetch();
			console.log('Image uploaded successfully:', response);
		} catch (error) {
			console.error('Error uploading image:', error);
		}
		setUploadDialog(false);
	};

	return (
		<div>
			<div className="flex flex-column justify-content-between h-full">
				<div className={cx('form', 'flex flex-column justify-content-be')}>
					<div className={cx('form-header')}>
						<span className={cx('form-title', 'mb-2')}>Organization</span>
						<span className={cx('form-subtitle')}>Update your company or school information</span>
					</div>
					<div className="flex  py-4  align-items-center">
						<div className="flex flex-column px-4 py-2 border-1 border-round-2xl">
							{!organization?.logo ? (
								<Avatar
									label={organization?.organizationName.charAt(0).toUpperCase()}
									shape="circle"
									className="bg-orange-100"
									style={{ width: '100px', height: '100px', fontSize: '3rem' }}
								/>
							) : (
								<>
									<Image
										src={organization.logo}
									
										imageStyle={{maxWidth: '150px', maxHeight: '150px'}}
										alt='org_logo'
									/>
								</>
							)}
							<Button
							onClick={(e) => {
								e.preventDefault;
								setUploadDialog(true);
							}}
							disabled={isLoading}
							icon={isLoading ? 'pi pi-spin pi-spinner' : ''}
							label={'Update'}
							className=" bg-transparent text-600 text-secondary mx-4"
						/>
						</div>
						
						{/* <span className="text-2xl ml-4">{`${organization?.organizationName || ''}`}</span> */}
					</div>
				</div>
				<div className="grid justify-content-end align-items-end">
					<div className="flex align-items-center">
				
					</div>
				</div>
			</div>
			<ImageUploader
				header="Upload your logo"
				visible={uploadDialog}
				setVisible={setUploadDialog}
				handleUpload={onUploadHandler}
			/>
		</div>
	);
}
