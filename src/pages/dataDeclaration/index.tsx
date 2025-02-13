import React, { useState } from 'react';
import {
	Button,
	Checkbox,
	CheckboxProps,
	ConfigProvider,
	DatePicker,
	DatePickerProps,
	Input,
	Modal,
	Select,
	Table,
	TableColumnsType,
	TableProps,
} from 'antd';
import { Edit, Info, Plus, Search, Trash } from '../../components/icon';

import { Dayjs } from 'dayjs';
import SemesterInput from '../../components/SemesterInput';
interface SemesterData {
	key: React.Key;
	index: number;
	academicYear: string;
	startTime: string;
	endTime: string;
}
interface SemesterDataAdd {
	semesterName: string;
	startDate: string;
	endDate: string;
}
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
const DataDeclarationPage = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);

	//  Modal Add
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const handleOkDelete = () => {
		setIsModalOpenDelete(false);
	};
	const handleCancelDelete = () => {
		setIsModalOpenDelete(false);
	};

	const columns: TableColumnsType<SemesterData> = [
		{
			title: 'STT',
			dataIndex: 'index',
			sorter: (a, b) => a.index - b.index,
			width: '10%',
		},
		{
			title: 'Niên khóa',
			dataIndex: 'academicYear',
			sorter: (a, b) => a.academicYear.localeCompare(b.academicYear),
			width: '30%',
		},
		{
			title: 'Thời gian bắt đầu',
			dataIndex: 'startTime',
			width: '20%',
		},
		{
			title: 'Thời gian kết thúc',
			dataIndex: 'endTime',
			width: '20%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '20%',
		},
	];

	const handleEdit = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		setIsModalOpen(true);
	};

	const handleDelete = (record: SemesterData) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record?.key);
		setIsModalOpenDelete(true);
	};

	const data: SemesterData[] = [
		{
			key: '1',
			index: 1,
			academicYear: '2020-2021',
			startTime: '01/09/2020',
			endTime: '30/06/2021',
		},
		{
			key: '2',
			index: 2,
			academicYear: '2021-2022',
			startTime: '01/09/2021',
			endTime: '30/06/2022',
		},
		{
			key: '3',
			index: 3,
			academicYear: '2022-2023',
			startTime: '01/09/2022',
			endTime: '30/06/2023',
		},
		{
			key: '4',
			index: 4,
			academicYear: '2023-2024',
			startTime: '01/09/2023',
			endTime: '30/06/2024',
		},
	];

	const onChange: TableProps<SemesterData>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};
	const modalStyles = {
		header: {
			textAlign: 'center' as 'center',
		},
		footer: {
			textAlign: 'center' as 'center',
		},
	};
	const handleChangeSelectFrom = (value: string) => {
		console.log(`selected ${value}`);
	};
	const handleChangeSelectTo = (value: string) => {
		console.log(`selected ${value}`);
	};
	const handleChangeDeclatation = (value: string) => {
		console.log(`selected ${value}`);
	};
	const onChangeBox: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};
	const onChangePicker: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString);
	};

	const onOk = (date: Dayjs | null) => {
		console.log('Confirmed Date:', date?.format('YYYY-MM-DD'));
	};
	const [semesters, setSemesters] = useState<SemesterDataAdd[]>([
		{ semesterName: 'Học kì I', startDate: '', endDate: '' },
	]);

	const addSemester = () => {
		setSemesters([
			...semesters,
			{ semesterName: `Học kì ${toRoman(semesters.length + 1)}`, startDate: '', endDate: '' },
		]);
	};

	const removeSemester = (index: number) => {
		setSemesters(semesters.filter((_, i) => i !== index));
	};

	const updateSemester = (index: number, data: SemesterDataAdd) => {
		const newSemesters = [...semesters];
		newSemesters[index] = data;
		setSemesters(newSemesters);
	};
	return (
		<div className=''>
			<div className='flex w-full items-end justify-end'>
				<Button className='py-5' type='primary' icon={<Plus />} size='middle' onClick={showModal}>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Thêm mới
					</div>
				</Button>

				<Modal
					title='Thiết lập niên khoá'
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					styles={modalStyles}
					width={800}
					footer={[
						<Button key='back' onClick={handleCancel}>
							Hủy
						</Button>,
						<Button key='submit' type='primary' onClick={handleOk}>
							Lưu
						</Button>,
					]}
				>
					<div className='py-5'>
						<div className='flex items-start justify-between'>
							{/* left */}
							<div className='space-y-4'>
								<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Niên khoá:
								</p>
								<div className='flex items-center gap-2'>
									<Select
										defaultValue='2025'
										style={{ width: 120 }}
										onChange={handleChangeSelectFrom}
										options={[
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
										defaultValue='2026'
										style={{ width: 120 }}
										onChange={handleChangeSelectTo}
										options={[
											{ value: '2026', label: '2026' },
											{ value: '2028', label: '2028' },
											{ value: '2029', label: '2029' },
											{ value: '2030', label: '2030' },
											{ value: '2031', label: '2031' },
										]}
									/>
								</div>
							</div>
							{/* right */}
							<div>
								<div className='flex items-center gap-2'>
									<Checkbox onChange={onChangeBox}>Checkbox</Checkbox>
									<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
										Kế thừa dữ liệu:{' '}
									</div>
									<Select
										// defaultValue='2025-2026'
										placeholder='Niên khóa'
										style={{ width: 120 }}
										onChange={handleChangeDeclatation}
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
			</div>

			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
						Niên khoá
					</div>
					<Input
						placeholder='Tìm kiếm'
						className='w-[438px] rounded-full bg-[#F0F3F6]'
						prefix={<Search />}
						variant='filled'
					/>
				</div>
				<div className='pt-5'>
					<ConfigProvider
						theme={{
							components: {
								Table: {
									headerBg: '#FF7506',
									headerFilterHoverBg: '#FF7506',
									headerSortHoverBg: '#FF7506',
									headerSortActiveBg: '#FF7506',
									headerSplitColor: '#FF7506',
									borderColor: '#f2f2f2',
								},
							},
						}}
					>
						<Table<SemesterData>
							columns={columns}
							dataSource={data}
							onChange={onChange}
							pagination={{
								position: ['bottomRight'],
								showSizeChanger: true,
								pageSizeOptions: ['5', '10', '20', '50'],
								defaultPageSize: 5,
							}}
						/>
					</ConfigProvider>
				</div>
			</div>

			{/* Modal Delete */}
			<Modal
				title='Xóa Tổ - Bộ môn'
				open={isModalOpenDelete}
				onOk={handleOkDelete}
				onCancel={handleCancelDelete}
				styles={modalStyles}
			>
				<div className="font-['Source Sans Pro'] text-center text-base font-normal leading-tight text-[#373839]">
					Xác nhận muốn xoá Tổ - Bộ môn này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể
					hoàn tác.
				</div>
			</Modal>
		</div>
	);
};

export default DataDeclarationPage;
