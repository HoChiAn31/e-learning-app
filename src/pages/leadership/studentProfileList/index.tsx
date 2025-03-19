import {
	Button,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Modal,
	Select,
	Space,
	Table,
	TableColumnsType,
	TableProps,
	Upload,
} from 'antd';
import {
	ArrowRight,
	Dowload,
	Eyes,
	PaperClip,
	Plus,
	Search,
	Trash,
	Update,
} from '../../../components/icon';
import { Key, useEffect, useState } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import InforStudent from './InforStudent';
import { Leadership_Student, Leadership_Student_Add_Edit } from '../../../types/leadership/student';
import {
	addStudent,
	getStudents,
	updateStudent,
} from '../../../firebase/studentProfileList/fetchStudent';
import moment from 'moment';
import ProfileFilterButtons from '../../../components/ProfileFilterButtons';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import {
	addStudentReward,
	getStudentReward,
} from '../../../firebase/studentProfileList/fetchStudentReward';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const StudentProfileListPage = () => {
	const [isActive, setIsActive] = useState<string>('all');
	const [isModalFile, setIsModalFile] = useState<boolean>(false);
	const [isAddStudent, setIsAddStudent] = useState<boolean>(false);
	const [isAddStudentReward, setIsAddStudentReward] = useState<boolean>(false);
	const [isEditStudent, setIsEditStudent] = useState<boolean>(false);
	const [isInforStudent, setIsInforStudent] = useState<boolean>(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
	const [dataStudentProfileList, setDataStudentProfileList] = useState<Leadership_Student[]>([]);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [selectedStudent, setSelectedStudent] = useState<Leadership_Student | undefined>(undefined);

	// State để quản lý dữ liệu trong Modal "Cập nhật khen thưởng"
	const [rewardData, setRewardData] = useState({
		name: 'Nguyễn Văn A',
		class: '10A',
		date: moment('2020-10-20', 'YYYY-MM-DD'),
		description: 'Lorem ipsum dolor sit amet...',
		file: null,
	});

	const fetchStudentProfileList = async () => {
		try {
			const data = await getStudents();
			setDataStudentProfileList(data);
		} catch (error) {
			console.error('Error fetching student profile list:', error);
		}
	};
	const fetchStudentRewardList = async () => {
		const data = await getStudentReward();
		console.log('Data StudentRewardList:', data);
		if (data.length > 0) {
			const filterStudent = data
				.filter((student) => dataStudentProfileList.some((s) => s.id === student.idStudent))
				.map((reward) => {
					// Tìm student tương ứng với reward
					const student = dataStudentProfileList.find((s) => s.id === reward.idStudent);

					return {
						reward: reward,
						student: student || null, // Tránh undefined nếu không tìm thấy
					};
				});

			console.log(filterStudent);
		}
	};

	useEffect(() => {
		fetchStudentProfileList();
		fetchStudentRewardList();
	}, []);

	const handleOpenIsAdd = () => {
		if (isActive === 'all') {
			setIsAddStudent(true);
		} else if (isActive === 'reward') {
			setIsAddStudentReward(true);
		}
	};

	const handleIsAddStudent = async (data: Leadership_Student_Add_Edit) => {
		console.log('Add academic year:', data);
		try {
			await addStudent(data);
			setIsAddStudent(false);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleIsEditStudent = async (data: Leadership_Student) => {
		try {
			const formattedBirthDate = data.birthDate
				? moment(data.birthDate).format('YYYY-MM-DD')
				: null;
			const formattedEnrollmentDate = data.enrollmentDate
				? moment(data.enrollmentDate).format('YYYY-MM-DD')
				: null;
			await updateStudent(data.id, {
				fullName: data.fullName,
				gender: data.gender,
				birthDate: formattedBirthDate,
				birthPlace: data.birthPlace,
				ethnicity: data.ethnicity,
				religion: data.religion,
				schoolYear: data.schoolYear,
				gradeLevel: data.gradeLevel,
				className: data.className,
				studentId: data.studentId,
				enrollmentDate: formattedEnrollmentDate,
				admissionType: data.admissionType,
				status: data.status,
				province: data.province,
				district: data.district,
				ward: data.ward,
				address: data.address,
				email: data.email,
				phone: data.phone,
				fatherName: data.fatherName,
				motherName: data.motherName,
				guardianName: data.guardianName,
				fatherBirthYear: data.fatherBirthYear,
				motherBirthYear: data.motherBirthYear,
				guardianBirthYear: data.guardianBirthYear,
				fatherOccupation: data.fatherOccupation,
				motherOccupation: data.motherOccupation,
				guardianOccupation: data.guardianOccupation,
				fatherPhone: data.fatherPhone,
				motherPhone: data.motherPhone,
				guardianPhone: data.guardianPhone,
			});
			await fetchStudentProfileList();
			setIsEditStudent(false);
		} catch (error) {
			console.error('Lỗi:', error);
		}
	};

	const handleIsInforStudent = () => {
		setIsInforStudent(!isInforStudent);
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection: TableRowSelection<Leadership_Student> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const handleChangeSelect = (value: string) => {
		console.log(`selected ${value}`);
	};

	const onChange: TableProps<Leadership_Student>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const handleInforStudent = (record: Leadership_Student) => {
		console.log('Edit academic year:', record);
		setIsInforStudent(!isInforStudent);
		setSelectedStudent(record);
	};

	const handleEditStudent = (record: Leadership_Student) => {
		console.log('Edit academic year:', record);
		setIsEditStudent(!isEditStudent);
		setIsInforStudent(!isInforStudent);
		setIsEdit(true);
		setSelectedStudent(record);
	};

	const handleDelete = (record: Leadership_Student) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.id);
	};

	const columns: TableColumnsType<Leadership_Student> = [
		{
			title: 'Mã học viên',
			dataIndex: 'studentId',
			sorter: (a, b) => a.studentId.localeCompare(b.studentId),
			width: '15%',
		},
		{
			title: 'Tên học viên',
			dataIndex: 'fullName',
			sorter: (a, b) => a.fullName.localeCompare(b.fullName),
			width: '20%',
		},
		{
			title: 'Ngày sinh',
			dataIndex: 'birthDate',
			sorter: (a, b) => a.birthDate.localeCompare(b.birthDate),
			width: '10%',
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
			sorter: (a, b) => a.gender.localeCompare(b.gender),
			width: '10%',
		},
		{
			title: 'Dân tộc',
			dataIndex: 'ethnicity',
			sorter: (a, b) => a.ethnicity.localeCompare(b.ethnicity),
			width: '10%',
		},
		{
			title: 'Lớp',
			dataIndex: 'gradeLevel',
			sorter: (a, b) => a.gradeLevel.localeCompare(b.gradeLevel),
			width: '15%',
		},
		{
			title: 'Tình trạng',
			dataIndex: 'status',
			sorter: (a, b) => a.status.localeCompare(b.status),
			width: '15%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className='flex'>
					<Button type='link' onClick={() => handleInforStudent(record)}>
						<Eyes color='#ff7506' />
					</Button>
					<Button type='link' onClick={() => handleEditStudent(record)}>
						<Update />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '30%',
		},
	];

	const handleOkFile = () => {
		setIsModalFile(false);
	};

	const handleCancelFile = () => {
		setIsModalFile(false);
	};

	// Xử lý Modal "Cập nhật khen thưởng" không dùng Form
	const handleOkAddStudentReward = async () => {
		console.log('Dữ liệu khen thưởng:', rewardData);
		// Thêm logic lưu dữ liệu tại đây (ví dụ: gọi API)

		const idStudent = dataStudentProfileList
			.filter((student) => student.fullName === rewardData.name)
			.map((student) => {
				return {
					id: student.id,
				};
			});
		const date = rewardData.date ? moment(rewardData.date).format('YYYY-MM-DD') : null;
		const data = {
			...(idStudent.length > 0 && { idStudent: idStudent[0].id }),
			name: rewardData.name,
			class: rewardData.class,
			date,
			description: rewardData.description,
			file: null,
		};
		console.log('ID học viên:', data);

		try {
			await addStudentReward(data);
			setIsAddStudentReward(false);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleCancelAddStudentReward = () => {
		setIsAddStudentReward(false);

		setRewardData({
			name: 'Nguyễn Văn A',
			class: '10A',
			date: moment('2020-10-20', 'YYYY-MM-DD'),
			description: 'Lorem ipsum dolor sit amet...',
			file: null,
		});
	};

	const handleRewardInputChange = (field: string, value: any) => {
		setRewardData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const modalStyles = {
		header: {
			textAlign: 'center' as 'center',
		},
		footer: {
			textAlign: 'center' as 'center',
		},
	};

	const handleCancelAddStudent = () => {
		setIsAddStudent(false);
	};

	const handleCancelEditStudent = () => {
		setIsEditStudent(false);
	};

	const uploadProps = {
		name: 'file',
		action:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
		onChange(info: any) {
			if (info.file.status === 'done') {
				console.log(`${info.file.name} uploaded successfully`);
				setRewardData((prev) => ({ ...prev, file: info.file }));
			} else if (info.file.status === 'error') {
				console.log(`${info.file.name} upload failed.`);
			}
		},
	};
	return (
		<div>
			{/* title */}
			{isAddStudent ? (
				<div className='inline-flex h-[60px] items-center justify-center'>
					<div className='inline-flex items-center justify-start gap-2 px-2.5'>
						<div
							className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
							onClick={() => setIsAddStudent(false)}
						>
							Hồ sơ học viên
						</div>
						<div data-svg-wrapper className='relative'>
							<ArrowRight />
						</div>
						<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
							Thêm học viên
						</div>
					</div>
				</div>
			) : isEdit ? (
				<div className='inline-flex h-[60px] items-center justify-center'>
					<div className='inline-flex items-center justify-start gap-2 px-2.5'>
						<div
							className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
							onClick={() => {
								setIsEdit(false);
								setIsInforStudent(false);
							}}
						>
							Hồ sơ học viên
						</div>
						<div data-svg-wrapper className='relative'>
							<ArrowRight />
						</div>
						<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
							Chỉnh sửa thông tin học viên
						</div>
					</div>
				</div>
			) : isInforStudent ? (
				<div className='inline-flex h-[60px] items-center justify-center'>
					<div className='inline-flex items-center justify-start gap-2 px-2.5'>
						<div
							className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
							onClick={() => setIsInforStudent(false)}
						>
							Hồ sơ học viên
						</div>
						<div data-svg-wrapper className='relative'>
							<ArrowRight />
						</div>
						<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
							Thông tin học viên
						</div>
					</div>
				</div>
			) : (
				<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
					Hồ sơ học viên
				</div>
			)}
			{/* header */}

			{isAddStudent ? (
				<AddStudent onAddStudent={handleIsAddStudent} onCancel={handleCancelAddStudent} />
			) : // :
			//  isEditStudent ? (
			// 	<EditStudent
			// 		studentData={selectedStudent}
			// 		onUpdateStudent={handleIsEditStudent}
			// 		onCancel={handleCancelEditStudent}
			// 	/>
			// )
			isInforStudent ? (
				<InforStudent
					studentData={selectedStudent}
					onInforStudent={handleIsInforStudent}
					onUpdateStudent={handleIsEditStudent}
					onCancel={handleCancelEditStudent}
					isEdit={isEdit}
				/>
			) : (
				<>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div>
								<Select
									defaultValue='2025'
									style={{ width: 120 }}
									onChange={handleChangeSelect}
									options={[
										{ value: '2025', label: '2025' },
										{ value: '2026', label: '2026' },
										{ value: '2028', label: '2028' },
										{ value: '2029', label: '2029' },
										{ value: '2030', label: '2030' },
										{ value: '2031', label: '2031' },
									]}
								/>

								<Select
									defaultValue='2026'
									style={{ width: 120 }}
									onChange={handleChangeSelect}
									options={[
										{ value: '2026', label: '2026' },
										{ value: '2028', label: '2028' },
										{ value: '2029', label: '2029' },
										{ value: '2030', label: '2030' },
										{ value: '2031', label: '2031' },
									]}
								/>
							</div>
							<ProfileFilterButtons setIsActive={setIsActive} active={isActive} />
						</div>
						<div className='flex items-center gap-2'>
							<Trash />
							<div className='h-12 w-[1px] bg-[#c8c4c0]' />
							<Button
								className='h-[52px]'
								// type='primary'
								// icon={<Plus />}
								size='middle'
								onClick={() => setIsModalFile(true)}
								// variant='outlined'
							>
								<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-primary">
									Xuất file
								</div>
							</Button>
							<Button
								className='h-[52px]'
								type='primary'
								icon={<Plus />}
								size='middle'
								onClick={handleOpenIsAdd}
							>
								<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
									Thêm mới
								</div>
							</Button>
						</div>
					</div>
					{/* table listProfile */}
					{isActive === 'all' && (
						<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
							<div className='flex items-center justify-between'>
								<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
									Lớp học
								</div>
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
									<Table<Leadership_Student>
										rowSelection={rowSelection}
										columns={columns}
										dataSource={dataStudentProfileList}
										onChange={onChange}
										rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
										pagination={{
											position: ['bottomRight'],
											showSizeChanger: true,
											pageSizeOptions: ['5', '10', '20', '50'],
											defaultPageSize: 5,
										}}
									/>
								</ConfigProvider>
							</div>
						</div>
					)}
					{/* table list reward */}
					{isActive === 'reward' && (
						<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
							<div className='flex items-center justify-between'>
								<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
									Danh sách khen thưởng của học viên
								</div>
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
									<Table<Leadership_Student>
										rowSelection={rowSelection}
										columns={columns}
										dataSource={dataStudentProfileList}
										onChange={onChange}
										rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
										pagination={{
											position: ['bottomRight'],
											showSizeChanger: true,
											pageSizeOptions: ['5', '10', '20', '50'],
											defaultPageSize: 5,
										}}
									/>
								</ConfigProvider>
							</div>
						</div>
					)}

					<ConfigProvider
						theme={{
							components: {
								Modal: {
									titleFontSize: 28,
								},
							},
						}}
					>
						<Modal
							title='Cập nhật khen thưởng'
							open={isAddStudentReward}
							onOk={handleOkAddStudentReward}
							onCancel={handleCancelAddStudentReward}
							width={800}
							styles={modalStyles}
							footer={[
								<Button className='w-40' key='back' onClick={handleCancelAddStudentReward}>
									Hủy
								</Button>,
								<Button
									className='w-40'
									key='submit'
									type='primary'
									onClick={handleOkAddStudentReward}
								>
									Lưu
								</Button>,
							]}
						>
							<div className='space-y-4 pb-10'>
								{/* Trường Học viên */}
								<div>
									<label>
										<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Học viên
										</span>
									</label>
									<Input
										value={rewardData.name}
										onChange={(e) => handleRewardInputChange('name', e.target.value)}
										placeholder='Nhập thông tin học viên'
										className='h-10 bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>

								{/* Trường Lớp hiện tại */}
								<div>
									<label>
										<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Lớp hiện tại
										</span>
									</label>
									<Input
										value={rewardData.class}
										onChange={(e) => handleRewardInputChange('class', e.target.value)}
										placeholder='10A'
										className='h-10 bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>

								{/* Trường Ngày khen thưởng */}
								<div>
									<label>
										<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Ngày khen thưởng
										</span>
									</label>
									<DatePicker
										value={rewardData.date}
										onChange={(date) => handleRewardInputChange('date', date)}
										style={{ width: '100%' }}
										format='DD/MM/YYYY'
										className='h-10 bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>

								{/* Trường Nội dung */}
								<div>
									<label>
										<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Nội dung
										</span>
									</label>
									<TextArea
										value={rewardData.description}
										onChange={(e) => handleRewardInputChange('content', e.target.value)}
										rows={4}
										placeholder=''
										className='bg-[#F0F3F6]'
									/>
								</div>

								{/* Trường Tệp đính kèm */}
								<div className='flex items-center gap-4'>
									<div className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Tệp đính kèm:
									</div>
									<div className='flex items-center gap-2'>
										<Input
											prefix={<PaperClip />}
											placeholder='Tìm kiếm'
											className='h-10 w-[336px] bg-[#F0F3F6]'
											variant='filled'
											disabled // Không cần nhập tay trong trường này
										/>
										<Upload {...uploadProps}>
											<Button icon={<UploadOutlined />}>Chọn tệp tải lên...</Button>
										</Upload>
									</div>
								</div>
							</div>
						</Modal>
					</ConfigProvider>

					{/* Modal File */}
					<ConfigProvider
						theme={{
							components: {
								Modal: {
									titleFontSize: 28,
								},
							},
						}}
					>
						<Modal
							title='Xuất file hồ sơ'
							open={isModalFile}
							onOk={handleOkFile}
							onCancel={handleCancelFile}
							width={800}
							styles={modalStyles}
							footer={[
								<Button className='w-40' key='back' onClick={handleCancelFile}>
									Hủy
								</Button>,
								<Button className='w-40' key='submit' type='primary' onClick={handleOkFile}>
									Lưu
								</Button>,
							]}
						>
							<div className='space-y-4 pb-10'>
								<div className='flex items-center gap-4'>
									<div className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Tệp đính kèm:
									</div>
									<div className='flex items-center gap-2'>
										<Input
											prefix={<PaperClip />}
											placeholder='Tìm kiếm'
											className='h-10 w-[336px] bg-[#F0F3F6]'
											variant='filled'
										/>
										<Button>Chọn tệp tải lên...</Button>
									</div>
								</div>
								<div className='flex items-center gap-4'>
									<div className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Tải file mẫu:
									</div>
									<div className='flex items-center gap-2'>
										<Dowload />

										<div className="font-['Source Sans Pro'] text-base font-normal italic text-[#373839]">
											[Tải xuống file mẫu]
										</div>
									</div>
								</div>
							</div>
						</Modal>
					</ConfigProvider>
				</>
			)}
		</div>
	);
};
export default StudentProfileListPage;
