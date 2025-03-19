import { FC, useState, useEffect } from 'react';
import { Camera, UserAvatar } from '../../../components/icon';
import { Button, Input, Select, DatePicker, Upload } from 'antd';
import { Leadership_Student_Add_Edit } from '../../../types/leadership/student';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

interface AddStudentProps {
	onAddStudent: (data: Leadership_Student_Add_Edit) => void;
	onCancel: () => void;
}

const AddStudent: FC<AddStudentProps> = ({ onAddStudent, onCancel }) => {
	const [student, setStudent] = useState<Leadership_Student_Add_Edit>({
		fullName: '',
		gender: undefined,
		birthDate: null,
		birthPlace: '',
		ethnicity: '',
		religion: '',
		schoolYear: '',
		gradeLevel: 'K10',
		className: undefined,
		studentId: '',
		enrollmentDate: null,
		admissionType: undefined,
		status: 'Đang theo học',
		province: '',
		district: '',
		ward: '',
		address: '',
		email: '',
		phone: '',
		fatherName: '',
		motherName: '',
		guardianName: '',
		fatherBirthYear: '',
		motherBirthYear: '',
		guardianBirthYear: '',
		fatherOccupation: '',
		motherOccupation: '',
		guardianOccupation: '',
		fatherPhone: '',
		motherPhone: '',
		guardianPhone: '',
		avatar: undefined, // Thêm trường avatar
	});

	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

	const generateStudentId = () => {
		const year = student.schoolYear || new Date().getFullYear().toString();
		const grade = student.gradeLevel || 'K10';
		const randomNum = Math.floor(1000 + Math.random() * 9000);
		return `${year}-${grade}-${randomNum}`;
	};

	useEffect(() => {
		setStudent((prev) => ({ ...prev, studentId: generateStudentId() }));
	}, [student.schoolYear, student.gradeLevel]);

	const handleChange = (field: keyof Leadership_Student_Add_Edit, value: any) => {
		setStudent((prev) => ({ ...prev, [field]: value }));
	};

	// Xử lý upload avatar
	const handleAvatarChange = (info: any) => {
		const file = info.file.originFileObj;
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setAvatarPreview(reader.result as string);
				handleChange('avatar', file); // Lưu file vào state
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = () => {
		onAddStudent(student);
	};

	return (
		<div className=''>
			<div className='w-[1640px] bg-white shadow-md'>
				<div className='inline-flex h-14 w-[1640px] items-center justify-start overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-[#cc5c00] pb-4 pl-[63px] pr-[1430px] pt-[17px]'>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Thông tin chung
					</div>
				</div>
				<div className='flex gap-28 px-16 pt-10'>
					<div>
						<div className='relative'>
							<div className='flex h-[220px] w-[220px] items-end justify-center overflow-hidden rounded-full bg-[#EFEFEF]'>
								{avatarPreview ? (
									<img src={avatarPreview} alt='Avatar' className='h-full w-full object-cover' />
								) : (
									<UserAvatar />
								)}
								<div className='absolute bottom-2'>
									<Upload
										showUploadList={false}
										beforeUpload={() => false} // Ngăn upload tự động
										onChange={handleAvatarChange}
									>
										<Button className='bg-transparent'>
											<Camera />
										</Button>
									</Upload>
								</div>
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
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
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
										value={student.birthDate}
										onChange={(date) => handleChange('birthDate', date)}
										className='h-10 w-[360px]'
										format='DD/MM/YYYY'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Nơi sinh:
									</p>
									<Input
										value={student.birthPlace}
										onChange={(e) => handleChange('birthPlace', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Dân tộc:
									</p>
									<Input
										value={student.ethnicity}
										onChange={(e) => handleChange('ethnicity', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Tôn giáo:
									</p>
									<Input
										value={student.religion}
										onChange={(e) => handleChange('religion', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
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
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
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
										disabled
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Ngày nhập học:
									</p>
									<DatePicker
										value={student.enrollmentDate}
										onChange={(date) => handleChange('enrollmentDate', date)}
										className='h-10 w-[360px]'
										format='DD/MM/YYYY'
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
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Quận/Huyện:
									</p>
									<Input
										value={student.district}
										onChange={(e) => handleChange('district', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Xã/Phường:
									</p>
									<Input
										value={student.ward}
										onChange={(e) => handleChange('ward', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
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
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Email:
									</p>
									<Input
										value={student.email}
										onChange={(e) => handleChange('email', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Điện thoại:
									</p>
									<Input
										value={student.phone}
										onChange={(e) => handleChange('phone', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white shadow-md'>
				<div className='inline-flex h-14 w-[1640px] items-center justify-start overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-[#cc5c00] pb-4 pl-[63px] pr-[1430px] pt-[17px]'>
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
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Họ tên mẹ:
									</p>
									<Input
										value={student.motherName}
										onChange={(e) => handleChange('motherName', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Họ tên giám hộ:
									</p>
									<Input
										value={student.guardianName}
										onChange={(e) => handleChange('guardianName', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
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
										className='inline-flex h-10 w-[104px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Năm sinh mẹ:
									</p>
									<Input
										value={student.motherBirthYear}
										onChange={(e) => handleChange('motherBirthYear', e.target.value)}
										className='inline-flex h-10 w-[104px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Năm sinh GH:
									</p>
									<Input
										value={student.guardianBirthYear}
										onChange={(e) => handleChange('guardianBirthYear', e.target.value)}
										className='inline-flex h-10 w-[104px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
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
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Nghề nghiệp mẹ:
									</p>
									<Input
										value={student.motherOccupation}
										onChange={(e) => handleChange('motherOccupation', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Nghề nghiệp GH:
									</p>
									<Input
										value={student.guardianOccupation}
										onChange={(e) => handleChange('guardianOccupation', e.target.value)}
										className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
									/>
								</div>
							</div>
						</div>
						<div className="font-['Source Sans Pro'] pt-5 text-base font-bold tracking-tight text-[#cc5c00]">
							Thông tin học viên
						</div>
						<div className='flex gap-4 pb-5'>
							<div className='flex items-center gap-x-[55px]'>
								<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
									Điện thoại bố:
								</p>
								<Input
									value={student.fatherPhone}
									onChange={(e) => handleChange('fatherPhone', e.target.value)}
									className='inline-flex h-10 w-[340px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
								/>
							</div>
							<div className='flex items-center gap-x-[55px]'>
								<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
									Điện thoại mẹ:
								</p>
								<Input
									value={student.motherPhone}
									onChange={(e) => handleChange('motherPhone', e.target.value)}
									className='inline-flex h-10 w-[340px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
								/>
							</div>
							<div className='flex items-center gap-x-[55px]'>
								<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
									Điện thoại GH:
								</p>
								<Input
									value={student.guardianPhone}
									onChange={(e) => handleChange('guardianPhone', e.target.value)}
									className='inline-flex h-10 w-[340px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center pt-12'>
				<div className='flex items-center gap-4'>
					<Button onClick={onCancel} className='w-[146px]'>
						Hủy
					</Button>
					<Button type='primary' onClick={handleSubmit} className='w-[146px]'>
						Lưu
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddStudent;
