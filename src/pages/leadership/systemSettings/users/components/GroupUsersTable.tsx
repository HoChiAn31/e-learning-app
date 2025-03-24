import React, { useState } from 'react';
import { Button, ConfigProvider, Input, Table } from 'antd';

import { GroupUsers } from '../type';
import { Edit, Search, Trash } from '../../../../../components/icon';
import DeleteGroupUserModal from './DeleteGroupUserModal';

const groupUsersData: GroupUsers[] = [
	{
		id: '1',
		groupName: 'Quản trị viên',
		totalMembers: 5,
		note: 'Nhóm có quyền quản lý toàn bộ hệ thống',
		isDataDeclaration: {
			isReview: true,
			isEdit: true,
			isDelete: true,
			isAdd: true,
		},
		isStudentProfile: {
			isReview: true,
			isEdit: true,
			isDelete: true,
			isAdd: true,
		},
		isInstructorProfile: {
			isReview: true,
			isEdit: true,
			isDelete: true,
			isAdd: true,
			isEnterScore: true,
		},
		isExam: {
			isReview: true,
			isEdit: true,
			isDelete: true,
			isAdd: true,
		},
		isSetting: {
			isReview: true,
			isEdit: true,
			isDelete: true,
			isAdd: true,
		},
	},
	{
		id: ' 2',
		groupName: 'Học sinh tiểu học',
		totalMembers: 150,
		note: 'Nhóm chỉ xem thông tin cá nhân của bản thân',
		isDataDeclaration: {
			isReview: false,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
		isStudentProfile: {
			isReview: true,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
		isInstructorProfile: {
			isReview: false,
			isEdit: false,
			isDelete: false,
			isAdd: false,
			isEnterScore: false,
		},
		isExam: {
			isReview: true,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
		isSetting: {
			isReview: false,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
	},
	{
		id: '3',
		groupName: 'Phòng hành chính',
		totalMembers: 10,
		note: 'Nhóm quản lý hồ sơ học sinh và giáo viên',
		isDataDeclaration: {
			isReview: true,
			isEdit: true,
			isDelete: false,
			isAdd: true,
		},
		isStudentProfile: {
			isReview: true,
			isEdit: true,
			isDelete: false,
			isAdd: true,
		},
		isInstructorProfile: {
			isReview: true,
			isEdit: true,
			isDelete: false,
			isAdd: true,
			isEnterScore: false,
		},
		isExam: {
			isReview: true,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
		isSetting: {
			isReview: true,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
	},
	{
		id: '4',
		groupName: 'Nhân viên',
		totalMembers: 20,
		note: 'Nhóm hỗ trợ quản lý kỳ thi và nhập điểm',
		isDataDeclaration: {
			isReview: true,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
		isStudentProfile: {
			isReview: true,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
		isInstructorProfile: {
			isReview: true,
			isEdit: false,
			isDelete: false,
			isAdd: false,
			isEnterScore: true,
		},
		isExam: {
			isReview: true,
			isEdit: true,
			isDelete: false,
			isAdd: true,
		},
		isSetting: {
			isReview: false,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
	},
];
interface GroupUsersTableProps {
	isModalOpenDeleteGroupUser?: boolean;
	setIsModalOpenDeleteGroupUser?: (isOpen: boolean) => void;
	data: GroupUsers[];
}
const GroupUsersTable: React.FC<GroupUsersTableProps> = ({ data }) => {
	const [isModalOpenDeleteGroupUser, setIsModalOpenDeleteGroupUser] = useState(false);

	const columns = [
		{
			title: 'Tên nhóm',
			dataIndex: 'groupName',
			sorter: (a: GroupUsers, b: GroupUsers) => a.groupName.localeCompare(b.groupName),
			width: '15%',
		},
		{
			title: 'Tổng số thành viên',
			dataIndex: 'totalMembers',
			sorter: (a: GroupUsers, b: GroupUsers) => a.totalMembers - b.totalMembers,
			width: '10%',
		},
		{ title: 'Ghi chú', dataIndex: 'note', width: '30%' },
		{
			title: '',
			dataIndex: 'action',
			render: (_: any, record: GroupUsers) => (
				<div>
					<Button type='link' onClick={() => console.log('Edit:', record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => setIsModalOpenDeleteGroupUser(true)}>
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
					<Table<GroupUsers>
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
			<DeleteGroupUserModal
				visible={isModalOpenDeleteGroupUser}
				onOk={() => setIsModalOpenDeleteGroupUser(false)}
				onCancel={() => setIsModalOpenDeleteGroupUser(false)}
			/>
		</div>
	);
};

export default GroupUsersTable;
