import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
interface InfoFieldProps {
	label: string;
	children: React.ReactNode;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, children }) => (
	<div className='flex items-center'>
		<p className="font-['Source Sans Pro'] w-[140px] text-base font-bold tracking-tight text-[#373839] opacity-80">
			{label}:
		</p>
		{children}
	</div>
);

const CustomInput: React.FC<{
	className?: string;
	value?: string | number | undefined;
	size?: string;
}> = ({ className, value, size }) => (
	<Input
		value={value}
		className={`border bg-[#F2F2F2] ${size === 'xl' ? 'w-[420px]' : 'w-[280px]'} inline-flex h-10 items-center justify-start gap-6 overflow-hidden rounded-lg px-4 py-2 ${className}`}
	/>
);
function EditInforSchoolPage() {
	const nav = useNavigate();
	const handleCancelEdit = () => {
		nav('/systemSettings/inforSchool');
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
					{/* <Button>Xuất file</Button>
					<Button>Chỉnh sửa</Button> */}
					<Button
						className='h-[52px]'
						// type='primary'
						// icon={<Plus />}
						size='middle'
						onClick={handleCancelEdit}
						// variant='outlined'
					>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-primary">
							Hủy
						</div>
					</Button>
					<Button className='h-[52px]' type='primary' size='middle' onClick={handleCancelEdit}>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
							Lưu
						</div>
					</Button>
				</div>
			</div>
			{/* Infor school */}
			<div className=''>
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
						<div className='space-y-2'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
								Trung học cơ sở Tự Lập Cơ Sở A
							</div>
							<InfoField label='Tên trường'>
								<CustomInput value='THCS Tự Lập' />
							</InfoField>
							<InfoField label='Mã chuẩn'>
								<CustomInput value='20202021' />
							</InfoField>
							<InfoField label='Tỉnh/Thành phố'>
								<CustomInput value='Tp. Hồ Chí Minh' />
							</InfoField>
							<InfoField label='Xã/Phường'>
								<CustomInput value='Phường 1' />
							</InfoField>
							<InfoField label='Quận/Huyện'>
								<CustomInput value='Bình Thạnh' />
							</InfoField>
							<InfoField label='Trụ sở chính'>
								<CustomInput value='Không' />
							</InfoField>
							<InfoField label='Loại trường'>
								<CustomInput value='Trung học cơ sở' />
							</InfoField>
							<InfoField label='Số điện thoại'>
								<CustomInput value='0123456789' />
							</InfoField>
						</div>

						{/* Right Section */}
						<div className='space-y-2 pt-7'>
							<InfoField label='Fax'>
								<CustomInput value='0123456789' />
							</InfoField>
							<InfoField label='Email'>
								<CustomInput value='nguyenxasjke@gmail.com' />
							</InfoField>
							<InfoField label='Ngày thành lập'>
								<CustomInput value='05/09/2013' />
							</InfoField>
							<InfoField label='Mô hình đào tạo'>
								<CustomInput value='Công lập' />
							</InfoField>
							<InfoField label='Website'>
								<CustomInput value='https://truongabc.com.vn' />
							</InfoField>
							<InfoField label='Hiệu trưởng:'>
								<CustomInput value='Bùi Văn Phát' />
							</InfoField>
							<InfoField label='Sđt hiệu trưởng:'>
								<CustomInput value='0989222112' />
							</InfoField>
						</div>
					</div>
				</div>
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
							Trung học cơ sở Tự Lập Cơ Sở A
						</div>
						<div className='space-y-2'>
							<InfoField label='Email'>
								<CustomInput value='nguyesssss@gmail.com' />
							</InfoField>
							<InfoField label='SĐT'>
								<CustomInput value='014521447741' />
							</InfoField>
						</div>
						<InfoField label='Địa chỉ'>
							<CustomInput
								value='12 Nguyễn Văn A, phường 12 Quận 6, thành phố Hồ Chí Minh'
								size='xl'
							/>
						</InfoField>
					</div>
					<div>
						<div className='space-y-2 pt-6'>
							<InfoField label='Người phụ trách:'>
								<CustomInput value='Nguyễn Văn A' />
							</InfoField>
							<InfoField label='SĐT'>
								<CustomInput value='014521447741' />
							</InfoField>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditInforSchoolPage;
