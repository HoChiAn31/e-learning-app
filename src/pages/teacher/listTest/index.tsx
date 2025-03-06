// App.tsx
import React from 'react';
import { Table, Button, Input, DatePicker, Select, ConfigProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import BreadcrumbLink from '../../../components/BreadcrumbLinkProps';

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
	{
		title: 'Lôp',
		dataIndex: 'lop',
		key: 'lop',
	},
	{
		title: 'Ngũ lượng kiểm tra',
		dataIndex: 'nguLuongKiemTra',
		key: 'nguLuongKiemTra',
	},
	{
		title: 'Mẻ nấu',
		dataIndex: 'meNau',
		key: 'meNau',
	},
	{
		title: 'Ngày kiểm tra',
		dataIndex: 'ngayKiemTra',
		key: 'ngayKiemTra',
	},
	{
		title: 'Thời lượng',
		dataIndex: 'thoiLuong',
		key: 'thoiLuong',
	},
	{
		title: 'Tình trạng',
		dataIndex: 'tinhTrang',
		key: 'tinhTrang',
	},
	{
		title: 'Biểu đồ',
		key: 'action',
		render: () => (
			<Button type='primary' style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}>
				Xem biểu đồ
			</Button>
		),
	},
];

const data = [
	{
		key: '1',
		lop: 'Lôp 1',
		nguLuongKiemTra: 'Kiêm tra 1 tiết',
		meNau: 'Tổ đội S6',
		ngayKiemTra: '12/03/2023',
		thoiLuong: '45 phút',
		tinhTrang: 'Chưa hoàn tất',
	},
	{
		key: '2',
		lop: 'Lôp 2',
		nguLuongKiemTra: 'Kiêm tra 1 tiết',
		meNau: 'Tổ đội S6',
		ngayKiemTra: '12/03/2023',
		thoiLuong: '45 phút',
		tinhTrang: 'Chưa hoàn tất',
	},
	{
		key: '3',
		lop: 'Lôp 3',
		nguLuongKiemTra: 'Kiêm tra 1 tiết',
		meNau: 'Tổ đội S6',
		ngayKiemTra: '12/03/2023',
		thoiLuong: '45 phút',
		tinhTrang: 'Chưa hoàn tất',
	},
	// Add more data as needed
];

const TeacherListTestPage = () => {
	return (
		<div>
			<BreadcrumbLink
				to='/teacher/class/list'
				parentPage='Thông tin lớp học'
				currentPage='Danh sách bài kiểm tra'
			/>
			<div className='container mx-auto p-4'>
				{/* Header Section */}
				<div className='mb-4 flex items-center justify-between'>
					<h2 className='text-xl font-bold'>Tổng số bảng điều khiển</h2>
					<Button type='primary' className='bg-orange-500'>
						Thêm bảng điều khiển
					</Button>
				</div>

				{/* Filter Section */}
				<div className='mb-4 flex space-x-4'>
					<div>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
							Chọn bộ môn
						</div>
						<Select defaultValue='Ngữ văn' className='w-32'>
							<Option value='Ngữ văn'>Ngữ văn</Option>
							<Option value='nguLuong'>Ngũ lượng</Option>
							<Option value='meNau'>Mẻ nấu</Option>
						</Select>
					</div>

					<div>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
							Chọn khối
						</div>
						<Select defaultValue='10' className='w-32'>
							<Option value='lop'>Lôp</Option>
							<Option value='nguLuong'>Ngũ lượng</Option>
							<Option value='meNau'>Mẻ nấu</Option>
						</Select>
					</div>
					<div>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
							Chọn ngày
						</div>
						<DatePicker format='DD/MM/YYYY' className='w-32' />
					</div>
					<div className='pt-7'>
						<Button type='primary'>Lọc kết quả</Button>
					</div>
				</div>

				{/* Table Section */}
				<ConfigProvider
					theme={{
						components: {
							Table: {
								headerBg: '#FF7506',
								headerColor: '#ffffff',
								headerFilterHoverBg: '#FF7506',
								headerSortHoverBg: '#FF7506',
								headerSortActiveBg: '#FF7506',
								headerSplitColor: '#FF7506',
								borderColor: '#f2f2f6',
							},
						},
					}}
				>
					<Table
						columns={columns}
						dataSource={data}
						pagination={{ pageSize: 5 }}
						className='shadow-md'
					/>
				</ConfigProvider>
			</div>
		</div>
	);
};

export default TeacherListTestPage;
