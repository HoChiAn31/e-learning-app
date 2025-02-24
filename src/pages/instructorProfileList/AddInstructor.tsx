import { FC } from 'react';
import { ArrowRight, Camera, UserAvatar } from '../../components/icon';
import { Button, Input } from 'antd';

interface AddInstructorProps {
	onAddInstructor: () => void;
	onCancel: () => void;
}
const AddInstructor: FC<AddInstructorProps> = ({ onAddInstructor, onCancel }) => {
	return (
		<div className=''>
			{/* <div className='inline-flex h-[60px] w-[548px] items-center justify-center'>
				<div className='inline-flex items-center justify-start gap-6 px-2.5'>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]">
						Hồ sơ học viên
					</div>
					<div data-svg-wrapper className='relative'>
						<ArrowRight />
					</div>
					<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
						Thêm học viên
					</div>
				</div>
			</div> */}
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
								<UserAvatar />
								<div className='absolute -bottom-8'>
									<button>
										<Camera />
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* Infor */}
					<div>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
							Thông tin học viên
						</div>
						<div className='flex items-center gap-28'>
							{/* Left */}
							<div className='space-y-4'>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Họ và tên:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Giới tính:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Ngày sinh:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Nơi sinh:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Dân tộc:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Tôn giáo:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
							</div>
							{/* Right */}
							<div className='space-y-4'>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Niên khoá:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Khối:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Mã học viên:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Ngày nhập học:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Hình thức:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Trạng thái:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
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
					{/* Infor */}
					<div>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
							Địa chỉ liên hệ
						</div>
						<div className='flex items-center gap-28'>
							{/* Left */}
							<div className='space-y-4'>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Tỉnh/Thành phố:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Quận/Huyện:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Xã/Phường:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
							</div>
							{/* Right */}
							<div className='space-y-4'>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Địa chỉ:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Email :
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Điện thoại
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
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
							{/* Row1 */}
							<div className='space-y-4'>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Họ và tên:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Giới tính:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Ngày sinh:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
							</div>
							{/* Row2 */}
							<div className='space-y-4'>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Niên khoá:
									</p>
									<Input className='inline-flex h-10 w-[104px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Khối:
									</p>
									<Input className='inline-flex h-10 w-[104px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Mã học viên:
									</p>
									<Input className='inline-flex h-10 w-[104px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
							</div>
							{/* Row3 */}
							<div className='space-y-4'>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Niên khoá:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Khối:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
								<div className='flex items-center gap-x-[55px]'>
									<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
										Mã học viên:
									</p>
									<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
								</div>
							</div>
						</div>
						<div className="font-['Source Sans Pro'] pt-5 text-base font-bold tracking-tight text-[#cc5c00]">
							Thông tin học viên
						</div>
						<div className='flex gap-4 space-y-10 pb-5'>
							<div className='flex items-center gap-x-[55px]'>
								<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
									Điện thoại
								</p>
								<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
							</div>
							<div className='flex items-center gap-x-[55px]'>
								<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
									Điện thoại
								</p>
								<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
							</div>
							<div className='flex items-center gap-x-[55px]'>
								<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
									Điện thoại
								</p>
								<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center pt-12'>
				<div className='flex items-center gap-4'>
					<Button onClick={onAddInstructor} className='w-[146px]'>
						Hủy
					</Button>
					<Button onClick={onCancel} className='w-[146px]'>
						Lưu
					</Button>
				</div>
			</div>
		</div>
	);
};
export default AddInstructor;
