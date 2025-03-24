import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

import GroupUsersTable from './components/GroupUsersTable';
import ListUsersTable from './components/ListUsersTable';
import AddGroupUserModal from './components/AddGroupUserModal';
import AddListUserModal from './components/AddListUserModal';
import SemesterSelect from './components/SemesterSelect';
import SubjectSelect from './components/SubjectSelect';
import { GroupUsers, GroupUsers_add_edit, dataUsers, userAdd_Add_Edit } from './type';
import { ArrowRight, Plus } from '../../../../components/icon';
import { addGroupUser, getGroupUsers } from '../../../../firebase/systems/groupUser';
import { addUser, getUsers } from '../../../../firebase/systems/user';
import { useNavigate } from 'react-router-dom';

const UserSettingPage: React.FC = () => {
	const [isActive, setIsActive] = useState<'groupUsers' | 'listUsers'>('groupUsers');
	const [isModalOpenGroupUser, setIsModalOpenGroupUser] = useState(false);
	const [isModalOpenListUser, setIsModalOpenListUser] = useState(false);

	const [dataUser, setDataUser] = useState<dataUsers[]>([]);
	const [dataGroupUser, setDataGroupUser] = useState<GroupUsers[]>([]);
	const handleOpenModal = () => {
		if (isActive === 'groupUsers') {
			setIsModalOpenGroupUser(true);
		} else {
			setIsModalOpenListUser(true);
		}
	};
	const fetchDataUser = async () => {
		try {
			const data = await getUsers();
			console.log('user:', data);
			console.log('dataGroupUser', dataGroupUser);
			setDataUser(data);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const fetchData = async () => {
		try {
			const [users, groups] = await Promise.all([getUsers(), getGroupUsers()]);
			console.log('user:', users);
			console.log('dataGroupUser', groups);

			const updatedData = users.map((user) => {
				const matchedGroup = groups.find((group) => group.id === user.groupUser);
				return {
					...user,
					groupUser: matchedGroup ? matchedGroup.groupName : user.groupUser,
				};
			});

			setDataUser(updatedData);
			setDataGroupUser(groups);
		} catch (error) {
			console.error('Error:', error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const handleChange = (data: GroupUsers_add_edit) => {
		// setGroupData(data);
		// console.log('Updated group data:', data);
	};
	const handleOkAddGroupUser = async (data: GroupUsers_add_edit) => {
		console.log(data.groupName);
		setIsModalOpenGroupUser(false);

		// Chuẩn hóa groupName về chữ thường (lowercase) để so sánh
		const groupNameLower = data.groupName.toLowerCase();

		// Tạo object mới với role được gán dựa trên điều kiện
		const updatedData: GroupUsers_add_edit = {
			...data,
			role:
				groupNameLower === 'quản trị viên'
					? 'leadership'
					: groupNameLower === 'giáo viên'
						? 'teacher'
						: groupNameLower === 'học sinh'
							? 'student'
							: data.role, // Giữ nguyên role nếu không khớp điều kiện
		};

		try {
			await addGroupUser(updatedData);
		} catch (err) {
			console.log(err);
		}
	};
	const handleOkAddUser = async (data: userAdd_Add_Edit) => {
		try {
			await addUser(data);

			setIsModalOpenListUser(false);
			fetchDataUser();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<Header />
			<ControlPanel isActive={isActive} setIsActive={setIsActive} onAddClick={handleOpenModal} />
			{isActive === 'groupUsers' ? (
				<GroupUsersTable data={dataGroupUser} />
			) : (
				<ListUsersTable data={dataUser} />
			)}
			<AddGroupUserModal
				visible={isModalOpenGroupUser}
				onOk={handleOkAddGroupUser}
				onCancel={() => setIsModalOpenGroupUser(false)}
				onChange={handleChange}
			/>
			<AddListUserModal
				visible={isModalOpenListUser}
				onOk={handleOkAddUser}
				onCancel={() => {
					console.log(1);
					setIsModalOpenListUser(false);
				}}
			/>
		</div>
	);
};

// Component con
const Header: React.FC = () => {
	const nav = useNavigate();
	return (
		<div className='inline-flex h-[60px] items-center justify-center'>
			<div className='inline-flex items-center justify-start gap-2 px-2.5'>
				<div
					className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
					onClick={() => nav('/systemSettings')}
				>
					Cài đặt hệ thống
				</div>
				<div data-svg-wrapper className='relative'>
					<ArrowRight />
				</div>
				<span className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
					Người dùng hệ thống
				</span>
			</div>
		</div>
	);
};

interface ControlPanelProps {
	isActive: 'groupUsers' | 'listUsers';
	setIsActive: (value: 'groupUsers' | 'listUsers') => void;
	onAddClick: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ isActive, setIsActive, onAddClick }) => (
	<div className='flex items-center justify-between py-8'>
		<div className='flex items-center gap-4'>
			<div className='flex gap-4'>
				<SemesterSelect />
				<SubjectSelect />
			</div>
			<div className='flex items-center gap-2 rounded-2xl bg-[#F2F2F2] p-1'>
				<Button
					size='middle'
					onClick={() => setIsActive('groupUsers')}
					shape='round'
					className={`${isActive === 'groupUsers' ? 'bg-black text-white' : 'bg-[#F2F2F2] text-[#373839]'} border-none`}
				>
					<span className="font-['Mulish'] text-lg font-extrabold tracking-tight">
						Nhóm người dùng
					</span>
				</Button>
				<Button
					size='middle'
					onClick={() => setIsActive('listUsers')}
					shape='round'
					className={`${isActive === 'listUsers' ? 'bg-black text-white' : 'bg-[#F2F2F2] text-[#373839]'} border-none`}
				>
					<span className="font-['Mulish'] text-lg font-extrabold tracking-tight">
						Danh sách người dùng
					</span>
				</Button>
			</div>
		</div>
		<Button className='h-[52px]' type='primary' icon={<Plus />} size='middle' onClick={onAddClick}>
			<span className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
				Thêm mới
			</span>
		</Button>
	</div>
);

export default UserSettingPage;
