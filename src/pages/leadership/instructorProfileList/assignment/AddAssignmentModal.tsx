import { Button, Checkbox, Input, Modal, Select } from 'antd';
import { Plus, Minus } from '../../../../components/icon';
import { assignmentFormData } from '../../../../types/leadership/instructor';

interface AddAssignmentModalProps {
	isModalOpen: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	formData: assignmentFormData;
	setFormData: React.Dispatch<React.SetStateAction<assignmentFormData>>;
	showSelect: boolean;
	setShowSelect: React.Dispatch<React.SetStateAction<boolean>>;
	isInheritData: boolean;
	setIsInheritData: React.Dispatch<React.SetStateAction<boolean>>;
	optionClassName: { value: string; label: string }[];
	optionClassType: { value: string; label: string }[];
	optionInstructor: { value: string; label: string }[];
	selectedGrade: string;
	setSelectedGrade: React.Dispatch<React.SetStateAction<string>>;
}

const AddAssignmentModal: React.FC<AddAssignmentModalProps> = ({
	isModalOpen,
	handleOk,
	handleCancel,
	formData,
	setFormData,
	showSelect,
	setShowSelect,
	isInheritData,
	setIsInheritData,
	optionClassName,
	optionClassType,
	optionInstructor,
	selectedGrade,
	setSelectedGrade,
}) => {
	const modalStyles = {
		header: { textAlign: 'center' as 'center' },
		footer: { textAlign: 'center' as 'center' },
	};

	const handleChangeDeclatation = (value: string, type: keyof assignmentFormData) => {
		setFormData((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const onChangeBox = () => {
		if (!isInheritData) {
			setFormData((prev) => ({
				...prev,
				subjects: inheritedSubjects,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				subjects: [],
			}));
			setShowSelect(false);
		}
		setIsInheritData(!isInheritData);
	};

	const addSubject = (subject: string) => {
		if (subject && !formData.subjects?.includes(subject)) {
			setFormData((prev) => ({
				...prev,
				subjects: [...(prev.subjects || []), subject],
			}));
			setShowSelect(false);
		}
	};

	const removeSubject = (subject: string) => {
		setFormData((prev) => ({
			...prev,
			subjects: (prev.subjects || []).filter((sub) => sub !== subject),
		}));
	};
	const inheritedSubjects = [
		'Toán học',
		'Vật lý',
		'Hóa học',
		'Sinh học',
		'Lịch sử',
		'Địa lý',
		'Tin học',
		'Ngữ văn',
		'Tiếng Anh',
	];

	const availableSubjects = [
		'Toán học',
		'Vật lý',
		'Hóa học',
		'Sinh học',
		'Lịch sử',
		'Địa lý',
		'Tin học',
		'Ngữ văn',
		'Tiếng Anh',
	];

	return (
		<Modal
			title='Thêm phân công giảng dạy'
			open={isModalOpen}
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
				<div>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
						Thông tin chung
					</div>
					<div className='flex items-center justify-between py-5'>
						<div className='flex items-center gap-1'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Niên khóa:{' '}
							</div>
							<Select
								placeholder='Niên khóa'
								style={{ width: 120 }}
								value={formData.academicYear}
								onChange={(value) => handleChangeDeclatation(value, 'academicYear')}
								options={[
									{ value: '2020-2021', label: '2020-2021' },
									{ value: '2021-2022', label: '2021-2022' },
									{ value: '2022-2023', label: '2022-2023' },
									{ value: '2023-2024', label: '2023-2024' },
									{ value: '2024-2025', label: '2024-2025' },
									{ value: '2025-2026', label: '2025-2026' },
								]}
							/>
						</div>
						<div className='flex items-center gap-1'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Khoa - Khối:{' '}
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</div>
							<Select
								placeholder='Chọn khối'
								style={{ width: 120 }}
								value={formData.grade}
								onChange={(value) => {
									handleChangeDeclatation(value, 'grade');
									setSelectedGrade(value);
								}}
								options={[
									{ value: 'Khối 6', label: 'Khối 6' },
									{ value: 'Khối 7', label: 'Khối 7' },
									{ value: 'Khối 8', label: 'Khối 8' },
									{ value: 'Khối 9', label: 'Khối 9' },
									{ value: 'Khối 10', label: 'Khối 10' },
									{ value: 'Khối 11', label: 'Khối 11' },
									{ value: 'Khối 12', label: 'Khối 12' },
								]}
							/>
						</div>
					</div>
					<div className='space-y-10'>
						<div className='flex h-5 items-center'>
							<div className='flex min-w-36 items-start justify-start'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tên lớp:
									<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
										*
									</span>
								</div>
							</div>
							<Select
								placeholder='Chọn lớp'
								value={formData.className}
								onChange={(value) => handleChangeDeclatation(value, 'className')}
								options={optionClassName}
								className='w-full'
							/>
						</div>

						<div className='flex h-5 items-center'>
							<div className='flex min-w-36 items-start justify-start'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Số lượng học viên:
									<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
										*
									</span>
								</div>
							</div>
							<Input
								placeholder='Nhập số lượng'
								value={formData.studentCount}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										studentCount: Number(e.target.value),
									}))
								}
							/>
						</div>

						<div className='flex h-5 items-center'>
							<div className='flex min-w-36 items-start justify-start'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Phân loại lớp:
									<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
										*
									</span>
								</div>
							</div>
							<Select
								placeholder='Chọn phân loại'
								value={formData.classType}
								onChange={(value) => handleChangeDeclatation(value, 'classType')}
								options={optionClassType}
								className='w-full'
							/>
						</div>

						<div className='flex h-5 items-center'>
							<div className='flex min-w-36 items-start justify-start'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Giáo viên chủ nhiệm:
								</div>
							</div>
							<Select
								placeholder='Chọn giáo viên'
								value={formData.instructorName}
								onChange={(value) => handleChangeDeclatation(value, 'instructorName')}
								options={optionInstructor}
								className='w-full'
							/>
						</div>

						<div className='flex h-5 items-center'>
							<div className='flex min-w-36 items-start justify-start'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Mô tả:
								</div>
							</div>
							<Input
								placeholder='Nhập mô tả'
								value={formData.description}
								onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
							/>
						</div>
					</div>

					<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>

					<div>
						<div className='flex items-center gap-2'>
							<Checkbox checked={isInheritData} onChange={onChangeBox} />
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Kế thừa dữ liệu:{' '}
							</div>
							<Select
								placeholder='Niên khóa'
								style={{ width: 120 }}
								value={formData.inheritYear}
								onChange={(value) => handleChangeDeclatation(value, 'inheritYear')}
								options={[
									{ value: '2020-2021', label: '2020-2021' },
									{ value: '2021-2022', label: '2021-2022' },
									{ value: '2022-2023', label: '2022-2023' },
									{ value: '2023-2024', label: '2023-2024' },
									{ value: '2024-2025', label: '2024-2025' },
									{ value: '2025-2026', label: '2025-2026' },
								]}
							/>
						</div>

						<div className='mt-5 space-y-3'>
							<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
								Danh sách môn học
							</p>
							<div className='space-y-4'>
								{formData.subjects && formData.subjects.length > 0 && (
									<div className='grid grid-cols-3 gap-4'>
										{formData.subjects.map((sub) => (
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
										options={availableSubjects
											.filter((sub) => !formData.subjects?.includes(sub))
											.map((sub) => ({ value: sub, label: sub }))}
									/>
								)}
								<div className='flex cursor-pointer gap-2' onClick={() => setShowSelect(true)}>
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
				</div>
			</div>
		</Modal>
	);
};

export default AddAssignmentModal;
