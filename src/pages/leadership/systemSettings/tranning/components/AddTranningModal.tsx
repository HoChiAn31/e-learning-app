import React from 'react';
import { Button, Checkbox, ConfigProvider, Input, Modal, Switch } from 'antd';
import { Leadership_system_tranning_add_edit } from '../../../../../types/leadership/system';

const { TextArea } = Input;
interface AddTranningModalProps {
	visible: boolean;
	formAdd: Leadership_system_tranning_add_edit;
	setFormAdd: React.Dispatch<React.SetStateAction<Leadership_system_tranning_add_edit>>;
	onOk: () => void;
	onCancel: () => void;
}

const AddTranningModal: React.FC<AddTranningModalProps> = ({
	visible,
	formAdd,
	setFormAdd,
	onOk,
	onCancel,
}) => {
	const modalStyles = {
		header: { textAlign: 'center' as const },
		footer: { textAlign: 'center' as const },
	};

	const handleOnchangeAddUser = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		const { name, value } = e.target;
		setFormAdd((prev: Leadership_system_tranning_add_edit) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCheckboxChange =
		(name: string) =>
		(checked: boolean): void => {
			setFormAdd((prev: Leadership_system_tranning_add_edit) => ({
				...prev,
				[name]: checked,
			}));
		};

	return (
		<Modal
			title='Thiết lập Bậc đào tạo'
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
							Trình độ đào tạo:
						</span>
						<Input
							name='educationlevel' // Fixed name to match value
							placeholder='Nhập'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
							onChange={handleOnchangeAddUser}
							value={formAdd.educationlevel}
						/>
					</div>
					<div className='flex h-5 items-center justify-between gap-10'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Hình thức đào tạo:
						</span>
						<Input
							name='type' // Fixed name to match value
							placeholder='Nhập'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
							onChange={handleOnchangeAddUser}
							value={formAdd.type}
						/>
					</div>
					<div className='space-y-4'>
						<div className='flex h-5 items-center gap-10 pl-48'>
							<div className='flex items-center gap-2'>
								<ConfigProvider theme={{ token: { colorPrimary: '#1677FF' } }}>
									<Checkbox
										checked={formAdd.isEnure}
										onChange={(e) => handleCheckboxChange('isEnure')(e.target.checked)}
									/>
								</ConfigProvider>
								<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									Niên chế
								</div>
							</div>
						</div>
						<div className='pl-48'>
							<div className="font-['Source Sans Pro'] w-[529px] text-base font-normal italic text-[#373839]">
								Đào tạo theo niên chế là đào tạo them đơn vị năm học.
								<br />
								Mỗi chương trình đào tạo của một ngành, nghề được thực hiện trong một số tháng hoặc
								năm nhất định.
								<br />
								Mỗi năm học thường được tổ chức thành hai học kỳ.
							</div>
						</div>

						<div className='pl-48'>
							<div className='flex items-center gap-2'>
								<ConfigProvider theme={{ token: { colorPrimary: '#1677FF' } }}>
									<Checkbox
										checked={formAdd.isCredit}
										onChange={(e) => handleCheckboxChange('isCredit')(e.target.checked)}
									/>
								</ConfigProvider>
								<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									Tín chỉ
								</div>
							</div>
						</div>
					</div>
					<div className='flex h-5 items-center gap-10'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Thời gian đào tạo:
						</span>
						<div className='flex w-full items-center justify-between pl-12'>
							<div className='flex items-center'>
								<Input
									name='trainingTimeYears'
									className='h-10 w-[60px] bg-[#F0F3F6]'
									variant='filled'
									onChange={handleOnchangeAddUser}
									value={formAdd.trainingTimeYears}
								/>
								<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									Năm
								</p>
							</div>
							<div className='flex items-center'>
								<Input
									name='requiredCourses'
									className='h-10 w-[60px] bg-[#F0F3F6]'
									variant='filled'
									onChange={handleOnchangeAddUser}
									value={formAdd.requiredCourses}
								/>
								<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									Học phần bắt buộc
								</p>
							</div>
							<div className='flex items-center'>
								<Input
									name='electiveCourses'
									className='h-10 w-[60px] bg-[#F0F3F6]'
									variant='filled'
									onChange={handleOnchangeAddUser}
									value={formAdd.electiveCourses}
								/>
								<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									Học phần tự chọn
								</p>
							</div>
						</div>
					</div>
					<div className='flex items-start justify-between gap-10'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Ghi chú:
						</span>
						<TextArea
							name='description'
							placeholder='Nhập ghi chú'
							className='w-[561px] bg-[#F0F3F6]'
							onChange={handleOnchangeAddUser}
							value={formAdd.description}
							rows={4}
						/>
					</div>
					<div className='pl-48'>
						<div className='flex items-center gap-2'>
							<ConfigProvider theme={{ token: { colorPrimary: '#1677FF' } }}>
								<Checkbox
									checked={formAdd.status}
									onChange={(e) => handleCheckboxChange('status')(e.target.checked)}
								/>
							</ConfigProvider>
							<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
								Kích hoạt
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default AddTranningModal;
