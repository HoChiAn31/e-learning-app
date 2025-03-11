import { Button, ConfigProvider, DatePicker, Input, Select, Tag } from 'antd';
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

function StudentMyClassPage() {
	const [active, setActive] = useState<string>('upcoming');
	const [selectedGroup, setSelectedGroup] = useState<string>('');
	const [selectedSubject, setSelectedSubject] = useState<string>('');
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [data, setData] = useState<DataType[]>([]);

	useEffect(() => {
		if (Data.length > 0) {
			setData(Data);
		}
	}, []);

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
		console.log(`selected ${value}`);

		setSelectedGroup(String(value));
		// setSelectedSubject(''); // Reset subject when group changes
	};
	const handleDateChange = (value: string) => {
		setSelectedDate(value);
	};
	const handleSubjectChange = (value: string) => {
		setSelectedSubject(value);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value); // Update search term on input change
	};

	const filteredData = data
		.filter((item) => {
			// const matchesGroup =
			// 	!selectedGroup ||
			// 	groupSubjects[selectedGroup].some((subject) => item.courseName.includes(subject)) ||
			// 	(selectedGroup === '' && true); // No filter if no group selected
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
			return matchesSubject && matchesStatus && matchesSearch;
		})
		.map((item, index) => ({ ...item, key: index.toString() })); // Reassign keys for filtered data

	return (
		<div>
			<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
				Lớp học của tôi
			</div>

			<div className='flex gap-6 pt-4'>
				<Tab active={active === 'all'} label='Tất cả lớp học' onClick={() => setActive('all')} />
				<Tab
					active={active === 'upcoming'}
					label='Lớp học sắp tới'
					onClick={() => setActive('upcoming')}
				/>
				<Tab
					active={active === 'finished'}
					label='Lớp học đã hoàn thành'
					onClick={() => setActive('finished')}
				/>
				<Tab
					active={active === 'process'}
					label='Lớp học chưa hoàn thành'
					onClick={() => setActive('process')}
				/>
			</div>
			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-end justify-between pb-5'>
					<div className='flex items-center gap-5'>
						<div>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
								Chọn Niên Khóa
							</div>
							<Select
								placeholder='Chọn niên khóa'
								style={{ width: 200 }}
								onChange={handleGroupChange}
								// value={selectedGroup}
								options={[
									{ value: '2022-2023', label: '2022 - 2023' },
									{ value: '2023-2024', label: '2023 - 2024' },
									{ value: '2024-2025', label: '2024 - 2025' },
								]}
							/>
						</div>
						<div>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
								Chọn Ngày
							</div>
							<DatePicker
								placeholder='Chọn ngày'
								style={{ width: 120 }}
								onChange={handleDateChange}
								value={selectedDate}
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
								options={[
									{ value: 'Toán', label: 'Toán' },
									{ value: 'Lý', label: 'Lý' },
									{ value: 'Hóa', label: 'Hóa' },
									{ value: 'Văn', label: 'Văn' },
									{ value: 'Sử', label: 'Sử' },
									{ value: 'Địa', label: 'Địa' },
									{ value: 'Nghệ thuật', label: 'Nghệ thuật' },
									{ value: 'Tiếng Anh', label: 'Tiếng Anh' },
								]}
							/>
						</div>

						<div className='pt-7'>
							<Button type='primary'>
								<div className="w-[101px] justify-start text-center font-['Source_Sans_Pro'] text-base font-semibold">
									Lọc kết quả
								</div>
							</Button>
						</div>
						<div className='pt-7'>
							<Button className='bg-[#f0f3f6]'>
								<div className="text-center font-['Source_Sans_Pro'] text-base font-semibold text-[#373839]">
									Tất cả khóa học
								</div>
							</Button>
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

export default StudentMyClassPage;
