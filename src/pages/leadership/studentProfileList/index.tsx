import {
	Button,
	ConfigProvider,
	Input,
	Modal,
	Select,
	Table,
	TableColumnsType,
	TableProps,
} from 'antd';
import {
	ArrowRight,
	Dowload,
	Eyes,
	PaperClip,
	Plus,
	Search,
	Trash,
	Update,
} from '../../../components/icon';
import { Key, useState } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import InforStudent from './InforStudent';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
interface SemesterData {
	// key: React.Key;
	key: string;
	studentCode: string;
	studentName: string;
	birthDay: string;
	gender: string;
	nation: string;
	class: string;
	status: string;
}
const data: SemesterData[] = [
	{
		key: '1',
		studentCode: 'SV001',
		studentName: 'Nguyễn Văn A',
		birthDay: '2000-05-15',
		gender: 'Nam',
		nation: 'Kinh',
		class: 'CNTT01',
		status: 'Đang học',
	},
	{
		key: '2',
		studentCode: 'SV002',
		studentName: 'Trần Thị B',
		birthDay: '2001-08-20',
		gender: 'Nữ',
		nation: 'Kinh',
		class: 'CNTT02',
		status: 'Bảo lưu',
	},
	{
		key: '3',
		studentCode: 'SV003',
		studentName: 'Lê Văn C',
		birthDay: '1999-12-05',
		gender: 'Nam',
		nation: 'Kinh',
		class: 'CNTT03',
		status: 'Đã tốt nghiệp',
	},
	{
		key: '4',
		studentCode: 'SV004',
		studentName: 'Phạm Thị D',
		birthDay: '2002-01-10',
		gender: 'Nữ',
		nation: 'Kinh',
		class: 'CNTT04',
		status: 'Đang học',
	},
	{
		key: '5',
		studentCode: 'SV005',
		studentName: 'Hoàng Văn E',
		birthDay: '2000-11-25',
		gender: 'Nam',
		nation: 'Kinh',
		class: 'CNTT05',
		status: 'Đã nghỉ học',
	},
	{
		key: '6',
		studentCode: 'SV005',
		studentName: 'Hoàng Văn E',
		birthDay: '2000-11-25',
		gender: 'Nam',
		nation: 'Kinh',
		class: 'CNTT05',
		status: 'Đã nghỉ học',
	},
	{
		key: '7',
		studentCode: 'SV005',
		studentName: 'Hoàng Văn E',
		birthDay: '2000-11-25',
		gender: 'Nam',
		nation: 'Kinh',
		class: 'CNTT05',
		status: 'Đã nghỉ học',
	},
];
const StudentProfileListPage = () => {
	const [isModalFile, setIsModalFile] = useState<boolean>(false);
	const [isAddStudent, setIsAddStudent] = useState<boolean>(false);
	const [isEditStudent, setIsEditStudent] = useState<boolean>(false);
	const [isInforStudent, setIsInforStudent] = useState<boolean>(false);
	// const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
	console.log('isAddStudent: ', isAddStudent);
	console.log('isEditStudent: ', isEditStudent);
	const handleIsAddStudent = () => {
		setIsAddStudent(!isAddStudent);
	};

	const handleIsEditStudent = () => {
		setIsEditStudent(!isAddStudent);
	};

	const handleIsInforStudent = () => {
		setIsInforStudent(!isInforStudent);
	};
	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection: TableRowSelection<SemesterData> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const handleChangeSelect = (value: string) => {
		console.log(`selected ${value}`);
	};

	const onChange: TableProps<SemesterData>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};
	const handleInforStudent = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		setIsInforStudent(!isInforStudent);
	};
	const handleEditStudent = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		setIsEditStudent(!isEditStudent);
	};

	const handleDelete = (record: SemesterData) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.key);
		// setIsModalOpenDelete(true);
	};
	const columns: TableColumnsType<SemesterData> = [
		{
			title: 'Mã học viên',
			dataIndex: 'studentCode',
			sorter: (a, b) => a.studentCode.localeCompare(b.studentCode),
			width: '15%',
		},

		{
			title: 'Tên học viên',
			dataIndex: 'studentName',
			sorter: (a, b) => a.studentName.localeCompare(b.studentName),
			width: '20%',
		},
		{
			title: 'Ngày sinh',
			dataIndex: 'birthDay',
			sorter: (a, b) => a.birthDay.localeCompare(b.birthDay),
			width: '10%',
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
			sorter: (a, b) => a.gender.localeCompare(b.gender),
			width: '10%',
		},
		{
			title: 'Dân tộc',
			dataIndex: 'nation',
			sorter: (a, b) => a.nation.localeCompare(b.nation),
			width: '10%',
		},
		{
			title: 'Lớp',
			dataIndex: 'class',
			sorter: (a, b) => a.class.localeCompare(b.class),
			width: '15%',
		},
		{
			title: 'Tình trạng',
			dataIndex: 'class',
			sorter: (a, b) => a.status.localeCompare(b.status),
			width: '15%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className='flex'>
					<Button type='link' onClick={() => handleInforStudent(record)}>
						<Eyes color='#ff7506' />
					</Button>
					<Button type='link' onClick={() => handleEditStudent(record)}>
						<Update />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '30%',
		},
	];
	const handleOkFile = () => {
		setIsModalFile(false);
	};
	const handleCancelFile = () => {
		setIsModalFile(false);
	};

	const modalStyles = {
		header: {
			textAlign: 'center' as 'center',
			titleFontSize: 40,
		},
		footer: {
			textAlign: 'center' as 'center',
		},
	};
	// AddStudent
	const handleCancelAddStudent = () => {
		setIsAddStudent(false);
	};
	const handleCancelEditStudent = () => {
		setIsAddStudent(false);
	};

	return (
		<div>
			{/* title */}
			{isAddStudent ? (
				<div className='inline-flex h-[60px] items-center justify-center'>
					<div className='inline-flex items-center justify-start gap-2 px-2.5'>
						<div
							className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
							onClick={() => setIsAddStudent(false)}
						>
							Hồ sơ học viên
						</div>
						<div data-svg-wrapper className='relative'>
							<ArrowRight />
						</div>
						<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
							Thêm học viên
						</div>
					</div>
				</div>
			) : isEditStudent ? (
				<div className='inline-flex h-[60px] items-center justify-center'>
					<div className='inline-flex items-center justify-start gap-2 px-2.5'>
						<div
							className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
							onClick={() => setIsEditStudent(false)}
						>
							Hồ sơ học viên
						</div>
						<div data-svg-wrapper className='relative'>
							<ArrowRight />
						</div>
						<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
							Chỉnh sửa thông tin học viên
						</div>
					</div>
				</div>
			) : isInforStudent ? (
				<div className='inline-flex h-[60px] items-center justify-center'>
					<div className='inline-flex items-center justify-start gap-2 px-2.5'>
						<div
							className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
							onClick={() => setIsInforStudent(false)}
						>
							Hồ sơ học viên
						</div>
						<div data-svg-wrapper className='relative'>
							<ArrowRight />
						</div>
						<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
							Thông tin học viên
						</div>
					</div>
				</div>
			) : (
				<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
					Hồ sơ học viên
				</div>
			)}
			{/* header */}

			{isAddStudent ? (
				<AddStudent onAddStudent={handleIsAddStudent} onCancel={handleCancelAddStudent} />
			) : isEditStudent ? (
				<EditStudent onEditStudent={handleIsEditStudent} onCancel={handleCancelEditStudent} />
			) : isInforStudent ? (
				<InforStudent onInforStudent={handleIsInforStudent} onCancel={handleCancelEditStudent} />
			) : (
				<>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div>
								<Select
									defaultValue='2025'
									style={{ width: 120 }}
									onChange={handleChangeSelect}
									options={[
										{ value: '2025', label: '2025' },
										{ value: '2026', label: '2026' },
										{ value: '2028', label: '2028' },
										{ value: '2029', label: '2029' },
										{ value: '2030', label: '2030' },
										{ value: '2031', label: '2031' },
									]}
								/>

								<Select
									defaultValue='2026'
									style={{ width: 120 }}
									onChange={handleChangeSelect}
									options={[
										{ value: '2026', label: '2026' },
										{ value: '2028', label: '2028' },
										{ value: '2029', label: '2029' },
										{ value: '2030', label: '2030' },
										{ value: '2031', label: '2031' },
									]}
								/>
							</div>
							<div className='flex items-center gap-2'>
								<ConfigProvider
									theme={{
										token: {
											colorPrimary: '#000000',
										},
									}}
								>
									<Button
										type='primary'
										// icon={<Plus />}
										size='middle'
										// onClick={() => setIsModalOpen(true)}
										// variant='outlined'
									>
										<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
											Tất cả hồ sơ
										</div>
									</Button>
								</ConfigProvider>
								<Button
									// type='primary'
									// icon={<Plus />}
									size='middle'
									// onClick={() => setIsModalOpen(true)}
									// variant='outlined'
								>
									<div className="rounded-2xl font-['Mulish'] text-lg font-extrabold tracking-tight text-black">
										Khen thưởng
									</div>
								</Button>
								<Button
									// type='primary'
									// icon={<Plus />}
									size='middle'
									// onClick={() => setIsModalOpen(true)}
									// variant='outlined'
								>
									<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-black">
										Kỷ luật
									</div>
								</Button>
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<Trash />
							<div className='h-12 w-[1px] bg-[#c8c4c0]' />
							<Button
								className='h-[52px]'
								// type='primary'
								// icon={<Plus />}
								size='middle'
								onClick={() => setIsModalFile(true)}
								// variant='outlined'
							>
								<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-primary">
									Xuất file
								</div>
							</Button>
							<Button
								className='h-[52px]'
								type='primary'
								icon={<Plus />}
								size='middle'
								onClick={handleIsAddStudent}
							>
								<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
									Thêm mới
								</div>
							</Button>
						</div>
					</div>
					{/* table */}
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
					{/* Modal File */}
					<ConfigProvider
						theme={{
							components: {
								Modal: {
									titleFontSize: 28,
								},
							},
						}}
					>
						<Modal
							title='Xuất file hồ sơ'
							open={isModalFile}
							onOk={handleOkFile}
							onCancel={handleCancelFile}
							width={800}
							styles={modalStyles}
							footer={[
								<Button className='w-40' key='back' onClick={handleCancelFile}>
									Hủy
								</Button>,
								<Button className='w-40' key='submit' type='primary' onClick={handleOkFile}>
									Lưu
								</Button>,
							]}
						>
							<div className='space-y-4 pb-10'>
								<div className='flex items-center gap-4'>
									<div className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Tệp đính kèm:
									</div>
									<div className='flex items-center gap-2'>
										<Input
											prefix={<PaperClip />}
											placeholder='Tìm kiếm'
											className='h-10 w-[336px] bg-[#F0F3F6]'
											variant='filled'
										/>
										<Button>Chọn tệp tải lên...</Button>
									</div>
								</div>
								<div className='flex items-center gap-4'>
									<div className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Tải file mẫu:
									</div>
									<div className='flex items-center gap-2'>
										<Dowload />

										<div className="font-['Source Sans Pro'] text-base font-normal italic text-[#373839]">
											[Tải xuống file mẫu]
										</div>
									</div>
								</div>
							</div>
						</Modal>
					</ConfigProvider>
				</>
			)}
		</div>
	);
};
export default StudentProfileListPage;
