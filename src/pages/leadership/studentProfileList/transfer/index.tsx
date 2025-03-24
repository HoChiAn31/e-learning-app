import {
	Button,
	ConfigProvider,
	Input,
	Modal,
	Table,
	TableColumnsType,
	TableProps,
	DatePicker,
	Select,
	Space,
} from 'antd';
import { ArrowRight, Eyes, PaperClip, Plus, Search } from '../../../../components/icon';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { getStudents, updateStudent } from '../../../../firebase/studentProfileList/fetchStudent';
import {
	Leadership_Student,
	Leadership_Student_Transfer,
	Leadership_TransferForm,
	Leadership_TransferForm_Add_Edit,
} from '../../../../types/leadership/student';
import { addTransfer, getTransfers } from '../../../../firebase/studentProfileList/fetchTransfer';

interface Province {
	code: number;
	name: string;
}

interface District {
	code: number;
	name: string;
}

function StudentTransferPage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Add Modal
	const [isModalList, setIsModalOpenList] = useState<boolean>(false); // List Modal
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false); // Details Modal
	const [selectedTransfer, setSelectedTransfer] = useState<Leadership_Student_Transfer | null>(
		null,
	); // Selected record
	const [provinceOptions, setProvinceOptions] = useState<{ value: number; label: string }[]>([]);
	const [districtOptions, setDistrictOptions] = useState<{ value: number; label: string }[]>([]);
	const [dataTranser, setDataTranser] = useState<Leadership_TransferForm[]>([]);
	const [studentData, setStudentData] = useState<Leadership_Student[]>([]);
	const [students, setStudents] = useState<Leadership_Student[]>([]);
	const [dataFilter, setDataFilter] = useState<Leadership_Student_Transfer[]>([]);
	const [formData, setFormData] = useState<Leadership_TransferForm_Add_Edit>({
		name: '',
		studentCode: '',
		transferDate: '',
		transferSemester: '',
		provinceCode: '' as string,
		province: '' as string,
		districtCode: '' as string,
		district: '' as string,
		transferFrom: '',
		description: '',
		file: null as File | null,
	});
	const nav = useNavigate();

	const fetchDataTranser = async () => {
		try {
			const data = await getTransfers();
			console.log(data);
			setDataTranser(data);
		} catch (error) {
			console.error('Error fetching data transfer:', error);
		}
	};

	const fetchProvinces = async () => {
		try {
			const response = await fetch('https://provinces.open-api.vn/api/p/');
			const provinces: Province[] = await response.json();
			setProvinceOptions(provinces.map((p) => ({ value: p.code, label: p.name })));
		} catch (error) {
			console.error('Error fetching provinces:', error);
		}
	};

	const fetchDistricts = async (provinceCode: string) => {
		try {
			const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
			const data: Province & { districts: District[] } = await response.json();
			setDistrictOptions(data.districts.map((d) => ({ value: d.code, label: d.name })));
		} catch (error) {
			console.error('Error fetching districts:', error);
			setDistrictOptions([]);
		}
	};

	const fetchStudents = async () => {
		try {
			const students: Leadership_Student[] = await getStudents();
			setStudents(students);
			setStudentData(students);
		} catch (error) {
			console.error('Error fetching students:', error);
		}
	};

	useEffect(() => {
		fetchDataTranser();
		fetchProvinces();
		fetchStudents();
	}, []);

	useEffect(() => {
		if (dataTranser.length > 0) {
			const filteredTransfers: Leadership_Student_Transfer[] = dataTranser
				.filter((data) => students.some((student) => student.studentId === data.studentCode))
				.map((data) => {
					const matchedStudent = students.find(
						(student) => student.studentId === data.studentCode,
					)!;
					return {
						studentInfor: matchedStudent,
						studentTransfer: data,
					};
				});
			setDataFilter(filteredTransfers);
			console.log('Filtered Transfers:', filteredTransfers);
		}
	}, [dataTranser, studentData]);

	useEffect(() => {
		if (formData.provinceCode) {
			fetchDistricts(formData.provinceCode);
		} else {
			setDistrictOptions([]);
		}
	}, [formData.provinceCode]);

	const handleNameChange = (name: string) => {
		const matchingStudents = studentData.filter(
			(s) => s.fullName.toLowerCase() === name.toLowerCase(),
		);
		if (matchingStudents.length === 1) {
			setFormData((prev) => ({
				...prev,
				name,
				studentCode: matchingStudents[0].studentId,
			}));
		} else if (matchingStudents.length > 1) {
			const codes = matchingStudents.map((s) => s.studentId).join(', ');
			setFormData((prev) => ({
				...prev,
				name,
				studentCode: codes,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				name,
				studentCode: '',
			}));
		}
	};

	const handleOk = async () => {
		const districtValue = Number(formData.districtCode);
		const provinceValue = Number(formData.provinceCode);
		const updatedProvince =
			provinceOptions.find((p) => p.value === provinceValue)?.label || formData.province;
		const updatedDistrict =
			districtOptions.find((d) => d.value === districtValue)?.label || formData.district;

		setFormData((prev) => ({
			...prev,
			province: updatedProvince,
			district: updatedDistrict,
		}));

		if (formData.studentCode) {
			const student = studentData.find((student) => student.studentId === formData.studentCode);
			if (!student) {
				alert('Không tìm thấy sinh viên!');
				return;
			}
			console.log('studentId', student?.id);
			console.log('Form data to save:', formData);
			await updateStudent(student.id, {
				...student,
				status: 'Đã chuyển trường',
			});
			const data = {
				...formData,
				transferDate: formData.transferDate
					? moment(formData.transferDate).format('YYYY-MM-DD')
					: null,
			};
			await addTransfer(data);
		}
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		resetForm();
	};

	const handleOkList = () => {
		setIsModalOpenList(false);
	};

	const handleEditList = (record: Leadership_Student_Transfer) => {
		console.log('Edit academic year:', record);
		setIsModalOpenList(true);
	};

	const handleCancelList = () => {
		setIsModalOpenList(false);
	};

	const handleViewDetails = (record: Leadership_Student_Transfer) => {
		setSelectedTransfer(record);
		setIsDetailsModalOpen(true);
	};

	const handleDetailsModalClose = () => {
		setIsDetailsModalOpen(false);
		setSelectedTransfer(null);
	};

	const resetForm = () => {
		setFormData({
			name: '',
			studentCode: '',
			transferDate: '',
			transferSemester: '',
			provinceCode: '',
			province: '',
			districtCode: '',
			district: '',
			transferFrom: '',
			description: '',
			file: null,
		});
	};

	const handleInputChange = (field: string, value: any) => {
		if (field === 'name') {
			handleNameChange(value);
		} else if (field === 'province') {
			const selectedProvince = provinceOptions.find((p) => p.value === value);
			setFormData((prev) => ({
				...prev,
				provinceCode: value,
				province: selectedProvince ? selectedProvince.label : '',
			}));
		} else if (field === 'district') {
			const selectedDistrict = districtOptions.find((d) => d.value === value);
			setFormData((prev) => ({
				...prev,
				districtCode: value || '',
				district: selectedDistrict ? selectedDistrict.label : '',
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[field]: value,
			}));
		}
	};

	const modalStyles = {
		header: { textAlign: 'center' as 'center' },
		footer: { textAlign: 'center' as 'center' },
	};

	const columns: TableColumnsType<Leadership_Student_Transfer> = [
		{
			title: 'Mã học viên',
			render: (_: any, record: Leadership_Student_Transfer) => record.studentTransfer.studentCode,
			sorter: (a, b) => a.studentTransfer.studentCode.localeCompare(b.studentTransfer.studentCode),
			width: '10%',
		},
		{
			title: 'Tên học viên',
			render: (_: any, record: Leadership_Student_Transfer) => record.studentTransfer.name,
			sorter: (a, b) => a.studentTransfer.name.localeCompare(b.studentTransfer.name),
			width: '10%',
		},
		{
			title: 'Ngày sinh',
			render: (_: any, record: Leadership_Student_Transfer) => record.studentInfor.birthDate,
			sorter: (a, b) => a.studentInfor.birthDate.localeCompare(b.studentInfor.birthDate),
			width: '15%',
		},
		{
			title: 'Giới tính',
			render: (_: any, record: Leadership_Student_Transfer) => record.studentInfor.gender,
			sorter: (a, b) => a.studentInfor.gender.localeCompare(b.studentInfor.gender),
			width: '10%',
		},
		{
			title: 'Chuyển từ',
			render: (_: any, record: Leadership_Student_Transfer) => record.studentTransfer.transferFrom,
			sorter: (a, b) =>
				a.studentTransfer.transferFrom.localeCompare(b.studentTransfer.transferFrom),
			width: '15%',
		},
		{
			title: 'Học kì chuyển',
			render: (_: any, record: Leadership_Student_Transfer) =>
				record.studentTransfer.transferSemester,
			sorter: (a, b) =>
				a.studentTransfer.transferSemester.localeCompare(b.studentTransfer.transferSemester),
			width: '10%',
		},
		{
			title: 'Khối',
			render: (_: any, record: Leadership_Student_Transfer) => record.studentInfor.gradeLevel,
			sorter: (a, b) => a.studentInfor.gradeLevel.localeCompare(b.studentInfor.gradeLevel),
			width: '10%',
		},
		{
			title: 'Ngày chuyển',
			render: (_: any, record: Leadership_Student_Transfer) => record.studentTransfer.transferDate,
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

	const onChange: TableProps<Leadership_Student_Transfer>['onChange'] = (
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
						Tiếp nhận chuyển trường
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
				{/* Modal Add */}
				<Modal
					title='Tiếp nhận chuyển trường'
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
					<div className='space-y-6 py-5'>
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tên học viên:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Select
								showSearch
								value={formData.name || undefined}
								onChange={(value) => handleInputChange('name', value)}
								placeholder='Nhập tên học viên'
								className='h-10 w-[561px]'
								options={studentData.map((student) => ({
									value: student.fullName,
									label: student.fullName,
								}))}
								filterOption={(input, option) =>
									(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
								}
							/>
						</div>
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Mã học viên:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Input
								value={formData.studentCode}
								onChange={(e) => handleInputChange('studentCode', e.target.value)}
								placeholder='Nhập mã học viên'
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Ngày chuyển đến:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<DatePicker
								value={formData.transferDate ? moment(formData.transferDate) : null}
								onChange={(date) =>
									handleInputChange('transferDate', date ? date.format('YYYY-MM-DD') : '')
								}
								format='DD/MM/YYYY'
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Học kỳ chuyển:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Select
								value={formData.transferSemester || undefined}
								onChange={(value) => handleInputChange('transferSemester', value)}
								placeholder='Chọn học kỳ chuyển'
								className='h-10 w-[561px]'
								options={[
									{ value: 'Kỳ 1', label: 'Kỳ 1' },
									{ value: 'Kỳ 2', label: 'Kỳ 2' },
								]}
							/>
						</div>
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tỉnh/Thành:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Select
								value={formData.provinceCode || undefined}
								onChange={(value) => handleInputChange('province', value)}
								placeholder='Chọn tỉnh/thành'
								className='h-10 w-[561px]'
								options={provinceOptions}
							/>
						</div>
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Quận/Huyện:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Select
								value={formData.districtCode || undefined}
								onChange={(value) => handleInputChange('district', value)}
								placeholder='Chọn quận/huyện'
								className='h-10 w-[561px]'
								options={districtOptions}
								disabled={!formData.provinceCode}
							/>
						</div>
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Chuyển từ:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Input
								value={formData.transferFrom}
								onChange={(e) => handleInputChange('transferFrom', e.target.value)}
								placeholder='Nhập nơi chuyển từ'
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
						<div className='flex items-start justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Lý do:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<TextArea
								value={formData.description}
								onChange={(e) => handleInputChange('description', e.target.value)}
								placeholder='Nhập lý do chuyển trường'
								rows={4}
								className='w-[561px] bg-[#F0F3F6]'
							/>
						</div>
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tệp đính kèm:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Space>
								<Input
									prefix={<PaperClip />}
									placeholder='Tìm kiếm'
									className='h-10 w-[336px] bg-[#F0F3F6]'
									variant='filled'
									disabled
								/>
								<Button>Chọn tệp tải lên...</Button>
							</Space>
						</div>
					</div>
				</Modal>
			</div>
			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
						Danh sách chuyển trường
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
						<Table<Leadership_Student_Transfer>
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
				title='Danh sách lớp học'
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
			></Modal>
			{/* Details Modal with Add Modal Interface */}
			<Modal
				title='Chi tiết thông tin chuyển trường'
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
				{selectedTransfer && (
					<div className='space-y-6 py-5'>
						{/* Tên học viên */}
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tên học viên:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Input
								value={selectedTransfer.studentTransfer.name}
								disabled
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
						{/* Mã học viên */}
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Mã học viên:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Input
								value={selectedTransfer.studentTransfer.studentCode}
								disabled
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
						{/* Ngày chuyển đến */}
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Ngày chuyển đến:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Input
								value={selectedTransfer.studentTransfer.transferDate || 'Chưa có'}
								disabled
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
						{/* Học kỳ chuyển */}
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Học kỳ chuyển:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Input
								value={selectedTransfer.studentTransfer.transferSemester}
								disabled
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
						{/* Tỉnh/Thành */}
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tỉnh/Thành:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Input
								value={selectedTransfer.studentTransfer.province}
								disabled
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
						{/* Quận/Huyện */}
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Quận/Huyện:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Input
								value={selectedTransfer.studentTransfer.district}
								disabled
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
						{/* Chuyển từ */}
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Chuyển từ:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Input
								value={selectedTransfer.studentTransfer.transferFrom}
								disabled
								className='h-10 w-[561px] bg-[#F0F3F6]'
								variant='filled'
							/>
						</div>
						{/* Lý do */}
						<div className='flex items-start justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Lý do:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<TextArea
								value={selectedTransfer.studentTransfer.description || 'Chưa có'}
								disabled
								rows={4}
								className='w-[561px] bg-[#F0F3F6]'
							/>
						</div>
						{/* Tệp đính kèm */}
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-0.5'>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tệp đính kèm:
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</label>
							<Space>
								<Input
									prefix={<PaperClip />}
									value={selectedTransfer.studentTransfer.file ? 'Có tệp' : 'Không có'}
									disabled
									className='h-10 w-[336px] bg-[#F0F3F6]'
									variant='filled'
								/>
								<Button disabled>Chọn tệp tải lên...</Button>
							</Space>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}

export default StudentTransferPage;
