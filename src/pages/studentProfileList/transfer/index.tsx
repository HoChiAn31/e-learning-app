import { Button, ConfigProvider, Input, Modal, Table, TableColumnsType, TableProps } from 'antd';
import {
	ArrowRight,
	Edit,
	Eyes,
	List,
	PaperClip,
	Plus,
	Search,
	Trash,
} from '../../../components/icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface SemesterData {
	key: string;
	studentCode: string;
	studentName: string;
	birthDay: string;
	gender: string;
	nation?: string;
	class?: string;
	status?: string;
	transferFrom: string;
	transferSemester: string;
	faculties: string;
	date: string;
}

interface dataTeacher {
	id: string;
	name: string;
}
const data: SemesterData[] = [
	{
		key: '1',
		studentCode: 'SV001',
		studentName: 'Nguyễn Văn A',
		birthDay: '1998-05-15',
		gender: 'Nam',
		nation: 'Việt Nam',
		class: '12A1',
		status: 'Đang học',
		transferFrom: 'Trường THPT A',
		transferSemester: 'Kỳ 1',
		faculties: 'Khoa Kinh tế',
		date: '2025-01-15',
	},
	{
		key: '2',
		studentCode: 'SV002',
		studentName: 'Trần Thị B',
		birthDay: '1999-03-20',
		gender: 'Nữ',
		nation: 'Việt Nam',
		class: '12A2',
		status: 'Đang học',
		transferFrom: 'Trường THPT B',
		transferSemester: 'Kỳ 1',
		faculties: 'Khoa Ngoại ngữ',
		date: '2025-01-20',
	},
	{
		key: '3',
		studentCode: 'SV003',
		studentName: 'Lê Hoàng C',
		birthDay: '2000-07-10',
		gender: 'Nam',
		nation: 'Việt Nam',
		class: '12A3',
		status: 'Đã tốt nghiệp',
		transferFrom: 'Trường THPT C',
		transferSemester: 'Kỳ 2',
		faculties: 'Khoa Công nghệ thông tin',
		date: '2024-07-10',
	},
	{
		key: '4',
		studentCode: 'SV004',
		studentName: 'Phạm Minh D',
		birthDay: '1997-09-25',
		gender: 'Nam',
		nation: 'Việt Nam',
		class: '12A4',
		status: 'Bảo lưu',
		transferFrom: 'Trường THPT D',
		transferSemester: 'Kỳ 1',
		faculties: 'Khoa Y dược',
		date: '2023-09-15',
	},
	{
		key: '5',
		studentCode: 'SV005',
		studentName: 'Đỗ Thị E',
		birthDay: '2001-12-05',
		gender: 'Nữ',
		nation: 'Việt Nam',
		class: '12A5',
		status: 'Đang học',
		transferFrom: 'Trường THPT E',
		transferSemester: 'Kỳ 2',
		faculties: 'Khoa Sư phạm',
		date: '2025-06-01',
	},
	{
		key: '6',
		studentCode: 'SV006',
		studentName: 'Hoàng Văn F',
		birthDay: '2002-02-18',
		gender: 'Nam',
		nation: 'Việt Nam',
		class: '12A6',
		status: 'Đang học',
		transferFrom: 'Trường THPT F',
		transferSemester: 'Kỳ 1',
		faculties: 'Khoa Xây dựng',
		date: '2024-12-01',
	},
	{
		key: '7',
		studentCode: 'SV007',
		studentName: 'Ngô Thị G',
		birthDay: '2003-04-30',
		gender: 'Nữ',
		nation: 'Việt Nam',
		class: '12A7',
		status: 'Đang học',
		transferFrom: 'Trường THPT G',
		transferSemester: 'Kỳ 1',
		faculties: 'Khoa Luật',
		date: '2025-03-10',
	},
	{
		key: '8',
		studentCode: 'SV008',
		studentName: 'Bùi Anh H',
		birthDay: '2004-08-12',
		gender: 'Nam',
		nation: 'Việt Nam',
		class: '12A8',
		status: 'Đang học',
		transferFrom: 'Trường THPT H',
		transferSemester: 'Kỳ 2',
		faculties: 'Khoa Khoa học xã hội',
		date: '2025-08-12',
	},
	{
		key: '9',
		studentCode: 'SV009',
		studentName: 'Tạ Văn I',
		birthDay: '1996-11-11',
		gender: 'Nam',
		nation: 'Việt Nam',
		class: '12A9',
		status: 'Đã tốt nghiệp',
		transferFrom: 'Trường THPT I',
		transferSemester: 'Kỳ 1',
		faculties: 'Khoa Quản trị kinh doanh',
		date: '2024-11-11',
	},
	{
		key: '10',
		studentCode: 'SV010',
		studentName: 'Trịnh Thị J',
		birthDay: '2005-06-30',
		gender: 'Nữ',
		nation: 'Việt Nam',
		class: '12A10',
		status: 'Đang học',
		transferFrom: 'Trường THPT J',
		transferSemester: 'Kỳ 2',
		faculties: 'Khoa Nghệ thuật',
		date: '2025-06-30',
	},
];

const dataTeacher: dataTeacher[] = [
	{ id: '550e8400-e29b-41d4-a715-446655440000', name: 'Nguyễn Văn A' },
	{ id: '550e8400-e29b-41d4-a715-446655440001', name: 'Trần Thị B' },
	{ id: '550e8400-e29b-41d4-a715-446655440002', name: 'Lê Văn C' },
	{ id: '550e8400-e29b-41d4-a715-446655440003', name: 'Huỳnh Thanh D' },
	{ id: '550e8400-e29b-41d4-a715-446655440004', name: 'Nguyễn Thanh E' },
	{ id: '550e8400-e29b-41d4-a715-446655440004', name: 'Đào Thị F' },
	{ id: '550e8400-e29b-41d4-a715-446655440004', name: 'Phạm Văn G' },
];
function StudentTransferPage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [IsModalList, setIsModalOpenList] = useState<boolean>(false);

	const nav = useNavigate();
	const handleEditList = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		setIsModalOpenList(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const handleOkList = () => {
		setIsModalOpenList(false);
	};
	const handleCancelList = () => {
		setIsModalOpenList(false);
	};
	const modalStyles = {
		header: {
			textAlign: 'center' as 'center',
		},
		footer: {
			textAlign: 'center' as 'center',
		},
	};
	const columns: TableColumnsType<SemesterData> = [
		{
			title: 'Mã học viên',
			dataIndex: 'studentCode',
			sorter: (a, b) => a.studentCode.localeCompare(b.studentCode),
			width: '10%',
		},

		{
			title: 'Tên học viên',
			dataIndex: 'studentName',
			sorter: (a, b) => a.studentName.localeCompare(b.studentName),
			width: '10%',
		},
		{
			title: 'Ngày sinh',
			dataIndex: 'birthDay',
			sorter: (a, b) => a.birthDay.localeCompare(b.birthDay),
			width: '15%',
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
			sorter: (a, b) => a.gender.localeCompare(b.gender),
			width: '10%',
		},
		{
			title: 'Chuyển từ',
			dataIndex: 'transferFrom',
			sorter: (a, b) => a.transferFrom.localeCompare(b.transferFrom),
			width: '15%',
		},
		{
			title: 'Học kì chuyển',
			dataIndex: 'transferSemester',
			sorter: (a, b) => a.transferSemester.localeCompare(b.transferSemester),
			width: '10%',
		},
		{
			title: 'Khối',
			dataIndex: 'faculties',
			sorter: (a, b) => a.faculties.localeCompare(b.faculties),
			width: '10%',
		},
		{
			title: 'Ngày chuyển',
			dataIndex: 'date',
			sorter: (a, b) => a.date.localeCompare(b.date),
			width: '10%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className=''>
					<Button type='link' onClick={() => handleEditList(record)}>
						<Eyes color='#FF7506' />
					</Button>
				</div>
			),
			width: '20%',
		},
	];
	const onChange: TableProps<SemesterData>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const handleSwitchStudentProfile = () => {
		localStorage.setItem('activeMainTab', '/studentProfileList');
		localStorage.setItem('activeSubTab', 'all');
		nav('/studentProfileList/all');
	};
	return (
		<div>
			<div className='inline-flex h-[60px] items-center justify-center'>
				<div className='inline-flex items-center justify-start gap-2 px-2.5'>
					<div
						className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
						onClick={handleSwitchStudentProfile}
					>
						Hồ sơ học viên
					</div>
					<div data-svg-wrapper className='relative'>
						<ArrowRight />
					</div>
					<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
						Tiếp nhận chuyển trường
					</div>
				</div>
			</div>
			<div className='flex w-full items-end justify-end'>
				<Button
					className='py-5'
					type='primary'
					icon={<Plus />}
					size='middle'
					onClick={() => setIsModalOpen(true)}
					// onClick={showModal}
				>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Thêm mới
					</div>
				</Button>
				{/* Modal Add */}
				<Modal
					title='Tiếp nhận chuyển trường'
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
							{/* left */}
							<div className='space-y-10'>
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Tên học viên:
											</div>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>
								{/*  */}
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Mã học viên:
											</div>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>
								{/*  */}
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Ngày chuyển đến:
											</div>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>
								{/*  */}
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Học kỳ chuyển:
											</div>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>
								{/*  */}
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Tỉnh/Thành:
											</div>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>
								{/*  */}
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Quận/Huyện:
											</div>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>
								{/*  */}
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Chuyển từ:
											</div>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>
								{/*  */}
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Lý do:
											</div>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>
								{/*  */}
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Tệp đính kèm:
											</div>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</div>
										</div>
									</div>

									<Input
										prefix={<PaperClip />}
										placeholder='Tìm kiếm'
										className='h-10 w-[336px] bg-[#F0F3F6]'
										variant='filled'
									/>
									<Button>Chọn tệp tải lên...</Button>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			</div>
			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
						Danh sách chuyển trường
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
			{/* Modal List */}
			<Modal
				title='Danh sách lớp học'
				open={IsModalList}
				onOk={handleOkList}
				onCancel={handleCancelList}
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
			></Modal>
		</div>
	);
}

export default StudentTransferPage;
