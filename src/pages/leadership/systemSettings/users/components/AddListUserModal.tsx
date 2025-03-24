import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, Modal, Select, Switch } from 'antd';
import { GroupUsers, userAdd_Add_Edit } from '../type';
import { getGroupUsers } from '../../../../../firebase/systems/groupUser';

interface AddListUserModalProps {
	visible: boolean;
	onOk: (data: userAdd_Add_Edit) => void;
	onCancel: () => void;
}

const AddListUserModal: React.FC<AddListUserModalProps> = ({ visible, onOk, onCancel }) => {
	const modalStyles = {
		header: { textAlign: 'center' as const },
		footer: { textAlign: 'center' as const },
	};

	// Khởi tạo userAdd với status là boolean
	const [userAdd, setUserAdd] = useState<userAdd_Add_Edit>({
		name: '',
		groupUser: '',
		email: '',
		status: false, // Sử dụng boolean thay vì chuỗi
	});

	const [groupOptions, setGroupOptions] = useState<{ value: string; label: string }[]>([]);

	const fetchDataGroupUser = async () => {
		const data = await getGroupUsers();
		console.log(data);
		const options = data.map((group) => ({
			value: group.id,
			label: group.groupName,
		}));
		setGroupOptions(options);
	};

	useEffect(() => {
		fetchDataGroupUser();
	}, []);

	const handleOnchangeAddUser = (
		e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } },
	): void => {
		const { name, value } = e.target;
		setUserAdd((prev: userAdd_Add_Edit) => ({ ...prev, [name]: value }));
	};

	// Sử dụng boolean trực tiếp cho status
	const onChangeStatus = (checked: boolean): void => {
		setUserAdd((prev: userAdd_Add_Edit) => ({ ...prev, status: checked }));
	};

	const handleOnOk = () => {
		onOk(userAdd); // Gọi prop onOk từ parent
	};

	return (
		<Modal
			title='Thiết lập người dùng'
			open={visible}
			onOk={handleOnOk}
			onCancel={onCancel}
			styles={modalStyles}
			width={800}
			footer={[
				<Button key='back' onClick={onCancel}>
					Hủy
				</Button>,
				<Button key='submit' type='primary' onClick={handleOnOk}>
					Lưu
				</Button>,
			]}
		>
			<div className='py-5'>
				<div className='space-y-10'>
					<div className='flex h-5 items-center justify-between gap-10'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Tên: <span className='text-[#ed2025]'>*</span>
						</span>
						<Input
							name='name'
							placeholder='Nhập tên'
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
						<Select
							className='h-10 w-[561px]'
							style={{ backgroundColor: '#F0F3F6' }}
							onChange={(value) => handleOnchangeAddUser({ target: { name: 'groupUser', value } })}
							value={userAdd.groupUser}
							placeholder='Chọn nhóm người dùng'
							options={groupOptions}
						/>
					</div>
					<div className='flex items-start pl-48'>
						<div className='flex items-center gap-2'>
							<ConfigProvider theme={{ token: { colorPrimary: '#1677FF' } }}>
								<Switch
									checked={userAdd.status} // Sử dụng trực tiếp boolean
									onChange={onChangeStatus}
								/>
							</ConfigProvider>
							<span className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
								{userAdd.status ? 'Đang hoạt động' : 'Đã vô hiệu hóa'} {/* Đảo ngược điều kiện */}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default AddListUserModal;
