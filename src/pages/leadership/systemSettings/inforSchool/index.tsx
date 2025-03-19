import { Button, Input } from 'antd';
import { InputHTMLAttributes } from 'react';
import { Edit, Plus } from '../../../../components/icon';
import { useNavigate } from 'react-router-dom';

// Interface cho thông tin chung của trường
interface SchoolGeneralInfo {
	schoolName: string;
	standardCode: string;
	provinceCity: string;
	ward: string;
	district: string;
	isMainCampus: string;
	schoolType: string;
	phoneNumber: string;
	fax: string;
	email: string;
	establishedDate: string;
	trainingModel: string;
	website: string;
	principalName: string;
	principalPhone: string;
}

// Interface cho thông tin cơ sở
interface CampusInfo {
	campusName: string;
	email: string;
	phoneNumber: string;
	address: string;
	responsiblePerson: string;
	responsiblePersonPhone: string;
}

// Interface tổng hợp cho toàn bộ thông tin trường
interface SchoolInfo {
	generalInfo: SchoolGeneralInfo;
	campuses: CampusInfo[];
}

// Object chứa dữ liệu mẫu
const schoolData: SchoolInfo = {
	generalInfo: {
		schoolName: 'THCS Tự Lập',
		standardCode: '20202021',
		provinceCity: 'Tp. Hồ Chí Minh',
		ward: 'Phường 1',
		district: 'Bình Thạnh',
		isMainCampus: 'Không',
		schoolType: 'Trung học cơ sở',
		phoneNumber: '0123456789',
		fax: '0123456789',
		email: 'nguyenxasjke@gmail.com',
		establishedDate: '05/09/2013',
		trainingModel: 'Công lập',
		website: 'https://truongabc.com.vn',
		principalName: 'Bùi Văn Phát',
		principalPhone: '0989222112',
	},
	campuses: [
		{
			campusName: 'Trung học cơ sở Tự Lập Cơ Sở A',
			email: 'nguyesssss@gmail.com',
			phoneNumber: '014521447741',
			address: '12 Nguyễn Văn A, phường 12 Quận 6, thành phố Hồ Chí Minh',
			responsiblePerson: 'Nguyễn Văn A',
			responsiblePersonPhone: '014521447741',
		},
	],
};

// Interface cho InfoField props
interface InfoFieldProps {
	label: string;
	children: React.ReactNode;
}

// Component InfoField
const InfoField: React.FC<InfoFieldProps> = ({ label, children }) => (
	<div className='flex items-center'>
		<p className="font-['Source Sans Pro'] w-[140px] text-base font-bold tracking-tight text-[#373839] opacity-80">
			{label}:
		</p>
		{children}
	</div>
);

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	value?: string | number | undefined;
	inputSize?: string; // Đổi từ 'size' thành 'inputSize'
}

// Component CustomInput
const CustomInput: React.FC<CustomInputProps> = ({ className, value, inputSize }) => (
	<Input
		value={value}
		className={`${value !== undefined ? 'border-none' : 'border bg-[#F2F2F2]'} ${inputSize === 'xl' ? 'w-[420px]' : 'w-[280px]'} inline-flex h-10 items-center justify-start gap-6 overflow-hidden rounded-lg px-4 py-2 ${className}`}
	/>
);

// Component chính
function InforSchoolPage() {
	const nav = useNavigate();

	const handleEdit = () => {
		nav('/systemSettings/inforSchool/editor');
	};

	return (
		<div>
			<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
				Thông tin nhà trường
			</div>
			<div className='flex items-center justify-between py-5'>
				<div className='inline-flex h-8 w-[133px] items-center justify-center'>
					<div className='inline-flex h-8 w-[136px] items-center justify-between rounded border border-[#373839] bg-white pl-2 pr-1'>
						<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
							2020-2021
						</div>
						<div data-svg-wrapper>
							<svg
								width='29'
								height='32'
								viewBox='0 0 29 32'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M0.5 0.5V31.5' stroke='#373839' />
								<path
									d='M23.1072 12.3724C22.8583 12.1339 22.5217 12 22.1709 12C21.82 12 21.4834 12.1339 21.2346 12.3724L16.4668 16.9061L11.7654 12.3724C11.5166 12.1339 11.18 12 10.8291 12C10.4783 12 10.1417 12.1339 9.89284 12.3724C9.76836 12.4915 9.66956 12.6331 9.60214 12.7892C9.53471 12.9453 9.5 13.1126 9.5 13.2817C9.5 13.4508 9.53471 13.6182 9.60214 13.7742C9.66956 13.9303 9.76836 14.072 9.89284 14.191L15.5239 19.6212C15.6473 19.7412 15.7942 19.8365 15.9561 19.9015C16.1179 19.9665 16.2915 20 16.4668 20C16.6421 20 16.8157 19.9665 16.9775 19.9015C17.1394 19.8365 17.2863 19.7412 17.4097 19.6212L23.1072 14.191C23.2316 14.072 23.3304 13.9303 23.3979 13.7742C23.4653 13.6182 23.5 13.4508 23.5 13.2817C23.5 13.1126 23.4653 12.9453 23.3979 12.7892C23.3304 12.6331 23.2316 12.4915 23.1072 12.3724Z'
									fill='#FF7506'
								/>
							</svg>
						</div>
					</div>
				</div>

				<div className='flex items-center gap-1'>
					<Button className='h-[52px]' size='middle'>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-primary">
							Xuất file
						</div>
					</Button>
					<Button
						className='h-[52px]'
						type='primary'
						icon={<Edit color='#ffffff' />}
						size='middle'
						onClick={handleEdit}
					>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
							Chỉnh sửa
						</div>
					</Button>
				</div>
			</div>

			{/* Thông tin trường */}
			<div className=''>
				{/* Thông tin chung */}
				<div className='inline-flex h-14 w-[1644px] items-center justify-start overflow-hidden rounded-t-xl bg-[#cc5c00] pb-4 pl-[63px] pr-[1434px] pt-[17px]'>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Thông tin chung
					</div>
				</div>
				<div className='flex w-[1644px] gap-x-32 p-20 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
					<div>
						<img src='https://i.imgur.com/vlD0O4q.png' alt='' />
					</div>
					<div className='flex gap-10'>
						{/* Left Section */}
						<div className='space-y-1'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
								{schoolData.generalInfo.schoolName} Cơ Sở A
							</div>
							<InfoField label='Tên trường'>
								<CustomInput value={schoolData.generalInfo.schoolName} />
							</InfoField>
							<InfoField label='Mã chuẩn'>
								<CustomInput value={schoolData.generalInfo.standardCode} />
							</InfoField>
							<InfoField label='Tỉnh/Thành phố'>
								<CustomInput value={schoolData.generalInfo.provinceCity} />
							</InfoField>
							<InfoField label='Xã/Phường'>
								<CustomInput value={schoolData.generalInfo.ward} />
							</InfoField>
							<InfoField label='Quận/Huyện'>
								<CustomInput value={schoolData.generalInfo.district} />
							</InfoField>
							<InfoField label='Trụ sở chính'>
								<CustomInput value={schoolData.generalInfo.isMainCampus} />
							</InfoField>
							<InfoField label='Loại trường'>
								<CustomInput value={schoolData.generalInfo.schoolType} />
							</InfoField>
							<InfoField label='Số điện thoại'>
								<CustomInput value={schoolData.generalInfo.phoneNumber} />
							</InfoField>
						</div>

						{/* Right Section */}
						<div className='space-y-1 pt-7'>
							<InfoField label='Fax'>
								<CustomInput value={schoolData.generalInfo.fax} />
							</InfoField>
							<InfoField label='Email'>
								<CustomInput value={schoolData.generalInfo.email} />
							</InfoField>
							<InfoField label='Ngày thành lập'>
								<CustomInput value={schoolData.generalInfo.establishedDate} />
							</InfoField>
							<InfoField label='Mô hình đào tạo'>
								<CustomInput value={schoolData.generalInfo.trainingModel} />
							</InfoField>
							<InfoField label='Website'>
								<CustomInput value={schoolData.generalInfo.website} />
							</InfoField>
							<InfoField label='Hiệu trưởng'>
								<CustomInput value={schoolData.generalInfo.principalName} />
							</InfoField>
							<InfoField label='Sđt hiệu trưởng'>
								<CustomInput value={schoolData.generalInfo.principalPhone} />
							</InfoField>
						</div>
					</div>
				</div>

				{/* Danh sách cơ sở */}
				<div className='inline-flex h-14 w-[1644px] items-center justify-start overflow-hidden bg-[#cc5c00] pb-4 pl-[63px] pr-[1416px] pt-[17px]'>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Danh sách cơ sở
					</div>
				</div>
				<div className='mb-10 flex w-[1644px] gap-x-32 rounded-b-xl bg-white p-20 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
					<div>
						<img src='https://i.imgur.com/odkBCK3.png' alt='' className='rounded-xl' />
					</div>
					<div>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
							{schoolData.campuses[0].campusName}
						</div>
						<div className='space-y-1'>
							<InfoField label='Email'>
								<CustomInput value={schoolData.campuses[0].email} />
							</InfoField>
							<InfoField label='SĐT'>
								<CustomInput value={schoolData.campuses[0].phoneNumber} />
							</InfoField>
						</div>
						<InfoField label='Địa chỉ'>
							<CustomInput value={schoolData.campuses[0].address} inputSize='xl' />
						</InfoField>
					</div>
					<div>
						<div className='space-y-1 pt-6'>
							<InfoField label='Người phụ trách'>
								<CustomInput value={schoolData.campuses[0].responsiblePerson} />
							</InfoField>
							<InfoField label='SĐT'>
								<CustomInput value={schoolData.campuses[0].responsiblePersonPhone} />
							</InfoField>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default InforSchoolPage;
