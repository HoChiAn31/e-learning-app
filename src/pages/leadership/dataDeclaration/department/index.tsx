import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, Table, TableColumnsType, TableProps } from 'antd';
import { Edit, List, Plus, Search, Trash } from '../../../../components/icon';
import AddDepartmentModal from './AddDepartmentModal';
import DeleteDepartmentModal from './DeleteDepartmentModal';
import EditDepartmentModal from './EditDepartmentModal';
import { getDepartments } from '../../../../firebase/dataDeclaration/fetchDepartment';
import {
	dataDeclaration_department,
	dataDeclaration_department_Add_Edit,
} from '../../../../types/leadership';

// Interface cho department state
interface DepartmentState {
	departmentName: string;
	headOfDepartment: string;
	subjectList: string[];
}

function DepartmentPage() {
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
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

	const handleEdit = (record: dataDeclaration_department) => {
		console.log('Edit academic year:', record);
		setDepartmentEdit({
			id: record.id,
			departmentName: record.departmentName,
			headOfDepartment: record.headOfDepartment,
			subjectList: record.subjectList || [], // Có thể load subjectList từ record nếu có
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
		// Update the departments state by filtering out the deleted department
		setDepartments(departments.filter((dept) => dept.id !== selectedDepartmentId));
		setSelectedDepartmentId(null); // Reset the selected ID
	};
	const handleEditSuccess = async () => {
		// Refetch the updated department list from Firebase
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
					<Button type='link' onClick={() => handleEdit(record)}>
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
					setIsModalOpen={setIsAddModalOpen}
					department={department}
					setDepartment={setDepartment}
					showSelect={showSelect}
					setShowSelect={setShowSelect}
				/>

				<EditDepartmentModal
					isModalOpen={isEditModalOpen}
					setIsModalOpen={setIsEditModalOpen}
					department={departmentEdit}
					onEditSuccess={handleEditSuccess} // Pass the callback
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
