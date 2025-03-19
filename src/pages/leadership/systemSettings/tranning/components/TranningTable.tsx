import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, Table } from 'antd';
import { Leadership_system_tranning } from '../../../../../types/leadership/system'; // Adjust path
import { Edit, Search, Trash } from '../../../../../components/icon'; // Adjust path
import DeleteGroupUserModal from './DeleteTranningModal'; // Adjust path
import { deleteTrainingSetting } from '../../../../../firebase/systems/tranning';

interface TranningTableProps {
	dataSource: Leadership_system_tranning[];
	fetchData: () => Promise<void>;
	onEdit?: (record: Leadership_system_tranning) => void; // Add onEdit callback
}

const TranningTable: React.FC<TranningTableProps> = ({ dataSource, fetchData, onEdit }) => {
	const [isModalOpenDeleteGroupUser, setIsModalOpenDeleteGroupUser] = useState(false);
	const [valueSearch, setValueSearch] = useState<string>('');
	const [data, setData] = useState<Leadership_system_tranning[]>(dataSource);
	const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

	const columns = [
		{
			title: 'Trình độ',
			dataIndex: 'educationlevel',
			sorter: (a: Leadership_system_tranning, b: Leadership_system_tranning) =>
				a.educationlevel.localeCompare(b.educationlevel),
			width: '15%',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			sorter: (a: Leadership_system_tranning, b: Leadership_system_tranning) =>
				Number(a.status) - Number(b.status),
			render: (status: boolean) => (status ? 'Đang hoạt động' : 'Vô hiệu hóa'),
			width: '10%',
		},
		{ title: 'Ghi chú', dataIndex: 'description', width: '30%' },
		{
			title: 'Hành động',
			dataIndex: 'action',
			render: (_: any, record: Leadership_system_tranning) => (
				<div>
					<Button type='link' onClick={() => onEdit && onEdit(record)}>
						<Edit />
					</Button>
					<Button
						type='link'
						onClick={() => {
							setSelectedClassId(record.id);
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
			setData(dataSource);
		} else {
			const filteredData = dataSource.filter((d) =>
				d.educationlevel.toLowerCase().includes(valueSearch.toLowerCase()),
			);
			setData(filteredData);
		}
	}, [valueSearch, dataSource]);

	const handleDeleteClass = async () => {
		if (selectedClassId !== null) {
			try {
				// Assuming you have a deleteTrainingSetting function
				await deleteTrainingSetting(selectedClassId);
				await fetchData(); // Refresh data after deletion
			} catch (error) {
				console.error('Error deleting class:', error);
			}
		}
		setIsModalOpenDeleteGroupUser(false);
		setSelectedClassId(null);
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
					<Table<Leadership_system_tranning>
						columns={columns}
						dataSource={data}
						pagination={{
							position: ['bottomRight'],
							showSizeChanger: true,
							pageSizeOptions: ['5', '10', '20', '50'],
							defaultPageSize: 5,
						}}
						rowKey='id' // Use id as the unique key
					/>
				</ConfigProvider>
			</div>
			<DeleteGroupUserModal
				visible={isModalOpenDeleteGroupUser}
				onOk={handleDeleteClass}
				onCancel={() => {
					setIsModalOpenDeleteGroupUser(false);
					setSelectedClassId(null);
				}}
			/>
		</div>
	);
};

export default TranningTable;
