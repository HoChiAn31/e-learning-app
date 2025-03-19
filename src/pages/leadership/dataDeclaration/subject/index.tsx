import { Button, ConfigProvider, Input, Select, Table, TableColumnsType, TableProps } from 'antd';
import { Edit, Plus, Search, Trash } from '../../../../components/icon';
import { useEffect, useState } from 'react';
import { AddModal } from './AddModal';
import { DeleteModal } from './DeleteModal';
import {
	dataDeclaration_subject,
	dataDeclaration_subject_add_edit,
} from '../../../../types/leadership';
import {
	addSubject,
	deleteSubject,
	getSubjects,
	updateSubject,
} from '../../../../firebase/dataDeclaration/fetchSubject';
import { EditModal } from './EditModal';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

export default function SubjectPage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);

	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [editRecord, setEditRecord] = useState<dataDeclaration_subject | null>(null);

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [deleteKey, setDeleteKey] = useState<string | null>(null);
	const [dataSubject, setDataSubject] = useState<dataDeclaration_subject[]>([]);

	const fetchSubject = async () => {
		const data = await getSubjects();
		console.log('Data department:', data);
		setDataSubject(data);
	};
	useEffect(() => {
		fetchSubject();
	}, []);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const handleEdit = (record: dataDeclaration_subject) => {
		setEditRecord(record);
		setIsModalEditOpen(true);
	};

	const handleDelete = (record: dataDeclaration_subject) => {
		console.log('Remove academic year:', record);

		setDeleteKey(record.id);
		setIsModalOpenDelete(true);
	};

	const handleAddOk = async (data: dataDeclaration_subject_add_edit) => {
		try {
			await addSubject(data);
			setIsModalOpen(false);
			await fetchSubject();
		} catch (error) {
			console.error('Error:', error);
		}
		setIsModalOpen(false);
	};
	const handleEditOk = async (data: dataDeclaration_subject) => {
		try {
			await updateSubject(data.id, {
				subjectGroup: data.subjectGroup,
				subjectName: data.subjectName,
				subjectCode: data.subjectCode,
				subjectType: data.subjectType,
				numberLessonSemester1: data.numberLessonSemester1,
				numberLessonSemester2: data.numberLessonSemester2,
			});
			setIsModalEditOpen(false);
			setEditRecord(null);
			await fetchSubject();
		} catch (error) {
			console.error('Lỗi khi cập nhật tổ - bộ môn:', error);
		}
	};
	const handleDeleteOk = async (id: string) => {
		try {
			await deleteSubject(id);
			setIsModalOpenDelete(false);
			setDeleteKey(null);
			await fetchSubject();
		} catch (error) {
			console.error('Lỗi:', error);
		}
	};

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const columns: TableColumnsType<dataDeclaration_subject> = [
		{
			title: 'Mã môn học',
			dataIndex: 'subjectCode',
			sorter: (a, b) => a.subjectCode.localeCompare(b.subjectCode),
			width: '15%',
		},
		{
			title: 'Tên môn học',
			dataIndex: 'subjectName',
			sorter: (a, b) => a.subjectName.localeCompare(b.subjectName),
			width: '15%',
		},
		{
			title: 'Loại môn',
			dataIndex: 'subjectType',
			sorter: (a, b) => a.subjectType.localeCompare(b.subjectType),
			width: '15%',
		},
		{ title: 'Số tiết HK1', dataIndex: 'numberLessonSemester1', width: '15%', align: 'center' },
		{ title: 'Số tiết HK2', dataIndex: 'numberLessonSemester2', width: '15%', align: 'center' },
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className=''>
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

	const rowSelection: TableRowSelection<dataDeclaration_subject> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const onChange: TableProps<dataDeclaration_subject>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	return (
		<div>
			<div className='flex items-center justify-between'>
				<div className='flex items-center justify-center gap-4'>
					<div className='flex items-center gap-2'>
						<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
							Khối
						</div>
						<Select
							defaultValue='2025-2026'
							style={{ width: 120 }}
							onChange={handleChange}
							options={[
								{ value: '2020-2021', label: '2020-2021' },
								{ value: '2021-2022', label: '2021-2022' },
								{ value: '2022-2023', label: '2022-2023' },
								{ value: '2023-2024', label: '2023-2024' },
								{ value: '2024-2025', label: '2024-2025' },
								{ value: '2025-2026', label: '2025-2026' },
							]}
						/>
					</div>
					<div className='flex items-center gap-2'>
						<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
							Lớp
						</div>
						<Select
							defaultValue='2025-2026'
							style={{ width: 120 }}
							onChange={handleChange}
							options={[
								{ value: '2020-2021', label: '2020-2021' },
								{ value: '2021-2022', label: '2021-2022' },
								{ value: '2022-2023', label: '2022-2023' },
								{ value: '2023-2024', label: '2023-2024' },
								{ value: '2024-2025', label: '2024-2025' },
								{ value: '2025-2026', label: '2025-2026' },
							]}
						/>
					</div>
				</div>
				<div className='flex items-center gap-4'>
					<Trash />
					<div className='h-12 w-[1px] bg-[#c8c4c0]' />
					<Button
						className='h-[52px] bg-primary'
						type='primary'
						icon={<Plus />}
						size='middle'
						onClick={() => setIsModalOpen(true)}
					>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
							Thêm mới
						</div>
					</Button>
					<AddModal
						visible={isModalOpen}
						onOk={handleAddOk}
						onCancel={() => setIsModalOpen(false)}
					/>
					<EditModal
						visible={isModalEditOpen}
						subject={editRecord}
						onOk={handleEditOk}
						onCancel={() => setIsModalEditOpen(false)}
					/>
					<DeleteModal
						visible={isModalOpenDelete}
						onOk={handleDeleteOk}
						id={deleteKey}
						onCancel={() => setIsModalOpenDelete(false)}
					/>
				</div>
			</div>
			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
						Môn học
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
						<Table<dataDeclaration_subject>
							rowSelection={rowSelection}
							columns={columns}
							dataSource={dataSubject}
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
