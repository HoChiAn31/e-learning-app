import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, Table, TableColumnsType, TableProps } from 'antd';
import { Edit, List, Plus, Search, Trash } from '../../../../components/icon';
import AddDepartmentModal from './AddDepartmentModal';
import DeleteDepartmentModal from './DeleteDepartmentModal';
import EditDepartmentModal from './EditDepartmentModal';
import ViewSubjectsModal from './ViewSubjectsModal'; // Import the new modal
import {
	addDepartment,
	getDepartments,
} from '../../../../firebase/dataDeclaration/fetchDepartment';
import {
	dataDeclaration_department,
	dataDeclaration_department_Add_Edit,
} from '../../../../types/leadership';
import { Department } from '../../../../firebase/dataDeclaration/types';

// Interface for Subject (used in ViewSubjectsModal)
interface Subject {
	key: string;
	subjectCode: string;
	subjectName: string;
}

// Interface for department state
interface DepartmentState {
	departmentName: string;
	headOfDepartment: string;
	subjectList: string[];
}

function DepartmentPage() {
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [isViewSubjectsModalOpen, setIsViewSubjectsModalOpen] = useState<boolean>(false); // State for the new modal
	const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]); // State for subjects to display in the modal
	const [department, setDepartment] = useState<dataDeclaration_department_Add_Edit>({
		departmentName: '',
		headOfDepartment: '',
		subjectList: [],
	});
	const [departmentEdit, setDepartmentEdit] = useState<dataDeclaration_department>({
		id: '',
		departmentName: '',
		headOfDepartment: '',
		subjectList: [],
	});
	const [showSelect, setShowSelect] = useState<boolean>(false);
	const [departments, setDepartments] = useState<dataDeclaration_department[]>([]);
	const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

	useEffect(() => {
		const fetchDepartments = async () => {
			const data = await getDepartments();
			console.log('Data department:', data);
			setDepartments(data);
		};

		fetchDepartments();
	}, []);

	const handleViewSubjects = (record: dataDeclaration_department) => {
		// Map the subjectList to the Subject format required by ViewSubjectsModal
		const subjects: Subject[] = record.subjectList.map((subject, index) => ({
			key: `${index}`, // Use index as a unique key
			subjectCode: subject.substring(0, 3).toLowerCase() + (index + 9).toString().padStart(2, '0'), // Generate a simple subject code (e.g., "toá09" for "Toán học")
			subjectName: subject,
		}));
		setSelectedSubjects(subjects);
		setIsViewSubjectsModalOpen(true);
	};

	const handleEdit = (record: dataDeclaration_department) => {
		console.log('Edit academic year:', record);
		setDepartmentEdit({
			id: record.id,
			departmentName: record.departmentName,
			headOfDepartment: record.headOfDepartment,
			subjectList: record.subjectList || [],
		});
		setIsEditModalOpen(true);
	};

	const handleDelete = (record: dataDeclaration_department) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.id);
		setSelectedDepartmentId(record.id);
		setIsModalOpenDelete(true);
	};

	const handleDeleteSuccess = () => {
		setDepartments(departments.filter((dept) => dept.id !== selectedDepartmentId));
		setSelectedDepartmentId(null);
	};

	const handleEditSuccess = async () => {
		const updatedData = await getDepartments();
		setDepartments(updatedData);
	};

	const columns: TableColumnsType<dataDeclaration_department> = [
		{
			title: 'Tên tổ - bộ môn',
			dataIndex: 'departmentName',
			sorter: (a, b) => a.departmentName.localeCompare(b.departmentName),
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
					<Button type='link' onClick={() => handleViewSubjects(record)}>
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

	const onChange: TableProps<dataDeclaration_department>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const handleOk = async () => {
		try {
			const newDepartment: Department = {
				departmentName: department.departmentName,
				headOfDepartment: department.headOfDepartment,
				subjectList: department.subjectList,
			};

			await addDepartment(newDepartment);

			console.log('Dữ liệu nhập:', department);

			setIsAddModalOpen(false);
			setDepartment({ departmentName: '', headOfDepartment: '', subjectList: [] });
			setShowSelect(false);
		} catch (error) {
			console.error('Lỗi khi thêm tổ - bộ môn:', error);
		}
	};

	return (
		<div>
			<div className='flex w-full items-end justify-end'>
				<Button
					className='bg-primary py-5'
					type='primary'
					icon={<Plus />}
					size='middle'
					onClick={() => setIsAddModalOpen(true)}
				>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Thêm mới
					</div>
				</Button>

				<AddDepartmentModal
					isModalOpen={isAddModalOpen}
					onOk={handleOk}
					onCancel={() => setIsAddModalOpen(false)}
				/>

				<EditDepartmentModal
					isModalOpen={isEditModalOpen}
					setIsModalOpen={setIsEditModalOpen}
					department={departmentEdit}
					onEditSuccess={handleEditSuccess}
				/>

				<ViewSubjectsModal
					isModalOpen={isViewSubjectsModalOpen}
					onCancel={() => setIsViewSubjectsModalOpen(false)}
					subjects={selectedSubjects}
				/>
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
						<Table<dataDeclaration_department>
							columns={columns}
							dataSource={departments}
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

			<DeleteDepartmentModal
				isModalOpenDelete={isModalOpenDelete}
				setIsModalOpenDelete={setIsModalOpenDelete}
				departmentId={selectedDepartmentId}
				onDeleteSuccess={handleDeleteSuccess}
			/>
		</div>
	);
}

export default DepartmentPage;
