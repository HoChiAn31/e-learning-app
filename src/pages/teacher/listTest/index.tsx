// App.tsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, DatePicker, Select, ConfigProvider, TableColumnsType } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import BreadcrumbLink from '../../../components/BreadcrumbLinkProps';
import { Tab } from '../../../components/Tab';
import { Edit, Info } from '../../../components/icon';
import { useNavigate } from 'react-router-dom';

interface TestSubmission {
	key: string;
	className: string;
	testType: string;
	subject: string;
	testDate: string;
	duration: string;
	status: 'notStarted' | 'progress' | 'finished';
	isAssignment: boolean;
	startTime?: number;
}

const { Option } = Select;

const initialData: TestSubmission[] = [
	{
		key: '1',
		className: 'Lớp 10A1',
		testType: 'Kiểm tra 1 tiết',
		subject: 'Tổ đội S6',
		testDate: '12/03/2023',
		duration: '45 phút',
		isAssignment: false,
		status: 'notStarted',
	},
	{
		key: '2',
		className: 'Lớp 10A2',
		testType: 'Kiểm tra 1 tiết',
		subject: 'Tổ đội S6',
		testDate: '12/03/2023',
		duration: '45 phút',
		isAssignment: true,
		status: 'finished',
	},
	{
		key: '3',
		className: 'Lớp 10A3',
		testType: 'Kiểm tra 1 tiết',
		subject: 'Tổ đội S5',
		testDate: '12/03/2023',
		duration: '45 phút',
		isAssignment: false,
		status: 'progress',
	},
	{
		key: '4',
		className: 'Lớp 10A4',
		testType: 'Kiểm tra cuối kỳ',
		subject: 'Tổ đội S5',
		testDate: '15/04/2023',
		duration: '60 phút',
		isAssignment: false,
		status: 'notStarted',
	},
	{
		key: '5',
		className: 'Lớp 10A5',
		testType: 'Kiểm tra giữa kỳ',
		subject: 'Tổ đội S4',
		testDate: '20/05/2023',
		duration: '60 phút',
		isAssignment: false,
		status: 'finished',
	},
	{
		key: '6',
		className: 'Lớp 10A6',
		testType: 'Kiểm tra 15 phút',
		subject: 'Tổ đội S3',
		testDate: '10/06/2023',
		duration: '15 phút',
		isAssignment: true,
		status: 'progress',
	},
	{
		key: '7',
		className: 'Lớp 10A7',
		testType: 'Kiểm tra cuối kỳ',
		subject: 'Tổ đội S3',
		testDate: '18/07/2023',
		duration: '60 phút',
		isAssignment: false,
		status: 'finished',
	},
	{
		key: '8',
		className: 'Lớp 10A8',
		testType: 'Kiểm tra 15 phút',
		subject: 'Tổ đội S2',
		testDate: '25/08/2023',
		duration: '15 phút',
		isAssignment: true,
		status: 'progress',
	},
	{
		key: '9',
		className: 'Lớp 10A9',
		testType: 'Kiểm tra giữa kỳ',
		subject: 'Tổ đội S2',
		testDate: '30/09/2023',
		duration: '60 phút',
		isAssignment: false,
		status: 'finished',
	},
	{
		key: '10',
		className: 'Lớp 10A10',
		testType: 'Kiểm tra 1 tiết',
		subject: 'Tổ đội S1',
		testDate: '05/10/2023',
		duration: '45 phút',
		isAssignment: true,
		status: 'finished',
	},
	{
		key: '11',
		className: 'Lớp 10A11',
		testType: 'Kiểm tra cuối kỳ',
		subject: 'Tổ đội S1',
		testDate: '15/11/2023',
		duration: '60 phút',
		isAssignment: false,
		status: 'notStarted',
	},
	{
		key: '12',
		className: 'Lớp 10A12',
		testType: 'Kiểm tra giữa kỳ',
		subject: 'Tổ đội S4',
		testDate: '22/12/2023',
		duration: '60 phút',
		isAssignment: true,
		status: 'notStarted',
	},
	{
		key: '13',
		className: 'Lớp 10A13',
		testType: 'Kiểm tra 15 phút',
		subject: 'Tổ đội S6',
		testDate: '05/01/2024',
		duration: '15 phút',
		isAssignment: false,
		status: 'notStarted',
	},
];

const TeacherListTestPage = () => {
	const [active, setActive] = useState<string>('all');
	const [testData, setTestData] = useState<TestSubmission[]>(initialData);
	const nav = useNavigate();
	// Hàm xử lý khi nhấn "Bắt đầu"
	const handleStartTest = (record: TestSubmission) => {
		setTestData((prevData) =>
			prevData.map((item) =>
				item.key === record.key
					? {
							...item,
							isAssignment: true,
							status: 'progress',
							startTime: Date.now(),
						}
					: item,
			),
		);
	};

	// Hàm xử lý khi nhấn "Chấm điểm"
	const handleGradeTest = (record: TestSubmission) => {
		console.log('Chấm điểm bài kiểm tra:', record);
		// Thêm logic chấm điểm ở đây (ví dụ: mở modal hoặc chuyển hướng)
	};

	// Đồng bộ trạng thái bài kiểm tra
	useEffect(() => {
		const interval = setInterval(() => {
			setTestData((prevData) =>
				prevData.map((item) => {
					if (item.status === 'progress' && item.startTime) {
						const durationInMinutes = parseInt(item.duration) || 0;
						const durationInMs = durationInMinutes * 60 * 1000;
						const elapsedTime = Date.now() - item.startTime;

						if (elapsedTime >= durationInMs) {
							return { ...item, status: 'finished' };
						}
					}
					return item;
				}),
			);
		}, 1000); // Cập nhật mỗi giây

		return () => clearInterval(interval);
	}, []);

	const columns: TableColumnsType<TestSubmission> = [
		{
			title: 'Lớp',
			dataIndex: 'className',
			key: 'className',
		},
		{
			title: 'Nội dung kiểm tra',
			dataIndex: 'testType',
			key: 'testType',
		},
		{
			title: 'Môn học',
			dataIndex: 'subject',
			key: 'subject',
		},
		{
			title: 'Ngày làm bài',
			dataIndex: 'testDate',
			key: 'testDate',
		},
		{
			title: 'Thời lượng',
			dataIndex: 'duration',
			key: 'duration',
		},
		{
			title: 'Tình trạng',
			dataIndex: 'status',
			key: 'status',
			render: (status: string) => {
				let color = '';
				let displayText = '';

				switch (status) {
					case 'notStarted':
						color = '#ed2025';
						displayText = 'Chưa bắt đầu';
						break;
					case 'progress':
						color = '#0B80EC';
						displayText = 'Đang tiến hành';
						break;
					case 'finished':
						color = '#49C510';
						displayText = 'Đã kết thúc';
						break;
					default:
						color = '#000000';
						displayText = status;
				}

				return (
					<p style={{ color }} className='italic'>
						{displayText}
					</p>
				);
			},
		},
		{
			title: 'Bài làm',
			key: 'isAssignment',
			render: (_, record) => {
				if (!record.isAssignment && record.status === 'notStarted') {
					return (
						<Button
							type='primary'
							// style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
							onClick={() => handleStartTest(record)}
							className='w-28'
						>
							Bắt đầu
						</Button>
					);
				} else if (record.status === 'progress') {
					return (
						<Button type='primary' disabled className='w-28'>
							Chấm điểm
						</Button>
					);
				} else if (record.status === 'finished') {
					return (
						<Button
							type='primary'
							style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
							onClick={() => handleGradeTest(record)}
							className='w-28'
						>
							Chấm điểm
						</Button>
					);
				}
				return null;
			},
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className=''>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Info />
					</Button>
				</div>
			),
			width: '30%',
		},
	];

	const handleEdit = (record: TestSubmission) => {
		console.log('Edit academic year:', record);
	};

	const handleDelete = (record: TestSubmission) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.key);
	};

	return (
		<div>
			<BreadcrumbLink
				to='/teacher/listTest/all'
				parentPage='Thông tin lớp học'
				currentPage='Danh sách bài kiểm tra'
			/>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-6 pt-5'>
					<Tab active={active === 'all'} label='Lớp học sắp tới' onClick={() => setActive('all')} />
					<Tab
						active={active === 'upcomingTest'}
						label='Bài kiểm tra sắp tới'
						onClick={() => setActive('upcomingTest')}
					/>
					<Tab
						active={active === 'testGraded'}
						label='Bài kiểm tra đã chấm'
						onClick={() => setActive('testGraded')}
					/>
					<Tab
						active={active === 'testNoGraded'}
						label='Bài kiểm tra chưa chấm'
						onClick={() => setActive('testNoGraded')}
					/>
				</div>
				<div>
					<Button
						type='primary'
						className='h-[60px]'
						onClick={() => {
							nav(`/teacher/listTestAdd`);
						}}
					>
						Thêm bài kiểm tra
					</Button>
				</div>
			</div>
			<div className='relative -mt-2 bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				{/* Filter Section */}
				<div className='mb-4 flex space-x-4'>
					<div>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
							Chọn bộ môn
						</div>
						<Select defaultValue='Ngữ văn' className='w-32'>
							<Option value='Ngữ văn'>Ngữ văn</Option>
							<Option value='Toán'>Toán</Option>
							<Option value='Hoá'>Hoá</Option>
						</Select>
					</div>
					<div>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
							Chọn khối
						</div>
						<Select defaultValue='10' className='w-32'>
							<Option value='10'>10</Option>
							<Option value='11'>11</Option>
							<Option value='12'>12</Option>
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
						dataSource={testData}
						pagination={{ pageSize: 5 }}
						className='shadow-md'
					/>
				</ConfigProvider>
			</div>
		</div>
	);
};

export default TeacherListTestPage;
