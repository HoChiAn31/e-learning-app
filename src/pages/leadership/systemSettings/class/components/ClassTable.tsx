import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, Table } from 'antd';
import { SystemSettings_class, classProps } from '../type';
import { Edit, Search, Trash } from '../../../../../components/icon';
import DeleteGroupUserModal from './DeleteClassModal';
import { deleteClassSetting } from '../../../../../firebase/systems/class';

const dataClass: classProps[] = [
	{
		key: 1,
		classType: 'cơ bản',
		classStatus: true,
		description: 'Lớp học cơ bản đang hoạt động',
	},
	{
		key: 2,
		classType: 'nâng cao',
		classStatus: true,
		description: 'Lớp học nâng cao đang hoạt động',
	},
	{
		key: 3,
		classType: 'tăng cường',
		classStatus: false,
		description: 'Lớp học tăng cường đã vô hiệu hóa',
	},
	{
		key: 4,
		classType: 'phụ đạo',
		classStatus: true,
		description: 'Lớp học phụ đạo đang hoạt động',
	},
];

interface ClassTable {
	isModalOpenDeleteGroupUsers?: boolean;
	setValueSearchs?: (value: string) => void;
	dataClass: SystemSettings_class[];
	selectedClassKeys?: number | string | null;
	setSelectedClassKeys?: (key: number | string | null) => void;
	onDeleteOK?: () => void;
}

const ClassTable: React.FC<ClassTable> = ({
	isModalOpenDeleteGroupUsers,
	setValueSearchs,
	dataClass,
	selectedClassKeys,
	setSelectedClassKeys,
	onDeleteOK,
}) => {
	const [isModalOpenDeleteGroupUser, setIsModalOpenDeleteGroupUser] = useState(false);
	const [valueSearch, setValueSearch] = useState<string>('');
	const [data, setData] = useState<SystemSettings_class[]>([]);
	const [selectedClassKey, setSelectedClassKey] = useState<string>('');

	useEffect(() => {
		setData(dataClass);
	}, [dataClass]);

	useEffect(() => {
		setData(
			dataClass.filter((item) => item.classType.toLowerCase().includes(valueSearch.toLowerCase())),
		);
	}, [valueSearch, dataClass]);

	const columns = [
		{
			title: 'Loại lớp',
			dataIndex: 'classType',
			sorter: (a: SystemSettings_class, b: SystemSettings_class) =>
				a.classType.localeCompare(b.classType),
			width: '15%',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'classStatus',
			sorter: (a: SystemSettings_class, b: SystemSettings_class) =>
				Number(a.classStatus) - Number(b.classStatus),
			render: (status: boolean) => (status ? 'Đang hoạt động' : 'Vô hiệu hóa'),
			width: '10%',
		},
		{ title: 'Ghi chú', dataIndex: 'description', width: '30%' },
		{
			title: 'Hành động',
			dataIndex: 'action',
			render: (_: any, record: SystemSettings_class) => (
				<div>
					<Button type='link' onClick={() => console.log('Edit:', record)}>
						<Edit />
					</Button>
					<Button
						type='link'
						onClick={() => {
							setSelectedClassKey(record.id as string);
							setIsModalOpenDeleteGroupUser(true);
						}}
					>
						<Trash />
					</Button>
				</div>
			),
			width: '20%',
		},
	];

	const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setValueSearch(e.target.value);
	};

	useEffect(() => {
		if (valueSearch.trim() === '') {
			setData(dataClass);
		} else {
			const filteredData = dataClass.filter((d) =>
				d.classType.toLowerCase().includes(valueSearch.toLowerCase()),
			);
			setData(filteredData);
		}
	}, [valueSearch]);

	// Hàm xóa lớp học
	const handleDeleteClass = async () => {
		if (selectedClassKey !== null) {
			setData((prevData) => prevData.filter((item) => item.id !== selectedClassKey));
		}

		await deleteClassSetting(selectedClassKey);

		setIsModalOpenDeleteGroupUser(false);
		onDeleteOK?.();
		setSelectedClassKey('');
	};

	return (
		<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
			<div className='flex items-center justify-between'>
				<span className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
					Danh sách các loại lớp học
				</span>
				<Input
					placeholder='Tìm kiếm'
					className='w-[438px] rounded-full bg-[#F0F3F6]'
					prefix={<Search />}
					variant='filled'
					onChange={handleChangeValue}
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
					<Table<SystemSettings_class>
						columns={columns}
						dataSource={data}
						pagination={{
							position: ['bottomRight'],
							showSizeChanger: true,
							pageSizeOptions: ['5', '10', '20', '50'],
							defaultPageSize: 5,
						}}
					/>
				</ConfigProvider>
			</div>
			{/* Modal xác nhận xóa */}
			<DeleteGroupUserModal
				visible={isModalOpenDeleteGroupUser}
				onOk={handleDeleteClass}
				onCancel={() => {
					setIsModalOpenDeleteGroupUser(false);
					setSelectedClassKey('');
				}}
			/>
		</div>
	);
};

export default ClassTable;
