import React, { useEffect, useState } from 'react';
import { Table, Button, Select, Input, Space, ConfigProvider, TableColumnsType } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Edit, Eye, Lists, Search, Trash } from '../../../components/icon';
import AddExamScheduleModal from './AddExamScheduleModal';
import EditExamScheduleModal from './EditExamScheduleModal'; // Import modal mới
import { examScheduleData, examScheduleFormData } from '../../../types/leadership/instructor';
import {
	addExamSchedule,
	getExamSchedules,
	updateExamSchedule, // Giả định có hàm cập nhật
} from '../../../firebase/instructorProfileList/fetchExamSchedule';
import { DeleteExamScheduleModal } from './DeleteExamScheduleModal';

const ExamPage: React.FC = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State cho modal chỉnh sửa
	const [dataExamSchedule, setDataExamSchedule] = useState<examScheduleData[]>([]);
	const [filteredData, setFilteredData] = useState<examScheduleData[]>([]);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
	const [examScheduleIdToDelete, setExamScheduleIdToDelete] = useState<string | null>(null);
	const [selectedSchoolYear, setSelectedSchoolYear] = useState<string | undefined>(undefined);
	const [selectedGrade, setSelectedGrade] = useState<string | undefined>(undefined);
	const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
	const [editData, setEditData] = useState<examScheduleData | null>(null); // Dữ liệu cần chỉnh sửa

	const fetchDataExamSchedule = async () => {
		const data = await getExamSchedules();
		setDataExamSchedule(data);
		setFilteredData(data);
	};

	useEffect(() => {
		fetchDataExamSchedule();
	}, []);

	const filterData = () => {
		let result = [...dataExamSchedule];
		if (selectedSchoolYear) {
			result = result.filter((item) => item.schoolYear === selectedSchoolYear);
		}
		if (selectedGrade) {
			result = result.filter((item) => item.grade === selectedGrade);
		}
		if (selectedClass) {
			result = result.filter(
				(item) =>
					item.specificTeachers?.some((teacher) => teacher.class === selectedClass) ||
					item.classType === 'all',
			);
		}
		setFilteredData(result);
	};

	useEffect(() => {
		filterData();
	}, [selectedSchoolYear, selectedGrade, selectedClass, dataExamSchedule]);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = (values: examScheduleFormData) => {
		console.log('New Exam Schedule:', values);
		addExamSchedule(values);
		fetchDataExamSchedule();
		setIsModalVisible(false);
	};

	const handleEditOk = (values: examScheduleData) => {
		if (editData && editData.id) {
			updateExamSchedule(editData.id, values);
			fetchDataExamSchedule();
		}
		setIsEditModalVisible(false);
		setEditData(null);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleEditCancel = () => {
		setIsEditModalVisible(false);
		setEditData(null);
	};

	const showEditModal = (record: examScheduleData) => {
		setEditData({ ...record, newAllTeacher: '', newClass: '', newSpecificTeacher: '' }); // Chuẩn bị dữ liệu để chỉnh sửa
		setIsEditModalVisible(true);
	};

	const showDeleteModal = (record: examScheduleData) => {
		setExamScheduleIdToDelete(record.id);
		setIsModalOpenDelete(true);
	};

	const handleDeleteSuccess = () => {
		fetchDataExamSchedule();
	};

	const gradeToClasses: { [key: string]: string[] } = {
		'6': ['6A1', '6A2', '6A3'],
		'7': ['7A1', '7A2', '7A3'],
		'8': ['8A1', '8A2', '8A3'],
		'9': ['9A1', '9A2', '9A3'],
		'10': ['10A1', '10A2', '10A3'],
		'11': ['11A1', '11A2', '11A3'],
		'12': ['12A1', '12A2', '12A3'],
	};

	const availableClasses = selectedGrade ? gradeToClasses[selectedGrade] || [] : [];

	const columns: TableColumnsType<examScheduleData> = [
		{
			title: 'Học kỳ',
			dataIndex: 'examName',
			render: (examName: string[]) => examName[0] || 'Không có tên kỳ thi',
		},
		{
			title: 'Ngày làm bài',
			dataIndex: 'examDate',
			key: 'examDate',
		},
		{
			title: 'Khối - Khoá',
			dataIndex: 'grade',
			key: 'grade',
		},
		{
			title: 'Môn thi',
			dataIndex: 'subject',
			key: 'subject',
		},
		{
			title: 'Tên kỳ thi',
			dataIndex: 'examName',
			key: 'examName',
			render: (examName: string[]) => examName[examName.length - 1] || 'Không có tên kỳ thi',
		},
		{
			title: 'Danh sách bài thi',
			key: 'examList',
			render: () => (
				<div>
					<Button type='link' className='text-orange-500'>
						<Lists />
					</Button>
				</div>
			),
			width: '15%',
		},
		{
			title: 'Phân công chấm thi',
			key: 'allClassTeachers',
			dataIndex: 'allClassTeachers',
			render: (allClassTeachers: string[]) => allClassTeachers[0] || 'Không có giáo viên',
		},
		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<div>
					<Button type='link'>
						<Eye color='#FF7506' />
					</Button>
					<Button type='link' onClick={() => showEditModal(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => showDeleteModal(record)}>
						<Trash />
					</Button>
				</div>
			),
		},
	];

	return (
		<div className='p-6'>
			<div className='mb-4 flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Quản lý lịch thi</h1>
				<Button type='primary' className='border-none bg-orange-500' onClick={showModal}>
					+ Thêm mới
				</Button>
			</div>

			<div className='mb-4 flex justify-between'>
				<div className='flex space-x-4'>
					<Select
						placeholder='Chọn niên khóa'
						className='w-40'
						value={selectedSchoolYear}
						onChange={(value) => setSelectedSchoolYear(value)}
						options={[
							{ value: '2023-2024', label: '2023-2024' },
							{ value: '2024-2025', label: '2024-2025' },
						]}
						allowClear
					/>
					<Select
						placeholder='Chọn khối'
						className='w-40'
						value={selectedGrade}
						onChange={(value) => {
							setSelectedGrade(value);
							setSelectedClass(undefined);
						}}
						options={[
							{ value: '6', label: 'Khối 6' },
							{ value: '7', label: 'Khối 7' },
							{ value: '8', label: 'Khối 8' },
							{ value: '9', label: 'Khối 9' },
							{ value: '10', label: 'Khối 10' },
							{ value: '11', label: 'Khối 11' },
							{ value: '12', label: 'Khối 12' },
						]}
						allowClear
					/>
					<Select
						placeholder='Chọn lớp'
						className='w-40'
						value={selectedClass}
						onChange={(value) => setSelectedClass(value)}
						disabled={!selectedGrade}
						options={availableClasses.map((className) => ({
							value: className,
							label: className,
						}))}
						allowClear
					/>
				</div>
				<Input
					placeholder='Tìm kiếm'
					prefix={<Search />}
					variant='filled'
					className='w-[438px] rounded-full bg-[#F0F3F6]'
				/>
			</div>

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
							headerColor: '#ffffff',
						},
					},
				}}
			>
				<Table<examScheduleData>
					columns={columns}
					dataSource={filteredData}
					pagination={{
						pageSize: 8,
						showSizeChanger: false,
						position: ['bottomCenter'],
					}}
					className='shadow-md'
					rowKey='id'
				/>
			</ConfigProvider>

			<div className='mt-4 text-center text-gray-500'>
				Hiển thị {filteredData.length} trong tổng {dataExamSchedule.length}
			</div>

			<AddExamScheduleModal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} />
			<EditExamScheduleModal
				visible={isEditModalVisible}
				onOk={handleEditOk}
				onCancel={handleEditCancel}
				initialData={editData || ({} as examScheduleData)} // Đảm bảo initialData không null
			/>
			<DeleteExamScheduleModal
				isModalOpenDelete={isModalOpenDelete}
				setIsModalOpenDelete={setIsModalOpenDelete}
				examScheduleId={examScheduleIdToDelete}
				onDeleteSuccess={handleDeleteSuccess}
			/>
		</div>
	);
};

export default ExamPage;
