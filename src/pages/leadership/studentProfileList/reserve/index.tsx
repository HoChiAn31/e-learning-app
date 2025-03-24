import {
	AutoComplete,
	Button,
	ConfigProvider,
	DatePicker,
	Input,
	Modal,
	Select,
	Table,
	TableColumnsType,
	TableProps,
} from 'antd';
import { ArrowRight, Eyes, PaperClip, Plus, Search } from '../../../../components/icon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import {
	Leadership_Student,
	Leadership_StudentReward,
	Leadership_Student_Reserve,
} from '../../../../types/leadership/student';
import { getStudents, updateStudent } from '../../../../firebase/studentProfileList/fetchStudent';
import moment from 'moment';
import {
	addStudentReward,
	getStudentReward,
} from '../../../../firebase/studentProfileList/fetchStudentReward';
import { addReservation } from '../../../../firebase/studentProfileList/fetchReservation';

interface ReservationData {
	currentClass: string; // Lớp hiện tại
	studentName: string; // Tên học viên
	reservationDate: string; // Ngày bảo lưu (Moment từ Ant Design hoặc có thể thay bằng Date)
	description: string; // Lý do bảo lưu
	attachedFile: File | null; // Tệp đính kèm
}

function StudentReservePage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Add Modal
	const [isModalList, setIsModalOpenList] = useState<boolean>(false); // List Modal
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false); // New Details Modal
	const [selectedReserve, setSelectedReserve] = useState<Leadership_Student_Reserve | null>(null); // Selected record
	const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
	const [dataStudent, setDataStudent] = useState<Leadership_Student[]>([]);
	const [dataStudentReserve, setDataStudentReserve] = useState<Leadership_StudentReward[]>([]);
	const [dataFilter, setDataFilter] = useState<Leadership_Student_Reserve[]>([]);
	const nav = useNavigate();

	const [reservationData, setReservationData] = useState<ReservationData>({
		currentClass: '',
		studentName: '',
		reservationDate: '',
		description: '',
		attachedFile: null,
	});

	const fetchStudentReserve = async () => {
		const data = await getStudentReward();
		console.log(data);
		setDataStudentReserve(data);
	};

	const fetchStudentProfileList = async () => {
		const data = await getStudents();
		setDataStudent(data);
	};

	useEffect(() => {
		fetchStudentProfileList();
		fetchStudentReserve();
	}, []);

	useEffect(() => {
		if (dataStudentReserve.length > 0) {
			const filteredReserve: Leadership_Student_Reserve[] = dataStudentReserve
				.filter((data) => dataStudent.some((student) => student.id === data.idStudent))
				.map((data) => {
					const matchedStudent = dataStudent.find((student) => student.id === data.idStudent)!;
					return {
						studentInfor: matchedStudent,
						studentReserve: data,
					};
				});
			setDataFilter(filteredReserve);
			console.log('Filtered Transfers:', filteredReserve);
		}
	}, [dataStudent, dataStudentReserve]);

	const handleViewDetails = (record: Leadership_Student_Reserve) => {
		setSelectedReserve(record);
		setIsDetailsModalOpen(true);
	};

	const handleDetailsModalClose = () => {
		setIsDetailsModalOpen(false);
		setSelectedReserve(null);
	};

	const handleOkList = () => {
		setIsModalOpenList(false);
	};

	const handleCancelList = () => {
		setIsModalOpenList(false);
	};

	const modalStyles = {
		header: { textAlign: 'center' as 'center' },
		footer: { textAlign: 'center' as 'center' },
	};

	const columns: TableColumnsType<Leadership_Student_Reserve> = [
		{
			title: 'Mã học viên',
			render: (_: any, record: Leadership_Student_Reserve) => record.studentInfor.studentId,
			sorter: (a, b) => a.studentInfor.studentId.localeCompare(b.studentInfor.studentId),
			width: '10%',
		},
		{
			title: 'Tên học viên',
			render: (_: any, record: Leadership_Student_Reserve) => record.studentReserve.name,
			sorter: (a, b) => a.studentReserve.name.localeCompare(b.studentReserve.name),
			width: '10%',
		},
		{
			title: 'Ngày sinh',
			render: (_: any, record: Leadership_Student_Reserve) => record.studentInfor.birthDate,
			sorter: (a, b) => a.studentInfor.birthDate.localeCompare(b.studentInfor.birthDate),
			width: '15%',
		},
		{
			title: 'Giới tính',
			render: (_: any, record: Leadership_Student_Reserve) => record.studentInfor.gender,
			sorter: (a, b) => a.studentInfor.gender.localeCompare(b.studentInfor.gender),
			width: '10%',
		},
		{
			title: 'Lớp bảo lưu',
			render: (_: any, record: Leadership_Student_Reserve) => record.studentReserve.class,
			sorter: (a, b) => a.studentReserve.class.localeCompare(b.studentReserve.class),
			width: '15%',
		},
		{
			title: 'Ngày bảo lưu',
			render: (_: any, record: Leadership_Student_Reserve) => record.studentReserve.date,
			width: '10%',
		},
		{
			title: 'Lý do',
			render: (_: any, record: Leadership_Student_Reserve) => record.studentReserve.description,
			width: '10%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className=''>
					<Button type='link' onClick={() => handleViewDetails(record)}>
						<Eyes color='#FF7506' />
					</Button>
				</div>
			),
			width: '20%',
		},
	];

	const onChange: TableProps<Leadership_Student_Reserve>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const handleSwitchStudentProfile = () => {
		localStorage.setItem('activeMainTab', '/studentProfileList');
		localStorage.setItem('activeSubTab', 'all');
		nav('/studentProfileList/all');
	};

	const handleSearch = (value: string) => {
		if (!value) {
			setOptions([]);
			return;
		}
		const dataOption = dataStudent.map((data) => data.fullName);
		setOptions(
			dataOption
				.filter((name) => name.toLowerCase().includes(value.toLowerCase()))
				.map((name) => ({ label: name, value: name })),
		);
	};

	const handleChange = (field: keyof ReservationData, value: any) => {
		setReservationData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file && file.size <= 250 * 1024 * 1024) {
			handleChange('attachedFile', file);
		} else {
			alert('Kích thước tệp không được vượt quá 250MB.');
		}
	};

	const handleOk = async () => {
		const requiredFields: (keyof ReservationData)[] = [
			'currentClass',
			'studentName',
			'reservationDate',
			'description',
		];

		if (!requiredFields.every((field) => reservationData[field])) {
			alert('Vui lòng điền đầy đủ các trường bắt buộc!');
			return;
		}

		const selectedStudent = dataStudent.find(
			(student) => student.fullName === reservationData.studentName,
		);

		if (!selectedStudent) {
			alert('Không tìm thấy sinh viên!');
			return;
		}

		const data = {
			idStudent: selectedStudent.id,
			name: reservationData.studentName,
			class: reservationData.currentClass,
			date: reservationData.reservationDate
				? moment(reservationData.reservationDate).format('YYYY-MM-DD')
				: null,
			description: reservationData.description,
			file: null,
		};

		console.log('Dữ liệu bảo lưu:', data);

		await updateStudent(selectedStudent.id, {
			...selectedStudent,
			status: 'Bảo lưu',
		});

		await addReservation(data);

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setReservationData({
			currentClass: '',
			studentName: '',
			reservationDate: '',
			description: '',
			attachedFile: null,
		});
		setIsModalOpen(false);
	};

	return (
		<div>
			<div className='inline-flex h-[60px] items-center justify-center'>
				<div className='inline-flex items-center justify-start gap-2 px-2.5'>
					<div
						className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
						onClick={handleSwitchStudentProfile}
					>
						Hồ sơ học viên
					</div>
					<div data-svg-wrapper className='relative'>
						<ArrowRight />
					</div>
					<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
						Hồ sơ bảo lưu
					</div>
				</div>
			</div>
			<div className='flex w-full items-end justify-end'>
				<Button
					className='py-5'
					type='primary'
					icon={<Plus />}
					size='middle'
					onClick={() => setIsModalOpen(true)}
				>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Thêm mới
					</div>
				</Button>
			</div>
			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
						Danh sách bảo lưu
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
						<Table<Leadership_Student_Reserve>
							columns={columns}
							dataSource={dataFilter}
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
			{/* Modal List */}
			<Modal
				title='Cập nhật bảo lưu'
				open={isModalList}
				onOk={handleOkList}
				onCancel={handleCancelList}
				styles={modalStyles}
				width={800}
				footer={[
					<Button className='w-40' key='back' onClick={handleCancelList}>
						Hủy
					</Button>,
					<Button className='w-40' key='submit' type='primary' onClick={handleOkList}>
						Lưu
					</Button>,
				]}
			>
				<div className='my-10 space-y-10'>
					<div className='flex h-5 items-center justify-between'>
						<div className='flex items-start justify-start'>
							<div className='flex items-center justify-center gap-0.5'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Lớp hiện tại:
								</div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</div>
							</div>
						</div>
						<Input
							placeholder='Lựa chọn'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
						/>
					</div>
					<div className='flex h-5 items-center justify-between'>
						<div className='flex items-start justify-start'>
							<div className='flex items-center justify-center gap-0.5'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tên học viên:
								</div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</div>
							</div>
						</div>
						<Input
							placeholder='Lựa chọn'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
						/>
					</div>
					<div className='flex h-5 items-center justify-between'>
						<div className='flex items-start justify-start'>
							<div className='flex items-center justify-center gap-0.5'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Ngày bảo lưu:
								</div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</div>
							</div>
						</div>
						<Input
							placeholder='Lựa chọn'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
						/>
					</div>
					<div className='flex h-5 items-center justify-between'>
						<div className='flex items-start justify-start'>
							<div className='flex items-center justify-center gap-0.5'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Lý do bảo lưu:
								</div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</div>
							</div>
						</div>
						<Input
							placeholder='Lựa chọn'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
						/>
					</div>
					<div className='flex h-5 items-center justify-between'>
						<div className='flex items-start justify-start'>
							<div className='flex items-center justify-center'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tệp đính kèm:
								</div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</div>
							</div>
						</div>
						<Input
							prefix={<PaperClip />}
							placeholder='Tìm kiếm'
							className='h-10 w-[336px] bg-[#F0F3F6]'
							variant='filled'
						/>
						<Button>Chọn tệp tải lên...</Button>
					</div>
				</div>
			</Modal>
			{/* Modal Add */}
			<Modal
				title='Cập nhật bảo lưu'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				styles={modalStyles}
				width={800}
				footer={[
					<Button className='w-40' key='back' onClick={handleCancel}>
						Hủy
					</Button>,
					<Button className='w-40' key='submit' type='primary' onClick={handleOk}>
						Lưu
					</Button>,
				]}
			>
				<div className='py-10'>
					<div className='space-y-10'>
						<div className='flex h-5 items-center justify-between'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Lớp hiện tại: <span className='text-[#ed2025]'>*</span>
							</div>
							<Select
								variant='filled'
								className='h-10 w-[561px]'
								placeholder='Chọn lớp'
								value={reservationData.currentClass}
								onChange={(value) => handleChange('currentClass', value)}
								options={[
									{ value: '10A1', label: '10A1' },
									{ value: '10A2', label: '10A2' },
									{ value: '10A3', label: '10A3' },
								]}
							/>
						</div>
						<div className='flex h-5 items-center justify-between'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Tên học viên: <span className='text-[#ed2025]'>*</span>
							</div>
							<AutoComplete
								options={options}
								onSelect={(value) => handleChange('studentName', value)}
								onSearch={handleSearch}
								value={reservationData.studentName}
								placeholder='Tìm kiếm...'
								className='w-[561px]'
								variant='filled'
							>
								<Input.Search
									value={reservationData.studentName}
									variant='filled'
									onChange={(value) => handleChange('studentName', value)}
								/>
							</AutoComplete>
						</div>
						<div className='flex h-5 items-center justify-between'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Ngày bảo lưu: <span className='text-[#ed2025]'>*</span>
							</div>
							<DatePicker
								value={reservationData.reservationDate}
								onChange={(date) => handleChange('reservationDate', date)}
								className='h-10 w-[561px]'
								format='DD/MM/YYYY'
								variant='filled'
							/>
						</div>
						<div className='flex items-center justify-between'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Lý do bảo lưu: <span className='text-[#ed2025]'>*</span>
							</div>
							<TextArea
								placeholder='Tìm kiếm'
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
								rows={4}
								value={reservationData.description}
								onChange={(e) => handleChange('description', e.target.value)}
							/>
						</div>
						<div className='flex h-5 items-center justify-between'>
							<div className='flex items-start justify-start'>
								<div className='flex items-center justify-center'>
									<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
										Tệp đính kèm:
									</div>
									<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
										*
									</div>
								</div>
							</div>
							<Input
								prefix={<PaperClip />}
								placeholder='Chọn tệp tải lên..'
								className='h-10 w-[336px] bg-[#F0F3F6]'
								variant='filled'
							/>
							<Input
								type='file'
								onChange={handleFileChange}
								className='h-10 w-36 bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
					</div>
				</div>
			</Modal>
			{/* New Details Modal */}
			<Modal
				title='Chi tiết thông tin bảo lưu'
				open={isDetailsModalOpen}
				onCancel={handleDetailsModalClose}
				styles={modalStyles}
				width={800}
				footer={[
					<Button className='w-40' key='close' onClick={handleDetailsModalClose}>
						Đóng
					</Button>,
				]}
			>
				{selectedReserve && (
					<div className='py-10'>
						<div className='space-y-10'>
							{/* Lớp hiện tại */}
							<div className='flex h-5 items-center justify-between'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Lớp hiện tại: <span className='text-[#ed2025]'>*</span>
								</div>
								<Input
									value={selectedReserve.studentReserve.class}
									disabled
									className='h-10 w-[561px] bg-[#F0F3F6]'
									variant='filled'
								/>
							</div>
							{/* Tên học viên */}
							<div className='flex h-5 items-center justify-between'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tên học viên: <span className='text-[#ed2025]'>*</span>
								</div>
								<Input
									value={selectedReserve.studentReserve.name}
									disabled
									className='h-10 w-[561px] bg-[#F0F3F6]'
									variant='filled'
								/>
							</div>
							{/* Ngày bảo lưu */}
							<div className='flex h-5 items-center justify-between'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Ngày bảo lưu: <span className='text-[#ed2025]'>*</span>
								</div>
								<Input
									value={selectedReserve.studentReserve.date || 'Chưa có'}
									disabled
									className='h-10 w-[561px] bg-[#F0F3F6]'
									variant='filled'
								/>
							</div>
							{/* Lý do bảo lưu */}
							<div className='flex items-center justify-between'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Lý do bảo lưu: <span className='text-[#ed2025]'>*</span>
								</div>
								<TextArea
									value={selectedReserve.studentReserve.description || 'Chưa có'}
									disabled
									className='h-10 w-[561px] bg-[#F0F3F6]'
									variant='filled'
									rows={4}
								/>
							</div>
							{/* Tệp đính kèm */}
							<div className='flex h-5 items-center justify-between'>
								<div className='flex items-start justify-start'>
									<div className='flex items-center justify-center'>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Tệp đính kèm:
										</div>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
											*
										</div>
									</div>
								</div>
								<Input
									prefix={<PaperClip />}
									value={selectedReserve.studentReserve.file ? 'Có tệp' : 'Không có'}
									disabled
									className='h-10 w-[336px] bg-[#F0F3F6]'
									variant='filled'
								/>
								<Input type='file' disabled className='h-10 w-36 bg-[#F0F3F6]' variant='filled' />
							</div>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}

export default StudentReservePage;
