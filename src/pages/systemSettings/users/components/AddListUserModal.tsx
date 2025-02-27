import React from 'react';
import { Button, ConfigProvider, Input, Modal, Switch } from 'antd';
import { userAdd } from '../type';

interface AddListUserModalProps {
	visible: boolean;
	userAdd: userAdd;
	setUserAdd: React.Dispatch<React.SetStateAction<userAdd>>;
	onOk: () => void;
	onCancel: () => void;
}

const AddListUserModal: React.FC<AddListUserModalProps> = ({
	visible,
	userAdd,
	setUserAdd,
	onOk,
	onCancel,
}) => {
	const modalStyles = {
		header: { textAlign: 'center' as const },
		footer: { textAlign: 'center' as const },
	};
	console.log(userAdd);
	const handleOnchangeAddUser = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setUserAdd((prev: userAdd) => ({ ...prev, [name]: value }));
	};

	const onChangeStatus = (checked: boolean): void => {
		setUserAdd((prev: userAdd) => ({ ...prev, status: checked ? 'true' : 'false' }));
	};

	return (
		<Modal
			title='Thiệt lập người dùng'
			open={visible}
			onOk={onOk}
			onCancel={onCancel}
			styles={modalStyles}
			width={800}
			footer={[
				<Button key='back' onClick={onCancel}>
					Hủy
				</Button>,
				<Button key='submit' type='primary' onClick={onOk}>
					Lưu
				</Button>,
			]}
		>
			<div className='py-5'>
				<div className='space-y-10'>
					<div className='flex h-5 items-center justify-between gap-10'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Tên nhóm: <span className='text-[#ed2025]'>*</span>
						</span>
						<Input
							name='name'
							placeholder='Nhập tên nhóm'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
							onChange={handleOnchangeAddUser}
							value={userAdd.name}
						/>
					</div>
					<div className='flex h-5 items-center justify-between gap-10'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Email: <span className='text-[#ed2025]'>*</span>
						</span>
						<Input
							name='email'
							placeholder='Nhập email'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
							onChange={handleOnchangeAddUser}
							value={userAdd.email}
						/>
					</div>
					<div className='flex h-5 items-center justify-between gap-10'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Nhóm người dùng: <span className='text-[#ed2025]'>*</span>
						</span>
						<Input
							name='groupUser'
							placeholder='Nhập nhóm người dùng'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
							onChange={handleOnchangeAddUser}
							value={userAdd.groupUser}
						/>
					</div>
					<div className='flex items-start pl-48'>
						<div className='flex items-center gap-2'>
							<ConfigProvider theme={{ token: { colorPrimary: '#1677FF' } }}>
								<Switch defaultChecked={userAdd.status === 'true'} onChange={onChangeStatus} />
							</ConfigProvider>
							<span className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
								{userAdd.status === 'false' ? 'Đã vô hiệu hóa' : 'Đang hoạt động'}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default AddListUserModal;
