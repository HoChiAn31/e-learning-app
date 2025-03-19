// import React, { useEffect, useState } from 'react';
// import { Button } from 'antd';
// import { ArrowRight, Plus } from '../../../../components/icon';
// import TranningTable from './components/TranningTable';

// import AddTranningModal from './components/AddTranningModal';
// // import SemesterSelect from './components/SemesterSelect';

// import AcademicYearsSelect from './components/AcademicYearsSelect';
// import { useNavigate } from 'react-router-dom';
// import {
// 	Leadership_system_tranning,
// 	Leadership_system_tranning_add_edit,
// } from '../../../../types/leadership/system';
// import { addTrainingSetting, getTrainingSettings } from '../../../../firebase/systems/tranning';

// const TranningSettingPage: React.FC = () => {
// 	const [isModalOpenTranning, setIsModalOpenTranning] = useState(false);

// 	const [formAdd, setFormAdd] = useState<Leadership_system_tranning_add_edit>({
// 		educationlevel: '',
// 		type: '',
// 		status: false,
// 		isEnure: false,
// 		description: '',
// 		isCredit: false,
// 		trainingTimeYears: 0,
// 		requiredCourses: 0,
// 		electiveCourses: 0,
// 	});
// 	const [data, setData] = useState<Leadership_system_tranning[]>([]);
// 	const fetchTranningData = async () => {
// 		try {
// 			const data = await getTrainingSettings();
// 			console.log('Data fetched successfully');
// 			setData(data);
// 		} catch (error) {
// 			console.error('Error fetching data:', error);
// 		}
// 	};
// 	useEffect(() => {
// 		fetchTranningData();
// 	}, []);
// 	const handleOpenModal = () => {
// 		setIsModalOpenTranning(true);
// 	};
// 	const handleOkAdd = async () => {
// 		console.log(formAdd);
// 		try {
// 			await addTrainingSetting(formAdd);
// 			setIsModalOpenTranning(false);
// 		} catch (error) {
// 			console.error('Error:', error);
// 		}
// 	};
// 	return (
// 		<div>
// 			<Header />
// 			<ControlPanel onAddClick={handleOpenModal} />

// 			<TranningTable dataSource={data} fetchData={fetchTranningData} />
// 			<AddTranningModal
// 				visible={isModalOpenTranning}
// 				formAdd={formAdd}
// 				setFormAdd={setFormAdd}
// 				onOk={handleOkAdd}
// 				onCancel={() => {
// 					setFormAdd({
// 						educationlevel: '',
// 						type: '',
// 						status: false,
// 						isEnure: false,
// 						description: '',
// 						isCredit: false,
// 						trainingTimeYears: 0,
// 						requiredCourses: 0,
// 						electiveCourses: 0,
// 					});
// 					setIsModalOpenTranning(false);
// 				}}
// 			/>
// 		</div>
// 	);
// };

// const Header: React.FC = () => {
// 	const nav = useNavigate();
// 	return (
// 		<div className='inline-flex h-[60px] items-center justify-center'>
// 			<div className='inline-flex items-center justify-start gap-2 px-2.5'>
// 				<span
// 					className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
// 					onClick={() => nav('/systemSettings')}
// 				>
// 					Cài đặt hệ thống
// 				</span>
// 				<div data-svg-wrapper className='relative'>
// 					<ArrowRight />
// 				</div>
// 				<span className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
// 					Quản lý các bậc đào tạo
// 				</span>
// 			</div>
// 		</div>
// 	);
// };

// interface ControlPanelProps {
// 	onAddClick: () => void;
// }

// const ControlPanel: React.FC<ControlPanelProps> = ({ onAddClick }) => (
// 	<div className='flex items-center justify-between py-8'>
// 		<div className='flex items-center gap-4'>
// 			<div className='flex gap-4'>
// 				<AcademicYearsSelect />
// 			</div>
// 		</div>
// 		<Button className='h-[52px]' type='primary' icon={<Plus />} size='middle' onClick={onAddClick}>
// 			<span className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
// 				Thêm mới
// 			</span>
// 		</Button>
// 	</div>
// );
// export default TranningSettingPage;
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { ArrowRight, Plus } from '../../../../components/icon'; // Adjust path
import TranningTable from './components/TranningTable';
import AddTranningModal from './components/AddTranningModal';
import EditTranningModal from './components/EditTranningModal'; // Import the new modal
import AcademicYearsSelect from './components/AcademicYearsSelect';
import { useNavigate } from 'react-router-dom';
import {
	Leadership_system_tranning,
	Leadership_system_tranning_add_edit,
} from '../../../../types/leadership/system'; // Adjust path
import {
	addTrainingSetting,
	getTrainingSettings,
	updateTrainingSetting,
} from '../../../../firebase/systems/tranning'; // Include update function

const TranningSettingPage: React.FC = () => {
	const [isModalOpenTranning, setIsModalOpenTranning] = useState(false);
	const [isModalOpenEditTranning, setIsModalOpenEditTranning] = useState(false); // State for edit modal
	const [formAdd, setFormAdd] = useState<Leadership_system_tranning_add_edit>({
		educationlevel: '',
		type: '',
		status: false,
		isEnure: false,
		description: '',
		isCredit: false,
		trainingTimeYears: 0,
		requiredCourses: 0,
		electiveCourses: 0,
	});
	const [formEdit, setFormEdit] = useState<Leadership_system_tranning>({
		id: '',
		educationlevel: '',
		type: '',
		status: false,
		isEnure: false,
		description: '',
		isCredit: false,
		trainingTimeYears: 0,
		requiredCourses: 0,
		electiveCourses: 0,
	});
	const [data, setData] = useState<Leadership_system_tranning[]>([]);

	const fetchTranningData = async () => {
		try {
			const data = await getTrainingSettings();
			console.log('Data fetched successfully');
			setData(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchTranningData();
	}, []);

	const handleOpenModal = () => {
		setIsModalOpenTranning(true);
	};

	const handleOkAdd = async () => {
		try {
			await addTrainingSetting(formAdd);
			await fetchTranningData(); // Refresh data after adding
			setIsModalOpenTranning(false);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleOpenEditModal = (record: Leadership_system_tranning) => {
		setFormEdit(record); // Set the selected record to edit
		setIsModalOpenEditTranning(true);
	};

	const handleOkEdit = async () => {
		try {
			await updateTrainingSetting(formEdit.id, formEdit); // Update in Firebase
			await fetchTranningData(); // Refresh data after editing
			setIsModalOpenEditTranning(false);
		} catch (error) {
			console.error('Error updating training:', error);
		}
	};

	return (
		<div>
			<Header />
			<ControlPanel onAddClick={handleOpenModal} />
			<TranningTable
				dataSource={data}
				fetchData={fetchTranningData}
				onEdit={handleOpenEditModal} // Pass edit callback to table
			/>
			<AddTranningModal
				visible={isModalOpenTranning}
				formAdd={formAdd}
				setFormAdd={setFormAdd}
				onOk={handleOkAdd}
				onCancel={() => {
					setFormAdd({
						educationlevel: '',
						type: '',
						status: false,
						isEnure: false,
						description: '',
						isCredit: false,
						trainingTimeYears: 0,
						requiredCourses: 0,
						electiveCourses: 0,
					});
					setIsModalOpenTranning(false);
				}}
			/>
			<EditTranningModal
				visible={isModalOpenEditTranning}
				formEdit={formEdit}
				setFormEdit={setFormEdit}
				onOk={handleOkEdit}
				onCancel={() => setIsModalOpenEditTranning(false)}
			/>
		</div>
	);
};

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
					Quản lý các bậc đào tạo
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

export default TranningSettingPage;
