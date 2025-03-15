import { Button, Input, Modal, Select } from 'antd';
import { useState, useEffect, ChangeEvent } from 'react';
import { dataDeclaration_subject } from '../../../../types/leadership';

// Constants
const SUBJECT_TYPES = [
	{ value: 'Môn học bắt buộc', label: 'Môn học bắt buộc' },
	{ value: 'Môn học tự chọn', label: 'Môn học tự chọn' },
];

const SUBJECT_GROUPS = [
	{ value: 'Khoa học tự nhiên', label: 'Khoa học tự nhiên' },
	{ value: 'Văn hóa xã hội', label: 'Văn hóa xã hội' },
] as const;

const SUBJECT_OPTIONS: Record<SubjectGroup, Array<{ value: string; label: string }>> = {
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

const MODAL_STYLES = {
	header: { textAlign: 'center' as const },
	footer: { textAlign: 'center' as const },
};

const INPUT_WIDTH = '!w-[561px]';

// Types
type SubjectGroup = 'Khoa học tự nhiên' | 'Văn hóa xã hội';

interface EditModalProps {
	visible: boolean;
	subject: dataDeclaration_subject | null;
	onOk: (data: dataDeclaration_subject) => void;
	onCancel: () => void;
}

// Form Field Component
const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<div className='flex h-5 items-center'>
		<div className='flex min-w-36 items-start justify-start'>
			<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
				{label}
			</div>
		</div>
		{children}
	</div>
);

// Main Component
export const EditModal: React.FC<EditModalProps> = ({ visible, subject, onOk, onCancel }) => {
	const [formData, setFormData] = useState({
		id: '',
		subjectGroup: '' as SubjectGroup,
		subjectName: '',
		subjectCode: '',
		subjectType: '',
		numberLessonSemester1: 0,
		numberLessonSemester2: 0,
	});

	useEffect(() => {
		if (subject) {
			console.log('subject:', subject); // Kiểm tra subject có giá trị đúng không
			setFormData({
				id: subject.id || '',
				subjectGroup: (subject.subjectGroup as SubjectGroup) || '',
				subjectName: subject.subjectName || '',
				subjectCode: subject.subjectCode || '',
				subjectType: subject.subjectType || '',
				numberLessonSemester1: subject.numberLessonSemester1 || 0,
				numberLessonSemester2: subject.numberLessonSemester2 || 0,
			});
		}
	}, [subject]);
	console.log('formData:', formData);
	console.log('Available subject options:', SUBJECT_OPTIONS[formData.subjectGroup]);
	const handleChange = (field: keyof typeof formData) => (value: string | number) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleNumberChange =
		(field: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement>) => {
			const value = Number(e.target.value) || 0;
			setFormData((prev) => ({ ...prev, [field]: value }));
		};

	const handleSubmit = () => {
		console.log('Dữ liệu khi cập nhật:', formData);
		onOk(formData);
	};

	return (
		<Modal
			title='Sửa Tổ - Bộ môn'
			open={visible}
			onOk={handleSubmit}
			onCancel={onCancel}
			styles={MODAL_STYLES}
			width={800}
			footer={[
				<Button className='w-40' key='back' onClick={onCancel}>
					Hủy
				</Button>,
				<Button className='w-40' key='submit' type='primary' onClick={handleSubmit}>
					Lưu
				</Button>,
			]}
		>
			<>
				<div className='space-y-10 py-5'>
					<div className='space-y-10'>
						<FormField label='Tổ - Bộ môn:'>
							<Select
								value={formData.subjectGroup}
								onChange={(value) => {
									handleChange('subjectGroup')(value);
									handleChange('subjectName')('');
								}}
								className={INPUT_WIDTH}
								options={[...SUBJECT_GROUPS]}
							/>
						</FormField>

						<FormField label='Tên môn học:'>
							<Select
								value={formData.subjectName || undefined}
								onChange={handleChange('subjectName')}
								placeholder='Chọn môn học'
								className={INPUT_WIDTH}
								options={SUBJECT_OPTIONS[formData.subjectGroup] || []}
							/>
						</FormField>

						<FormField label='Mã môn:'>
							<Input
								value={formData.subjectCode || undefined}
								onChange={(e) => handleChange('subjectCode')(e.target.value)}
								placeholder='Nhập mã môn'
								className='h-10 bg-[#F0F3F6]'
								variant='filled'
							/>
						</FormField>

						<FormField label='Loại môn học:'>
							<Select
								value={formData.subjectType}
								onChange={handleChange('subjectType')}
								className={INPUT_WIDTH}
								options={SUBJECT_TYPES}
							/>
						</FormField>
					</div>

					<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]' />

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
									value={formData.numberLessonSemester1}
									onChange={handleNumberChange('numberLessonSemester1')}
									placeholder='Nhập số tiết'
								/>
							</div>
							<div className='flex items-center gap-1'>
								<p className="font-['Source Sans Pro'] w-24 text-base font-bold tracking-tight text-[#373839]">
									Học kì II:
								</p>
								<Input
									value={formData.numberLessonSemester2}
									onChange={handleNumberChange('numberLessonSemester2')}
									placeholder='Nhập số tiết'
								/>
							</div>
						</div>
					</div>
				</div>
			</>
		</Modal>
	);
};
