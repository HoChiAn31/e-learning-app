import React, { useState } from 'react';
import { Button, ConfigProvider, Input, Table } from 'antd';
import { listUsers } from '../type';
import { Edit, Search, Trash } from '../../../../components/icon';
import DeleteListUserModal from './DeleteListUserModal';

const listUsersData: listUsers[] = [
	{
		key: 1,
		name: 'Nguyễn Văn A',
		email: 'nguyenvana@example.com',
		groupUser: 'Quản trị viên',
		status: 'Hoạt động',
	},
	{
		key: 2,
		name: 'Trần Thị B',
		email: 'tranthib@example.com',
		groupUser: 'Học sinh tiểu học',
		status: 'Hoạt động',
	},
	{
		key: 3,
		name: 'Lê Văn C',
		email: 'levanc@example.com',
		groupUser: 'Phòng hành chính',
		status: 'Không hoạt động',
	},
	{
		key: 4,
		name: 'Phạm Thị D',
		email: 'phamthid@example.com',
		groupUser: 'Nhân viên',
		status: 'Hoạt động',
	},
	{
		key: 5,
		name: 'Hoàng Văn E',
		email: 'hoangvane@example.com',
		groupUser: 'Quản trị viên',
		status: 'Không hoạt động',
	},
	{
		key: 6,
		name: 'Đỗ Thị F',
		email: 'dothif@example.com',
		groupUser: 'Học sinh tiểu học',
		status: 'Hoạt động',
	},
];

const ListUsersTable: React.FC = () => {
	const [isModalOpenDeleteListUser, setIsModalOpenDeleteListUser] = useState(false);

	const columns = [
		{
			title: 'Tên',
			dataIndex: 'name',
			sorter: (a: listUsers, b: listUsers) => a.name.localeCompare(b.name),
			width: '20%',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			sorter: (a: listUsers, b: listUsers) => a.email.localeCompare(b.email),
			width: '25%',
		},
		{
			title: 'Nhóm người dùng',
			dataIndex: 'groupUser',
			sorter: (a: listUsers, b: listUsers) => a.groupUser.localeCompare(b.groupUser),
			width: '20%',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			sorter: (a: listUsers, b: listUsers) => a.status.localeCompare(b.status),
			width: '15%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_: any, record: listUsers) => (
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
					<Table<listUsers>
						columns={columns}
						dataSource={listUsersData}
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
