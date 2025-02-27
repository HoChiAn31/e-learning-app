import React, { useState } from 'react';
import { Button, ConfigProvider, Input } from 'antd';
import { ArrowRight, Plus, Search } from '../../../components/icon';
import ClassTable from './components/ClassTable';

import AddListUserModal from './components/AddClassModal';
// import SemesterSelect from './components/SemesterSelect';

import { classAddProps } from './type';
import AcademicYearsSelect from './components/AcademicYearsSelect';
import { useNavigate } from 'react-router-dom';

const ClassSettingPage: React.FC = () => {
	const [isModalOpenClassUser, setIsModalOpenClassUser] = useState(false);

	const [userAdd, setUserAdd] = useState<classAddProps>({
		classType: '',
		classStatus: false,
		description: '',
	});
	const handleOpenModal = () => {
		setIsModalOpenClassUser(true);
	};
	return (
		<div>
			<Header />
			<ControlPanel onAddClick={handleOpenModal} />

			<ClassTable />
			<AddListUserModal
				visible={isModalOpenClassUser}
				userAdd={userAdd}
				setUserAdd={setUserAdd}
				onOk={() => {
					console.log(userAdd);
					setIsModalOpenClassUser(false);
				}}
				onCancel={() => {
					setUserAdd({
						classType: '',
						classStatus: false,
						description: '',
					});
					setIsModalOpenClassUser(false);
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
				<span
					className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
					onClick={() => nav('/systemSettings')}
				>
					Cài đặt hệ thống
				</span>
				<div data-svg-wrapper className='relative'>
					<ArrowRight />
				</div>
				<span className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
					Thiết lập lớp học
				</span>
			</div>
		</div>
	);
};

interface ControlPanelProps {
	onAddClick: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onAddClick }) => (
	<div className='flex items-center justify-between py-8'>
		<div className='flex items-center gap-4'>
			<div className='flex gap-4'>
				<AcademicYearsSelect />
			</div>
		</div>
		<Button className='h-[52px]' type='primary' icon={<Plus />} size='middle' onClick={onAddClick}>
			<span className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
				Thêm mới
			</span>
		</Button>
	</div>
);
export default ClassSettingPage;
