import React, { useRef, useState } from 'react';
import styles from '@/components/secure/admin/Admin.module.scss';
import classNames from 'classnames/bind';
import {
	useGetUsersListQuery,
	usePostDeactivateUserMutation,
	usePostSendResetPasswordMutation,
	usePostSendVerificationEmailMutation,
} from '@/redux/hooks/apiHooks';

import AdminEditUser from './AdminForms/AdminEditUser';
import { EditUser } from '@/types/UserTypes';

import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast, ToastMessage } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';

const cx = classNames.bind(styles);

const AdminUserManagement = () => {
	const { data, refetch } = useGetUsersListQuery({});
	const [postSendResetPassword] = usePostSendResetPasswordMutation();
	const [postSendVerificationEmail] = usePostSendVerificationEmailMutation();
	const [postDeactivateUser] = usePostDeactivateUserMutation();
	const toast = useRef(null);

	const [visibleEditUser, setVisibleEditUser] = useState(false);
	const [selectedUser, setSelectedUser] = useState<EditUser | null>(null);

	const menuPanel = useRef<OverlayPanel>(null);

	const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

	const [filters, setFilters] = useState<DataTableFilterMeta>({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	const onEditUser = () => {
		setVisibleEditUser(true);
	};
	const onUpdateUser = (response: { label: string; message: string }) => {
		refetch();
		showToast(response, toast, 'success');
	};

	const onSendResetPassword = async (user: EditUser) => {
		confirmDialog({
			message: 'Are you sure you want to proceed?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',

			accept: async () => {
				try {
					const response: any = await postSendResetPassword({ id: user._id });
					if (response.error) {
						throw new Error('An error occurred while sending reset password email.');
					}
					showToast({ label: 'Success', message: 'Reset password email sent successfully.' }, toast, 'success');
				} catch (error) {
					showToast({ label: 'Error', message: 'An error occurred while sending reset password email.' }, toast, 'error');
				}
			},
		});
	};

	const onSendVerificationEmail = async (user: EditUser) => {
		confirmDialog({
			message: 'Are you sure you want to proceed?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',

			accept: async () => {
				try {
					const response: any = await postSendVerificationEmail({ email: user.email });
					if (response.error) {
						throw new Error('An error occurred while sending verification email.');
					}
					showToast({ label: 'Success', message: 'Verification email sent successfully.' }, toast, 'success');
				} catch (error) {
					showToast({ label: 'Error', message: 'An error occurred while sending verification email.' }, toast, 'error');
				}
			},
		});
	};
	const onDeactivateUser = async (user: EditUser) => {
		confirmDialog({
			message: 'Are you sure you want to proceed?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',

			accept: async () => {
				try {
					const response: any = await postDeactivateUser({ id: user._id });
					if (response.error) {
						throw new Error('An error occurred while deactivating user.');
					}
					showToast({ label: 'Success', message: 'User deactivated successfully.' }, toast, 'success');
					refetch();
				} catch (error) {
					showToast({ label: 'Error', message: 'An error occurred while deactivating user.' }, toast, 'error');
				}
			},
		});
	};

	const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		let _filters = { ...filters };

		// @ts-ignore
		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const showToast = (response: { label: string; message: string }, ref: React.RefObject<Toast>, severity: ToastMessage['severity']) => {
		ref.current?.show({ severity: severity, summary: response.label, detail: response.message, life: 3000 });
	};

	const columns = [
		{ field: 'firstName', header: 'First Name', body: (row: EditUser) => <span>{row.firstName}</span>, sortable: true },
		{ field: 'lastName', header: 'Last Name', body: (row: EditUser) => <span>{row.lastName}</span>, sortable: true },
		{ field: 'email', header: 'Email', body: (row: EditUser) => <span>{row.email}</span>, sortable: true },
		{ field: 'role', header: 'Role', body: (row: EditUser) => <span>{row.role}</span>, sortable: true },
		{ field: 'verified', header: 'Verified?', body: (row: EditUser) => verifiedBodyTemplate(row), sortable: true },
		{ field: 'actions', body: (row: EditUser) => actionsBodyTemplate(row), sortable: false },
	];
	const verifiedBodyTemplate = (row: EditUser) => {
		return (
			<div className="flex justify-content-center">
				<div className={cx({ 'text-green-400': row.verified }, 'border-round  w-5 font-bold p-1')}>
					{' '}
					{row.verified ? <i className="pi pi-check-circle"></i> : ''}
				</div>
			</div>
		);
	};
	const actionsBodyTemplate = (row: EditUser) => {
		return (
			<>
				<Button
					icon="pi pi-ellipsis-v"
					rounded
					text
					onClick={(e) => {
						(menuPanel.current as OverlayPanel).toggle(e);
						setSelectedUser(row);
					}}
				/>
				<OverlayPanel
					pt={{ content: { className: 'py-0 px-4 text-sm' }, root: { className: 'border-round-lg	shadow-2 border-1 border-100' } }}
					ref={menuPanel}
					onHide={() => setSelectedUser(null)}>
					<p
						className="cursor-pointer hover:text-gray-600"
						onClick={(e) => {
							onEditUser();
							(menuPanel.current as OverlayPanel).toggle(e);
						}}>
						Edit
					</p>

					{!selectedUser?.verified ? (
						<p
							className="cursor-pointer hover:text-gray-600"
							onClick={() => {
								onSendVerificationEmail(selectedUser as EditUser);
							}}>
							Send Verification Email
						</p>
					) : null}
					<p
						className="cursor-pointer hover:text-gray-600"
						onClick={() => {
							onSendResetPassword(selectedUser as EditUser);
						}}>
						Reset Password
					</p>
					<p
						className="cursor-pointer text-red-500 hover:text-red-600"
						onClick={() => {
							onDeactivateUser(selectedUser as EditUser);
						}}>
						Delete
					</p>
				</OverlayPanel>
			</>
		);
	};

	return (
		<>
			<div className={cx('form-header')}>
				<span className={cx('form-title')}>User Management</span>
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText
						value={globalFilterValue}
						onChange={onGlobalFilterChange}
						placeholder="Search..."
					/>
				</span>
			</div>
			<div>
				<DataTable
					stripedRows
					size={'small'}
					value={data}
					tableStyle={{ minWidth: '50rem' }}
					paginator
					rows={10}
					rowsPerPageOptions={[10, 25, 50]}
					globalFilterFields={['firstName', 'lastName', 'email', 'role']}
					filters={filters}>
					{columns.map((col, i) => (
						<Column
							sortable={col.sortable}
							key={col.field}
							field={col.field}
							header={<div className="flex justify-content-between font-bold">{col.header}</div>}
							body={col.body}
							bodyStyle={{ textAlign: 'start' }}
							pt={{ headerCell: { className: ' py-2 ' }, headerContent: { className: '' } }}
						/>
					))}
				</DataTable>
			</div>
			<Dialog
				draggable={false}
				header="Edit User"
				visible={visibleEditUser}
				modal
				style={{ width: '50vw' }}
				onHide={() => setVisibleEditUser(false)}>
				<AdminEditUser
					user={selectedUser}
					onClose={() => setVisibleEditUser(false)}
					onUpdate={(response) => onUpdateUser(response)}
				/>
			</Dialog>
			<Toast
				ref={toast}
				position="bottom-center"
			/>
			<ConfirmDialog />
		</>
	);
};

export default AdminUserManagement;
