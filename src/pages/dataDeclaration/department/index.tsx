import {
	Button,
	Checkbox,
	CheckboxProps,
	ConfigProvider,
	Input,
	Modal,
	Select,
	Table,
	TableColumnsType,
	TableProps,
} from 'antd';
import { Edit, Info, List, Minus, Plus, Search, Trash } from '../../../components/icon';
import { useState } from 'react';
import SemesterInput from '../../../components/SemesterInput';
import { InputAdd } from './InputAdd';

interface SemesterData {
	id: string;
	department: string;
	headOfDepartment: string;
}

interface SemesterDataAdd {
	department: string;
	headOfDepartment: string;
}
const subjects = [
	{ value: 'Toán học', label: 'Toán học' },
	{ value: 'Vật lý', label: 'Vật lý' },
	{ value: 'Hóa học', label: 'Hóa học' },
	{ value: 'Sinh học', label: 'Sinh học' },
	{ value: 'Lịch sử', label: 'Lịch sử' },
];
const data: SemesterData[] = [
	{
		id: '1e1a9d44-9f5a-4d52-9b5b-70a6f2e17415',
		department: 'Tổ Toán – Tin học',
		headOfDepartment: 'Nguyễn Văn A',
	},
	{
		id: '2b4a7e55-3c2f-4563-a6bf-9c504321f717',
		department: 'Tổ Vật lý – Công nghệ',
		headOfDepartment: 'Trần Thị B',
	},
	{
		id: '3c8a1e11-6c72-47e3-b3e2-567cbfa013ae',
		department: 'Tổ Hóa học',
		headOfDepartment: 'Phạm Văn C',
	},
	{
		id: '4d6a5f22-8574-4988-b3e7-a023f15e9d18',
		department: 'Tổ Sinh học',
		headOfDepartment: 'Lê Thị D',
	},
	{
		id: '5e9c2b33-2f6b-4a38-b6a5-f1742c5f22c1',
		department: 'Tổ Ngữ văn',
		headOfDepartment: 'Hoàng Thị E',
	},
	{
		id: '6f5a1d44-4e81-41c9-b83f-60b2e1f75c28',
		department: 'Tổ Lịch sử – Địa lý',
		headOfDepartment: 'Đỗ Văn F',
	},
	{
		id: '7g1e8d55-9b2a-4d71-a6b8-80c6f4a2f119',
		department: 'Tổ Giáo dục công dân',
		headOfDepartment: 'Nguyễn Thị G',
	},
	{
		id: '8h2a3f66-2e5b-42f3-98bf-123e1b5c61fa',
		department: 'Tổ Tiếng Anh',
		headOfDepartment: 'Vũ Văn H',
	},
	{
		id: '9i3b4d77-5c6f-4971-839f-9f204c612b19',
		department: 'Tổ Giáo dục thể chất – Quốc phòng an ninh',
		headOfDepartment: 'Phan Thị I',
	},
	{
		id: '0j4c5f88-7d8e-4e92-a9bf-6a3b2c612d2b',
		department: 'Tổ Tin học',
		headOfDepartment: 'Đặng Văn K',
	},
];

function DepartmentPage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const handleEdit = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		setIsModalOpen(true);
	};

	const handleDelete = (record: SemesterData) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.id);
		setIsModalOpenDelete(true);
	};
	const columns: TableColumnsType<SemesterData> = [
		{
			title: 'Tên tổ - bộ môn',
			dataIndex: 'department',
			sorter: (a, b) => a.department.localeCompare(b.department),
			width: '15%',
		},
		{
			width: '10%',
		},
		{
			title: 'Trưởng bộ môn',
			dataIndex: 'headOfDepartment',
			sorter: (a, b) => a.headOfDepartment.localeCompare(b.headOfDepartment),
			width: '15%',
		},
		{
			width: '10%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className=''>
					<Button type='link' onClick={() => handleEdit(record)}>
						<List />
					</Button>
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
	const onChange: TableProps<SemesterData>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};
	// Modal add
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const modalStyles = {
		header: {
			textAlign: 'center' as 'center',
		},
		footer: {
			textAlign: 'center' as 'center',
		},
	};
	const onChangeBox: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};

	const [semesters, setSemesters] = useState<SemesterDataAdd[]>([
		{ department: '', headOfDepartment: '' },
	]);
	const removeSemester = (index: number) => {
		setSemesters(semesters.filter((_, i) => i !== index));
	};

	const updateSemester = (index: number, data: SemesterDataAdd) => {
		const newSemesters = [...semesters];
		newSemesters[index] = data;
		setSemesters(newSemesters);
	};
	const addSemester = () => {
		// setSemesters([...semesters, { department: `Học kì `, headOfDepartment: '' }]);
		setShowSelect(true);
	};
	// modal add 1

	const [subjectList, setSubjectList] = useState<string[]>([]);
	const [showSelect, setShowSelect] = useState(false);

	const addSubject = (value: string) => {
		console.log(value);
		if (!subjectList.includes(value)) {
			setSubjectList([...subjectList, value]);
		}
		setShowSelect(false); // Ẩn select sau khi chọn xong
	};
	const removeSubject = (subject: string) => {
		setSubjectList(subjectList.filter((sub) => sub !== subject));
	};
	return (
		<div>
			<div className='flex w-full items-end justify-end'>
				<Button
					className='py-5'
					type='primary'
					icon={<Plus />}
					size='middle'

					// onClick={showModal}
				>
					<div
						onClick={() => setIsModalOpen(true)}
						className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white"
					>
						Thêm mới
					</div>
				</Button>

				{/* Modal Add */}
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
						<Button key='submit' type='primary' onClick={handleOk}>
							Lưu
						</Button>,
					]}
				>
					<div className='py-5'>
						<div className=''>
							{/* left */}
							<div className='space-y-10'>
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Tổ - Bộ môn:
											</div>
										</div>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										// prefix={<Search />}
										variant='filled'
									/>
								</div>

								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Trưởng tổ - Bộ môn:
											</div>
										</div>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										// prefix={<Search />}
										variant='filled'
									/>
								</div>
							</div>
						</div>
						<div className='my-8 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
						<div className='space-y-3'>
							<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
								Danh sách môn học
							</p>
							<div className='space-y-4'>
								{/* Thêm môn học mới */}
								{showSelect && (
									<Select
										placeholder='Chọn môn học'
										style={{ width: '100%' }}
										onChange={addSubject}
										className='mt-2'
										options={subjects}
									/>
									// >
									// 	{subjects.map((subject) => (
									// 		<Option key={subject.id} value={subject.name}>
									// 			{subject.name}
									// 		</Option>
									// 	))}
									// </Select>
								)}

								{subjectList.length > 0 && (
									<div className='grid grid-cols-3 gap-4'>
										{subjectList.map((sub) => (
											<div className='flex items-center gap-1'>
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
							rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
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
		</div>
	);
}

export default DepartmentPage;
