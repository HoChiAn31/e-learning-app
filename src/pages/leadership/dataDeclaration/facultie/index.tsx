import { Button, ConfigProvider, Input, Table, TableColumnsType, TableProps } from 'antd';
import { Edit, List, Plus, Search, Trash } from '../../../../components/icon';
import { useEffect, useState } from 'react';
import { AddModal } from './AddModal';
import { EditModal } from './EditModal';
import { ListModal } from './ListModal';
import { DeleteModal } from './DeleteModal'; // Import modal xóa
import {
	dataDeclaration_facultie,
	dataDeclaration_facultie_Add_Edit,
	dataTeacher,
} from '../../../../types/leadership';
import {
	addFaculty,
	deleteFaculty,
	getFaculties,
	updateFaculty,
} from '../../../../firebase/dataDeclaration/fetchFacultie';

export default function FacultiePage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
	const [isModalList, setIsModalList] = useState<boolean>(false);
	const [editRecord, setEditRecord] = useState<dataDeclaration_facultie | null>(null);
	const [deleteId, setDeleteId] = useState<string | null>(null); // Thay deleteRecord bằng deleteId

	const [dataFacultie, setDataFacultie] = useState<dataDeclaration_facultie[]>([]);
	const fetchDepartments = async () => {
		const data = await getFaculties();
		console.log('Data department:', data);
		setDataFacultie(data);
	};
	useEffect(() => {
		fetchDepartments();
	}, []);

	const columns: TableColumnsType<dataDeclaration_facultie> = [
		{
			title: 'Mã khoa - khối',
			dataIndex: 'facultyCode',
			sorter: (a, b) => a.facultyCode.localeCompare(b.facultyCode),
			width: '15%',
		},
		{ width: '10%' },
		{
			title: 'Tên khoa - khối',
			dataIndex: 'facultyName',
			sorter: (a, b) => a.facultyName.localeCompare(b.facultyName),
			width: '15%',
		},
		{ title: 'Trưởng khoa - khối', dataIndex: 'facultyHead', width: '25%' },
		{ width: '10%' },
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className='flex'>
					<Button type='link' onClick={() => handleEditList(record)}>
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

	const handleEditList = (record: dataDeclaration_facultie) => {
		console.log('Edit academic year:', record);
		setIsModalList(true);
	};

	const handleEdit = (record: dataDeclaration_facultie) => {
		setEditRecord(record);
		setIsModalEditOpen(true);
	};

	const handleDelete = (record: dataDeclaration_facultie) => {
		setDeleteId(record.id);
		setIsModalDeleteOpen(true);
	};

	const handleAddOk = async (data: dataDeclaration_facultie_Add_Edit) => {
		try {
			await addFaculty(data);
			setIsModalOpen(false);
			await fetchDepartments(); // Cập nhật danh sách sau khi thêm
		} catch (error) {
			console.error('Lỗi khi thêm tổ - bộ môn:', error);
		}
	};

	const handleEditOk = async (data: dataDeclaration_facultie) => {
		try {
			await updateFaculty(data.id, {
				facultyCode: data.facultyCode,
				facultyName: data.facultyName,
				facultyHead: data.facultyHead,
			});
			setIsModalEditOpen(false);
			setEditRecord(null);
			await fetchDepartments(); // Cập nhật danh sách sau khi sửa
		} catch (error) {
			console.error('Lỗi khi cập nhật tổ - bộ môn:', error);
		}
	};

	const handleDeleteOk = async (id: string) => {
		try {
			await deleteFaculty(id);
			setIsModalDeleteOpen(false);
			setDeleteId(null);
			await fetchDepartments(); // Cập nhật danh sách sau khi xóa
		} catch (error) {
			console.error('Lỗi khi cập nhật tổ - bộ môn:', error);
		}
	};

	const handleListOk = () => {
		setIsModalList(false);
	};

	const onChange: TableProps<dataDeclaration_facultie>['onChange'] = (
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
					onClick={() => setIsModalOpen(true)}
				>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Thêm mới
					</div>
				</Button>

				<AddModal visible={isModalOpen} onOk={handleAddOk} onCancel={() => setIsModalOpen(false)} />
				<EditModal
					visible={isModalEditOpen}
					record={editRecord}
					onOk={handleEditOk}
					onCancel={() => setIsModalEditOpen(false)}
				/>
				<ListModal
					visible={isModalList}
					onOk={handleListOk}
					onCancel={() => setIsModalList(false)}
				/>
				<DeleteModal
					visible={isModalDeleteOpen}
					id={deleteId} // Truyền id thay vì record
					onOk={handleDeleteOk}
					onCancel={() => setIsModalDeleteOpen(false)}
				/>
			</div>

			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
						Khoa - Khối
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
						<Table<dataDeclaration_facultie>
							columns={columns}
							dataSource={dataFacultie}
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
		</div>
	);
}
