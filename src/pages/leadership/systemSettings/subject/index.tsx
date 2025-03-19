import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { ArrowRight, Plus } from '../../../../components/icon';
import SubjectTable from './components/SubjectTable';

import AddSubjectModal from './components/AddSubjectModal';

import { SystemSettings_subject, SystemSettings_subject_Add_Edit } from './type';
import AcademicYearsSelect from './components/AcademicYearsSelect';
import { useNavigate } from 'react-router-dom';
import { addSubjectSetting, getSubjectSettings } from '../../../../firebase/systems/subject';

const SubjectSettingPage: React.FC = () => {
	const [isModalOpenSubjectUser, setIsModalOpenSubjectUser] = useState(false);

	const [subjectAdd, setSubjectAdd] = useState<SystemSettings_subject_Add_Edit>({
		subjectType: '',
		subjectStatus: false,
		description: '',
	});
	const [dataSubject, setDataClassSubject] = useState<SystemSettings_subject[]>([]);

	const fetchDataSubject = async () => {
		try {
			const data = await getSubjectSettings();
			console.log('Data class:', data);
			setDataClassSubject(data);
		} catch (error) {
			console.error('Error:', error);
		}
	};
	useEffect(() => {
		fetchDataSubject();
	}, []);
	const handleOpenModal = () => {
		setIsModalOpenSubjectUser(true);
	};
	const handleOk = async () => {
		try {
			await addSubjectSetting(subjectAdd);
			fetchDataSubject();
			setIsModalOpenSubjectUser(false);
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const handleDeleteOK = () => {
		fetchDataSubject();
	};
	return (
		<div>
			<Header />
			<ControlPanel onAddClick={handleOpenModal} />

			<SubjectTable dataSubject={dataSubject} onDeleteOK={handleDeleteOK} />
			<AddSubjectModal
				visible={isModalOpenSubjectUser}
				userAdd={subjectAdd}
				setUserAdd={setSubjectAdd}
				onOk={handleOk}
				onCancel={() => {
					setSubjectAdd({
						subjectType: '',
						subjectStatus: false,
						description: '',
					});
					setIsModalOpenSubjectUser(false);
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
					Thiết lập môn học
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
export default SubjectSettingPage;
