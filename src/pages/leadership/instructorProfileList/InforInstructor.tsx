// import React, { FC, useState } from 'react';
// import {
// 	Camera,
// 	Minus,
// 	Plus,
// 	UserAvatar,
// 	Edit,
// 	Trash,
// 	ArrowDown,
// 	PaperClip,
// 	Search,
// } from '../../../components/icon';
// import {
// 	Button,
// 	ConfigProvider,
// 	Input,
// 	Popconfirm,
// 	Table,
// 	TableProps,
// 	Select,
// 	DatePicker,
// 	Checkbox,
// 	Modal,
// } from 'antd';
// import { DeleteOutlined } from '@ant-design/icons';
// import dayjs from 'dayjs';
// import { instructorData } from '../../../types/leadership/instructor';

// // Interfaces (unchanged)
// interface InstructorData {
// 	instructorCode: string;
// 	department: string;
// 	teachingSubject: string;
// 	fullName: string;
// 	dateOfBirth: string;
// 	placeOfBirth: string;
// 	ethnicity: string;
// 	dateOfEntry: string;
// 	nationality: string;
// 	religion: string;
// 	status: string;
// 	secondarySubject: string[];
// 	alias: string;
// 	province: string;
// 	ward: string;
// 	district: string;
// 	address: string;
// 	email: string;
// 	phoneNumber: string;
// 	gender: string;
// 	unionEntryDate: string;
// 	partyEntryDate: string;
// 	familyInfo: FamilyInfo[];
// 	idCardNumber?: string;
// 	unionEntryPlace?: string;
// 	partyEntryPlace?: string;
// }

// interface FamilyInfo {
// 	id: string;
// 	contactName: string;
// 	address: string;
// 	phoneNumber: string;
// }

// interface ListProcess {
// 	key: string;
// 	agency: string;
// 	department: string;
// 	position: string;
// 	startDate: string;
// 	endDate: string;
// 	certificate?: string;
// 	form?: string;
// }

// interface EditInstructorProps {
// 	onEditInstructor: (data: instructorData) => void;
// 	onCancel: () => void;
// 	instructorData: instructorData;
// }

// // State for Work Process Modal
// interface WorkProcessForm {
// 	lecturer: string;
// 	agency: string;
// 	department: string;
// 	position: string;
// 	startDate: string;
// 	endDate: string;
// 	subjects: string[];
// }

// // State for Training Program Modal
// interface TrainingProgramForm {
// 	lecturer: string;
// 	trainingFacility: string;
// 	major: string;
// 	startDate: string;
// 	endDate: string;
// 	form: string;
// 	certificate: string;
// 	attachment: string;
// 	subjects: string[];
// }

// // Options (unchanged)
// const departmentOptions = [
// 	{ value: 'Toán - Lý - Hóa', label: 'Toán - Lý - Hóa' },
// 	{ value: 'Văn - Anh - Anh', label: 'Văn - Anh - Anh' },
// 	{ value: 'Toán -Hóa - Sinh', label: 'Toán -Hóa - Sinh' },
// ];

// const teachingSubjectOptions = [
// 	{ value: 'Toán', label: 'Toán' },
// 	{ value: 'Văn', label: 'Văn' },
// 	{ value: 'Anh', label: 'Anh' },
// ];
// const positionOptions = [
// 	{ value: 'Giảng viên', label: 'Giảng viên' },
// 	{ value: 'Trợ giảng', label: 'Trợ giảng' },
// 	{ value: 'Trưởng Bộ Môn', label: 'Trưởng Bộ Môn' },
// ];

// const genderOptions = [
// 	{ value: 'Nam', label: 'Nam' },
// 	{ value: 'Nữ', label: 'Nữ' },
// 	{ value: 'Khac', label: 'Khác' },
// ];

// const nationalityOptions = [
// 	{ value: 'Việt Nam', label: 'Việt Nam' },
// 	{ value: 'Mỹ', label: 'Mỹ' },
// 	{ value: 'Nhật Bản', label: 'Nhật Bản' },
// ];

// const religionOptions = [
// 	{ value: 'Phật giáo', label: 'Phật giáo' },
// 	{ value: 'Thiên Chúa giáo', label: 'Thiên Chúa giáo' },
// 	{ value: 'Khong', label: 'Không' },
// ];

// const statusOptions = [
// 	{ value: 'Đang làm việc', label: 'Đang làm việc' },
// 	{ value: 'Nghỉ hưu', label: 'Nghỉ hưu' },
// 	{ value: 'Tạm nghỉ', label: 'Tạm nghỉ' },
// ];

// const provinceOptions = [
// 	{ value: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
// 	{ value: 'Hà Nội', label: 'Hà Nội' },
// 	{ value: 'ĐVariation Nẵng', label: 'Đà Nẵng' },
// ];

// const districtOptions = [
// 	{ value: 'Quận 1', label: 'Quận 1' },
// 	{ value: 'Quận 3', label: 'Quận 3' },
// 	{ value: 'Quận 7', label: 'Quận 7' },
// ];

// const wardOptions = [
// 	{ value: 'Phường 1', label: 'Phường 1' },
// 	{ value: 'Phường 2', label: 'Phường 2' },
// 	{ value: 'Phường 3', label: 'Phường 3' },
// ];

// const subjects = [
// 	{ value: 'Toán học', label: 'Toán học' },
// 	{ value: 'Vật lý', label: 'Vật lý' },
// 	{ value: 'Hóa học', label: 'Hóa học' },
// 	{ value: 'Sinh học', label: 'Sinh học' },
// 	{ value: 'Lịch sử', label: 'Lịch sử' },
// 	{ value: 'Anh văn', label: 'Anh văn' },
// 	{ value: 'Ngữ văn', label: 'Ngữ văn' },
// 	{ value: 'Địa lý', label: 'Địa lý' },
// 	{ value: 'Tin học', label: 'Tin học' },
// 	{ value: 'Giáo dục công dân', label: 'Giáo dục công dân' },
// ];

// const initialProcessData: ListProcess[] = [
// 	{
// 		key: '1',
// 		agency: 'Trường THPT Nguyễn Trãi',
// 		department: 'Bộ phận Giáo vụ',
// 		position: 'Giáo viên Toán',
// 		startDate: '01/09/2010',
// 		endDate: '31/05/2015',
// 		certificate: 'Đại học Sư phạm Toán',
// 		form: 'Cử nhân',
// 	},
// 	{
// 		key: '2',
// 		agency: 'Trường THPT Lê Quý Đôn',
// 		department: 'Ban Giám hiệu',
// 		position: 'Phó Hiệu trưởng',
// 		startDate: '01/06/2015',
// 		endDate: '31/05/2018',
// 		certificate: 'Đại học Quản lý Giáo dục',
// 		form: 'Cử nhân',
// 	},
// ];

// const EditInstructor: FC<EditInstructorProps> = ({
// 	onEditInstructor,
// 	onCancel,
// 	instructorData,
// }) => {
// 	const [data, setData] = useState<instructorData>(instructorData);
// 	const [processData, setProcessData] = useState<ListProcess[]>(initialProcessData);
// 	const [trainingData, setTrainingData] = useState<ListProcess[]>(initialProcessData);
// 	const [isActive, setIsActive] = useState('general');
// 	const [activeItem, setActiveItem] = useState('process');
// 	const [isModalTranningProcessAdd, setIsModalTranningProcessAdd] = useState<boolean>(false);
// 	const [isModalTranningProgramAdd, setIsModalTranningProgramAdd] = useState<boolean>(false);
// 	const [showSelect, setShowSelect] = useState(false);
// 	const [subjectList, setSubjectList] = useState<string[]>([]);
// 	const [isEditing, setIsEditing] = useState(false);

// 	// State for Work Process Modal
// 	const [workProcessForm, setWorkProcessForm] = useState<WorkProcessForm>({
// 		lecturer: '',
// 		agency: '',
// 		department: '',
// 		position: '',
// 		startDate: '',
// 		endDate: '',
// 		subjects: [],
// 	});

// 	// State for Training Program Modal
// 	const [trainingProgramForm, setTrainingProgramForm] = useState<TrainingProgramForm>({
// 		lecturer: '',
// 		trainingFacility: '',
// 		major: '',
// 		startDate: '',
// 		endDate: '',
// 		form: '',
// 		certificate: '',
// 		attachment: '',
// 		subjects: [],
// 	});

// 	const toggleEdit = () => {
// 		setIsEditing((prev) => !prev);
// 	};

// 	const handleChange = (field: keyof InstructorData, value: string | FamilyInfo[]) => {
// 		if (isEditing) {
// 			setData((prev) => ({
// 				...prev,
// 				[field]: value,
// 			}));
// 		}
// 	};

// 	const familyColumns: TableProps<FamilyInfo>['columns'] = [
// 		{
// 			title: 'Nguồn liên hệ',
// 			dataIndex: 'contactName',
// 			key: 'contactName',
// 			width: 200,
// 			render: (text, record) => (
// 				<Input
// 					value={text}
// 					onChange={(e) => {
// 						if (isEditing) {
// 							const newFamilyInfo = [...data.familyInfo];
// 							const index = newFamilyInfo.findIndex((item) => item.id === record.id);
// 							if (index > -1) {
// 								newFamilyInfo[index].contactName = e.target.value;
// 								handleChange('familyInfo', newFamilyInfo);
// 							}
// 						}
// 					}}
// 					className='rounded-lg border px-2 py-1'
// 					disabled={!isEditing}
// 				/>
// 			),
// 		},
// 		{
// 			title: 'Địa chỉ',
// 			dataIndex: 'address',
// 			key: 'address',
// 			width: 400,
// 			render: (text, record) => (
// 				<Input
// 					value={text}
// 					onChange={(e) => {
// 						if (isEditing) {
// 							const newFamilyInfo = [...data.familyInfo];
// 							const index = newFamilyInfo.findIndex((item) => item.id === record.id);
// 							if (index > -1) {
// 								newFamilyInfo[index].address = e.target.value;
// 								handleChange('familyInfo', newFamilyInfo);
// 							}
// 						}
// 					}}
// 					className='rounded-lg border px-2 py-1'
// 				/>
// 			),
// 		},
// 		{
// 			title: 'SĐT',
// 			dataIndex: 'phoneNumber',
// 			width: 200,
// 			render: (text, record) => (
// 				<Input
// 					value={text}
// 					onChange={(e) => {
// 						if (isEditing) {
// 							const newFamilyInfo = [...data.familyInfo];
// 							const index = newFamilyInfo.findIndex((item) => item.id === record.id);
// 							if (index > -1) {
// 								newFamilyInfo[index].phoneNumber = e.target.value;
// 								handleChange('familyInfo', newFamilyInfo);
// 							}
// 						}
// 					}}
// 					className='rounded-lg border px-2 py-1'
// 				/>
// 			),
// 		},
// 		{
// 			title: '',
// 			key: 'action',
// 			width: 100,
// 			render: (_, record) => (
// 				<Popconfirm
// 					title='Bạn có chắc chắn muốn xóa?'
// 					onConfirm={() => handleDeleteFamily(record.id)}
// 					okText='Có'
// 					cancelText='Không'
// 				>
// 					<Button
// 						type='text'
// 						icon={<DeleteOutlined />}
// 						className='text-red-500 hover:text-red-700'
// 					/>
// 				</Popconfirm>
// 			),
// 		},
// 	];

// 	const processColumns: TableProps<ListProcess>['columns'] = [
// 		{
// 			title: 'Cơ quan/ Đơn vị',
// 			dataIndex: 'agency',
// 			width: '15%',
// 		},
// 		{
// 			title: 'Tổ/ Bộ môn',
// 			dataIndex: 'department',
// 			width: '15%',
// 		},
// 		{
// 			title: 'Chức vụ',
// 			dataIndex: 'position',
// 			width: '15%',
// 		},
// 		{
// 			title: 'Ngày bắt đầu',
// 			dataIndex: 'startDate',
// 			width: '15%',
// 		},
// 		{
// 			title: 'Ngày kết thúc',
// 			dataIndex: 'endDate',
// 			width: '15%',
// 		},
// 		{
// 			title: '',
// 			dataIndex: 'action',
// 			align: 'center',
// 			render: (_, record) => (
// 				<div className=''>
// 					<Button type='link' onClick={() => handleEditProcess(record)}>
// 						<Edit />
// 					</Button>
// 					<Button type='link' onClick={() => handleDeleteProcess(record)}>
// 						<Trash />
// 					</Button>
// 				</div>
// 			),
// 			width: '15%',
// 		},
// 	];

// 	const trainingColumns: TableProps<ListProcess>['columns'] = [
// 		{
// 			title: 'Cơ quan/ Đơn vị',
// 			dataIndex: 'agency',
// 			width: '20%',
// 		},
// 		{
// 			title: 'Chuyên ngành',
// 			dataIndex: 'department',
// 			width: '15%',
// 		},
// 		{
// 			title: 'Ngày bắt đầu',
// 			dataIndex: 'startDate',
// 			width: '15%',
// 		},
// 		{
// 			title: 'Ngày kết thúc',
// 			dataIndex: 'endDate',
// 			width: '15%',
// 		},
// 		{
// 			title: 'Văn bằng/ Chứng chỉ',
// 			dataIndex: 'certificate',
// 			width: '15%',
// 		},
// 		{
// 			title: 'Hình thức',
// 			dataIndex: 'form',
// 			width: '10%',
// 		},
// 		{
// 			title: '',
// 			dataIndex: 'action',
// 			align: 'center',
// 			render: (_, record) => (
// 				<div className=''>
// 					<Button type='link' onClick={() => handleEditTraining(record)}>
// 						<Edit />
// 					</Button>
// 					<Button type='link' onClick={() => handleDeleteTraining(record)}>
// 						<Trash />
// 					</Button>
// 				</div>
// 			),
// 			width: '15%',
// 		},
// 	];

// 	const handleAddFamily = () => {
// 		if (!isEditing) return;
// 		const newFamilyInfo: FamilyInfo = {
// 			id: (data.familyInfo.length + 1).toString(),
// 			contactName: '',
// 			address: '',
// 			phoneNumber: '',
// 		};
// 		handleChange('familyInfo', [...data.familyInfo, newFamilyInfo]);
// 	};

// 	const handleDeleteFamily = (id: string) => {
// 		if (!isEditing) return;
// 		const newFamilyInfo = data.familyInfo.filter((item) => item.id !== id);
// 		handleChange('familyInfo', newFamilyInfo);
// 	};

// 	const handleEditProcess = (record: ListProcess) => {
// 		if (!isEditing) return;
// 		console.log('Edit process:', record);
// 	};

// 	const handleDeleteProcess = (record: ListProcess) => {
// 		if (!isEditing) return;
// 		setProcessData(processData.filter((item) => item.key !== record.key));
// 	};

// 	const handleEditTraining = (record: ListProcess) => {
// 		if (!isEditing) return;
// 		console.log('Edit training:', record);
// 	};

// 	const handleDeleteTraining = (record: ListProcess) => {
// 		if (!isEditing) return;
// 		setTrainingData(trainingData.filter((item) => item.key !== record.key));
// 	};

// 	const addSubject = (value: string) => {
// 		if (!isEditing) return;
// 		if (!data.secondarySubject.includes(value)) {
// 			setData({ ...data, secondarySubject: [...data.secondarySubject, value] });
// 		}
// 		setShowSelect(false);
// 	};

// 	const removeSubject = (subject: string) => {
// 		if (!isEditing) return;
// 		setData({
// 			...data,
// 			secondarySubject: data.secondarySubject.filter((sub) => sub !== subject),
// 		});
// 	};

// 	// Handlers for Work Process Modal
// 	const handleWorkProcessChange = (field: keyof WorkProcessForm, value: string | string[]) => {
// 		setWorkProcessForm((prev) => ({
// 			...prev,
// 			[field]: value,
// 		}));
// 	};

// 	const handleOkModalTranningProcessAdd = () => {
// 		if (!isEditing) return;
// 		const newProcess: ListProcess = {
// 			key: (processData.length + 1).toString(),
// 			agency: workProcessForm.agency,
// 			department: workProcessForm.department,
// 			position: workProcessForm.position,
// 			startDate: workProcessForm.startDate,
// 			endDate: workProcessForm.endDate,
// 		};
// 		setProcessData([...processData, newProcess]);
// 		setWorkProcessForm({
// 			lecturer: '',
// 			agency: '',
// 			department: '',
// 			position: '',
// 			startDate: '',
// 			endDate: '',
// 			subjects: [],
// 		});
// 		setIsModalTranningProcessAdd(false);
// 	};

// 	// Handlers for Training Program Modal
// 	const handleTrainingProgramChange = (
// 		field: keyof TrainingProgramForm,
// 		value: string | string[],
// 	) => {
// 		setTrainingProgramForm((prev) => ({
// 			...prev,
// 			[field]: value,
// 		}));
// 	};

// 	const handleOkModalTranningProgramAdd = () => {
// 		if (!isEditing) return;
// 		const newTraining: ListProcess = {
// 			key: (trainingData.length + 1).toString(),
// 			agency: trainingProgramForm.trainingFacility,
// 			department: trainingProgramForm.major,
// 			startDate: trainingProgramForm.startDate,
// 			endDate: trainingProgramForm.endDate,
// 			certificate: trainingProgramForm.certificate,
// 			form: trainingProgramForm.form,
// 			position: '',
// 		};
// 		setTrainingData([...trainingData, newTraining]);
// 		setTrainingProgramForm({
// 			lecturer: '',
// 			trainingFacility: '',
// 			major: '',
// 			startDate: '',
// 			endDate: '',
// 			form: '',
// 			certificate: '',
// 			attachment: '',
// 			subjects: [],
// 		});
// 		setIsModalTranningProgramAdd(false);
// 	};

// 	const handleSave = () => {
// 		if (!isEditing) return;
// 		onEditInstructor(data);
// 		setIsEditing(false);
// 	};

// 	return (
// 		<div className=''>
// 			<div className='flex items-center justify-between py-6'>
// 				<div className='flex items-center gap-2'>
// 					<Button
// 						size='middle'
// 						onClick={() => setIsActive('general')}
// 						shape='round'
// 						className={`${isActive === 'general' ? 'bg-black text-white' : 'bg-white text-black'}`}
// 					>
// 						<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
// 							Thông tin chung
// 						</div>
// 					</Button>
// 					<Button
// 						size='middle'
// 						onClick={() => setIsActive('process')}
// 						shape='round'
// 						className={`${isActive === 'process' ? 'bg-black text-white' : 'bg-white text-black'}`}
// 					>
// 						<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
// 							Quá trình công tác
// 						</div>
// 					</Button>
// 				</div>
// 				{isActive === 'general' && (
// 					<div className='flex items-center gap-2'>
// 						<Trash />
// 						<div className='h-12 w-[1px] bg-[#c8c4c0]' />
// 						<Button className='h-[52px]' size='middle'>
// 							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-primary">
// 								Xuất file
// 							</div>
// 						</Button>
// 						<Button
// 							className='h-[52px]'
// 							type='primary'
// 							icon={<Plus />}
// 							size='middle'
// 							onClick={toggleEdit}
// 						>
// 							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
// 								{isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
// 							</div>
// 						</Button>
// 					</div>
// 				)}
// 			</div>

// 			{isActive === 'general' ? (
// 				<>
// 					<div className='w-[1640px] bg-white shadow-md'>
// 						<div className='inline-flex h-14 w-[1640px] items-center justify-start overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-[#cc5c00] pb-4 pl-[63px] pr-[1430px] pt-[17px]'>
// 							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
// 								Thông tin chung
// 							</div>
// 						</div>
// 						<div className='flex gap-10 px-16 pt-10'>
// 							<div>
// 								<div className='relative'>
// 									<div className='flex h-[220px] w-[220px] items-end justify-center overflow-hidden rounded-full bg-[#EFEFEF]'>
// 										<UserAvatar />
// 										<div className='absolute -bottom-8'>
// 											<button disabled={!isEditing}>
// 												<Camera />
// 											</button>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 							<div className='pb-10'>
// 								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
// 									Thông tin giảng viên
// 								</div>
// 								<div className='flex items-start gap-16'>
// 									<div className='space-y-4'>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Mã giảng viên:
// 											</p>
// 											<Input
// 												value={data.instructorCode}
// 												onChange={(e) => handleChange('instructorCode', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Tổ - Bộ môn:
// 											</p>
// 											<Select
// 												value={data.department}
// 												onChange={(value) => handleChange('department', value)}
// 												options={departmentOptions}
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn tổ - bộ môn'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Môn giảng dạy:
// 											</p>
// 											<Select
// 												value={data.teachingSubject}
// 												onChange={(value) => handleChange('teachingSubject', value)}
// 												options={teachingSubjectOptions}
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn môn giảng dạy'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Họ và Tên:
// 											</p>
// 											<Input
// 												value={data.fullName}
// 												onChange={(e) => handleChange('fullName', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Ngày sinh:
// 											</p>
// 											<DatePicker
// 												value={data.dateOfBirth ? dayjs(data.dateOfBirth, 'DD/MM/YYYY') : null}
// 												onChange={(date) =>
// 													handleChange('dateOfBirth', date ? date.format('DD/MM/YYYY') : '')
// 												}
// 												format='DD/MM/YYYY'
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn ngày sinh'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Giới tính:
// 											</p>
// 											<Select
// 												value={data.gender}
// 												onChange={(value) => handleChange('gender', value)}
// 												options={genderOptions}
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn giới tính'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Dân tộc:
// 											</p>
// 											<Input
// 												value={data.ethnicity}
// 												onChange={(e) => handleChange('ethnicity', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Ngày vào trường:
// 											</p>
// 											<DatePicker
// 												value={data.dateOfEntry ? dayjs(data.dateOfEntry, 'DD/MM/YYYY') : null}
// 												onChange={(date) =>
// 													handleChange('dateOfEntry', date ? date.format('DD/MM/YYYY') : '')
// 												}
// 												format='DD/MM/YYYY'
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn ngày vào trường'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 									</div>
// 									<div className='space-y-4'>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Quốc tịch:
// 											</p>
// 											<Select
// 												value={data.nationality}
// 												onChange={(value) => handleChange('nationality', value)}
// 												options={nationalityOptions}
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn quốc tịch'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Tôn giáo:
// 											</p>
// 											<Select
// 												value={data.religion}
// 												onChange={(value) => handleChange('religion', value)}
// 												options={religionOptions}
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn tôn giáo'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Trạng thái:
// 											</p>
// 											<Select
// 												value={data.status}
// 												onChange={(value) => handleChange('status', value)}
// 												options={statusOptions}
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn trạng thái'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Môn kiêm nhiệm:
// 											</p>
// 											<div className='space-2'>
// 												{data.secondarySubject.length > 0 && (
// 													<div className='flex flex-wrap gap-4'>
// 														{data.secondarySubject.map((sub) => (
// 															<div className='inline-flex h-8 items-center justify-center gap-1.5 rounded-2xl bg-[#0B80EC] px-3 py-[5px]'>
// 																<div className="justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-white">
// 																	{sub}
// 																</div>
// 																<div
// 																	onClick={() => removeSubject(sub)}
// 																	className='cursor-pointer rounded-full bg-white'
// 																>
// 																	<Minus color='#2EACEE' />
// 																</div>
// 															</div>
// 														))}
// 													</div>
// 												)}
// 												{showSelect && (
// 													<Select
// 														placeholder='Chọn môn học'
// 														style={{ width: '100%' }}
// 														onChange={addSubject}
// 														className='mt-2'
// 														options={subjects}
// 														disabled={!isEditing}
// 													/>
// 												)}
// 												<div
// 													onClick={() => setShowSelect(true)}
// 													className='mt-2 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-stone-300 py-[5px] pl-2.5 pr-1'
// 												>
// 													<div className="justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-white">
// 														Thêm
// 													</div>
// 													<div className='relative h-6 w-6 overflow-hidden'>
// 														<Plus />
// 													</div>
// 												</div>
// 											</div>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Bí danh:
// 											</p>
// 											<Input
// 												value={data.alias}
// 												onChange={(e) => handleChange('alias', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 									</div>
// 									<div className='space-y-4'>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Tỉnh/ Thành:
// 											</p>
// 											<Select
// 												value={data.province}
// 												onChange={(value) => handleChange('province', value)}
// 												options={provinceOptions}
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn tỉnh/thành'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Xã/ Phường:
// 											</p>
// 											<Select
// 												value={data.ward}
// 												onChange={(value) => handleChange('ward', value)}
// 												options={wardOptions}
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn xã/phường'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Quận/ Huyện:
// 											</p>
// 											<Select
// 												value={data.district}
// 												onChange={(value) => handleChange('district', value)}
// 												options={districtOptions}
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn quận/huyện'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Địa chỉ:
// 											</p>
// 											<Input
// 												value={data.address}
// 												onChange={(e) => handleChange('address', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Email:
// 											</p>
// 											<Input
// 												value={data.email}
// 												onChange={(e) => handleChange('email', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												SĐT:
// 											</p>
// 											<Input
// 												value={data.phoneNumber}
// 												onChange={(e) => handleChange('phoneNumber', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					<div className='h-4 w-[1640px] bg-[#f2f2f2] shadow-[inset_0px_4px_8px_0px_rgba(154,202,245,0.15)]' />

// 					<div className='w-[1640px] bg-white pt-2'>
// 						<div className='flex gap-28 px-16 py-10'>
// 							<div className='w-[220px]'></div>
// 							<div>
// 								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
// 									Thông tin cá nhân
// 								</div>
// 								<div className='flex items-center gap-20'>
// 									<div className='space-y-4'>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												CMND/CCCD:
// 											</p>
// 											<Input
// 												value={data.idCardNumber}
// 												onChange={(e) => handleChange('idCardNumber', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Dân tộc:
// 											</p>
// 											<Input
// 												value={data.ethnicity}
// 												onChange={(e) => handleChange('ethnicity', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Ngày vào trường:
// 											</p>
// 											<DatePicker
// 												value={data.dateOfEntry ? dayjs(data.dateOfEntry, 'DD/MM/YYYY') : null}
// 												onChange={(date) =>
// 													handleChange('dateOfEntry', date ? date.format('DD/MM/YYYY') : '')
// 												}
// 												format='DD/MM/YYYY'
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn ngày vào trường'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 									</div>
// 									<div className='space-y-4'>
// 										<div className='flex h-10 items-center gap-x-[40px]'>
// 											<Checkbox disabled={!isEditing}>
// 												<div className="w-24 justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-neutral-700">
// 													Đoàn viên
// 												</div>
// 											</Checkbox>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Ngày vào Đoàn:
// 											</p>
// 											<DatePicker
// 												value={
// 													data.unionEntryDate ? dayjs(data.unionEntryDate, 'DD/MM/YYYY') : null
// 												}
// 												onChange={(date) =>
// 													handleChange('unionEntryDate', date ? date.format('DD/MM/YYYY') : '')
// 												}
// 												format='DD/MM/YYYY'
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn ngày vào Đoàn'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-[' Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Nơi vào đoàn:
// 											</p>
// 											<Input
// 												value={data.unionEntryPlace}
// 												onChange={(e) => handleChange('unionEntryPlace', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 									</div>
// 									<div className='space-y-4'>
// 										<div className='flex h-10 items-center gap-x-[40px]'>
// 											<Checkbox disabled={!isEditing}>
// 												<div className="w-24 justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-neutral-700">
// 													Đảng viên
// 												</div>
// 											</Checkbox>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Ngày vào Đảng:
// 											</p>
// 											<DatePicker
// 												value={
// 													data.partyEntryDate ? dayjs(data.partyEntryDate, 'DD/MM/YYYY') : null
// 												}
// 												onChange={(date) =>
// 													handleChange('partyEntryDate', date ? date.format('DD/MM/YYYY') : '')
// 												}
// 												format='DD/MM/YYYY'
// 												className='h-10 w-[196px]'
// 												placeholder='Chọn ngày vào Đảng'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 										<div className='flex items-center gap-x-[40px]'>
// 											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
// 												Nơi vào đảng:
// 											</p>
// 											<Input
// 												value={data.partyEntryPlace}
// 												onChange={(e) => handleChange('partyEntryPlace', e.target.value)}
// 												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
// 												disabled={!isEditing}
// 											/>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					<div className='h-4 w-[1640px] bg-[#f2f2f2] shadow-[inset_0px_4px_8px_0px_rgba(154,202,245,0.15)]' />

// 					<div className='w-[1640px] bg-white shadow-md'>
// 						<div className='p-16'>
// 							<div className="font-['Source Sans Pro'] mb-4 text-base font-bold tracking-tight text-[#cc5c00]">
// 								Thông tin gia đình
// 							</div>
// 							<div className='mb-4 flex justify-end'>
// 								<Button
// 									onClick={handleAddFamily}
// 									type='primary'
// 									className='border-none bg-[#cc5c00] font-bold text-white hover:bg-[#b35000]'
// 									disabled={!isEditing}
// 								>
// 									+ Thêm
// 								</Button>
// 							</div>
// 							<ConfigProvider
// 								theme={{
// 									components: {
// 										Table: {
// 											headerBg: '#373839',
// 											headerColor: '#ffffff',
// 										},
// 									},
// 								}}
// 							>
// 								<Table<FamilyInfo>
// 									dataSource={data.familyInfo}
// 									columns={familyColumns}
// 									pagination={false}
// 									rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
// 								/>
// 							</ConfigProvider>
// 						</div>
// 					</div>

// 					<div className='flex items-center justify-center py-6'>
// 						<div className='flex items-center gap-4'>
// 							<Button onClick={onCancel} className='w-[146px]'>
// 								Hủy
// 							</Button>
// 							<Button
// 								onClick={handleSave}
// 								type='primary'
// 								className='w-[146px]'
// 								disabled={!isEditing}
// 							>
// 								Lưu
// 							</Button>
// 						</div>
// 					</div>
// 				</>
// 			) : (
// 				<div>
// 					<div className='my-5'>
// 						<div
// 							onClick={() => setActiveItem('process')}
// 							className={`${activeItem === 'process' ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21]' : 'bg-white'} inline-flex h-14 w-[1640px] cursor-pointer items-center justify-start gap-[13px] overflow-hidden rounded-lg border border-[#f2f2f2] py-3 pl-3`}
// 						>
// 							<div className={` ${activeItem === 'process' ? '' : '-rotate-90'} `}>
// 								<ArrowDown color={activeItem === 'process' ? '#ffffff' : '#ff7506'} />
// 							</div>
// 							<div
// 								className={`${activeItem === 'process' ? 'text-white' : 'text-[#373839]'} font-['Mulish'] text-lg font-extrabold tracking-tight`}
// 							>
// 								Quá trình công tác
// 							</div>
// 						</div>
// 					</div>
// 					{activeItem === 'process' && (
// 						<>
// 							<div className='flex w-[1640px] items-center justify-between pb-5'>
// 								<Input placeholder='Tìm kiếm' className='h-10 w-[438px]' prefix={<Search />} />
// 								<Button
// 									type='primary'
// 									icon={<Plus />}
// 									className='h-4 py-5'
// 									onClick={() => setIsModalTranningProcessAdd(true)}
// 								>
// 									<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-white">
// 										Thêm
// 									</div>
// 								</Button>
// 							</div>
// 							<ConfigProvider
// 								theme={{
// 									components: {
// 										Table: {
// 											headerBg: '#373839',
// 											headerColor: '#ffffff',
// 											borderColor: '#f2f2f2',
// 										},
// 									},
// 								}}
// 							>
// 								<Table<ListProcess>
// 									columns={processColumns}
// 									dataSource={processData}
// 									pagination={{
// 										position: ['bottomRight'],
// 										showSizeChanger: true,
// 										pageSizeOptions: ['5', '10', '20', '50'],
// 										defaultPageSize: 5,
// 									}}
// 									rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
// 									className='w-[1640px]'
// 								/>
// 							</ConfigProvider>
// 						</>
// 					)}

// 					<div className='my-5'>
// 						<div
// 							onClick={() => setActiveItem('disciplinary')}
// 							className={`${activeItem === 'disciplinary' ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21]' : 'bg-white'} inline-flex h-14 w-[1640px] cursor-pointer items-center justify-start gap-[13px] overflow-hidden rounded-lg border border-[#f2f2f2] py-3 pl-3`}
// 						>
// 							<div className={` ${activeItem === 'disciplinary' ? '' : '-rotate-90'} `}>
// 								<ArrowDown color={activeItem === 'disciplinary' ? '#ffffff' : '#ff7506'} />
// 							</div>
// 							<div
// 								className={`${activeItem === 'disciplinary' ? 'text-white' : 'text-[#373839]'} font-['Mulish'] text-lg font-extrabold tracking-tight`}
// 							>
// 								Thông tin đào tạo
// 							</div>
// 						</div>
// 					</div>
// 					{activeItem === 'disciplinary' && (
// 						<>
// 							<div className='flex w-[1640px] items-center justify-between pb-5'>
// 								<Input placeholder='Tìm kiếm' className='h-10 w-[438px]' prefix={<Search />} />
// 								<Button
// 									type='primary'
// 									icon={<Plus />}
// 									className='h-4 py-5'
// 									onClick={() => setIsModalTranningProgramAdd(true)}
// 								>
// 									<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-white">
// 										Thêm
// 									</div>
// 								</Button>
// 							</div>
// 							<ConfigProvider
// 								theme={{
// 									components: {
// 										Table: {
// 											headerBg: '#373839',
// 											headerColor: '#ffffff',
// 											borderColor: '#f2f2f2',
// 										},
// 									},
// 								}}
// 							>
// 								<Table<ListProcess>
// 									columns={trainingColumns}
// 									dataSource={trainingData}
// 									pagination={{
// 										position: ['bottomRight'],
// 										showSizeChanger: true,
// 										pageSizeOptions: ['5', '10', '20', '50'],
// 										defaultPageSize: 5,
// 									}}
// 									rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
// 									className='w-[1640px]'
// 								/>
// 							</ConfigProvider>
// 						</>
// 					)}

// 					<Modal
// 						title='Thêm mới quá trình công tác'
// 						open={isModalTranningProcessAdd}
// 						onOk={handleOkModalTranningProcessAdd}
// 						onCancel={() => setIsModalTranningProcessAdd(false)}
// 						styles={{
// 							header: { textAlign: 'center' },
// 							footer: { textAlign: 'center' },
// 						}}
// 						width={800}
// 						footer={[
// 							<Button
// 								className='w-40'
// 								key='back'
// 								onClick={() => setIsModalTranningProcessAdd(false)}
// 							>
// 								Hủy
// 							</Button>,
// 							<Button
// 								className='w-40'
// 								key='submit'
// 								type='primary'
// 								onClick={handleOkModalTranningProcessAdd}
// 							>
// 								Xác nhận
// 							</Button>,
// 						]}
// 					>
// 						<div className='py-5'>
// 							<div className='space-y-10'>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 											Giảng viên:
// 										</div>
// 									</div>
// 									<Input
// 										className='h-10 w-[561px] bg-[#F0F3F6]'
// 										variant='filled'
// 										value={workProcessForm.lecturer}
// 										onChange={(e) => handleWorkProcessChange('lecturer', e.target.value)}
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Cơ quan/Đơn vị:
// 											</p>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>
// 									<Input
// 										placeholder='Nhập cơ quan/đơn vị'
// 										className='h-10 w-[561px] bg-[#F0F3F6]'
// 										variant='filled'
// 										value={workProcessForm.agency}
// 										onChange={(e) => handleWorkProcessChange('agency', e.target.value)}
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Tổ/Bộ môn:
// 											</p>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>

// 									<Select
// 										value={workProcessForm.department}
// 										onChange={(value) => handleWorkProcessChange('department', value)}
// 										options={departmentOptions}
// 										className='h-10 w-[561px] bg-[#F0F3F6]'
// 										placeholder='Nhập tổ/bộ môn'
// 										variant='filled'
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Chức vụ:
// 											</p>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>

// 									<Select
// 										value={workProcessForm.position}
// 										onChange={(value) => handleWorkProcessChange('position', value)}
// 										options={positionOptions}
// 										className='h-10 w-[561px] bg-[#F0F3F6]'
// 										placeholder='Nhập chức vụ'
// 										variant='filled'
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Ngày bắt đầu:
// 											</div>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>
// 									<DatePicker
// 										format='DD/MM/YYYY'
// 										className='h-10 w-[561px]'
// 										placeholder='Chọn ngày bắt đầu'
// 										value={
// 											workProcessForm.startDate
// 												? dayjs(workProcessForm.startDate, 'DD/MM/YYYY')
// 												: null
// 										}
// 										onChange={(date) =>
// 											handleWorkProcessChange('startDate', date ? date.format('DD/MM/YYYY') : '')
// 										}
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Ngày kết thúc:
// 											</div>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>
// 									<DatePicker
// 										format='DD/MM/YYYY'
// 										className='h-10 w-[561px]'
// 										placeholder='Chọn ngày kết thúc'
// 										value={
// 											workProcessForm.endDate ? dayjs(workProcessForm.endDate, 'DD/MM/YYYY') : null
// 										}
// 										onChange={(date) =>
// 											handleWorkProcessChange('endDate', date ? date.format('DD/MM/YYYY') : '')
// 										}
// 									/>
// 								</div>
// 							</div>

// 							<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
// 							<div className='space-y-3'>
// 								<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
// 									Danh sách môn học
// 								</p>
// 								<div className='space-y-4'>
// 									{showSelect && (
// 										<Select
// 											placeholder='Lựa chọn'
// 											style={{ width: '100%' }}
// 											onChange={(value) =>
// 												handleWorkProcessChange('subjects', [...workProcessForm.subjects, value])
// 											}
// 											className='mt-2'
// 											options={subjects}
// 										/>
// 									)}
// 									{workProcessForm.subjects.length > 0 && (
// 										<div className='grid grid-cols-3 gap-4'>
// 											{workProcessForm.subjects.map((sub) => (
// 												<div className='flex items-center gap-1'>
// 													<div
// 														onClick={() =>
// 															handleWorkProcessChange(
// 																'subjects',
// 																workProcessForm.subjects.filter((s) => s !== sub),
// 															)
// 														}
// 														className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
// 													>
// 														<Minus />
// 													</div>
// 													<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
// 														{sub}
// 													</div>
// 												</div>
// 											))}
// 										</div>
// 									)}
// 									<div className='flex cursor-pointer gap-2' onClick={() => setShowSelect(true)}>
// 										<div className='inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'>
// 											<Plus />
// 										</div>
// 										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#0a7feb]">
// 											Thêm môn học
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</Modal>

// 					<Modal
// 						title='Thêm mới chương trình đào tạo'
// 						open={isModalTranningProgramAdd}
// 						onOk={handleOkModalTranningProgramAdd}
// 						onCancel={() => setIsModalTranningProgramAdd(false)}
// 						styles={{
// 							header: { textAlign: 'center' },
// 							footer: { textAlign: 'center' },
// 						}}
// 						width={800}
// 						footer={[
// 							<Button
// 								className='w-40'
// 								key='back'
// 								onClick={() => setIsModalTranningProgramAdd(false)}
// 							>
// 								Hủy
// 							</Button>,
// 							<Button
// 								className='w-40'
// 								key='submit'
// 								type='primary'
// 								onClick={handleOkModalTranningProgramAdd}
// 								disabled={!isEditing}
// 							>
// 								Xác nhận
// 							</Button>,
// 						]}
// 					>
// 						<div className='py-5'>
// 							<div className='space-y-10'>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 											Giảng viên:
// 										</div>
// 									</div>
// 									<Input
// 										placeholder='Tìm kiếm'
// 										className='h-10 w-[561px] bg-[#F0F3F6]'
// 										variant='filled'
// 										value={trainingProgramForm.lecturer}
// 										onChange={(e) => handleTrainingProgramChange('lecturer', e.target.value)}
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Cơ sở đào tạo:
// 											</p>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>
// 									<Input
// 										placeholder='Nhập cơ sở đào tạo'
// 										className='h-10 w-[561px] bg-[#F0F3F6]'
// 										variant='filled'
// 										value={trainingProgramForm.trainingFacility}
// 										onChange={(e) =>
// 											handleTrainingProgramChange('trainingFacility', e.target.value)
// 										}
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Chuyên ngành:
// 											</p>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>
// 									<Input
// 										placeholder='Nhập chuyên ngành'
// 										className='h-10 w-[561px] bg-[#F0F3F6]'
// 										variant='filled'
// 										value={trainingProgramForm.major}
// 										onChange={(e) => handleTrainingProgramChange('major', e.target.value)}
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Ngày bắt đầu:
// 											</div>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>
// 									<DatePicker
// 										format='DD/MM/YYYY'
// 										className='h-10 w-[561px]'
// 										placeholder='Chọn ngày bắt đầu'
// 										value={
// 											trainingProgramForm.startDate
// 												? dayjs(trainingProgramForm.startDate, 'DD/MM/YYYY')
// 												: null
// 										}
// 										onChange={(date) =>
// 											handleTrainingProgramChange(
// 												'startDate',
// 												date ? date.format('DD/MM/YYYY') : '',
// 											)
// 										}
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Ngày kết thúc:
// 											</div>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>
// 									<DatePicker
// 										format='DD/MM/YYYY'
// 										className='h-10 w-[561px]'
// 										placeholder='Chọn ngày kết thúc'
// 										value={
// 											trainingProgramForm.endDate
// 												? dayjs(trainingProgramForm.endDate, 'DD/MM/YYYY')
// 												: null
// 										}
// 										onChange={(date) =>
// 											handleTrainingProgramChange('endDate', date ? date.format('DD/MM/YYYY') : '')
// 										}
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Hình thức:
// 											</p>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>
// 									<Input
// 										placeholder='Nhập hình thức'
// 										className='h-10 w-[561px] bg-[#F0F3F6]'
// 										variant='filled'
// 										value={trainingProgramForm.form}
// 										onChange={(e) => handleTrainingProgramChange('form', e.target.value)}
// 									/>
// 								</div>
// 								<div className='flex h-5 items-center'>
// 									<div className='flex min-w-44 items-start justify-start'>
// 										<div className='flex items-center justify-center gap-0.5'>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
// 												Văn bằng/Chứng chỉ:
// 											</p>
// 											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
// 												*
// 											</p>
// 										</div>
// 									</div>
// 									<Input
// 										placeholder='Nhập văn bằng/chứng chỉ'
// 										className='h-10 w-[561px] bg-[#F0F3F6]'
// 										variant='filled'
// 										value={trainingProgramForm.certificate}
// 										onChange={(e) => handleTrainingProgramChange('certificate', e.target.value)}
// 									/>
// 								</div>
// 								<div className='flex items-center gap-0.5'>
// 									<div className="font-['Source Sans Pro'] w-44 text-base font-bold tracking-tight text-[#373839]">
// 										Tệp đính kèm:
// 									</div>
// 									<div className='flex items-center gap-2'>
// 										<Input
// 											prefix={<PaperClip />}
// 											placeholder='Tìm kiếm'
// 											className='h-10 w-[336px] bg-[#F0F3F6]'
// 											variant='filled'
// 											value={trainingProgramForm.attachment}
// 											onChange={(e) => handleTrainingProgramChange('attachment', e.target.value)}
// 										/>
// 										<Button>Chọn tệp tải lên...</Button>
// 									</div>
// 								</div>
// 							</div>

// 							<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
// 							<div className='space-y-3'>
// 								<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
// 									Danh sách môn học
// 								</p>
// 								<div className='space-y-4'>
// 									{showSelect && (
// 										<Select
// 											placeholder='Lựa chọn'
// 											style={{ width: '100%' }}
// 											onChange={(value) =>
// 												handleTrainingProgramChange('subjects', [
// 													...trainingProgramForm.subjects,
// 													value,
// 												])
// 											}
// 											className='mt-2'
// 											options={subjects}
// 										/>
// 									)}
// 									{trainingProgramForm.subjects.length > 0 && (
// 										<div className='grid grid-cols-3 gap-4'>
// 											{trainingProgramForm.subjects.map((sub) => (
// 												<div className='flex items-center gap-1'>
// 													<div
// 														onClick={() =>
// 															handleTrainingProgramChange(
// 																'subjects',
// 																trainingProgramForm.subjects.filter((s) => s !== sub),
// 															)
// 														}
// 														className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
// 													>
// 														<Minus />
// 													</div>
// 													<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
// 														{sub}
// 													</div>
// 												</div>
// 											))}
// 										</div>
// 									)}
// 									<div className='flex cursor-pointer gap-2' onClick={() => setShowSelect(true)}>
// 										<div className='inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'>
// 											<Plus />
// 										</div>
// 										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#0a7feb]">
// 											Thêm môn học
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</Modal>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default EditInstructor;
import React, { FC, useState } from 'react';
import {
	Button,
	ConfigProvider,
	Input,
	Popconfirm,
	Table,
	TableProps,
	Select,
	DatePicker,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Camera, Minus, Plus, UserAvatar, Trash } from '../../../components/icon';
import dayjs from 'dayjs';
import { instructorData } from '../../../types/leadership/instructor';
import WorkProcess from './components/WorkProcess';
import TrainingProgram from './components/TrainingProgram';

// Interfaces
interface InstructorData {
	instructorCode: string;
	department: string;
	teachingSubject: string;
	fullName: string;
	dateOfBirth: string;
	placeOfBirth: string;
	ethnicity: string;
	dateOfEntry: string;
	nationality: string;
	religion: string;
	status: string;
	secondarySubject: string[];
	alias: string;
	province: string;
	ward: string;
	district: string;
	address: string;
	email: string;
	phoneNumber: string;
	gender: string;
	unionEntryDate: string;
	partyEntryDate: string;
	familyInfo: FamilyInfo[];
	idCardNumber?: string;
	unionEntryPlace?: string;
	partyEntryPlace?: string;
}

interface FamilyInfo {
	id: string;
	contactName: string;
	address: string;
	phoneNumber: string;
}

interface EditInstructorProps {
	onEditInstructor: (data: instructorData) => void;
	onCancel: () => void;
	instructorData: instructorData;
}

// Options
const departmentOptions = [
	{ value: 'Toán - Lý - Hóa', label: 'Toán - Lý - Hóa' },
	{ value: 'Văn - Anh - Anh', label: 'Văn - Anh - Anh' },
	{ value: 'Toán -Hóa - Sinh', label: 'Toán -Hóa - Sinh' },
];

const teachingSubjectOptions = [
	{ value: 'Toán', label: 'Toán' },
	{ value: 'Văn', label: 'Văn' },
	{ value: 'Anh', label: 'Anh' },
];

const genderOptions = [
	{ value: 'Nam', label: 'Nam' },
	{ value: 'Nữ', label: 'Nữ' },
	{ value: 'Khac', label: 'Khác' },
];

const nationalityOptions = [
	{ value: 'Việt Nam', label: 'Việt Nam' },
	{ value: 'Mỹ', label: 'Mỹ' },
	{ value: 'Nhật Bản', label: 'Nhật Bản' },
];

const religionOptions = [
	{ value: 'Phật giáo', label: 'Phật giáo' },
	{ value: 'Thiên Chúa giáo', label: 'Thiên Chúa giáo' },
	{ value: 'Khong', label: 'Không' },
];

const statusOptions = [
	{ value: 'Đang làm việc', label: 'Đang làm việc' },
	{ value: 'Nghỉ hưu', label: 'Nghỉ hưu' },
	{ value: 'Tạm nghỉ', label: 'Tạm nghỉ' },
];

const provinceOptions = [
	{ value: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
	{ value: 'Hà Nội', label: 'Hà Nội' },
	{ value: 'Đà Nẵng', label: 'Đà Nẵng' },
];

const districtOptions = [
	{ value: 'Quận 1', label: 'Quận 1' },
	{ value: 'Quận 3', label: 'Quận 3' },
	{ value: 'Quận 7', label: 'Quận 7' },
];

const wardOptions = [
	{ value: 'Phường 1', label: 'Phường 1' },
	{ value: 'Phường 2', label: 'Phường 2' },
	{ value: 'Phường 3', label: 'Phường 3' },
];

const subjects = [
	{ value: 'Toán học', label: 'Toán học' },
	{ value: 'Vật lý', label: 'Vật lý' },
	{ value: 'Hóa học', label: 'Hóa học' },
	{ value: 'Sinh học', label: 'Sinh học' },
	{ value: 'Lịch sử', label: 'Lịch sử' },
	{ value: 'Anh văn', label: 'Anh văn' },
	{ value: 'Ngữ văn', label: 'Ngữ văn' },
	{ value: 'Địa lý', label: 'Địa lý' },
	{ value: 'Tin học', label: 'Tin học' },
	{ value: 'Giáo dục công dân', label: 'Giáo dục công dân' },
];

const EditInstructor: FC<EditInstructorProps> = ({
	onEditInstructor,
	onCancel,
	instructorData,
}) => {
	const [data, setData] = useState<instructorData>(instructorData);
	const [isActive, setIsActive] = useState('general');
	const [isEditing, setIsEditing] = useState(false);
	const [showSelect, setShowSelect] = useState(false);

	const toggleEdit = () => setIsEditing((prev) => !prev);

	const handleChange = (field: keyof InstructorData, value: string | FamilyInfo[]) => {
		if (isEditing) {
			setData((prev) => ({
				...prev,
				[field]: value,
			}));
		}
	};

	const familyColumns: TableProps<FamilyInfo>['columns'] = [
		{
			title: 'Nguồn liên hệ',
			dataIndex: 'contactName',
			key: 'contactName',
			width: 200,
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) => {
						if (isEditing) {
							const newFamilyInfo = [...data.familyInfo];
							const index = newFamilyInfo.findIndex((item) => item.id === record.id);
							if (index > -1) {
								newFamilyInfo[index].contactName = e.target.value;
								handleChange('familyInfo', newFamilyInfo);
							}
						}
					}}
					className='rounded-lg border px-2 py-1'
					disabled={!isEditing}
				/>
			),
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
			key: 'address',
			width: 400,
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) => {
						if (isEditing) {
							const newFamilyInfo = [...data.familyInfo];
							const index = newFamilyInfo.findIndex((item) => item.id === record.id);
							if (index > -1) {
								newFamilyInfo[index].address = e.target.value;
								handleChange('familyInfo', newFamilyInfo);
							}
						}
					}}
					className='rounded-lg border px-2 py-1'
					disabled={!isEditing}
				/>
			),
		},
		{
			title: 'SĐT',
			dataIndex: 'phoneNumber',
			width: 200,
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) => {
						if (isEditing) {
							const newFamilyInfo = [...data.familyInfo];
							const index = newFamilyInfo.findIndex((item) => item.id === record.id);
							if (index > -1) {
								newFamilyInfo[index].phoneNumber = e.target.value;
								handleChange('familyInfo', newFamilyInfo);
							}
						}
					}}
					className='rounded-lg border px-2 py-1'
					disabled={!isEditing}
				/>
			),
		},
		{
			title: '',
			key: 'action',
			width: 100,
			render: (_, record) => (
				<Popconfirm
					title='Bạn có chắc chắn muốn xóa?'
					onConfirm={() => handleDeleteFamily(record.id)}
					okText='Có'
					cancelText='Không'
				>
					<Button
						type='text'
						icon={<DeleteOutlined />}
						className='text-red-500 hover:text-red-700'
						disabled={!isEditing}
					/>
				</Popconfirm>
			),
		},
	];

	const handleAddFamily = () => {
		if (!isEditing) return;
		const newFamilyInfo: FamilyInfo = {
			id: (data.familyInfo.length + 1).toString(),
			contactName: '',
			address: '',
			phoneNumber: '',
		};
		handleChange('familyInfo', [...data.familyInfo, newFamilyInfo]);
	};

	const handleDeleteFamily = (id: string) => {
		if (!isEditing) return;
		const newFamilyInfo = data.familyInfo.filter((item) => item.id !== id);
		handleChange('familyInfo', newFamilyInfo);
	};

	const addSubject = (value: string) => {
		if (!isEditing || data.secondarySubject.includes(value)) return;
		setData({ ...data, secondarySubject: [...data.secondarySubject, value] });
		setShowSelect(false);
	};

	const removeSubject = (subject: string) => {
		if (!isEditing) return;
		setData({
			...data,
			secondarySubject: data.secondarySubject.filter((sub) => sub !== subject),
		});
	};

	const handleSave = () => {
		if (!isEditing) return;
		onEditInstructor(data);
		setIsEditing(false);
	};

	return (
		<div>
			<div className='flex items-center justify-between py-6'>
				<div className='flex items-center gap-2'>
					<Button
						size='middle'
						onClick={() => setIsActive('general')}
						shape='round'
						className={`${isActive === 'general' ? 'bg-black text-white' : 'bg-white text-black'}`}
					>
						<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
							Thông tin chung
						</div>
					</Button>
					<Button
						size='middle'
						onClick={() => setIsActive('process')}
						shape='round'
						className={`${isActive === 'process' ? 'bg-black text-white' : 'bg-white text-black'}`}
					>
						<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
							Quá trình công tác
						</div>
					</Button>
				</div>
				{isActive === 'general' && (
					<div className='flex items-center gap-2'>
						<Trash />
						<div className='h-12 w-[1px] bg-[#c8c4c0]' />
						<Button className='h-[52px]' size='middle'>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-primary">
								Xuất file
							</div>
						</Button>
						<Button
							className='h-[52px]'
							type='primary'
							icon={<Plus />}
							size='middle'
							onClick={toggleEdit}
						>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
								{isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
							</div>
						</Button>
					</div>
				)}
			</div>

			{isActive === 'general' ? (
				<>
					<div className='w-[1640px] bg-white shadow-md'>
						<div className='inline-flex h-14 w-[1640px] items-center justify-start overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-[#cc5c00] pb-4 pl-[63px] pr-[1430px] pt-[17px]'>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
								Thông tin chung
							</div>
						</div>
						<div className='flex gap-10 px-16 pt-10'>
							<div>
								<div className='relative'>
									<div className='flex h-[220px] w-[220px] items-end justify-center overflow-hidden rounded-full bg-[#EFEFEF]'>
										<UserAvatar />
										<div className='absolute -bottom-8'>
											<button disabled={!isEditing}>
												<Camera />
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className='pb-10'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
									Thông tin giảng viên
								</div>
								<div className='flex items-start gap-16'>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Mã giảng viên:
											</p>
											<Input
												value={data.instructorCode}
												onChange={(e) => handleChange('instructorCode', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Tổ - Bộ môn:
											</p>
											<Select
												value={data.department}
												onChange={(value) => handleChange('department', value)}
												options={departmentOptions}
												className='h-10 w-[196px]'
												placeholder='Chọn tổ - bộ môn'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Môn giảng dạy:
											</p>
											<Select
												value={data.teachingSubject}
												onChange={(value) => handleChange('teachingSubject', value)}
												options={teachingSubjectOptions}
												className='h-10 w-[196px]'
												placeholder='Chọn môn giảng dạy'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Họ và Tên:
											</p>
											<Input
												value={data.fullName}
												onChange={(e) => handleChange('fullName', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Ngày sinh:
											</p>
											<DatePicker
												value={data.dateOfBirth ? dayjs(data.dateOfBirth, 'DD/MM/YYYY') : null}
												onChange={(date) =>
													handleChange('dateOfBirth', date ? date.format('DD/MM/YYYY') : '')
												}
												format='DD/MM/YYYY'
												className='h-10 w-[196px]'
												placeholder='Chọn ngày sinh'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Giới tính:
											</p>
											<Select
												value={data.gender}
												onChange={(value) => handleChange('gender', value)}
												options={genderOptions}
												className='h-10 w-[196px]'
												placeholder='Chọn giới tính'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Dân tộc:
											</p>
											<Input
												value={data.ethnicity}
												onChange={(e) => handleChange('ethnicity', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Ngày vào trường:
											</p>
											<DatePicker
												value={data.dateOfEntry ? dayjs(data.dateOfEntry, 'DD/MM/YYYY') : null}
												onChange={(date) =>
													handleChange('dateOfEntry', date ? date.format('DD/MM/YYYY') : '')
												}
												format='DD/MM/YYYY'
												className='h-10 w-[196px]'
												placeholder='Chọn ngày vào trường'
												disabled={!isEditing}
											/>
										</div>
									</div>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Quốc tịch:
											</p>
											<Select
												value={data.nationality}
												onChange={(value) => handleChange('nationality', value)}
												options={nationalityOptions}
												className='h-10 w-[196px]'
												placeholder='Chọn quốc tịch'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Tôn giáo:
											</p>
											<Select
												value={data.religion}
												onChange={(value) => handleChange('religion', value)}
												options={religionOptions}
												className='h-10 w-[196px]'
												placeholder='Chọn tôn giáo'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Trạng thái:
											</p>
											<Select
												value={data.status}
												onChange={(value) => handleChange('status', value)}
												options={statusOptions}
												className='h-10 w-[196px]'
												placeholder='Chọn trạng thái'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Môn kiêm nhiệm:
											</p>
											<div className='space-2'>
												{data.secondarySubject.length > 0 && (
													<div className='flex flex-wrap gap-4'>
														{data.secondarySubject.map((sub) => (
															<div className='inline-flex h-8 items-center justify-center gap-1.5 rounded-2xl bg-[#0B80EC] px-3 py-[5px]'>
																<div className="justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-white">
																	{sub}
																</div>
																<div
																	onClick={() => removeSubject(sub)}
																	className='cursor-pointer rounded-full bg-white'
																>
																	<Minus color='#2EACEE' />
																</div>
															</div>
														))}
													</div>
												)}
												{showSelect && (
													<Select
														placeholder='Chọn môn học'
														style={{ width: '100%' }}
														onChange={addSubject}
														className='mt-2'
														options={subjects}
														disabled={!isEditing}
													/>
												)}
												<div
													onClick={() => setShowSelect(true)}
													className='mt-2 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-stone-300 py-[5px] pl-2.5 pr-1'
												>
													<div className="justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-white">
														Thêm
													</div>
													<div className='relative h-6 w-6 overflow-hidden'>
														<Plus />
													</div>
												</div>
											</div>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Bí danh:
											</p>
											<Input
												value={data.alias}
												onChange={(e) => handleChange('alias', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
									</div>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Tỉnh/ Thành:
											</p>
											<Select
												value={data.province}
												onChange={(value) => handleChange('province', value)}
												options={provinceOptions}
												className='h-10 w-[196px]'
												placeholder='Chọn tỉnh/thành'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Xã/ Phường:
											</p>
											<Select
												value={data.ward}
												onChange={(value) => handleChange('ward', value)}
												options={wardOptions}
												className='h-10 w-[196px]'
												placeholder='Chọn xã/phường'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Quận/ Huyện:
											</p>
											<Select
												value={data.district}
												onChange={(value) => handleChange('district', value)}
												options={districtOptions}
												className='h-10 w-[196px]'
												placeholder='Chọn quận/huyện'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Địa chỉ:
											</p>
											<Input
												value={data.address}
												onChange={(e) => handleChange('address', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Email:
											</p>
											<Input
												value={data.email}
												onChange={(e) => handleChange('email', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												SĐT:
											</p>
											<Input
												value={data.phoneNumber}
												onChange={(e) => handleChange('phoneNumber', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='h-4 w-[1640px] bg-[#f2f2f2] shadow-[inset_0px_4px_8px_0px_rgba(154,202,245,0.15)]' />

					<div className='w-[1640px] bg-white pt-2'>
						<div className='flex gap-28 px-16 py-10'>
							<div className='w-[220px]'></div>
							<div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
									Thông tin cá nhân
								</div>
								<div className='flex items-center gap-20'>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												CMND/CCCD:
											</p>
											<Input
												value={data.idCardNumber}
												onChange={(e) => handleChange('idCardNumber', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Dân tộc:
											</p>
											<Input
												value={data.ethnicity}
												onChange={(e) => handleChange('ethnicity', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Ngày vào trường:
											</p>
											<DatePicker
												value={data.dateOfEntry ? dayjs(data.dateOfEntry, 'DD/MM/YYYY') : null}
												onChange={(date) =>
													handleChange('dateOfEntry', date ? date.format('DD/MM/YYYY') : '')
												}
												format='DD/MM/YYYY'
												className='h-10 w-[196px]'
												placeholder='Chọn ngày vào trường'
												disabled={!isEditing}
											/>
										</div>
									</div>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Ngày vào Đoàn:
											</p>
											<DatePicker
												value={
													data.unionEntryDate ? dayjs(data.unionEntryDate, 'DD/MM/YYYY') : null
												}
												onChange={(date) =>
													handleChange('unionEntryDate', date ? date.format('DD/MM/YYYY') : '')
												}
												format='DD/MM/YYYY'
												className='h-10 w-[196px]'
												placeholder='Chọn ngày vào Đoàn'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Nơi vào đoàn:
											</p>
											<Input
												value={data.unionEntryPlace}
												onChange={(e) => handleChange('unionEntryPlace', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
									</div>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Ngày vào Đảng:
											</p>
											<DatePicker
												value={
													data.partyEntryDate ? dayjs(data.partyEntryDate, 'DD/MM/YYYY') : null
												}
												onChange={(date) =>
													handleChange('partyEntryDate', date ? date.format('DD/MM/YYYY') : '')
												}
												format='DD/MM/YYYY'
												className='h-10 w-[196px]'
												placeholder='Chọn ngày vào Đảng'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[40px]'>
											<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Nơi vào đảng:
											</p>
											<Input
												value={data.partyEntryPlace}
												onChange={(e) => handleChange('partyEntryPlace', e.target.value)}
												className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='h-4 w-[1640px] bg-[#f2f2f2] shadow-[inset_0px_4px_8px_0px_rgba(154,202,245,0.15)]' />

					<div className='w-[1640px] bg-white shadow-md'>
						<div className='p-16'>
							<div className="font-['Source Sans Pro'] mb-4 text-base font-bold tracking-tight text-[#cc5c00]">
								Thông tin gia đình
							</div>
							<div className='mb-4 flex justify-end'>
								<Button
									onClick={handleAddFamily}
									type='primary'
									className='border-none bg-[#cc5c00] font-bold text-white hover:bg-[#b35000]'
									disabled={!isEditing}
								>
									+ Thêm
								</Button>
							</div>
							<ConfigProvider
								theme={{
									components: {
										Table: {
											headerBg: '#373839',
											headerColor: '#ffffff',
										},
									},
								}}
							>
								<Table<FamilyInfo>
									dataSource={data.familyInfo}
									columns={familyColumns}
									pagination={false}
									rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
								/>
							</ConfigProvider>
						</div>
					</div>

					<div className='flex items-center justify-center py-6'>
						<div className='flex items-center gap-4'>
							<Button onClick={onCancel} className='w-[146px]'>
								Hủy
							</Button>
							<Button
								onClick={handleSave}
								type='primary'
								className='w-[146px]'
								disabled={!isEditing}
							>
								Lưu
							</Button>
						</div>
					</div>
				</>
			) : (
				<div>
					<WorkProcess instructorId={data.id} fullName={data.fullName} />
					<TrainingProgram instructorId={data.id} fullName={data.fullName} />
				</div>
			)}
		</div>
	);
};

export default EditInstructor;
