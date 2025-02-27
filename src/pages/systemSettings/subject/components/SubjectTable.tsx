import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, Table } from 'antd';
import { subjectProps } from '../type';
import { Edit, Search, Trash } from '../../../../components/icon';
import DeleteGroupUserModal from './DeleteSubjectModal';

export const subjectData: subjectProps[] = [
	{
		key: 1,
		type: 'Môn nâng cao',
		status: true,
		description: 'Môn học dành cho học sinh có năng lực cao, giúp nâng cao kiến thức chuyên sâu.',
	},
	{
		key: 2,
		type: 'Môn tăng cường',
		status: true,
		description: 'Môn học giúp củng cố và mở rộng kiến thức nền tảng cho học sinh.',
	},
	{
		key: 3,
		type: 'Môn cơ bản',
		status: false,
		description: 'Môn học cung cấp kiến thức cơ bản, phù hợp với tất cả học sinh.',
	},
	{
		key: 4,
		type: 'Môn phụ đạo',
		status: false,
		description: 'Môn học hỗ trợ học sinh gặp khó khăn trong việc tiếp thu kiến thức.',
	},
];

const ClassTable: React.FC = () => {
	const [isModalOpenDeleteGroupUser, setIsModalOpenDeleteGroupUser] = useState(false);
	const [valueSearch, setValueSearch] = useState<string>('');
	const [data, setData] = useState<subjectProps[]>(subjectData);
	const [selectedClassKey, setSelectedClassKey] = useState<number | string | null>(null);

	const columns = [
		{
			title: 'Loại lớp',
			dataIndex: 'type',
			sorter: (a: subjectProps, b: subjectProps) => a.type.localeCompare(b.type),
			width: '15%',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			sorter: (a: subjectProps, b: subjectProps) => Number(a.status) - Number(b.status),
			render: (status: boolean) => (status ? 'Đang hoạt động' : 'Vô hiệu hóa'),
			width: '10%',
		},
		{ title: 'Ghi chú', dataIndex: 'description', width: '30%' },
		{
			title: 'Hành động',
			dataIndex: 'action',
			render: (_: any, record: subjectProps) => (
				<div>
					<Button type='link' onClick={() => console.log('Edit:', record)}>
						<Edit />
					</Button>
					<Button
						type='link'
						onClick={() => {
							setSelectedClassKey(record.key as string | number);
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
			setData(subjectData);
		} else {
			const filteredData = subjectData.filter((d) =>
				d.type.toLowerCase().includes(valueSearch.toLowerCase()),
			);
			setData(filteredData);
		}
	}, [valueSearch]);

	// Hàm xóa lớp học
	const handleDeleteClass = () => {
		if (selectedClassKey !== null) {
			setData((prevData) => prevData.filter((item) => item.key !== selectedClassKey));
		}
		setIsModalOpenDeleteGroupUser(false);
		setSelectedClassKey(null);
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
					<Table<subjectProps>
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
				onOk={handleDeleteClass} // Gọi hàm xóa khi xác nhận
				onCancel={() => {
					setIsModalOpenDeleteGroupUser(false);
					setSelectedClassKey(null);
				}}
			/>
		</div>
	);
};

export default ClassTable;
