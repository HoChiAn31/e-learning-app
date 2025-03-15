import { Button, ConfigProvider, Input, Select, Table, TableColumnsType, TableProps } from 'antd';
import { Edit, Eyes, Plus, Search, Trash } from '../../../../components/icon';
import { useEffect, useState } from 'react';
import { AddClassModal } from './AddClassModal';
import { DeleteClassModal } from './DeleteClassModal';
import {
	dataDeclaration_class,
	dataDeclaration_class_add_edit,
} from '../../../../types/leadership';
import { addClass, getClasses } from '../../../../firebase/dataDeclaration/fetchClass';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

function ClassPage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const [dataClass, setDataClass] = useState<dataDeclaration_class[]>([]);

	const fetchClass = async () => {
		const data = await getClasses();
		console.log('Data department:', data);
		setDataClass(data);
	};
	useEffect(() => {
		fetchClass();
	}, []);
	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const handleEdit = (record: dataDeclaration_class) => {
		console.log('Edit academic year:', record);
		setIsModalOpen(true);
	};

	const handleDelete = (record: dataDeclaration_class) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.id);
		setIsModalOpenDelete(true);
	};

	const handleChange = (value: string) => console.log(`selected ${value}`);

	const columns: TableColumnsType<dataDeclaration_class> = [
		{
			title: 'Mã lớp',
			dataIndex: 'classCode',
			sorter: (a, b) => a.classCode.localeCompare(b.classCode),
			width: '20%',
		},
		{
			title: 'Tên lớp',
			dataIndex: 'className',
			sorter: (a, b) => a.className.localeCompare(b.className),
			width: '20%',
		},
		{
			title: 'Giáo viên chủ nhiệm',
			dataIndex: 'teacher',
			sorter: (a, b) => a.teacher.localeCompare(b.teacher),
			width: '15%',
		},
		{ width: '10%' },
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className=''>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Eyes />
					</Button>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '30%',
		},
	];

	const rowSelection: TableRowSelection<dataDeclaration_class> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const onChange: TableProps<dataDeclaration_class>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const handleAddClass = async (data: dataDeclaration_class_add_edit) => {
		console.log('New class data:', data);

		// Thêm logic để lưu dữ liệu vào state hoặc API nếu cần
		try {
			await addClass(data);
			setIsModalOpen(false);
			// await fetchSubject();
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleDeleteClass = () => {
		console.log('Class deleted');
		setIsModalOpenDelete(false);
		// Thêm logic xóa nếu cần
	};

	return (
		<div>
			<div className='flex items-center justify-between'>
				<div className='flex items-center justify-center gap-4'>
					<Select
						defaultValue='Tất cả khối'
						style={{ width: 120 }}
						onChange={handleChange}
						options={[
							{ value: '12', label: '12' },
							{ value: '11', label: '11' },
							{ value: '10', label: '10' },
							{ value: '9', label: '9' },
							{ value: '8', label: '8' },
							{ value: '7', label: '7' },
							{ value: '6', label: '6' },
						]}
					/>
				</div>
				<div className='flex items-center gap-4'>
					<Trash />
					<div className='h-12 w-[1px] bg-[#c8c4c0]' />
					<Button
						className='h-[52px]'
						type='primary'
						icon={<Plus />}
						size='middle'
						onClick={() => setIsModalOpen(true)}
					>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
							Thêm mới
						</div>
					</Button>
				</div>
			</div>
			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
						Lớp học
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
						<Table<dataDeclaration_class>
							rowSelection={rowSelection}
							columns={columns}
							dataSource={dataClass}
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

			<AddClassModal
				visible={isModalOpen}
				onOk={handleAddClass}
				onCancel={() => setIsModalOpen(false)}
			/>
			<DeleteClassModal
				visible={isModalOpenDelete}
				onOk={handleDeleteClass}
				onCancel={() => setIsModalOpenDelete(false)}
			/>
		</div>
	);
}

export default ClassPage;
