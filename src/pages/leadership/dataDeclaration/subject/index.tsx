import { Button, ConfigProvider, Input, Select, Table, TableColumnsType, TableProps } from 'antd';
import { Edit, Plus, Search, Trash } from '../../../../components/icon';
import { useState } from 'react';
import { AddModal } from './AddModal';
import { DeleteModal } from './DeleteModal';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
interface SemesterData {
	key: string;
	subjectCode: string;
	subjectName: string;
	subjectType: string;
	numberLessonSemester1: number;
	numberLessonSemester2: number;
}
const data: SemesterData[] = [
	{
		key: '550e8400-e29b-41d4-a716-446655440000',
		subjectCode: 'KHTN',
		subjectName: 'Toán học',
		subjectType: 'Môn bắt buộc',
		numberLessonSemester1: 4,
		numberLessonSemester2: 4,
	},
	{
		key: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
		subjectCode: 'KHTN',
		subjectName: 'Vật lý',
		subjectType: 'Môn tự chọn',
		numberLessonSemester1: 4,
		numberLessonSemester2: 4,
	},
	{
		key: '123e4567-e89b-12d3-a456-426614174000',
		subjectCode: 'KHTN',
		subjectName: 'Hóa học',
		subjectType: 'Môn bắt buộc',
		numberLessonSemester1: 4,
		numberLessonSemester2: 4,
	},
	{
		key: '987e6543-e21a-12d3-b456-426655440000',
		subjectCode: 'VHXH',
		subjectName: 'Ngữ văn',
		subjectType: 'Môn bắt buộc',
		numberLessonSemester1: 4,
		numberLessonSemester2: 4,
	},
	{
		key: 'a54c7012-e89b-11d3-a456-426614174001',
		subjectCode: 'VHXH',
		subjectName: 'Lịch sử',
		subjectType: 'Môn tự chọn',
		numberLessonSemester1: 4,
		numberLessonSemester2: 4,
	},
	{
		key: 'e72b7012-f12b-11d3-b456-426614174002',
		subjectCode: 'VHXH',
		subjectName: 'Địa lý',
		subjectType: 'Môn bắt buộc',
		numberLessonSemester1: 4,
		numberLessonSemester2: 4,
	},
	{
		key: 'fc9d7012-e72c-11d3-b456-426614174003',
		subjectCode: 'AV',
		subjectName: 'Tiếng Anh',
		subjectType: 'Môn bắt buộc',
		numberLessonSemester1: 4,
		numberLessonSemester2: 4,
	},
	{
		key: '2fc97012-f72c-11d3-a456-426614174004',
		subjectCode: 'AV',
		subjectName: 'Tiếng Anh nâng cao',
		subjectType: 'Môn tự chọn',
		numberLessonSemester1: 4,
		numberLessonSemester2: 4,
	},
	{
		key: '3dc67012-e12c-11d3-b456-426614174005',
		subjectCode: 'KHTN',
		subjectName: 'Sinh học',
		subjectType: 'Môn tự chọn',
		numberLessonSemester1: 4,
		numberLessonSemester2: 4,
	},
];

export default function SubjectPage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [deleteKey, setDeleteKey] = useState<string | null>(null);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const handleEdit = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		setIsModalOpen(true);
	};

	const handleDelete = (record: SemesterData) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.key);
		setDeleteKey(record.key);
		setIsModalOpenDelete(true);
	};

	const handleAddOk = (data: {
		subjectGroup: string;
		subjectName: string;
		subjectCode: string;
		subjectType: string;
		numberLessonSemester1: number;
		numberLessonSemester2: number;
	}) => {
		console.log('Dữ liệu khi lưu:', data);
		setIsModalOpen(false);
	};

	const handleDeleteOk = () => {
		if (deleteKey) {
			console.log('Xóa môn học với key:', deleteKey);
		}
		setIsModalOpenDelete(false);
		setDeleteKey(null);
	};

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const columns: TableColumnsType<SemesterData> = [
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

	const rowSelection: TableRowSelection<SemesterData> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const onChange: TableProps<SemesterData>['onChange'] = (pagination, filters, sorter, extra) => {
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
						<Table<SemesterData>
							rowSelection={rowSelection}
							columns={columns}
							dataSource={data}
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
			<DeleteModal
				visible={isModalOpenDelete}
				onOk={handleDeleteOk}
				onCancel={() => setIsModalOpenDelete(false)}
			/>
		</div>
	);
}
