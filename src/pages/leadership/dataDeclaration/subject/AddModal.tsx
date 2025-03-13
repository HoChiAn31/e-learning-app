import { Button, Input, Modal, Select } from 'antd';
import { useState } from 'react';

interface AddModalProps {
	visible: boolean;
	onOk: (data: {
		subjectGroup: string;
		subjectName: string;
		subjectCode: string;
		subjectType: string;
		numberLessonSemester1: number;
		numberLessonSemester2: number;
	}) => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

// Định nghĩa type cho subjectOptions
type SubjectGroup = 'Khoa học tự nhiên' | 'Văn hóa xã hội';
type SubjectOption = { value: string; label: string };
const subjectOptions: Record<SubjectGroup, SubjectOption[]> = {
	'Khoa học tự nhiên': [
		{ value: 'Toán', label: 'Toán' },
		{ value: 'Lý', label: 'Lý' },
		{ value: 'Hóa', label: 'Hóa' },
		{ value: 'Anh văn', label: 'Anh văn' },
	],
	'Văn hóa xã hội': [
		{ value: 'Văn', label: 'Văn' },
		{ value: 'Sử', label: 'Sử' },
		{ value: 'Địa', label: 'Địa' },
		{ value: 'Anh văn', label: 'Anh văn' },
		{ value: 'Giáo dục công dân', label: 'Giáo dục công dân' },
	],
};

export const AddModal: React.FC<AddModalProps> = ({ visible, onOk, onCancel }) => {
	const [subjectGroup, setSubjectGroup] = useState<SubjectGroup>('Khoa học tự nhiên');
	const [subjectName, setSubjectName] = useState<string>('');
	const [subjectCode, setSubjectCode] = useState<string>('');
	const [subjectType, setSubjectType] = useState<string>('Môn học bắt buộc');
	const [numberLessonSemester1, setNumberLessonSemester1] = useState<number>(45);
	const [numberLessonSemester2, setNumberLessonSemester2] = useState<number>(24);

	const handleSubjectGroupChange = (value: SubjectGroup) => {
		setSubjectGroup(value);
		setSubjectName(''); // Reset subjectName khi thay đổi tổ - bộ môn
	};

	const handleSubjectNameChange = (value: string) => setSubjectName(value);
	const handleSubjectCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSubjectCode(e.target.value);
	const handleSubjectTypeChange = (value: string) => setSubjectType(value);
	const handleSemester1Change = (e: React.ChangeEvent<HTMLInputElement>) =>
		setNumberLessonSemester1(Number(e.target.value) || 0);
	const handleSemester2Change = (e: React.ChangeEvent<HTMLInputElement>) =>
		setNumberLessonSemester2(Number(e.target.value) || 0);

	const handleSubmit = () => {
		const data = {
			subjectGroup,
			subjectName,
			subjectCode,
			subjectType,
			numberLessonSemester1,
			numberLessonSemester2,
		};
		console.log('Dữ liệu khi lưu:', data);
		onOk(data);
		// Reset form
		setSubjectGroup('Khoa học tự nhiên');
		setSubjectName('');
		setSubjectCode('');
		setSubjectType('Môn học bắt buộc');
		setNumberLessonSemester1(45);
		setNumberLessonSemester2(24);
	};

	const handleCancelModal = () => {
		// Reset form khi hủy
		setSubjectGroup('Khoa học tự nhiên');
		setSubjectName('');
		setSubjectCode('');
		setSubjectType('Môn học bắt buộc');
		setNumberLessonSemester1(45);
		setNumberLessonSemester2(24);
		onCancel();
	};

	return (
		<Modal
			title='Thêm Tổ - Bộ môn mới'
			open={visible}
			onOk={handleSubmit}
			onCancel={handleCancelModal}
			styles={modalStyles}
			width={800}
			footer={[
				<Button className='w-40' key='back' onClick={handleCancelModal}>
					Hủy
				</Button>,
				<Button className='w-40' key='submit' type='primary' onClick={handleSubmit}>
					Lưu
				</Button>,
			]}
		>
			<div className='py-5'>
				<div className='space-y-10'>
					<div className='flex h-5 items-center'>
						<div className='flex min-w-36 items-start justify-start'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Tổ - Bộ môn:
							</div>
						</div>
						<Select
							value={subjectGroup}
							onChange={handleSubjectGroupChange}
							className='!w-[561px]'
							options={[
								{ value: 'Khoa học tự nhiên', label: 'Khoa học tự nhiên' },
								{ value: 'Văn hóa xã hội', label: 'Văn hóa xã hội' },
							]}
						/>
					</div>
					<div className='flex h-5 items-center'>
						<div className='flex min-w-36 items-start justify-start'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Tên môn học:
							</div>
						</div>
						<Select
							value={subjectName || undefined}
							onChange={handleSubjectNameChange}
							placeholder='Chọn môn học'
							className='!w-[561px]'
							options={subjectOptions[subjectGroup]}
						/>
					</div>
					<div className='flex h-5 items-center'>
						<div className='flex min-w-36 items-start justify-start'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Mã môn:
							</div>
						</div>
						<Input
							value={subjectCode}
							onChange={handleSubjectCodeChange}
							placeholder='Nhập mã môn'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
						/>
					</div>
					<div className='flex h-5 items-center'>
						<div className='flex min-w-36 items-start justify-start'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Loại môn học:
							</div>
						</div>
						<Select
							value={subjectType}
							onChange={handleSubjectTypeChange}
							className='!w-[561px]'
							options={[
								{ value: 'Môn học bắt buộc', label: 'Môn học bắt buộc' },
								{ value: 'Môn học tự chọn', label: 'Môn học tự chọn' },
							]}
						/>
					</div>
				</div>
				<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
				<div>
					<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
						Số tiết/Học kì
					</p>
					<div className='flex items-center justify-between py-5'>
						<div className='flex items-center gap-1'>
							<p className="font-['Source Sans Pro'] w-24 text-base font-bold tracking-tight text-[#373839]">
								Học kì I:
							</p>
							<Input
								value={numberLessonSemester1}
								onChange={handleSemester1Change}
								placeholder='Nhập số tiết'
							/>
						</div>
						<div className='flex items-center gap-1'>
							<p className="font-['Source Sans Pro'] w-24 text-base font-bold tracking-tight text-[#373839]">
								Học kì II:
							</p>
							<Input
								value={numberLessonSemester2}
								onChange={handleSemester2Change}
								placeholder='Nhập số tiết'
							/>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};
