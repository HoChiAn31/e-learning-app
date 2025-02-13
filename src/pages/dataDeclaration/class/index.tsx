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
import { Edit, Eyes, Minus, Plus, Search, Trash } from '../../../components/icon';
import { useState } from 'react';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
interface SemesterData {
	// key: React.Key;
	key: string;
	classCode: string;
	className: string;
	teacher: string;
	classType?: string;
	classQuantity?: number;
	description?: string;
	schoolYear?: string;
	faculty?: string;
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
		key: '550e8400-e29b-41d4-a716-446655440000',
		classCode: 'KHTN001',
		className: 'Toán học',
		teacher: 'Nguyễn Văn A',
		classType: 'Môn bắt buộc',
		classQuantity: 4,
		description: 'Môn học về các khái niệm cơ bản trong toán học',
		schoolYear: '2024-2025',
		faculty: 'Khoa học Tự nhiên',
	},
	{
		key: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
		classCode: 'KHTN002',
		className: 'Vật lý',
		teacher: 'Trần Thị B',
		classType: 'Môn tự chọn',
		classQuantity: 4,
		description: 'Khám phá các hiện tượng vật lý và các định luật liên quan',
		schoolYear: '2024-2025',
		faculty: 'Khoa học Tự nhiên',
	},
	{
		key: 'db3e2b4d-87e1-4b27-9b7c-0d08b8b14a99',
		classCode: 'KHXH001',
		className: 'Lịch sử Việt Nam',
		teacher: 'Phạm Văn C',
		classType: 'Môn bắt buộc',
		classQuantity: 3,
		description: 'Tìm hiểu lịch sử dân tộc từ thời kỳ nguyên thủy đến hiện đại',
		schoolYear: '2024-2025',
		faculty: 'Khoa học Xã hội',
	},
	{
		key: '82a8f56e-63f7-4f80-b5eb-b82e987a9f1d',
		classCode: 'CNTT101',
		className: 'Nhập môn lập trình',
		teacher: 'Lê Thị D',
		classType: 'Môn bắt buộc',
		classQuantity: 5,
		description: 'Giới thiệu về các khái niệm cơ bản trong lập trình',
		schoolYear: '2024-2025',
		faculty: 'Công nghệ Thông tin',
	},
	{
		key: 'b18de47c-f4b0-4c1b-b7ef-7f832e4b1b34',
		classCode: 'NN001',
		className: 'Tiếng Anh giao tiếp',
		teacher: 'Đỗ Văn E',
		classType: 'Môn tự chọn',
		classQuantity: 2,
		description: 'Cải thiện kỹ năng giao tiếp tiếng Anh hàng ngày',
		schoolYear: '2024-2025',
		faculty: 'Ngoại ngữ',
	},
	{
		key: '2a7b3f6f-e18d-4fc9-8e0b-4e96b5f120fa',
		classCode: 'CNTT201',
		className: 'Cấu trúc dữ liệu và giải thuật',
		teacher: 'Nguyễn Thị F',
		classType: 'Môn bắt buộc',
		classQuantity: 5,
		description: 'Học về các cấu trúc dữ liệu và thuật toán cơ bản',
		schoolYear: '2024-2025',
		faculty: 'Công nghệ Thông tin',
	},
	{
		key: '6fb68b19-4a56-4c88-9657-5e29b8e0a63c',
		classCode: 'MT001',
		className: 'Hóa học môi trường',
		teacher: 'Phan Văn G',
		classType: 'Môn tự chọn',
		classQuantity: 3,
		description: 'Nghiên cứu về các vấn đề hóa học trong môi trường',
		schoolYear: '2024-2025',
		faculty: 'Môi trường',
	},
	{
		key: 'f72d9e78-4cd5-46d3-9d3f-4fa2d1a3b9bf',
		classCode: 'YT001',
		className: 'Sinh học đại cương',
		teacher: 'Trương Thị H',
		classType: 'Môn bắt buộc',
		classQuantity: 4,
		description: 'Tìm hiểu về các nguyên lý cơ bản của sinh học',
		schoolYear: '2024-2025',
		faculty: 'Y học',
	},
];

function ClassPage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [showSelect, setShowSelect] = useState(false);
	const [subjectList, setSubjectList] = useState<string[]>([]);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const handleEdit = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		setIsModalOpen(true);
	};

	const handleDelete = (record: SemesterData) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.key);
		setIsModalOpenDelete(true);
	};
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	const columns: TableColumnsType<SemesterData> = [
		{
			title: 'Mã lớp',
			dataIndex: 'classCode',
			sorter: (a, b) => a.classCode.localeCompare(b.classCode),
			width: '20%',
		},

		{
			title: 'Tên lớp',
			dataIndex: 'className',
			sorter: (a, b) => a.className.localeCompare(b.className),
			width: '20%',
		},
		{
			title: 'Giáo viên chủ nhiệm',
			dataIndex: 'teacher',
			sorter: (a, b) => a.teacher.localeCompare(b.teacher),
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
						<Eyes />
					</Button>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '30%',
		},
	];

	const rowSelection: TableRowSelection<SemesterData> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
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
	const handleOkDelete = () => {
		setIsModalOpenDelete(false);
	};
	const handleCancelDelete = () => {
		setIsModalOpenDelete(false);
	};

	const handleChangeDeclatation = (value: string) => {
		console.log(`selected ${value}`);
	};
	const onChangeBox: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};

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
	const addSemester = () => {
		// setSemesters([...semesters, { department: `Học kì `, headOfDepartment: '' }]);
		setShowSelect(true);
	};
	return (
		<div>
			<div className='flex items-center justify-between'>
				<div className='flex items-center justify-center gap-4'>
					<Select
						defaultValue='Tất cả khối'
						style={{ width: 120 }}
						onChange={handleChange}
						options={[
							{ value: '12', label: '12' },
							{ value: '11', label: '11' },
							{ value: '10', label: '10' },
							{ value: '9', label: '9' },
							{ value: '8', label: '8' },
							{ value: '7', label: '7' },
							{ value: '6', label: '6' },
						]}
					/>
				</div>
				<div className='flex items-center gap-4'>
					<Trash />
					<div className='h-12 w-[1px] bg-[#c8c4c0]' />
					<Button
						className='h-[52px]'
						type='primary'
						icon={<Plus />}
						size='middle'
						onClick={() => setIsModalOpen(true)}
					>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
							Thêm mới
						</div>
					</Button>

					{/* Modal Add */}
					<Modal
						title='Thêm lớp học mới'
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
							<div className=''>
								<div className=''>
									<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
										Thông tin chung
									</div>
								</div>
								<div className='flex items-center justify-between py-5'>
									<div className='flex items-center gap-1'>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Niên khóa:{' '}
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
									<div className='flex items-center gap-1'>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Khoa - Khối:{' '}
											<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</span>
										</div>
										<Select
											defaultValue='Khối 6'
											placeholder='Chọn khối'
											style={{ width: 120 }}
											onChange={handleChangeDeclatation}
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
											<div className='flex items-center justify-center gap-0.5'>
												<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
													Tên lớp:
													<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
														*
													</span>
												</div>
											</div>
										</div>

										<Input placeholder='Nhập tên lớp' />
									</div>

									<div className='flex h-5 items-center'>
										<div className='flex min-w-36 items-start justify-start'>
											<div className='flex items-center justify-center gap-0.5'>
												<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
													Số lượng học viên:
													<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
														*
													</span>
												</div>
											</div>
										</div>
										<Input
											placeholder='Tìm kiếm'
											// className='h-10 w-[561px] bg-[#F0F3F6]'
											// variant='filled'
										/>
									</div>

									<div className='flex h-5 items-center'>
										<div className='flex min-w-36 items-start justify-start'>
											<div className='flex items-center justify-center gap-0.5'>
												<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
													Phân loại lớp:
													<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
														*
													</span>
												</div>
											</div>
										</div>
										<Select
											defaultValue='Khối 6'
											placeholder='Chọn khối'
											onChange={handleChangeDeclatation}
											options={[
												{ value: 'Khối 6', label: 'Khối 6' },
												{ value: 'Khối 7', label: 'Khối 7' },
												{ value: 'Khối 8', label: 'Khối 8' },
												{ value: 'Khối 9', label: 'Khối 9' },
												{ value: 'Khối 10', label: 'Khối 10' },
												{ value: 'Khối 11', label: 'Khối 11' },
												{ value: 'Khối 12', label: 'Khối 12' },
											]}
											className='w-full'
										/>
									</div>

									<div className='flex h-5 items-center'>
										<div className='flex min-w-36 items-start justify-start'>
											<div className='flex items-center justify-center gap-0.5'>
												<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
													Giáo viên chủ nhiệm:
												</div>
											</div>
										</div>

										<Select
											defaultValue='Khoa học tự nhiên'
											onChange={handleChange}
											options={[
												{ value: 'Môn học bắt buộc', label: 'Môn học bắt buộc' },
												{ value: 'Môn học tự chọn', label: 'Môn học tự chọn' },
											]}
											className='w-full'
										/>
									</div>
									<div className='flex h-5 items-center'>
										<div className='flex min-w-36 items-start justify-start'>
											<div className='flex items-center justify-center gap-0.5'>
												<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
													Mô tả:
												</div>
											</div>
										</div>

										<Input placeholder='Nhập mô tả' />
									</div>
								</div>

								<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>

								<div>
									<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
										Danh sách môn học
									</p>
									<div>
										<div className='flex items-center gap-2'>
											<Checkbox onChange={onChangeBox} />
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
									</div>
									<div className='space-y-3'>
										<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
											Danh sách môn học
										</p>
										<div className='space-y-4'>
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
											{/* Thêm môn học mới */}
											{showSelect && (
												<Select
													placeholder='Chọn môn học'
													// style={{ width: '100%' }}
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
							</div>
						</div>
					</Modal>
				</div>
			</div>
			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
						Lớp học
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
							rowSelection={rowSelection}
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
			<Modal
				title='Xóa'
				open={isModalOpenDelete}
				onOk={handleOkDelete}
				onCancel={handleCancelDelete}
				styles={modalStyles}
				footer={[
					<Button className='w-40' key='back' onClick={handleCancelDelete}>
						Hủy
					</Button>,
					<Button className='w-40' key='submit' type='primary' onClick={handleOkDelete}>
						Xác nhận
					</Button>,
				]}
			>
				<div className="font-['Source Sans Pro'] text-center text-base font-normal leading-tight text-[#373839]">
					Xác nhận muốn xoá môn học này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể
					hoàn tác.
				</div>
			</Modal>
		</div>
	);
}

export default ClassPage;
