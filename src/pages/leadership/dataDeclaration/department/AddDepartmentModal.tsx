import { Button, Input, Modal, Select } from 'antd';
import { Minus, Plus } from '../../../../components/icon';
import { Department } from '../../../../firebase/dataDeclaration/types';
import { addDepartment } from '../../../../firebase/dataDeclaration/fetchDepartment';
import { useState } from 'react';

interface DepartmentState {
	departmentName: string;
	headOfDepartment: string;
	subjectList: string[];
}

interface AddDepartmentModalProps {
	isModalOpen: boolean;
	onOk: (data: DepartmentState) => void;
	onCancel: () => void;
}

const dataTeachers = [
	{ value: 'Nguyễn Văn A', label: 'Nguyễn Văn A' },
	{ value: 'Trần Thị B', label: 'Trần Thị B' },
	{ value: 'Lê Văn C', label: 'Lê Văn C' },
	{ value: 'Huỳnh Thanh D', label: 'Huỳnh Thanh D' },
	{ value: 'Nguyễn Thanh E', label: 'Nguyễn Thanh E' },
	{ value: 'Đào Thị F', label: 'Đào Thị F' },
	{ value: 'Phạm Văn G', label: 'Phạm Văn G' },
];

const subjects = [
	{ value: 'Toán học', label: 'Toán học' },
	{ value: 'Vật lý', label: 'Vật lý' },
	{ value: 'Hóa học', label: 'Hóa học' },
	{ value: 'Sinh học', label: 'Sinh học' },
	{ value: 'Lịch sử', label: 'Lịch sử' },
	{ value: 'Anh văn', label: 'Anh văn' },
	{ value: 'Ngữ văn', label: 'Ngữ văn' },
	{ value: 'Địa lý', label: 'Địa lý' },
	{ value: 'Tin học', label: 'Tin học' },
	{ value: 'Giáo dục công dân', label: 'Giáo dục công dân' },
];

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

export default function AddDepartmentModal({
	isModalOpen,
	onOk,
	onCancel,
}: AddDepartmentModalProps) {
	const [department, setDepartment] = useState<DepartmentState>({
		departmentName: '',
		headOfDepartment: '',
		subjectList: [],
	});
	const [showSelect, setShowSelect] = useState(false);

	const handleOk = () => {
		onOk(department);
		setDepartment({ departmentName: '', headOfDepartment: '', subjectList: [] });
		setShowSelect(false);
	};

	const handleCancel = () => {
		onCancel();
		setDepartment({ departmentName: '', headOfDepartment: '', subjectList: [] });
		setShowSelect(false);
	};

	const addSubject = (value: string) => {
		if (!department.subjectList.includes(value)) {
			setDepartment({ ...department, subjectList: [...department.subjectList, value] });
		}
		setShowSelect(false);
	};

	const removeSubject = (subject: string) => {
		setDepartment({
			...department,
			subjectList: department.subjectList.filter((sub) => sub !== subject),
		});
	};

	const addSemester = () => {
		setShowSelect(true);
	};

	return (
		<Modal
			title='Thêm Tổ - Bộ môn mới'
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			styles={modalStyles}
			width={800}
			footer={[
				<Button key='back' onClick={handleCancel}>
					Hủy
				</Button>,
				<Button key='submit' className='bg-primary' type='primary' onClick={handleOk}>
					Lưu
				</Button>,
			]}
		>
			<div className='py-5'>
				<div className='space-y-10'>
					<div className='flex h-5 items-center justify-between'>
						<div className='flex items-start justify-start'>
							<div className='flex items-center justify-center gap-0.5'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tổ - Bộ môn:
								</div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</div>
							</div>
						</div>

						<Select
							value={department.departmentName || undefined}
							onChange={(value: string) => setDepartment({ ...department, departmentName: value })}
							placeholder='Chọn tên tổ - bộ môn'
							className='h-10 w-[561px]'
							options={[
								{ value: 'Khoa học tự nhiên', label: 'Khoa học tự nhiên' },
								{ value: 'Văn hóa xã hội', label: 'Văn hóa xã hội' },
							]}
						/>
					</div>

					<div className='flex h-5 items-center justify-between'>
						<div className='flex items-start justify-start'>
							<div className='flex items-center justify-center gap-0.5'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Trưởng tổ - Bộ môn:
								</div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</div>
							</div>
						</div>

						<Select
							value={department.headOfDepartment || undefined}
							onChange={(value: string) =>
								setDepartment({ ...department, headOfDepartment: value })
							}
							placeholder='Chọn tên tổ - bộ môn'
							className='h-10 w-[561px]'
							options={dataTeachers}
						/>
					</div>
				</div>

				<div className='my-8 h-[0px] w-[756px] border border-[#c8c4c0]'></div>

				<div className='space-y-3'>
					<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
						Danh sách môn học
					</p>
					<div className='space-y-4'>
						{department.subjectList.length > 0 && (
							<div className='grid grid-cols-3 gap-4'>
								{department.subjectList.map((sub) => (
									<div className='flex items-center gap-1' key={sub}>
										<div
											onClick={() => removeSubject(sub)}
											className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
										>
											<Minus />
										</div>
										<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
											{sub}
										</div>
									</div>
								))}
							</div>
						)}
						{showSelect && (
							<Select
								placeholder='Chọn môn học'
								style={{ width: '100%' }}
								onChange={addSubject}
								className='mt-2'
								options={subjects}
							/>
						)}

						<div className='flex cursor-pointer gap-2' onClick={addSemester}>
							<div className='inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'>
								<Plus />
							</div>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#0a7feb]">
								Thêm môn học mới
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}
