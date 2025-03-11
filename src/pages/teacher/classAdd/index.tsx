import React from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd';
import type { DatePickerProps } from 'antd/es/date-picker';
import { DataType } from './types';
import BreadcrumbLink from '../../../components/BreadcrumbLinkProps';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const TeacherClassAddPage: React.FC = () => {
	const [form] = Form.useForm<DataType>();

	const onFinish = (values: DataType) => {
		console.log('Received values:', values);
		// Xử lý logic thêm buổi học mới ở đây
	};

	const onReset = () => {
		form.resetFields();
	};

	const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString);
	};
	// const handleSetUrl = (e: React.MouseEvent<HTMLAnchorElement>) => {
	// 	e.preventDefault();
	// 	localStorage.setItem('activeMainTab', '/teacher/class');
	// 	localStorage.setItem('activeSubTab', ' /list');
	// 	window.location.href = '/teacher/class/list';
	// };
	return (
		<div className=''>
			<BreadcrumbLink
				to='/teacher/class/list'
				parentPage='Quản lý lớp học'
				currentPage='Thêm buổi học mới'
				// onClick={handleSetUrl}
			/>

			<div className='rounded-2xl bg-white px-[300px] py-6 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<Form
					form={form}
					name='add_class_session'
					onFinish={onFinish}
					layout='vertical'
					initialValues={{
						status: false,
						autoStart: false,
						notification: false,
						allowEarlyAccess: false,
					}}
					className='space-y-5'
				>
					<div className='flex items-center justify-between gap-5'>
						<p className="font-['Source Sans Pro'] w-[200px] text-base font-bold text-[#373839]">
							Mã lớp:
						</p>
						<Form.Item
							name='courseCode'
							rules={[{ required: true, message: 'Vui lòng nhập mã lớp!' }]}
							className='mb-0 flex-1'
						>
							<Input placeholder='Nhập mã lớp' className='h-10 w-[590px]' />
						</Form.Item>
					</div>

					<div className='flex items-start justify-between gap-5'>
						<span className="font-['Source Sans Pro'] w-[200px] text-base font-bold tracking-tight text-[#373839]">
							Mô tả:
						</span>
						<Form.Item
							name='description'
							rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
							className='mb-0 flex-1'
						>
							<TextArea placeholder='Nhập mô tả' className='w-[590px]' />
						</Form.Item>
					</div>

					<div className='flex items-center justify-between gap-5'>
						<span className="font-['Source Sans Pro'] w-[200px] text-base font-bold tracking-tight text-[#373839]">
							Trợ giảng:
						</span>
						<Form.Item
							name='assistant'
							rules={[{ required: true, message: 'Vui lòng chọn trợ giảng!' }]}
							className='mb-0 flex-1'
						>
							<Select placeholder='Chọn trợ giảng' className='h-10 !w-[590px]'>
								<Option value='NguyenVanA'>Nguyễn Văn A</Option>
								<Option value='TranThiB'>Trần Thị B</Option>
								<Option value='LeVanC'>Lê Văn C</Option>
								<Option value='PhamThiD'>Phạm Thị D</Option>
								<Option value='HoangVanE'>Hoàng Văn E</Option>
								<Option value='BuiThiF'>Bùi Thị F</Option>
							</Select>
						</Form.Item>
					</div>

					<div className='flex items-center justify-between gap-5'>
						<span className="font-['Source Sans Pro'] w-[200px] text-base font-bold tracking-tight text-[#373839]">
							Thời lượng:
						</span>
						<div className='mb-0 flex !w-[590px] flex-1 gap-20'>
							<div className='flex items-center gap-2'>
								<Form.Item
									name={['duration', 'hours']}
									rules={[{ required: true, message: 'Chọn giờ!' }]}
									className='mb-0 !w-24 flex-1'
								>
									<Select placeholder='Giờ' className='h-10 !w-24'>
										{Array.from({ length: 24 }, (_, i) => (
											<Option key={i} value={i.toString().padStart(2, '0')}>
												{i.toString().padStart(2, '0')}
											</Option>
										))}
									</Select>
								</Form.Item>
								<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									Giờ
								</p>
							</div>
							<div className='flex items-center gap-2'>
								<Form.Item
									name={['duration', 'minutes']}
									rules={[{ required: true, message: 'Chọn phút!' }]}
									className='mb-0 !w-24 flex-1'
								>
									<Select placeholder='Phút' className='h-10 !w-24'>
										<Option value='00'>00</Option>
										<Option value='15'>15</Option>
										<Option value='30'>30</Option>
										<Option value='45'>45</Option>
									</Select>
								</Form.Item>
								<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
									Phút
								</p>
							</div>
						</div>
					</div>

					<div className='flex items-center justify-between gap-5'>
						<span className="font-['Source Sans Pro'] w-[200px] text-base font-bold tracking-tight text-[#373839]">
							Ngày bắt đầu:
						</span>
						<Form.Item
							name='startDate'
							rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
							className='mb-0 flex-1'
						>
							<DatePicker
								showTime
								format='DD/MM/YYYY HH:mm'
								onChange={onDateChange}
								placeholder='Chọn ngày và giờ bắt đầu'
								className='h-10 w-[590px]'
							/>
						</Form.Item>
					</div>

					<div className='flex items-center justify-between gap-5'>
						<span className="font-['Source Sans Pro'] w-[200px] text-base font-bold tracking-tight text-[#373839]">
							Ngày kết thúc:
						</span>
						<Form.Item
							name='endDate'
							rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
							className='mb-0 flex-1'
						>
							<DatePicker
								showTime
								format='DD/MM/YYYY HH:mm'
								onChange={onDateChange}
								placeholder='Chọn ngày và giờ kết thúc'
								className='h-10 w-[590px]'
							/>
						</Form.Item>
					</div>

					<div className='flex items-center justify-between gap-5'>
						<span className="font-['Source Sans Pro'] w-[200px] text-base font-bold tracking-tight text-[#373839]">
							Bảo mật:
						</span>
						<Form.Item
							name='security'
							rules={[{ required: true, message: 'Vui lòng nhập thông tin bảo mật!' }]}
							className='mb-0 flex-1'
						>
							<Input.Password
								placeholder='Nhập thông tin bảo mật'
								className='h-10 w-[590px]'
								iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
							/>
						</Form.Item>
					</div>

					<div className='flex items-start gap-5'>
						<span className="font-['Source Sans Pro'] mt-2 w-[200px] text-base font-bold tracking-tight text-[#373839]">
							Cài đặt khác
						</span>
						<div className=''>
							<Form.Item name='status' valuePropName='checked' className='mb-0'>
								<Checkbox>Bắt đầu</Checkbox>
							</Form.Item>
							<Form.Item name='autoStart' valuePropName='checked' className='mb-0'>
								<Checkbox>Tự động hóa buổi học</Checkbox>
							</Form.Item>
							<Form.Item name='notification' valuePropName='checked' className='mb-0'>
								<Checkbox>Bật thông báo buổi học</Checkbox>
							</Form.Item>
							<Form.Item name='allowEarlyAccess' valuePropName='checked' className='mb-0'>
								<Checkbox>Cho phép xem/vào phòng trước giờ buổi học</Checkbox>
							</Form.Item>
						</div>
					</div>

					<div className='flex w-[800px] items-start justify-between gap-5'>
						<span className="font-['Source Sans Pro'] mt-2 w-[200px] text-base font-bold tracking-tight text-[#373839]">
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
					{/* 
					<Form.Item>
						<div className='flex justify-center gap-4'>
							<Button type='default' onClick={onReset}>
								Hủy
							</Button>
							<Button
								type='primary'
								htmlType='submit'
								style={{ backgroundColor: '#FF7506', borderColor: '#FF7506' }}
							>
								Lưu
							</Button>
						</div>
					</Form.Item> */}
				</Form>
			</div>
			<div className='flex items-center justify-center py-5'>
				<div className='flex items-center gap-5'>
					<Button type='default' onClick={onReset} className='h-12 w-40'>
						Hủy
					</Button>
					<Button type='primary' htmlType='submit' className='h-12 w-40'>
						Lưu
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TeacherClassAddPage;
