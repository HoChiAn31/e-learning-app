import React, { useState } from 'react';
import { Button } from 'antd';

import GroupUsersTable from './components/GroupUsersTable';
import ListUsersTable from './components/ListUsersTable';
import AddGroupUserModal from './components/AddGroupUserModal';
import AddListUserModal from './components/AddListUserModal';
import SemesterSelect from './components/SemesterSelect';
import SubjectSelect from './components/SubjectSelect';
import { userAdd } from './type';
import { ArrowRight, Plus } from '../../../../components/icon';

const UserSettingPage: React.FC = () => {
	const [isActive, setIsActive] = useState<'groupUsers' | 'listUsers'>('groupUsers');
	const [isModalOpenGroupUser, setIsModalOpenGroupUser] = useState(false);
	const [isModalOpenListUser, setIsModalOpenListUser] = useState(false);
	const [userAdd, setUserAdd] = useState<userAdd>({
		name: '',
		groupUser: '',
		email: '',
		status: 'false',
	});

	const handleOpenModal = () => {
		if (isActive === 'groupUsers') {
			setIsModalOpenGroupUser(true);
		} else {
			setIsModalOpenListUser(true);
		}
	};

	return (
		<div>
			<Header />
			<ControlPanel isActive={isActive} setIsActive={setIsActive} onAddClick={handleOpenModal} />
			{isActive === 'groupUsers' ? <GroupUsersTable /> : <ListUsersTable />}
			<AddGroupUserModal
				visible={isModalOpenGroupUser}
				onOk={() => setIsModalOpenGroupUser(false)}
				onCancel={() => setIsModalOpenGroupUser(false)}
			/>
			<AddListUserModal
				visible={isModalOpenListUser}
				userAdd={userAdd}
				setUserAdd={setUserAdd}
				onOk={() => {
					console.log(userAdd);
					setIsModalOpenListUser(false);
				}}
				onCancel={() => {
					console.log(1);
					setUserAdd({ name: '', groupUser: '', email: '', status: 'false' });
					setIsModalOpenListUser(false);
				}}
			/>
		</div>
	);
};

// Component con
const Header: React.FC = () => (
	<div className='inline-flex h-[60px] items-center justify-center'>
		<div className='inline-flex items-center justify-start gap-2 px-2.5'>
			<span className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]">
				Cài đặt hệ thống
			</span>
			<div data-svg-wrapper className='relative'>
				<ArrowRight />
			</div>
			<span className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
				Người dùng hệ thống
			</span>
		</div>
	</div>
);

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
						Thông tin chung
					</span>
				</Button>
				<Button
					size='middle'
					onClick={() => setIsActive('listUsers')}
					shape='round'
					className={`${isActive === 'listUsers' ? 'bg-black text-white' : 'bg-[#F2F2F2] text-[#373839]'} border-none`}
				>
					<span className="font-['Mulish'] text-lg font-extrabold tracking-tight">
						Quá trình học tập
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
