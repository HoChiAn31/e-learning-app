import { Button, ConfigProvider, Input, Select, Tag } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Info, Search } from '../../../components/icon';
import { Link } from 'react-router-dom';
import { Data } from './semester';

type TabProps = {
	active: boolean;
	label: string;
	onClick: () => void;
};
interface DataType {
	key: string;
	courseCode: string;
	courseName: string;
	time: string;
	instructor: string;
	status: boolean;
}

const Tab: React.FC<TabProps> = ({ active, label, onClick }) => {
	return (
		<div
			className={`inline-flex h-[72px] w-[207px] cursor-pointer items-center justify-center overflow-hidden rounded-tl-lg rounded-tr-lg pb-[29px] pl-4 pr-[17px] pt-5 shadow-[-1px_5px_18px_-4px_rgba(0,0,0,0.25)] ${active ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21] text-[#f2f2f2]' : 'border border-[#ff5400] text-[#373839]'}`}
			onClick={onClick}
		>
			<div className="w-[174px] text-center font-['Mulish'] text-lg font-extrabold tracking-tight">
				{label}
			</div>
		</div>
	);
};

function TeacherClassPage() {
	const [active, setActive] = useState<string>('upcoming');
	const [selectedGroup, setSelectedGroup] = useState<string>('');
	const [selectedSubject, setSelectedSubject] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>(''); // New state for search input
	const [data, setData] = useState<DataType[]>([]);
	// Define valid subjects for each group
	const groupSubjects: { [key: string]: string[] } = {
		'THCS-ToanLyHoa': ['Toán', 'Lý', 'Hóa', 'Tiếng Anh'],
		'THCS-SinhSuDia': ['Văn', 'Sử', 'Địa', 'Tiếng Anh'],
		'THCS-NgheThuat': ['Nghệ thuật', 'Tiếng Anh'],
	};
	useEffect(() => {
		if (Data.length > 0) {
			setData(Data);
		}
	}, []);
	// Update subjects based on selected group
	const subjectOptions = selectedGroup
		? groupSubjects[selectedGroup].map((subject) => ({
				value: subject,
				label: subject,
			}))
		: [
				{ value: 'Toán', label: 'Toán' },
				{ value: 'Lý', label: 'Lý' },
				{ value: 'Hóa', label: 'Hóa' },
				{ value: 'Văn', label: 'Văn' },
				{ value: 'Sử', label: 'Sử' },
				{ value: 'Địa', label: 'Địa' },
				{ value: 'Nghệ thuật', label: 'Nghệ thuật' },
				{ value: 'Tiếng Anh', label: 'Tiếng Anh' },
			];

	const columns: ColumnsType<DataType> = [
		{
			title: 'Mã lớp',
			dataIndex: 'courseCode',
			key: 'courseCode',
		},
		{
			title: 'Môn học',
			dataIndex: 'courseName',
			key: 'courseName',
		},
		{
			title: 'Thời gian',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: 'Giảng viên',
			dataIndex: 'instructor',
			key: 'instructor',
		},
		...(active === 'upcoming'
			? [
					{
						title: 'Trạng thái',
						dataIndex: 'status',
						key: 'status',
						render: (status: boolean) => (
							<Tag color={status ? '#ff7506' : '#c9c4c0'} className='w-24 py-1 text-center'>
								{status ? 'Bắt đầu' : 'Bắt đầu'}
							</Tag>
						),
					},
				]
			: []), // Remove 'Trạng thái' column when active === 'held'
		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<div className=''>
					<Link to={`/teacher/class/list/${record.key}`}>
						<Info />
					</Link>
				</div>
			),
		},
	];

	const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const handleGroupChange = (value: string) => {
		setSelectedGroup(value);
		setSelectedSubject(''); // Reset subject when group changes
	};

	const handleSubjectChange = (value: string) => {
		setSelectedSubject(value);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value); // Update search term on input change
	};

	const filteredData = data
		.filter((item) => {
			const matchesGroup =
				!selectedGroup ||
				groupSubjects[selectedGroup].some((subject) => item.courseName.includes(subject)) ||
				(selectedGroup === '' && true); // No filter if no group selected
			const matchesSubject =
				!selectedSubject ||
				(selectedSubject === 'Toán'
					? item.courseName.includes('Toán')
					: item.courseName === selectedSubject); // Special case for 'Toán'
			const matchesStatus = active === 'held' ? item.status : true; // Only show status=true for 'held'

			const matchesSearch =
				!searchTerm ||
				item.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.courseCode.toLowerCase().includes(searchTerm.toLowerCase()); // Search across multiple fields
			return matchesGroup && matchesSubject && matchesStatus && matchesSearch;
		})
		.map((item, index) => ({ ...item, key: index.toString() })); // Reassign keys for filtered data

	return (
		<div>
			<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
				Quản lý lớp học
			</div>

			<div className='pt-5'>
				<Tab
					active={active === 'upcoming'}
					label='Lớp học sắp tới'
					onClick={() => setActive('upcoming')}
				/>
				<Tab
					active={active === 'held'}
					label='Lớp học đã tổ chức'
					onClick={() => setActive('held')}
				/>
			</div>
			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-end justify-between pb-5'>
					<div className='flex items-center gap-5'>
						<div>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
								Chọn Tổ
							</div>
							<Select
								placeholder='Chọn tổ'
								style={{ width: 200 }}
								onChange={handleGroupChange}
								value={selectedGroup}
								options={[
									{ value: 'THCS-ToanLyHoa', label: 'THCS - Tổ Toán Lý Hóa' },
									{ value: 'THCS-SinhSuDia', label: 'THCS - Tổ Văn Sử Địa' },
									{ value: 'THCS-NgheThuat', label: 'THCS - Tổ Nghệ thuật' },
								]}
							/>
						</div>
						<div>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
								Chọn bộ môn
							</div>
							<Select
								placeholder='Chọn bộ môn'
								style={{ width: 120 }}
								onChange={handleSubjectChange}
								value={selectedSubject}
								options={subjectOptions}
							/>
						</div>
					</div>
					<div>
						<Input
							placeholder='Tìm kiếm'
							className='w-[438px] rounded-full bg-[#F0F3F6]'
							prefix={<Search />}
							variant='filled'
							value={searchTerm} // Bind the input value to searchTerm state
							onChange={handleSearchChange} // Handle input changes
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
					<Table<DataType>
						columns={columns}
						dataSource={filteredData}
						onChange={onChange}
						rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
						pagination={{
							position: ['bottomRight'],
							showSizeChanger: true,
							pageSizeOptions: ['5', '10', '20', '50'],
							defaultPageSize: 5,
						}}
						className='w-[1640px]'
					/>
				</ConfigProvider>
			</div>
		</div>
	);
}

export default TeacherClassPage;
