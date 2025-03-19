import React from 'react';
import { Button, ConfigProvider, Input, Modal, Switch } from 'antd';
import { SystemSettings_subject_Add_Edit } from '../type';

interface AddListUserModalProps {
	visible: boolean;
	userAdd: SystemSettings_subject_Add_Edit;
	setUserAdd: React.Dispatch<React.SetStateAction<SystemSettings_subject_Add_Edit>>;
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

	const handleOnchangeAddUser = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setUserAdd((prev: SystemSettings_subject_Add_Edit) => ({ ...prev, [name]: value }));
	};

	const onChangeStatus = (checked: boolean): void => {
		setUserAdd((prev: SystemSettings_subject_Add_Edit) => ({
			...prev,
			classStatus: checked ? true : false,
		}));
	};

	return (
		<Modal
			title='Thiệt lập môn học'
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
							Loại môn học:
						</span>
						<Input
							name='subjectType'
							placeholder='Nhập loại môn học'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
							onChange={handleOnchangeAddUser}
							value={userAdd.subjectType}
						/>
					</div>
					<div className='flex h-5 items-center gap-28'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Trạng thái:
						</span>
						<div className='flex items-center gap-2'>
							<ConfigProvider theme={{ token: { colorPrimary: '#1677FF' } }}>
								<Switch defaultChecked={userAdd.subjectStatus === true} onChange={onChangeStatus} />
							</ConfigProvider>
							<span className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
								{userAdd.subjectStatus === false ? 'Đã vô hiệu hóa' : 'Đang hoạt động'}
							</span>
						</div>
					</div>
					<div className='flex h-5 items-center justify-between gap-10'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Ghi chú
						</span>
						<Input
							name='description'
							placeholder='Nhập ghi chú'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
							onChange={handleOnchangeAddUser}
							value={userAdd.description}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default AddListUserModal;
