import { FC, useState, useEffect } from 'react';
import { ArrowDown, Camera, Edit, Plus, Trash, UserAvatar } from '../../../components/icon';
import {
	Button,
	Input,
	Select,
	DatePicker,
	Upload,
	ConfigProvider,
	Table,
	TableColumnsType,
	TableProps,
} from 'antd';
import { Leadership_Student, Leadership_Student_Add_Edit } from '../../../types/leadership/student';
import moment from 'moment';
import { TableStudentSemester1 } from './TableStudentSemester1';
import Search from 'antd/es/transfer/search';
import { dataDeclaration_class } from '../../../types/leadership';
import { getClasses } from '../../../firebase/dataDeclaration/fetchClass';

const { Option } = Select;

interface ViewEditStudentProps {
	studentData?: Leadership_Student;
	onUpdateStudent: (data: Leadership_Student_Add_Edit) => void;
	onCancel: () => void;
}

interface ListAward {
	key: string;
	description: string;
	decision: string;
	date: string;
}
const data: ListAward[] = [
	{
		key: '75151476-430f-477a-8378-686ecd606fd2',
		description: 'Nhân viên xuất sắc tháng 6',
		decision: 'https://example.com/decision_1.pdf',
		date: '2024-06-01',
	},
	{
		key: 'bd0a3c73-936c-496e-9ed5-9c20efea0fe1',
		description: 'Đạt thành tích cao trong dự án ABC',
		decision: 'https://example.com/decision_2.pdf',
		date: '2024-06-02',
	},
	{
		key: '919a718f-9166-46f4-b203-cdee12928f9d',
		description: 'Đóng góp nổi bật trong hoạt động thiện nguyện',
		decision: 'https://example.com/decision_3.pdf',
		date: '2024-06-03',
	},
	{
		key: 'b3f3d23a-5ff5-4931-8a9d-6477160aacec',
		description: 'Hoàn thành xuất sắc nhiệm vụ quý II',
		decision: 'https://example.com/decision_4.pdf',
		date: '2024-06-04',
	},
	{
		key: '02c48b5f-1a51-45f7-bcd1-dd5a90b8ed7b',
		description: 'Sáng kiến cải tiến quy trình làm việc',
		decision: 'https://example.com/decision_5.pdf',
		date: '2024-06-05',
	},
];

const ViewEditStudent: FC<ViewEditStudentProps> = ({ studentData, onUpdateStudent, onCancel }) => {
	const [isActive, setIsActive] = useState('general'); // 'general' or 'process'
	const [semester, setSemester] = useState(1);
	const [activeItem, setActiveItem] = useState('1'); // 1: learning, 2: award, 3: disciplinary
	const [isEditing, setIsEditing] = useState(true);
	const [student, setStudent] = useState<Leadership_Student_Add_Edit>(
		studentData || ({} as Leadership_Student_Add_Edit), // Provide fallback if undefined
	);

	const [avatarPreview, setAvatarPreview] = useState<string | null>(
		studentData?.avatar instanceof File
			? URL.createObjectURL(studentData.avatar)
			: studentData?.avatar || null,
	);
	console.log('studentData:', studentData);
	if (!studentData) {
		return <div>No student data available</div>; // Handle undefined case
	}

	const handleChange = (field: keyof Leadership_Student_Add_Edit, value: any) => {
		setStudent((prev) => ({ ...prev, [field]: value }));
	};

	const handleAvatarChange = (info: any) => {
		const file = info.file.originFileObj;
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setAvatarPreview(reader.result as string);
				handleChange('avatar', file);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = () => {
		onUpdateStudent(student);
		setIsEditing(false);
	};

	const toggleEdit = () => {
		if (isEditing) {
			setStudent(studentData); // Reset to original data if cancelling edit
			setAvatarPreview(
				studentData.avatar instanceof File
					? URL.createObjectURL(studentData.avatar)
					: studentData.avatar || null,
			);
		}
		setIsEditing(!isEditing);
	};
	const columns: TableColumnsType<ListAward> = [
		{
			title: 'STT',
			dataIndex: 'index',
			width: '5%',
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Nội dung khen thưởng',
			dataIndex: 'description',
			width: '25%',
		},
		{
			title: 'Quyết định khen thưởng',
			dataIndex: 'decision',
			width: '25%',
		},
		{
			title: 'Ngày quyết định',
			dataIndex: 'date',
			width: '15%',
		},
		{
			title: '',
			dataIndex: 'action',
			align: 'center',
			render: (_, record) => (
				<div className=''>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '15%',
		},
	];
	const onChange: TableProps<ListAward>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};
	const handleEdit = (record: ListAward) => {
		console.log('Edit academic year:', record);
	};

	const handleDelete = (record: ListAward) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.key);
	};
	return (
		<div className=''>
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
							Quá trình học tập
						</div>
					</Button>
				</div>
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
			</div>
			{/* General Information Section */}
			{isActive === 'general' ? (
				<>
					<div className='w-[1640px] bg-white shadow-md'>
						<div className='inline-flex h-14 w-[1640px] items-center justify-between overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-[#cc5c00] px-[63px] py-[17px]'>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
								Thông tin chung
							</div>
						</div>
						<div className='flex gap-28 px-16 pt-10'>
							<div>
								<div className='relative'>
									<div className='flex h-[220px] w-[220px] items-end justify-center overflow-hidden rounded-full bg-[#EFEFEF]'>
										{avatarPreview ? (
											<img
												src={avatarPreview}
												alt='Avatar'
												className='h-full w-full object-cover'
											/>
										) : (
											<UserAvatar />
										)}
										{isEditing && (
											<div className='absolute bottom-2'>
												<Upload
													showUploadList={false}
													beforeUpload={() => false}
													onChange={handleAvatarChange}
												>
													<Button className='bg-transparent'>
														<Camera />
													</Button>
												</Upload>
											</div>
										)}
									</div>
								</div>
							</div>
							<div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
									Thông tin học viên
								</div>
								<div className='flex items-center gap-28'>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Họ và tên:
											</p>
											<Input
												value={student.fullName}
												onChange={(e) => handleChange('fullName', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Giới tính:
											</p>
											<Select
												value={student.gender}
												onChange={(value) => handleChange('gender', value)}
												className='h-10 w-[360px]'
												placeholder='Chọn giới tính'
												disabled={!isEditing}
											>
												<Option value='Nam'>Nam</Option>
												<Option value='Nữ'>Nữ</Option>
											</Select>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Ngày sinh:
											</p>
											<DatePicker
												value={student.birthDate ? moment(student.birthDate) : null}
												onChange={(date) => handleChange('birthDate', date)}
												className='h-10 w-[360px]'
												format='DD/MM/YYYY'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Nơi sinh:
											</p>
											<Input
												value={student.birthPlace}
												onChange={(e) => handleChange('birthPlace', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Dân tộc:
											</p>
											<Input
												value={student.ethnicity}
												onChange={(e) => handleChange('ethnicity', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Tôn giáo:
											</p>
											<Input
												value={student.religion}
												onChange={(e) => handleChange('religion', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
									</div>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Niên khoá:
											</p>
											<Input
												value={student.schoolYear}
												onChange={(e) => handleChange('schoolYear', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Khối:
											</p>
											<div className='flex gap-2'>
												<Select
													value={student.gradeLevel}
													onChange={(value) => handleChange('gradeLevel', value)}
													className='h-10 w-[170px]'
													placeholder='Chọn khối'
													disabled={!isEditing}
												>
													<Option value='K10'>Khối 10</Option>
													<Option value='K11'>Khối 11</Option>
													<Option value='K12'>Khối 12</Option>
												</Select>
												<Select
													value={student.className}
													onChange={(value) => handleChange('className', value)}
													className='h-10 w-[170px]'
													placeholder='Chọn lớp'
													disabled={!isEditing}
												>
													<Option value='A1'>Lớp A1</Option>
													<Option value='A2'>Lớp A2</Option>
													<Option value='B1'>Lớp B1</Option>
												</Select>
											</div>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Mã học viên:
											</p>
											<Input
												value={student.studentId}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Ngày nhập học:
											</p>
											<DatePicker
												value={student.enrollmentDate ? moment(student.enrollmentDate) : null}
												onChange={(date) => handleChange('enrollmentDate', date)}
												className='h-10 w-[360px]'
												format='DD/MM/YYYY'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Hình thức:
											</p>
											<Select
												value={student.admissionType}
												onChange={(value) => handleChange('admissionType', value)}
												className='h-10 w-[360px]'
												placeholder='Chọn hình thức'
												disabled={!isEditing}
											>
												<Option value='Trúng tuyển'>Trúng tuyển</Option>
												<Option value='Chưa trúng tuyển'>Chưa trúng tuyển</Option>
											</Select>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Trạng thái:
											</p>
											<Select
												value={student.status}
												onChange={(value) => handleChange('status', value)}
												className='h-10 w-[360px]'
												placeholder='Chọn trạng thái'
												disabled={!isEditing}
											>
												<Option value='Đang theo học'>Đang theo học</Option>
												<Option value='Đã chuyển lớp'>Đã chuyển lớp</Option>
												<Option value='Đã chuyển trường'>Đã chuyển trường</Option>
												<Option value='Đã thôi học'>Đã thôi học</Option>
											</Select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Information Section */}
					<div className='h-4 w-[1640px] bg-[#f2f2f2] shadow-[inset_0px_4px_8px_0px_rgba(154,202,245,0.15)]' />
					<div className='w-[1640px] bg-white pt-2'>
						<div className='flex gap-28 px-16 py-10'>
							<div className='w-[220px]'></div>
							<div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
									Địa chỉ liên hệ
								</div>
								<div className='flex items-center gap-28'>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Tỉnh/Thành phố:
											</p>
											<Input
												value={student.province}
												onChange={(e) => handleChange('province', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Quận/Huyện:
											</p>
											<Input
												value={student.district}
												onChange={(e) => handleChange('district', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Xã/Phường:
											</p>
											<Input
												value={student.ward}
												onChange={(e) => handleChange('ward', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
									</div>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Địa chỉ:
											</p>
											<Input
												value={student.address}
												onChange={(e) => handleChange('address', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Email:
											</p>
											<Input
												value={student.email}
												onChange={(e) => handleChange('email', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Điện thoại:
											</p>
											<Input
												value={student.phone}
												onChange={(e) => handleChange('phone', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Family Information Section */}
					<div className='bg-white shadow-md'>
						<div className='inline-flex h-14 w-[1640px] items-center justify-start overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-[#cc5c00] pb-4 pl-[63px] pt-[17px]'>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
								Thông tin gia đình
							</div>
						</div>
						<div className='flex gap-28 px-16 pt-10'>
							<div>
								<div className='flex items-center gap-28'>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Họ và tên bố:
											</p>
											<Input
												value={student.fatherName}
												onChange={(e) => handleChange('fatherName', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Họ tên mẹ:
											</p>
											<Input
												value={student.motherName}
												onChange={(e) => handleChange('motherName', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Họ tên giám hộ:
											</p>
											<Input
												value={student.guardianName}
												onChange={(e) => handleChange('guardianName', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
									</div>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Năm sinh bố:
											</p>
											<Input
												value={student.fatherBirthYear}
												onChange={(e) => handleChange('fatherBirthYear', e.target.value)}
												className='h-10 w-[104px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Năm sinh mẹ:
											</p>
											<Input
												value={student.motherBirthYear}
												onChange={(e) => handleChange('motherBirthYear', e.target.value)}
												className='h-10 w-[104px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Năm sinh GH:
											</p>
											<Input
												value={student.guardianBirthYear}
												onChange={(e) => handleChange('guardianBirthYear', e.target.value)}
												className='h-10 w-[104px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
									</div>
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Nghề nghiệp bố:
											</p>
											<Input
												value={student.fatherOccupation}
												onChange={(e) => handleChange('fatherOccupation', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Nghề nghiệp mẹ:
											</p>
											<Input
												value={student.motherOccupation}
												onChange={(e) => handleChange('motherOccupation', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Nghề nghiệp GH:
											</p>
											<Input
												value={student.guardianOccupation}
												onChange={(e) => handleChange('guardianOccupation', e.target.value)}
												className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
												disabled={!isEditing}
											/>
										</div>
									</div>
								</div>
								<div className="font-['Source Sans Pro'] pt-5 text-base font-bold tracking-tight text-[#cc5c00]">
									Thông tin liên hệ
								</div>
								<div className='flex gap-4 pb-5'>
									<div className='flex items-center gap-x-[36px]'>
										<p className="font-['Source Sans Pro'] w-[110px] text-base font-bold tracking-tight text-[#373839] opacity-80">
											Điện thoại bố:
										</p>
										<Input
											value={student.fatherPhone}
											onChange={(e) => handleChange('fatherPhone', e.target.value)}
											className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
											disabled={!isEditing}
										/>
									</div>
									<div className='flex items-center gap-x-[36px]'>
										<p className="font-['Source Sans Pro'] w-[110px] text-base font-bold tracking-tight text-[#373839] opacity-80">
											Điện thoại mẹ:
										</p>
										<Input
											value={student.motherPhone}
											onChange={(e) => handleChange('motherPhone', e.target.value)}
											className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
											disabled={!isEditing}
										/>
									</div>
									<div className='flex items-center gap-x-[36px]'>
										<p className="font-['Source Sans Pro'] w-[110px] text-base font-bold tracking-tight text-[#373839] opacity-80">
											Điện thoại GH:
										</p>
										<Input
											value={student.guardianPhone}
											onChange={(e) => handleChange('guardianPhone', e.target.value)}
											className='h-10 w-[360px] rounded-lg border bg-[#F2F2F2] px-4 py-2'
											disabled={!isEditing}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex items-center justify-center pb-8 pt-12'>
						<div className='flex items-center gap-4'>
							<Button onClick={onCancel} className='w-[146px]'>
								Quay lại
							</Button>
							{isEditing && (
								<Button type='primary' onClick={handleSubmit} className='w-[146px]'>
									Lưu thay đổi
								</Button>
							)}
						</div>
					</div>
				</>
			) : (
				<div>
					<div className='relative h-[258px] w-[1640px] overflow-hidden rounded-2xl border border-[#ff7506] bg-[#fff9f4]'>
						<div className="absolute left-[64px] top-[24px] font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
							Thông tin chung
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[64px] top-[71px] text-base font-bold tracking-tight text-[#373839]">
							Niên khoá:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[448px] top-[71px] text-base font-bold tracking-tight text-[#373839]">
							Giáo viên chủ nhiệm:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[64px] top-[107px] text-base font-bold tracking-tight text-[#373839]">
							Khoa - Khối:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[448px] top-[107px] text-base font-bold tracking-tight text-[#373839]">
							Số lượng học viên:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[64px] top-[143px] text-base font-bold tracking-tight text-[#373839]">
							Mã lớp học:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[448px] top-[143px] text-base font-bold tracking-tight text-[#373839]">
							Loại lớp học:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[64px] top-[179px] text-base font-bold tracking-tight text-[#373839]">
							Tên lớp học:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[448px] top-[179px] text-base font-bold tracking-tight text-[#373839]">
							Số lượng môn học:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[1024px] top-[71px] text-base font-bold tracking-tight text-[#373839]">
							Mô tả:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[168px] top-[71px] text-base font-normal leading-tight text-[#373839] opacity-80">
							2020 - 2021
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[616px] top-[71px] text-base font-normal leading-tight text-[#373839] opacity-80">
							Phạm Thị B
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[1085px] top-[71px] w-[299px] text-base font-normal leading-tight text-[#373839] opacity-80">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus quam vel
							aliquam lacinia.
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[616px] top-[107px] text-base font-normal leading-tight text-[#373839] opacity-80">
							45 học viên
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[616px] top-[143px] text-base font-normal leading-tight text-[#373839] opacity-80">
							Lớp học căn bản
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[616px] top-[179px] text-base font-normal leading-tight text-[#373839] opacity-80">
							10 môn học
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[168px] top-[107px] text-base font-normal leading-tight text-[#373839] opacity-80">
							Khối 6
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[168px] top-[179px] text-base font-normal leading-tight text-[#373839] opacity-80">
							6A1
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[168px] top-[143px] text-base font-normal leading-tight text-[#373839] opacity-80">
							2020-6A1
						</div>
					</div>
					<div className='my-5'>
						<div
							onClick={() => setActiveItem('learning')}
							className={`${activeItem === 'learning' ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21]' : 'bg-white'} inline-flex h-14 w-[1640px] cursor-pointer items-center justify-start gap-[13px] overflow-hidden rounded-lg border border-[#f2f2f2] py-3 pl-3 pr-[1440px]`}
						>
							<div className={` ${activeItem === 'learning' ? '' : '-rotate-90'} `}>
								<ArrowDown color={activeItem === 'learning' ? '#ffffff' : '#ff7506'} />
							</div>
							<div
								className={`${activeItem === 'learning' ? 'text-white' : 'text-[#373839]'} font-['Mulish'] text-lg font-extrabold tracking-tight`}
							>
								Kết quả học tập
							</div>
						</div>
					</div>
					{activeItem === 'learning' && (
						<div>
							<div className='relative h-[152px] w-[1512px] overflow-hidden rounded-lg bg-white shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
								{/* Learning summary content */}
								<div className='absolute left-0 top-0 h-[99px] w-[1512px] overflow-hidden rounded-tl-lg rounded-tr-lg'>
									<div className="absolute left-[1082px] top-[64px] font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
										Điểm trung bình
									</div>
									<div className='absolute left-[1275px] top-[64px] inline-flex items-start justify-start gap-10'>
										<div className="text-center font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
											Học lực
										</div>
										<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
											Hạnh kiểm
										</div>
									</div>
									<div className='absolute left-[585px] top-[63.50px] inline-flex items-start justify-start gap-[60px]'>
										<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
											Học lực
										</div>
										<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
											Hạnh kiểm
										</div>
										<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
											Điểm trung bình
										</div>
									</div>
								</div>
								<div className="font-['Source Sans Pro'] absolute left-[585px] top-[116px] text-base font-normal leading-tight text-[#373839]">
									Khá
								</div>
								<div className="font-['Source Sans Pro'] absolute left-[1275px] top-[116px] text-base font-bold tracking-tight text-[#49c40f]">
									Khá
								</div>
								<div className="font-['Source Sans Pro'] absolute left-[712px] top-[116px] text-base font-normal leading-tight text-[#373839]">
									Tốt
								</div>
								<div className="font-['Source Sans Pro'] absolute left-[1382px] top-[116px] text-base font-bold tracking-tight text-[#49c40f]">
									Tốt
								</div>
								<div className="font-['Source Sans Pro'] absolute left-[869px] top-[116px] text-base font-normal leading-tight text-[#373839]">
									7.7
								</div>
								<div className="font-['Source Sans Pro'] absolute left-[52px] top-[116px] text-base font-normal leading-tight text-[#373839]">
									Khá
								</div>
								<div className="font-['Source Sans Pro'] absolute left-[179px] top-[116px] text-base font-normal leading-tight text-[#373839]">
									Tốt
								</div>
								<div className="font-['Source Sans Pro'] absolute left-[336px] top-[116px] text-base font-normal leading-tight text-[#373839]">
									7.7
								</div>
								<div data-svg-wrapper className='absolute left-[533px] top-[51px]'>
									<svg
										width='2'
										height='101'
										viewBox='0 0 2 101'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M1 0L1.00001 101' stroke='#C9C4C0' />
									</svg>
								</div>
								<div data-svg-wrapper className='absolute left-[1067px] top-[51px]'>
									<svg
										width='2'
										height='101'
										viewBox='0 0 2 101'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M1 0L1 101' stroke='#C9C4C0' />
									</svg>
								</div>
								<div data-svg-wrapper className='absolute left-[1242px] top-[51px]'>
									<svg
										width='2'
										height='47'
										viewBox='0 0 2 47'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M1 0L1 47' stroke='white' />
									</svg>
								</div>
								<div className="font-['Source Sans Pro'] absolute left-[1112px] top-[115px] text-base font-bold tracking-tight text-[#49c40f]">
									7.0
								</div>
								<div className='absolute left-[52px] top-[64px] inline-flex items-start justify-start gap-[60px]'>
									<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
										Học lực
									</div>
									<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
										Hạnh kiểm
									</div>
									<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
										Điểm trung bình
									</div>
								</div>
								<div className='absolute left-0 top-0 h-[51px] w-[1512px] overflow-hidden bg-[#823b00]'>
									<div data-svg-wrapper className='absolute left-[533px] top-0'>
										<svg
											width='2'
											height='51'
											viewBox='0 0 2 51'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path d='M1 0L1 98' stroke='white' />
										</svg>
									</div>
									<div data-svg-wrapper className='absolute left-[1067px] top-[-0px]'>
										<svg
											width='2'
											height='51'
											viewBox='0 0 2 51'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path d='M1 -6.10352e-05L1 97.9999' stroke='white' />
										</svg>
									</div>
									<div className="absolute left-0 top-[12px] h-[27px] w-[517px] text-center font-['Mulish'] text-[22px] font-extrabold tracking-tight text-white">
										Học kỳ 1
									</div>
									<div className="absolute left-[517px] top-[12px] h-[27px] w-[518px] text-center font-['Mulish'] text-[22px] font-extrabold tracking-tight text-white">
										Học kỳ 2
									</div>
									<div className="absolute left-[1251px] top-[12px] font-['Mulish'] text-[22px] font-extrabold tracking-tight text-white">
										Cả năm
									</div>
								</div>
							</div>
							<Button
								size='middle'
								onClick={() => setSemester(1)}
								shape='round'
								className={`${semester === 1 ? 'bg-black text-white' : 'bg-white text-black'}`}
							>
								<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
									Học kì I
								</div>
							</Button>
							<Button
								size='middle'
								onClick={() => setSemester(2)}
								shape='round'
								className={`${semester === 2 ? 'bg-black text-white' : 'bg-white text-black'}`}
							>
								<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
									Học kì II
								</div>
							</Button>
							{semester === 1 ? (
								<TableStudentSemester1 />
							) : semester === 2 ? (
								<TableStudentSemester1 />
							) : null}
						</div>
					)}
					<div className='my-5'>
						<div
							onClick={() => setActiveItem('award')}
							className={`${activeItem === 'award' ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21]' : 'bg-white'} inline-flex h-14 w-[1640px] cursor-pointer items-center justify-start gap-[13px] overflow-hidden rounded-lg border border-[#f2f2f2] py-3 pl-3`}
						>
							<div className={` ${activeItem === 'award' ? '' : '-rotate-90'} `}>
								<ArrowDown color={activeItem === 'award' ? '#ffffff' : '#ff7506'} />
							</div>
							<div
								className={`${activeItem === 'award' ? 'text-white' : 'text-[#373839]'} font-['Mulish'] text-lg font-extrabold tracking-tight`}
							>
								Danh sách khen thưởng
							</div>
						</div>
					</div>
					{activeItem === 'award' && (
						<>
							<div className='flex w-[1640px] justify-end'>
								<Input placeholder='Tìm kiếm' className='h-10 w-[438px]' prefix={<Search />} />
							</div>
							<ConfigProvider
								theme={{
									components: {
										Table: {
											headerBg: '#373839',
											headerFilterHoverBg: '#373839',
											headerSortHoverBg: '#373839',
											headerSortActiveBg: '#373839',
											headerSplitColor: '#373839',
											headerColor: '#ffffff',
											borderColor: '#f2f2f2',
										},
									},
								}}
							>
								<Table<ListAward>
									columns={columns}
									dataSource={data}
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
						</>
					)}
					<div className='my-5'>
						<div
							onClick={() => setActiveItem('disciplinary')}
							className={`${activeItem === 'disciplinary' ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21]' : 'bg-white'} inline-flex h-14 w-[1640px] cursor-pointer items-center justify-start gap-[13px] overflow-hidden rounded-lg border border-[#f2f2f2] py-3 pl-3`}
						>
							<div className={` ${activeItem === 'disciplinary' ? '' : '-rotate-90'} `}>
								<ArrowDown color={activeItem === 'disciplinary' ? '#ffffff' : '#ff7506'} />
							</div>
							<div
								className={`${activeItem === 'disciplinary' ? 'text-white' : 'text-[#373839]'} font-['Mulish'] text-lg font-extrabold tracking-tight`}
							>
								Danh sách kỹ luật
							</div>
						</div>
					</div>
					{activeItem === 'disciplinary' && (
						<>
							<div className='flex w-[1640px] justify-end'>
								<Input placeholder='Tìm kiếm' className='h-10 w-[438px]' prefix={<Search />} />
							</div>
							<ConfigProvider
								theme={{
									components: {
										Table: {
											headerBg: '#373839',
											headerFilterHoverBg: '#373839',
											headerSortHoverBg: '#373839',
											headerSortActiveBg: '#373839',
											headerSplitColor: '#373839',
											headerColor: '#ffffff',
											borderColor: '#f2f2f2',
										},
									},
								}}
							>
								<Table<ListAward>
									columns={columns}
									dataSource={data}
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
						</>
					)}
					{/* <Modal
						title='Xóa'
						open={isModal}
						onOk={handleOk}
						onCancel={handleCancel}
						styles={modalStyles}
						footer={[
							<Button className='w-40' key='back' onClick={handleCancel}>
								Hủy
							</Button>,
							<Button className='w-40' key='submit' type='primary' onClick={handleOk}>
								Xác nhận
							</Button>,
						]}
					>
						<div className="font-['Source Sans Pro'] text-center text-base font-normal leading-tight text-[#373839]">
							Xác nhận muốn xoá môn học này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể
							hoàn tác.
						</div>
					</Modal> */}
				</div>
			)}
		</div>
	);
};

export default ViewEditStudent;
