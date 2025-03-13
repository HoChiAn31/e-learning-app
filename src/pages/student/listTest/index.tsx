// App.tsx
import { useState, useEffect } from 'react';
import { Table, Button, DatePicker, Select, ConfigProvider, TableColumnsType, Input } from 'antd';
import BreadcrumbLink from '../../../components/BreadcrumbLinkProps';
import { Tab } from '../../../components/Tab';
import { Edit, Info, Search } from '../../../components/icon';
import { useNavigate } from 'react-router-dom';

interface TestSubmission {
	key: string;
	testType: string;
	lecturer: string;
	subject: string;
	testDate: string;
	duration: string;
	status: 'notStarted' | 'progress' | 'finished';
	assignmentState:
		| 'notStarted'
		| 'inProgress'
		| 'submitted'
		| 'notSubmitted'
		| 'pending'
		| 'missed';
	startTime?: number;
}

const { Option } = Select;

const initialData: TestSubmission[] = [
	{
		key: '1',
		testType: 'Kiểm tra 1 tiết',
		lecturer: 'Nguyễn Văn A',
		subject: 'Tổ đội S6',
		testDate: '12/03/2023',
		duration: '45 phút',
		status: 'notStarted',
		assignmentState: 'notStarted',
	},
	{
		key: '2',
		testType: 'Kiểm tra 1 tiết',
		lecturer: 'Trần Thị B',
		subject: 'Tổ đội S6',
		testDate: '12/03/2023',
		duration: '45 phút',
		status: 'finished',
		assignmentState: 'submitted',
	},
	{
		key: '3',
		testType: 'Kiểm tra 1 tiết',
		lecturer: 'Lê Văn C',
		subject: 'Tổ đội S5',
		testDate: '12/03/2023',
		duration: '45 phút',
		status: 'progress',
		assignmentState: 'inProgress',
	},
	// ... (similar modifications for other entries)
	{
		key: '4',
		testType: 'Kiểm tra cuối kỳ',
		lecturer: 'Phạm Thị D',
		subject: 'Tổ đội S5',
		testDate: '15/04/2023',
		duration: '60 phút',
		status: 'notStarted',
		assignmentState: 'pending',
	},
	{
		key: '5',
		testType: 'Kiểm tra giữa kỳ',
		lecturer: 'Hoàng Văn E',
		subject: 'Tổ đội S4',
		testDate: '20/05/2023',
		duration: '60 phút',
		status: 'finished',
		assignmentState: 'missed',
	},
];

const StudentListTestPage = () => {
	const [active, setActive] = useState<string>('all');
	const [testData, setTestData] = useState<TestSubmission[]>(initialData);
	const [filteredData, setFilteredData] = useState<TestSubmission[]>(initialData);
	const [searchText, setSearchText] = useState<string>('');
	const [filterSubject, setFilterSubject] = useState<string>('');
	const [filterGrade, setFilterGrade] = useState<string>('');
	const [filterDate, setFilterDate] = useState<string | null>(null);
	const nav = useNavigate();

	// Hàm xử lý lọc dữ liệu
	const handleFilter = () => {
		let filtered = [...initialData];

		// Lọc theo môn học
		if (filterSubject) {
			filtered = filtered.filter((item) => item.subject.includes(filterSubject));
		}

		// Lọc theo khối (giả sử subject chứa thông tin khối như "Tổ đội S6")
		if (filterGrade) {
			filtered = filtered.filter((item) => item.subject.includes(`S${filterGrade}`));
		}

		// Lọc theo ngày
		if (filterDate) {
			filtered = filtered.filter((item) => item.testDate === filterDate);
		}

		// Lọc theo search text
		if (searchText) {
			filtered = filtered.filter(
				(item) =>
					item.testType.toLowerCase().includes(searchText.toLowerCase()) ||
					item.lecturer.toLowerCase().includes(searchText.toLowerCase()) ||
					item.subject.toLowerCase().includes(searchText.toLowerCase()),
			);
		}

		setFilteredData(filtered);
	};

	// Xử lý khi thay đổi giá trị search
	const handleSearch = (value: string) => {
		setSearchText(value);
	};

	// Xử lý khi thay đổi các bộ lọc
	const handleSubjectChange = (value: string) => {
		setFilterSubject(value);
	};

	const handleGradeChange = (value: string) => {
		setFilterGrade(value);
	};

	const handleDateChange = (date: moment.Moment | null) => {
		setFilterDate(date ? date.format('DD/MM/YYYY') : null);
	};

	// Cập nhật filteredData khi testData thay đổi
	useEffect(() => {
		handleFilter();
	}, [testData, searchText, filterSubject, filterGrade, filterDate]);

	const handleStartTest = (record: TestSubmission) => {
		setTestData((prevData) =>
			prevData.map((item) =>
				item.key === record.key
					? {
							...item,
							assignmentState: 'inProgress',
							status: 'progress',
							startTime: Date.now(),
						}
					: item,
			),
		);
		// nav(`/student/test/start/${record.key}`);
		nav(`/student/test/essay`);
	};

	const handleDelete = (record: TestSubmission) => {
		console.log('Remove test:', record);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setTestData((prevData) =>
				prevData.map((item) => {
					if (item.status === 'progress' && item.startTime) {
						const durationInMinutes = parseInt(item.duration) || 0;
						const durationInMs = durationInMinutes * 60 * 1000;
						const elapsedTime = Date.now() - item.startTime;

						if (elapsedTime >= durationInMs) {
							return { ...item, status: 'finished', assignmentState: 'submitted' };
						}
					}
					return item;
				}),
			);
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	const columns: TableColumnsType<TestSubmission> = [
		{
			title: 'Nội dung kiểm tra',
			dataIndex: 'testType',
			key: 'testType',
		},
		{
			title: 'Giảng viên',
			dataIndex: 'lecturer',
			key: 'lecturer',
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
			key: 'assignmentState',
			render: (_, record) => {
				const stateColors = {
					notStarted: '#ed2025', // Red
					inProgress: '#0B80EC', // Blue
					submitted: '#49C510', // Green
					pending: '#faad14', // Yellow
					missed: '#000000', // Black
					notSubmitted: '#faad14', // Yellow (or choose a different color if you prefer)
				};

				const stateText = {
					notStarted: 'Chưa bắt đầu',
					inProgress: 'Đang thực hiện',
					submitted: 'Đã nộp bài',
					pending: 'Chưa nộp bài',
					missed: 'Không nộp bài',
					notSubmitted: 'Chưa nộp bài', // Added this missing state
				};

				if (record.assignmentState === 'notStarted') {
					return (
						<Button type='primary' onClick={() => handleStartTest(record)} className='w-28'>
							Bắt đầu
						</Button>
					);
				}

				return (
					<p
						style={{ color: stateColors[record.assignmentState] }}
						className='w-28 text-center italic'
					>
						{stateText[record.assignmentState]}
					</p>
				);
			},
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className=''>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Info />
					</Button>
				</div>
			),
			width: '30%',
		},
	];

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
				</div>
				<div>
					<Button type='primary' className='h-[60px]' onClick={() => nav(`/teacher/listTestAdd`)}>
						Thêm bài kiểm tra
					</Button>
				</div>
			</div>
			<div className='relative -mt-2 bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className='mb-4 flex space-x-4'>
						<div>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
								Chọn bộ môn
							</div>
							<Select defaultValue='Ngữ văn' className='w-32' onChange={handleSubjectChange}>
								<Option value='Ngữ văn'>Ngữ văn</Option>
								<Option value='Toán'>Toán</Option>
								<Option value='Hoá'>Hoá</Option>
							</Select>
						</div>
						<div>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
								Chọn khối
							</div>
							<Select defaultValue='10' className='w-32' onChange={handleGradeChange}>
								<Option value='10'>10</Option>
								<Option value='11'>11</Option>
								<Option value='12'>12</Option>
							</Select>
						</div>
						<div>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
								Chọn ngày
							</div>
							<DatePicker format='DD/MM/YYYY' className='w-32' onChange={handleDateChange} />
						</div>
						<div className='pt-7'>
							<Button type='primary' onClick={handleFilter}>
								Lọc kết quả
							</Button>
						</div>
					</div>

					<div>
						<Input
							placeholder='Tìm kiếm'
							className='w-[438px] rounded-full bg-[#F0F3F6]'
							prefix={<Search />}
							variant='filled'
							value={searchText}
							onChange={(e) => handleSearch(e.target.value)}
						/>
					</div>
				</div>

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
						dataSource={filteredData}
						pagination={{ pageSize: 5 }}
						className='shadow-md'
					/>
				</ConfigProvider>
			</div>
		</div>
	);
};

export default StudentListTestPage;
