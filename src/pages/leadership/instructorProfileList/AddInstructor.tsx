import React, { FC, useState } from 'react';
import { Camera, Minus, Plus, UserAvatar } from '../../../components/icon';
import {
	Button,
	ConfigProvider,
	Input,
	Popconfirm,
	Table,
	TableProps,
	Select,
	DatePicker,
	Checkbox,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { addInstructor } from '../../../firebase/instructorProfileList/instructor';

// Interface tổng hợp thông tin giảng viên
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

// Interface cho props của component
interface AddInstructorProps {
	onAddInstructor: () => void;
	onCancel: () => void;
}
// Sample options cho các Select fields
const departmentOptions = [
	{ value: 'Toán - Lý - Hóa', label: 'Toán - Lý - Hóa' },
	{ value: 'Văn - Anh - Anh', label: 'Văn - Anh - Anh' },
	{ value: 'Toán -Hóa - Sinh', label: 'Toán -Hóa - Sinh' },
];

const teachingSubjectOptions = [
	{ value: 'Toan', label: 'Toán' },
	{ value: 'Van', label: 'Văn' },
	{ value: 'Anh', label: 'Anh' },
];

const genderOptions = [
	{ value: 'Nam', label: 'Nam' },
	{ value: 'Nu', label: 'Nữ' },
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
const AddInstructor: FC<AddInstructorProps> = ({ onAddInstructor, onCancel }) => {
	// State sử dụng interface tổng hợp
	const [data, setData] = useState<InstructorData>({
		instructorCode: '',
		department: '',
		teachingSubject: '',
		fullName: '',
		dateOfBirth: '',
		placeOfBirth: '',
		ethnicity: '',
		dateOfEntry: '',
		nationality: '',
		religion: '',
		status: '',
		secondarySubject: [],
		alias: 'Không',
		province: '',
		ward: '',
		district: '',
		address: '',
		email: '',
		phoneNumber: '',
		gender: '',
		unionEntryDate: '',
		partyEntryDate: '',
		familyInfo: [
			{
				id: '1',
				contactName: 'Trần Nhựt Nam',
				address: '248 Calmette P.Nguyễn Thái Bình Q.1 TP.HCM',
				phoneNumber: '0985 562 3251',
			},
		],
		idCardNumber: '',
		unionEntryPlace: '',
		partyEntryPlace: '',
	});
	const [showSelect, setShowSelect] = useState(false);

	// Hàm xử lý thay đổi cho các trường thông tin
	const handleChange = (field: keyof InstructorData, value: string | FamilyInfo[]) => {
		setData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	// Define table columns cho thông tin gia đình
	const columns: TableProps<FamilyInfo>['columns'] = [
		{
			title: 'Nguồn liên hệ',
			dataIndex: 'contactName',
			key: 'contactName',
			width: 200,
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) => {
						const newFamilyInfo = [...data.familyInfo];
						const index = newFamilyInfo.findIndex((item) => item.id === record.id);
						if (index > -1) {
							newFamilyInfo[index].contactName = e.target.value;
							handleChange('familyInfo', newFamilyInfo);
						}
					}}
					className='rounded-lg border px-2 py-1'
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
						const newFamilyInfo = [...data.familyInfo];
						const index = newFamilyInfo.findIndex((item) => item.id === record.id);
						if (index > -1) {
							newFamilyInfo[index].address = e.target.value;
							handleChange('familyInfo', newFamilyInfo);
						}
					}}
					className='rounded-lg border px-2 py-1'
				/>
			),
		},
		{
			title: 'SĐT',
			dataIndex: 'phoneNumber',
			// id: 'phoneNumber',
			width: 200,
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) => {
						const newFamilyInfo = [...data.familyInfo];
						const index = newFamilyInfo.findIndex((item) => item.id === record.id);
						if (index > -1) {
							newFamilyInfo[index].phoneNumber = e.target.value;
							handleChange('familyInfo', newFamilyInfo);
						}
					}}
					className='rounded-lg border px-2 py-1'
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
					onConfirm={() => handleDelete(record.id)}
					okText='Có'
					cancelText='Không'
				>
					<Button
						type='text'
						icon={<DeleteOutlined />}
						className='text-red-500 hover:text-red-700'
					/>
				</Popconfirm>
			),
		},
	];

	// Hàm thêm một hàng mới vào thông tin gia đình
	const handleAdd = () => {
		const newFamilyInfo: FamilyInfo = {
			id: (data.familyInfo.length + 1).toString(),
			contactName: '',
			address: '',
			phoneNumber: '',
		};
		handleChange('familyInfo', [...data.familyInfo, newFamilyInfo]);
	};

	// Hàm xóa một hàng khỏi thông tin gia đình
	const handleDelete = (id: string) => {
		const newFamilyInfo = data.familyInfo.filter((item) => item.id !== id);
		handleChange('familyInfo', newFamilyInfo);
	};

	// Hàm xử lý khi lưu form
	const handleSave = async () => {
		console.log('Instructor Data:', data);

		try {
			await addInstructor(data);

			onAddInstructor();
		} catch (error) {
			console.error('Error adding instructor:', error);
		}
	};
	const addSubject = (value: string) => {
		if (!data.secondarySubject.includes(value)) {
			setData({ ...data, secondarySubject: [...data.secondarySubject, value] });
		}
		setShowSelect(false);
	};

	const removeSubject = (subject: string) => {
		setData({
			...data,
			secondarySubject: data.secondarySubject.filter((sub) => sub !== subject),
		});
	};

	return (
		<div className=''>
			{/* General Information Section */}
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
									<button>
										<Camera />
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* Instructor Info */}
					<div className='pb-10'>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
							Thông tin giảng viên
						</div>
						<div className='flex items-start gap-16'>
							{/* Left Column */}
							<div className='space-y-4'>
								<div className='flex items-center gap-x-[40px]'>
									<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Mã giảng viên:
									</p>
									<Input
										value={data.instructorCode}
										onChange={(e) => handleChange('instructorCode', e.target.value)}
										className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
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
									/>
								</div>
							</div>
							{/* Middle Column */}
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
									/>
								</div>
							</div>
							{/* Right Column */}
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
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Separator */}
			<div className='h-4 w-[1640px] bg-[#f2f2f2] shadow-[inset_0px_4px_8px_0px_rgba(154,202,245,0.15)]' />

			{/* Personal Information Section */}
			<div className='w-[1640px] bg-white pt-2'>
				<div className='flex gap-28 px-16 py-10'>
					<div className='w-[220px]'></div>
					{/* Personal Info */}
					<div>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
							Thông tin cá nhân
						</div>
						<div className='flex items-center gap-20'>
							{/* Left Column */}
							<div className='space-y-4'>
								<div className='flex items-center gap-x-[40px]'>
									<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										CMND/CCCD:
									</p>
									<Input
										value={data.idCardNumber}
										onChange={(e) => handleChange('idCardNumber', e.target.value)}
										className='inline-flex h-10 w-[196px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
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
									/>
								</div>
							</div>
							{/* Middle Column */}
							<div className='space-y-4'>
								<div className='flex h-10 items-center gap-x-[40px]'>
									<Checkbox>
										<div className="w-24 justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-neutral-700">
											Đoàn viên
										</div>
									</Checkbox>
								</div>
								<div className='flex items-center gap-x-[40px]'>
									<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Ngày vào Đoàn:
									</p>
									<DatePicker
										value={data.unionEntryDate ? dayjs(data.unionEntryDate, 'DD/MM/YYYY') : null}
										onChange={(date) =>
											handleChange('unionEntryDate', date ? date.format('DD/MM/YYYY') : '')
										}
										format='DD/MM/YYYY'
										className='h-10 w-[196px]'
										placeholder='Chọn ngày vào Đoàn'
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
									/>
								</div>
							</div>
							{/* Right Column */}
							<div className='space-y-4'>
								<div className='flex h-10 items-center gap-x-[40px]'>
									<Checkbox>
										<div className="w-24 justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-neutral-700">
											Đảng viên
										</div>
									</Checkbox>
								</div>
								<div className='flex items-center gap-x-[40px]'>
									<p className="font-['Source Sans Pro'] w-[128px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Ngày vào Đảng:
									</p>
									<DatePicker
										value={data.partyEntryDate ? dayjs(data.partyEntryDate, 'DD/MM/YYYY') : null}
										onChange={(date) =>
											handleChange('partyEntryDate', date ? date.format('DD/MM/YYYY') : '')
										}
										format='DD/MM/YYYY'
										className='h-10 w-[196px]'
										placeholder='Chọn ngày vào Đảng'
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
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Separator */}
			<div className='h-4 w-[1640px] bg-[#f2f2f2] shadow-[inset_0px_4px_8px_0px_rgba(154,202,245,0.15)]' />

			{/* Family Information Section */}
			<div className='w-[1640px] bg-white shadow-md'>
				<div className='p-16'>
					{/* Title */}
					<div className="font-['Source Sans Pro'] mb-4 text-base font-bold tracking-tight text-[#cc5c00]">
						Thông tin gia đình
					</div>

					{/* Add Button */}
					<div className='mb-4 flex justify-end'>
						<Button
							onClick={handleAdd}
							type='primary'
							className='border-none bg-[#cc5c00] font-bold text-white hover:bg-[#b35000]'
						>
							+ Thêm
						</Button>
					</div>

					{/* Table */}
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
							columns={columns}
							pagination={false}
							rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
						/>
					</ConfigProvider>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='flex items-center justify-center pt-12'>
				<div className='flex items-center gap-4'>
					<Button onClick={onAddInstructor} className='w-[146px]'>
						Hủy
					</Button>
					<Button onClick={handleSave} className='w-[146px]'>
						Lưu
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddInstructor;
