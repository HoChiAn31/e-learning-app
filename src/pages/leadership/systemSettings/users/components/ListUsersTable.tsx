import React, { useState } from 'react';
import { Button, ConfigProvider, Input, Table } from 'antd';
import { dataUsers } from '../type'; // Chỉ import dataUsers, bỏ listUsers nếu không cần
import { Edit, Search, Trash } from '../../../../../components/icon';
import DeleteListUserModal from './DeleteListUserModal';

interface ListUsersTableProps {
	data: dataUsers[];
}

const ListUsersTable: React.FC<ListUsersTableProps> = ({ data }) => {
	const [isModalOpenDeleteListUser, setIsModalOpenDeleteListUser] = useState(false);
	console.log(data);
	const columns = [
		{
			title: 'Tên',
			dataIndex: 'name',
			sorter: (a: dataUsers, b: dataUsers) => a.name.localeCompare(b.name),
			width: '20%',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			sorter: (a: dataUsers, b: dataUsers) => a.email.localeCompare(b.email),
			width: '25%',
		},
		{
			title: 'Nhóm người dùng',
			dataIndex: 'groupUser',
			sorter: (a: dataUsers, b: dataUsers) => a.groupUser.localeCompare(b.groupUser),
			width: '20%',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (status: boolean) => (status ? 'Đang hoạt động' : 'Đã vô hiệu hóa'),
			width: '15%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_: any, record: dataUsers) => (
				<div>
					<Button type='link' onClick={() => console.log('Edit:', record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => setIsModalOpenDeleteListUser(true)}>
						<Trash />
					</Button>
				</div>
			),
			width: '20%',
		},
	];

	// Đảm bảo data có key
	const dataSourceWithKey = data.map((item) => ({
		...item,
		key: item.id, // Giả định dataUsers có id, dùng làm key
	}));

	return (
		<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
			<div className='flex items-center justify-between'>
				<span className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
					Niên khoá
				</span>
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
					<Table<dataUsers>
						columns={columns}
						dataSource={dataSourceWithKey} // Sử dụng dataSource đã thêm key
						pagination={{
							position: ['bottomRight'],
							showSizeChanger: true,
							pageSizeOptions: ['5', '10', '20', '50'],
							defaultPageSize: 5,
						}}
					/>
				</ConfigProvider>
			</div>
			<DeleteListUserModal
				visible={isModalOpenDeleteListUser}
				onOk={() => setIsModalOpenDeleteListUser(false)}
				onCancel={() => setIsModalOpenDeleteListUser(false)}
			/>
		</div>
	);
};

export default ListUsersTable;
