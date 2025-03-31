import React, { useState } from 'react';
import { Modal, Select, Radio, Checkbox, DatePicker, Button, Input } from 'antd';
import moment, { Moment } from 'moment';

const { Option } = Select;

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

interface AddExamScheduleModalProps {
	visible: boolean;
	onCancel: () => void;
	onOk: (values: ExamScheduleFormData) => void;
}

export interface ExamScheduleFormData {
	schoolYear: string | undefined;
	grade: string | undefined;
	classType: string | undefined;
	subject: string | undefined;
	examName: string[];
	duration: string | undefined;
	examDate: string;
	assignmentType: string | undefined;
	allClassTeachers: string[];
	specificTeachers: { class: string; teacher: string }[];
	newAllTeacher: string;
	newClass: string;
	newSpecificTeacher: string;
}

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

const gradeToClasses: { [key: string]: string[] } = {
	'6': ['6A1', '6A2', '6A3'],
	'7': ['7A1', '7A2', '7A3'],
	'8': ['8A1', '8A2', '8A3'],
	'9': ['9A1', '9A2', '9A3'],
	'10': ['10A1', '10A2', '10A3'],
	'11': ['11A1', '11A2', '11A3'],
	'12': ['12A1', '12A2', '12A3'],
};

const AddExamScheduleModal: React.FC<AddExamScheduleModalProps> = ({ visible, onCancel, onOk }) => {
	const [schoolYear, setSchoolYear] = useState<string | undefined>(undefined);
	const [grade, setGrade] = useState<string | undefined>(undefined);
	const [classType, setClassType] = useState<string | undefined>(undefined);
	const [subject, setSubject] = useState<string | undefined>(undefined);
	const [examName, setExamName] = useState<string[]>([]);
	const [customExamName, setCustomExamName] = useState<string>('');
	const [duration, setDuration] = useState<string | undefined>(undefined);
	const [examDate, setExamDate] = useState<string>('');
	const [assignmentType, setAssignmentType] = useState<string | undefined>(undefined);
	const [allClassTeachers, setAllClassTeachers] = useState<string[]>([
		'Nguyễn Văn D',
		'Trần Thị D',
	]);
	const [specificTeachers, setSpecificTeachers] = useState<{ class: string; teacher: string }[]>(
		[],
	);
	const [newAllTeacher, setNewAllTeacher] = useState<string>('');
	const [newClass, setNewClass] = useState<string>('');
	const [newSpecificTeacher, setNewSpecificTeacher] = useState<string>('');
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const availableTeachers = [
		'Nguyễn Văn A',
		'Trần Thị B',
		'Nguyễn Văn C',
		'Trần Thị D',
		'Phạm Văn E',
	];

	const validateFields = () => {
		const newErrors: { [key: string]: string } = {};
		if (!schoolYear) newErrors.schoolYear = 'Vui lòng chọn niên khóa!';
		if (!grade) newErrors.grade = 'Vui lòng chọn khối!';
		if (!classType) newErrors.classType = 'Vui lòng chọn loại lớp học!';
		if (!subject) newErrors.subject = 'Vui lòng chọn môn thi!';
		if (examName.length === 0 && !customExamName) newErrors.examName = 'Vui lòng nhập tên kỳ thi!';
		if (!duration) newErrors.duration = 'Vui lòng nhập thời lượng!';
		if (!examDate) newErrors.examDate = 'Vui lòng chọn ngày làm bài!';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleOk = () => {
		if (validateFields()) {
			const finalExamName = customExamName ? [...examName, customExamName] : examName;
			const values: ExamScheduleFormData = {
				schoolYear,
				grade,
				classType,
				subject,
				examName: finalExamName,
				duration,
				examDate,
				assignmentType,
				allClassTeachers: assignmentType === 'all' ? allClassTeachers : [],
				specificTeachers: assignmentType === 'specific' ? specificTeachers : [],
				newAllTeacher: '',
				newClass: '',
				newSpecificTeacher: '',
			};
			onOk(values);
			resetFields();
		}
	};

	const handleCancel = () => {
		resetFields();
		onCancel();
	};

	const resetFields = () => {
		setSchoolYear(undefined);
		setGrade(undefined);
		setClassType(undefined);
		setSubject(undefined);
		setExamName([]);
		setCustomExamName('');
		setDuration(undefined);
		setExamDate('');
		setAssignmentType(undefined);
		setAllClassTeachers(['Nguyễn Văn D', 'Trần Thị D']);
		setSpecificTeachers([]);
		setNewAllTeacher('');
		setNewClass('');
		setNewSpecificTeacher('');
		setErrors({});
	};

	const handleExamNameChange = (value: string, checked: boolean) => {
		if (checked) {
			setExamName([...examName, value]);
		} else {
			setExamName(examName.filter((item) => item !== value));
		}
	};

	const handleRemoveTeacher = (teacher: string, type: 'all' | 'specific', className?: string) => {
		if (type === 'all') {
			setAllClassTeachers(allClassTeachers.filter((t) => t !== teacher));
		} else if (type === 'specific' && className) {
			setSpecificTeachers(
				specificTeachers.filter((t) => t.class !== className || t.teacher !== teacher),
			);
		}
	};

	const handleAddAllTeacher = () => {
		if (newAllTeacher && !allClassTeachers.includes(newAllTeacher)) {
			setAllClassTeachers([...allClassTeachers, newAllTeacher]);
			setNewAllTeacher('');
		}
	};

	const handleAddSpecificTeacher = () => {
		if (newClass && newSpecificTeacher && !specificTeachers.some((t) => t.class === newClass)) {
			setSpecificTeachers([...specificTeachers, { class: newClass, teacher: newSpecificTeacher }]);
			setNewClass('');
			setNewSpecificTeacher('');
		}
	};

	const availableClasses = grade ? gradeToClasses[grade] || [] : [];

	return (
		<Modal
			title='Thêm lịch thi mới'
			visible={visible}
			onOk={handleOk}
			onCancel={handleCancel}
			styles={modalStyles}
			width={800}
			footer={[
				<Button className='w-40' key='back' onClick={handleCancel}>
					Hủy
				</Button>,
				<Button className='w-40' key='submit' type='primary' onClick={handleOk}>
					Lưu
				</Button>,
			]}
		>
			<div className='py-5'>
				<div className='space-y-10'>
					<div className='flex items-center justify-between'>
						<div className='flex h-5 items-center justify-between gap-x-28'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Niên khóa:
							</div>
							<div className='h-10'>
								<Select
									value={schoolYear}
									onChange={(value) => setSchoolYear(value)}
									placeholder='Niên khóa'
									className='h-10 w-[160px]'
								>
									<Option value='2023-2024'>2023-2024</Option>
									<Option value='2024-2025'>2024-2025</Option>
								</Select>
								{errors.schoolYear && (
									<div className='mt-1 text-sm text-red-500'>{errors.schoolYear}</div>
								)}
							</div>
						</div>
						<div className='flex h-5 items-center justify-between'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Khối:
							</div>
							<div className='h-10 pl-5'>
								<Select
									value={grade}
									onChange={(value) => setGrade(value)}
									placeholder='Khối'
									className='h-10 w-[160px]'
								>
									<Option value='6'>Khối 6</Option>
									<Option value='7'>Khối 7</Option>
									<Option value='8'>Khối 8</Option>
									<Option value='9'>Khối 9</Option>
									<Option value='10'>Khối 10</Option>
									<Option value='11'>Khối 11</Option>
									<Option value='12'>Khối 12</Option>
								</Select>
								{errors.grade && <div className='mt-1 text-sm text-red-500'>{errors.grade}</div>}
							</div>
						</div>
					</div>

					<div className='flex h-5 items-center justify-between'>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Lớp học:
						</div>
						<div className='h-10 w-[561px]'>
							<Radio.Group
								value={classType}
								onChange={(e) => setClassType(e.target.value)}
								className='flex h-10 items-center'
							>
								<Radio value='all'>Tất cả lớp</Radio>
								<Radio value='basic'>Lớp cơ bản</Radio>
								<Radio value='advanced'>Lớp nâng cao</Radio>
								<Radio value='optional'>Tùy chọn</Radio>
							</Radio.Group>
							{errors.classType && (
								<div className='mt-1 text-sm text-red-500'>{errors.classType}</div>
							)}
						</div>
					</div>

					<div className='flex h-5 items-center justify-between'>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Môn thi:
						</div>
						<div className='h-10 w-[561px]'>
							<Select
								value={subject}
								onChange={(value) => setSubject(value)}
								placeholder='Môn thi'
								className='h-10 w-full'
								options={subjects}
							/>
							{errors.subject && <div className='mt-1 text-sm text-red-500'>{errors.subject}</div>}
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Tên kỳ thi:
							</div>
							<div className='w-[561px]'>
								<Input
									value={customExamName}
									onChange={(e) => setCustomExamName(e.target.value)}
									className='inline-flex h-10 w-[561px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									placeholder='Nhập tên kỳ thi tùy chỉnh'
								/>
							</div>
						</div>
						<div className='flex h-10 items-center space-x-4 pl-48'>
							<Checkbox
								checked={examName.includes('Học kỳ 1')}
								onChange={(e) => handleExamNameChange('Học kỳ 1', e.target.checked)}
							>
								Học kỳ 1
							</Checkbox>
							<Checkbox
								checked={examName.includes('Học kỳ 2')}
								onChange={(e) => handleExamNameChange('Học kỳ 2', e.target.checked)}
							>
								Học kỳ 2
							</Checkbox>
						</div>
						{errors.examName && <div className='mt-1 text-sm text-red-500'>{errors.examName}</div>}
					</div>

					<div className='flex h-5 items-center justify-between'>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Thời lượng làm bài:
						</div>
						<div className='h-10 w-[561px]'>
							<Select
								value={duration}
								onChange={(value) => setDuration(value)}
								placeholder='Nhập số phút'
								className='h-10 w-full'
							>
								<Option value='45'>45 phút</Option>
								<Option value='60'>60 phút</Option>
								<Option value='90'>90 phút</Option>
							</Select>
							{errors.duration && (
								<div className='mt-1 text-sm text-red-500'>{errors.duration}</div>
							)}
						</div>
					</div>

					<div className='flex h-5 items-center justify-between'>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Ngày làm bài:
						</div>
						<div className='h-10 w-[561px]'>
							<DatePicker
								value={examDate}
								onChange={(date) => setExamDate(date)}
								format='DD/MM/YYYY'
								className='h-10 w-full'
							/>
							{errors.examDate && (
								<div className='mt-1 text-sm text-red-500'>{errors.examDate}</div>
							)}
						</div>
					</div>

					<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>

					<div className='w-[561px]'>
						<div className="font-['Source Sans Pro'] mb-2 text-base font-bold tracking-tight text-orange-500">
							Phân công chấm thi
						</div>
						<Radio.Group
							value={assignmentType}
							onChange={(e) => setAssignmentType(e.target.value)}
							className='flex flex-col space-y-4'
						>
							<div className='flex items-start'>
								<Radio value='all' className='mt-1'>
									Áp dụng cho tất cả lớp
								</Radio>
								{assignmentType === 'all' && (
									<div className='ml-4 flex flex-col space-y-2'>
										<div className='flex flex-wrap items-center gap-2'>
											{allClassTeachers.map((teacher) => (
												<Button
													key={teacher}
													type='primary'
													className='flex items-center bg-blue-500 text-white hover:bg-blue-600'
													onClick={() => handleRemoveTeacher(teacher, 'all')}
												>
													{teacher} <span className='ml-1'>✕</span>
												</Button>
											))}
										</div>
										<div className='flex items-center space-x-2'>
											<Select<string>
												showSearch
												placeholder='Tìm kiếm hoặc chọn giáo viên'
												className='w-64'
												value={newAllTeacher || undefined}
												onChange={(value) => setNewAllTeacher(value)}
												filterOption={(input, option) =>
													option?.children && typeof option.children === 'string'
														? (option.children as string)
																.toLowerCase()
																.includes(input.toLowerCase())
														: false
												}
											>
												{availableTeachers.map((teacher) => (
													<Option key={teacher} value={teacher}>
														{teacher}
													</Option>
												))}
											</Select>
											<Button
												type='primary'
												className='bg-green-500 text-white hover:bg-green-600'
												onClick={handleAddAllTeacher}
												disabled={!newAllTeacher}
											>
												Thêm
											</Button>
										</div>
									</div>
								)}
							</div>

							<div className='flex items-start'>
								<Radio value='specific' className='mt-1'>
									Tùy chọn
								</Radio>
								{assignmentType === 'specific' && (
									<div className='ml-4 flex flex-col space-y-2'>
										{specificTeachers.map((item) => (
											<div key={item.class} className='flex items-center space-x-6'>
												<p className='text-sm font-semibold'>{item.class}</p>
												<Button
													type='primary'
													className='flex items-center gap-x-4 rounded-2xl bg-blue-500 px-2 text-white hover:bg-blue-600'
													onClick={() => handleRemoveTeacher(item.teacher, 'specific', item.class)}
													disabled={!item.teacher}
												>
													<p className='text-sm'>{item.teacher || 'Chưa chọn giáo viên'}</p>
													<div className='flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-500 hover:bg-blue-600 hover:text-white'>
														✕
													</div>
												</Button>
											</div>
										))}
										<div className='flex items-center space-x-2'>
											<Select<string>
												showSearch
												placeholder='Chọn lớp'
												className='w-20'
												value={newClass || undefined}
												onChange={(value) => setNewClass(value)}
												disabled={!grade}
											>
												{availableClasses.map((className) => (
													<Option key={className} value={className}>
														{className}
													</Option>
												))}
											</Select>
											<Select<string>
												showSearch
												placeholder='Tìm kiếm hoặc chọn giáo viên'
												className='w-64'
												value={newSpecificTeacher || undefined}
												onChange={(value) => setNewSpecificTeacher(value)}
												filterOption={(input, option) =>
													option?.children && typeof option.children === 'string'
														? (option.children as string)
																.toLowerCase()
																.includes(input.toLowerCase())
														: false
												}
											>
												{availableTeachers.map((teacher) => (
													<Option key={teacher} value={teacher}>
														{teacher}
													</Option>
												))}
											</Select>
											<Button
												type='primary'
												className='bg-green-500 text-white hover:bg-green-600'
												onClick={handleAddSpecificTeacher}
												disabled={!newClass || !newSpecificTeacher}
											>
												Thêm
											</Button>
										</div>
									</div>
								)}
							</div>
						</Radio.Group>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default AddExamScheduleModal;
