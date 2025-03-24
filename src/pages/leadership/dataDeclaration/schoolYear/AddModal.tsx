import { Button, Checkbox, Modal, Select } from 'antd';
import { useState } from 'react';
import SemesterInput from '../../../../components/SemesterInput';
import { Info, Plus } from '../../../../components/icon';

interface SemesterModalProps {
	visible: boolean;
	initialData?: {
		academicYearFrom: string;
		academicYearTo: string;
		semesters: { semesterName: string; startDate: string; endDate: string }[];
	};
	onOk: (data: {
		academicYearFrom: string;
		academicYearTo: string;
		semesters: { semesterName: string; startDate: string; endDate: string }[];
	}) => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

const toRoman = (num: number): string => {
	const romanNumerals: [number, string][] = [
		[1000, 'M'],
		[900, 'CM'],
		[500, 'D'],
		[400, 'CD'],
		[100, 'C'],
		[90, 'XC'],
		[50, 'L'],
		[40, 'XL'],
		[10, 'X'],
		[9, 'IX'],
		[5, 'V'],
		[4, 'IV'],
		[1, 'I'],
	];
	let result = '';
	for (const [value, numeral] of romanNumerals) {
		while (num >= value) {
			result += numeral;
			num -= value;
		}
	}
	return result;
};

export const AddModal: React.FC<SemesterModalProps> = ({
	visible,
	initialData,
	onOk,
	onCancel,
}) => {
	const [academicYearFrom, setAcademicYearFrom] = useState<string>(
		initialData?.academicYearFrom || '2025',
	);
	const [academicYearTo, setAcademicYearTo] = useState<string>(
		initialData?.academicYearTo || '2026',
	);
	const [semesters, setSemesters] = useState<
		{ semesterName: string; startDate: string; endDate: string }[]
	>(initialData?.semesters || [{ semesterName: 'Học kì I', startDate: '', endDate: '' }]);
	const [inheritData, setInheritData] = useState<string>('');

	const handleSubmit = () => {
		// Validate that all semesters have startDate and endDate
		const isValid = semesters.every((semester) => semester.startDate && semester.endDate);
		if (!isValid) {
			alert('Vui lòng điền đầy đủ ngày bắt đầu và kết thúc cho tất cả học kỳ.');
			return;
		}
		console.log('Submitting:', { academicYearFrom, academicYearTo, semesters });
		onOk({ academicYearFrom, academicYearTo, semesters });
	};

	const handleCancelModal = () => {
		setAcademicYearFrom(initialData?.academicYearFrom || '2025');
		setAcademicYearTo(initialData?.academicYearTo || '2026');
		setSemesters(
			initialData?.semesters || [{ semesterName: 'Học kì I', startDate: '', endDate: '' }],
		);
		setInheritData('');
		onCancel();
	};

	const addSemester = () => {
		setSemesters([
			...semesters,
			{
				semesterName: `Học kì ${toRoman(semesters.length + 1)}`,
				startDate: '',
				endDate: '',
			},
		]);
	};

	const removeSemester = (index: number) => {
		setSemesters(semesters.filter((_, i) => i !== index));
	};

	const updateSemester = (
		index: number,
		data: { semesterName: string; startDate: string; endDate: string },
	) => {
		const newSemesters = [...semesters];
		newSemesters[index] = data;
		setSemesters(newSemesters);
	};

	return (
		<Modal
			title='Thiết lập niên khoá'
			open={visible}
			onOk={handleSubmit}
			onCancel={handleCancelModal}
			styles={modalStyles}
			width={800}
			footer={[
				<Button key='back' onClick={handleCancelModal}>
					Hủy
				</Button>,
				<Button key='submit' type='primary' onClick={handleSubmit}>
					Lưu
				</Button>,
			]}
		>
			<div className='py-5'>
				<div className='flex items-start justify-between'>
					<div className='space-y-4'>
						<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Niên khoá:
						</p>
						<div className='flex items-center gap-2'>
							<Select
								value={academicYearFrom}
								style={{ width: 120 }}
								onChange={(value) => setAcademicYearFrom(value)}
								options={[
									{ value: '2020', label: '2020' },
									{ value: '2021', label: '2021' },
									{ value: '2022', label: '2022' },
									{ value: '2023', label: '2023' },
									{ value: '2024', label: '2024' },
									{ value: '2025', label: '2025' },
									{ value: '2026', label: '2026' },
									{ value: '2028', label: '2028' },
									{ value: '2029', label: '2029' },
									{ value: '2030', label: '2030' },
									{ value: '2031', label: '2031' },
								]}
							/>
							<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
								đến
							</p>
							<Select
								value={academicYearTo}
								style={{ width: 120 }}
								onChange={(value) => setAcademicYearTo(value)}
								options={[
									{ value: '2020', label: '2020' },
									{ value: '2021', label: '2021' },
									{ value: '2022', label: '2022' },
									{ value: '2023', label: '2023' },
									{ value: '2024', label: '2024' },
									{ value: '2025', label: '2025' },
									{ value: '2026', label: '2026' },
									{ value: '2028', label: '2028' },
									{ value: '2029', label: '2029' },
									{ value: '2030', label: '2030' },
									{ value: '2031', label: '2031' },
								]}
							/>
						</div>
					</div>
					<div>
						<div className='flex items-center gap-2'>
							<Checkbox onChange={(e) => setInheritData(e.target.checked ? inheritData : '')}>
								Checkbox
							</Checkbox>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Kế thừa dữ liệu:{' '}
							</div>
							<Select
								value={inheritData || undefined}
								placeholder='Niên khóa'
								style={{ width: 120 }}
								onChange={(value) => setInheritData(value)}
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
						<div className='flex items-start gap-2 pt-3'>
							<Info />
							<p className="font-['Source Sans Pro'] text-sm font-normal italic text-[#373839]">
								Dữ liệu được kế thừa bao gồm các thông tin:
								<br />- Thông tin học viên và Danh sách lớp học
								<br />- Thông tin môn học
								<br />- Phân công giảng dạy
							</p>
						</div>
					</div>
				</div>
				<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
				<div className='space-y-3'>
					<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
						Cài đặt thời gian
					</p>
					<div className='space-y-4'>
						{semesters.map((semester, index) => (
							<SemesterInput
								key={index}
								semesterName={semester.semesterName}
								startDate={semester.startDate} // Pass initial values
								endDate={semester.endDate}
								onRemove={() => removeSemester(index)}
								onChange={(data) => updateSemester(index, data)}
							/>
						))}
						<div className='flex cursor-pointer gap-2' onClick={addSemester}>
							<div className='inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'>
								<Plus />
							</div>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#0a7feb]">
								Thêm học kì mới
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};
