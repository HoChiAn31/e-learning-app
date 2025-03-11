import { useParams } from 'react-router-dom';
import BreadcrumbLink from '../../../../components/BreadcrumbLinkProps';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { Plus } from '../../../../components/icon';
import ChatInterface from '../../../../components/ChatInterface';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
interface ScheduleCardProps {
	date: string;
	time: string;
	isSelected?: boolean;
	isCompleted?: boolean;
	isDisabled?: boolean;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
	date,
	time,
	isSelected = false,
	isCompleted = false,
	isDisabled = false,
}) => {
	return (
		<Card
			className={`m-2 w-32 rounded-lg text-center shadow-md ${
				isSelected
					? 'bg-orange-400 text-white'
					: isDisabled
						? 'bg-gray-300 text-gray-500'
						: 'bg-blue-100'
			}`}
		>
			<div className='text-sm'>{date}</div>
			<div className='text-xs'>{time}</div>
			{!isDisabled && (
				<div className='mt-2 flex justify-center'>
					<span className={`text-lg ${isCompleted ? 'text-green-500' : 'text-red-500'}`}>
						{isCompleted ? '✓' : '✗'}
					</span>
				</div>
			)}
		</Card>
	);
};
function TeacherClassDetailPage() {
	const { id } = useParams<{ id: string }>();
	const [isActive, setIsActive] = useState('general'); //qa

	return (
		<div>
			<BreadcrumbLink
				to='/teacher/class/list'
				parentPage='Thông tin lớp học'
				currentPage='Hỏi đáp'
				middleTitle='Toán đại số'
			/>
			<div className='mb-4 flex w-[561px] items-center gap-2 rounded-2xl bg-[#F2F2F2] p-1'>
				<Button
					size='middle'
					onClick={() => setIsActive('general')}
					shape='round'
					className={`${isActive === 'general' ? 'bg-black text-white' : 'bg-[#F2F2F2] text-[#373839]'} w-full border-none`}
				>
					<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
						Thông tin lớp học
					</div>
				</Button>
				<Button
					size='middle'
					onClick={() => setIsActive('qa')}
					shape='round'
					className={`${isActive === 'qa' ? 'bg-black text-white' : 'bg-[#F2F2F2] text-[#373839]'} w-full border-none`}
				>
					<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
						Hỏi đáp Q & A
					</div>
				</Button>
			</div>
			{isActive === 'general' && (
				<div>
					<div className='flex gap-10 rounded-2xl bg-white pb-5 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
						<div className='flex w-[280px] items-start justify-center pt-5'>
							<img
								className='h-[110px] w-[110px] rounded-full'
								src='https://i.imgur.com/EfU74V3.png'
								alt=''
							/>
						</div>
						<div>
							<div className='flex h-[110px] w-[1363px] items-center gap-28'>
								<div className='h-[61px] space-y-4 border-l-2 px-10'>
									<div className='flex items-center gap-2'>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Giáo viên:
										</div>
										<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
											Nguyễn Võ Văn A
										</div>
									</div>
									<div className='flex items-center gap-2'>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Bộ môn:
										</div>
										<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
											Lịch sử
										</div>
									</div>
								</div>
								<div className='h-[71px] w-[792px] space-y-4 border-l-2 px-10'>
									<div className='flex items-center gap-2'>
										<div className="font-['Source Sans Pro'] w-20 text-base font-bold tracking-tight text-[#373839]">
											Mô tả:
										</div>
										<div className="font-['Source Sans Pro'] w-[724px] text-base font-normal leading-tight text-[#373839]">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat, nulla
											nec tincidunt tincidunt, neque erat bibendum lectus
										</div>
									</div>
									<div className='flex items-center gap-2'>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Lớp:
										</div>

										<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
											10A1
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='space-y-2 bg-[#f0f3f6] py-3 pl-[360px]'>
						<div className='flex gap-20'>
							<div className="font-['Source Sans Pro'] w-28 text-base font-bold tracking-tight text-[#373839]">
								Lịch học:
							</div>
							<div>
								<span className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									Tổng số{' '}
								</span>
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									06
								</span>
								<span className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									{' '}
									buổi
								</span>
							</div>
						</div>
						<div className='flex gap-20'>
							<div className="font-['Source Sans Pro'] w-28 text-base font-bold tracking-tight text-[#373839]">
								Ngày bắt đầu:
							</div>
							<div>
								<span className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									19/08/2020
								</span>
							</div>
						</div>
						<div className='flex gap-20'>
							<div className="font-['Source Sans Pro'] w-28 text-base font-bold tracking-tight text-[#373839]">
								Ngày kết thúc:
							</div>
							<div>
								<span className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									24/09/2020
								</span>
							</div>
						</div>
						<div className='flex items-center bg-gray-100 p-4'>
							<ScheduleCard date='19/08/2020' time='14:00-14:45' isDisabled />
							<ScheduleCard date='20/08/2020' time='14:00-14:45' isSelected />
							<ScheduleCard date='21/08/2020' time='15:00-15:45' isCompleted />
							<ScheduleCard date='22/08/2020' time='15:00-15:30' />
							<ScheduleCard date='23/08/2020' time='16:00-16:45' isCompleted />
							<ScheduleCard date='24/08/2020' time='16:00-16:45' />
							<div className='flex h-14 w-14 items-center justify-center bg-blue-500 text-white hover:bg-blue-600'>
								<Button
									type='primary'
									// shape='circle'
									icon={<Plus />}
									className='bg-blue-500'
								/>
							</div>
						</div>
						<div className='flex gap-20'>
							<div className="font-['Source Sans Pro'] w-28 text-base font-bold tracking-tight text-[#373839]">
								Nội dung
							</div>
							<div>
								<span className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#c8c4c0]">
									Buổi 3
								</span>
							</div>
						</div>
						<div className='flex gap-20'>
							<div className="font-['Source Sans Pro'] w-28 text-base font-bold tracking-tight text-[#373839]">
								Ngày kiểm tra
							</div>
							<div>
								<span className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									24/09/2020
								</span>
							</div>
						</div>
					</div>
					<div className='space-y-4 bg-white py-4 pl-[360px] shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
						<div className='flex gap-20'>
							<div className="font-['Source Sans Pro'] w-28 text-base font-bold tracking-tight text-[#373839]">
								Mã lớp
							</div>
							<div>
								<span className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									785 4512 6325
								</span>
							</div>
						</div>
						<div className='flex gap-20'>
							<div className="font-['Source Sans Pro'] w-28 text-base font-bold tracking-tight text-[#373839]">
								Bảo mật
							</div>
							<Form.Item
								name='security'
								rules={[{ required: true, message: 'Vui lòng nhập thông tin bảo mật!' }]}
								className='mb-0 flex-1'
							>
								<Input.Password
									placeholder='Nhập...'
									className='h-10 w-[590px]'
									iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
								/>
							</Form.Item>
						</div>
						<div className='flex items-start gap-5'>
							<span className="font-['Source Sans Pro'] mt-2 w-[172px] text-base font-bold tracking-tight text-[#373839]">
								Cài đặt khác
							</span>
							<div className=''>
								<Form.Item name='status' valuePropName='checked' className='mb-0'>
									<Checkbox>Tự động kích hoạt buổi học khi đến thời gian bắt đầu</Checkbox>
								</Form.Item>
								<Form.Item name='autoStart' valuePropName='checked' className='mb-0'>
									<Checkbox>Bật tính năng lưu lại buổi học</Checkbox>
								</Form.Item>
								<Form.Item name='notification' valuePropName='checked' className='mb-0'>
									<Checkbox>Cho phép học viên/ cá nhân tham gia chia sẻ buổi học</Checkbox>
								</Form.Item>
							</div>
						</div>
						<div className='flex w-[800px] items-start gap-5'>
							<span className="font-['Source Sans Pro'] mt-2 w-[172px] text-base font-bold tracking-tight text-[#373839]">
								Link chia sẻ:
							</span>
							<div className='flex items-center gap-5'>
								<Form.Item name='meetingLink' className='mb-0 flex-1'>
									<Input placeholder='Nhập link' className='h-10 w-[470px]' />
								</Form.Item>

								<Button
									type='primary'
									// htmlType='submit'
									// style={{ backgroundColor: '#FF7506', borderColor: '#FF7506' }}
									className='h-10'
								>
									Copy link
								</Button>
							</div>
						</div>
					</div>
					<div className='flex items-center justify-center py-4'>
						<div className='inline-flex h-[53px] w-48 cursor-pointer items-center justify-center overflow-hidden rounded bg-[#ff7506] px-[25px] pb-4 pt-3.5'>
							<div className="text-center font-['Mulish'] text-lg font-extrabold tracking-tight text-[#fff9f4]">
								Bắt đầu lớp học
							</div>
						</div>
					</div>
				</div>
			)}
			{isActive === 'qa' && <ChatInterface />}
		</div>
	);
}

export default TeacherClassDetailPage;
