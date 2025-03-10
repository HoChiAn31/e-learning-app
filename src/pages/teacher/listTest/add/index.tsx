import { useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select } from 'antd';
import BreadcrumbLink from '../../../../components/BreadcrumbLinkProps';
import { Moment } from 'moment';

// Định nghĩa các type cho form data
interface Grade {
	number: number;
	allClasses: boolean;
	selectedClass: string;
}

interface Duration {
	hours: number;
	minutes: number;
}

interface DateTime {
	date: Moment | null;
	hour: string;
}

interface FormData {
	topic: string;
	awareness: string;
	grade: Grade;
	duration: Duration;
	classification: string;
	startDate: DateTime;
	endDate: DateTime;
	description: string;
	agreement: boolean;
}

function TeacherListAdd() {
	const [form] = Form.useForm();
	const [formData, setFormData] = useState<FormData>({
		topic: '',
		awareness: '',
		grade: {
			number: 10,
			allClasses: false,
			selectedClass: '',
		},
		duration: {
			hours: 0,
			minutes: 0,
		},
		classification: 'giua_hoc_ki_I',
		startDate: {
			date: null,
			hour: '',
		},
		endDate: {
			date: null,
			hour: '',
		},
		description: '',
		agreement: false,
	});

	const onFinish = (values: any) => {
		// Cập nhật state với giá trị từ form
		const newFormData: FormData = {
			topic: values.topic || '',
			awareness: values.awareness || '',
			grade: {
				number: values.grade?.number || 10,
				allClasses: values.grade?.allClasses || false,
				selectedClass: values.grade?.selectedClass || '',
			},
			duration: {
				hours: values.duration?.hours || 0,
				minutes: values.duration?.minutes || 0,
			},
			classification: values.classification || 'giua_hoc_ki_I',
			startDate: {
				date: values.startDate?.date || null,
				hour: values.startDate?.hour || '',
			},
			endDate: {
				date: values.endDate?.date || null,
				hour: values.endDate?.hour || '',
			},
			description: values.description || '',
			agreement: values.agreement || false,
		};

		setFormData(newFormData);

		// Log tất cả giá trị
		console.log('Form values:', {
			topic: newFormData.topic,
			awareness: newFormData.awareness,
			grade: {
				number: newFormData.grade.number,
				allClasses: newFormData.grade.allClasses,
				selectedClass: newFormData.grade.selectedClass,
			},
			duration: {
				hours: newFormData.duration.hours,
				minutes: newFormData.duration.minutes,
			},
			classification: newFormData.classification,
			startDate: {
				date: newFormData.startDate.date?.format('DD/MM/YYYY'),
				hour: newFormData.startDate.hour,
			},
			endDate: {
				date: newFormData.endDate.date?.format('DD/MM/YYYY'),
				hour: newFormData.endDate.hour,
			},
			description: newFormData.description,
			agreement: newFormData.agreement,
		});
	};

	return (
		<div>
			<BreadcrumbLink
				to='/teacher/class/list'
				parentPage='Bài kiểm tra'
				currentPage='Thêm bài kiểm tra mới'
			/>
			<div className='flex items-center justify-center'>
				<div className='w-full rounded-lg bg-white p-6 shadow-lg'>
					<div className='pr-60'>
						<Form
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 20 }}
							form={form}
							name='register'
							onFinish={onFinish}
							layout='horizontal'
						>
							<Form.Item name='topic' label='Chủ đề'>
								<Input placeholder='Lorem ipsum dolor sit amet' />
							</Form.Item>

							<Form.Item name='awareness' label='Hình thức'>
								<Radio.Group>
									<Radio value='trac_nghiem'>Trắc nghiệm</Radio>
									<Radio value='tu_luan'>Tự luận</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item name='grade' label='Khối'>
								<div className='space-y-4'>
									<div className='space-x-10'>
										<Form.Item name={['grade', 'number']} noStyle>
											<InputNumber min={1} defaultValue={10} style={{ width: '100px' }} />
										</Form.Item>
										<Form.Item name={['grade', 'allClasses']} valuePropName='checked' noStyle>
											<Checkbox>Chọn tất cả lớp</Checkbox>
										</Form.Item>
									</div>
									<Form.Item name={['grade', 'selectedClass']} noStyle>
										<Radio.Group>
											<Radio.Button value='10A1'>10A1</Radio.Button>
											<Radio.Button value='10A2'>10A2</Radio.Button>
											<Radio.Button value='10A3'>10A3</Radio.Button>
											<Radio.Button value='10A4'>10A4</Radio.Button>
										</Radio.Group>
									</Form.Item>
								</div>
							</Form.Item>

							<Form.Item name='duration' label='Thời lượng'>
								<div className='flex items-center gap-10'>
									<div className='space-x-2'>
										<Form.Item name={['duration', 'hours']} noStyle>
											<InputNumber min={0} defaultValue={0} className='w-16' />
										</Form.Item>
										<span className='text-gray-700'>Giờ</span>
									</div>
									<div className='space-x-2'>
										<Form.Item name={['duration', 'minutes']} noStyle>
											<InputNumber min={0} max={59} defaultValue={0} className='w-16' />
										</Form.Item>
										<span className='text-gray-700'>Phút</span>
									</div>
								</div>
							</Form.Item>

							<Form.Item name='classification' label='Phân loại'>
								<Select
									defaultValue='giua_hoc_ki_I'
									options={[
										{ value: 'giua_hoc_ki_I', label: 'Giữa học kì I' },
										{ value: 'cuoi_hoc_ki_I', label: 'Cuối học kì I' },
										{ value: 'giua_hoc_ki_II', label: 'Giữa học kì II' },
										{ value: 'cuoi_hoc_ki_II', label: 'Cuối học kì II' },
									]}
								/>
							</Form.Item>

							<Form.Item name='startDate' label='Ngày bắt đầu'>
								<div className='flex items-center gap-4'>
									<Form.Item name={['startDate', 'date']} noStyle>
										<DatePicker format='DD/MM/YYYY' placeholder='Chọn ngày' className='w-40' />
									</Form.Item>
									<Form.Item name={['startDate', 'hour']} noStyle>
										<Select
											placeholder='Chọn giờ'
											options={[...Array(24)].map((_, index) => ({
												value: index.toString().padStart(2, '0'),
												label: `${index.toString().padStart(2, '0')}:00`,
											}))}
										/>
									</Form.Item>
								</div>
							</Form.Item>

							<Form.Item name='endDate' label='Ngày kết thúc'>
								<div className='flex items-center gap-4'>
									<Form.Item name={['endDate', 'date']} noStyle>
										<DatePicker format='DD/MM/YYYY' placeholder='Chọn ngày' className='w-40' />
									</Form.Item>
									<Form.Item name={['endDate', 'hour']} noStyle>
										<Select
											placeholder='Chọn giờ'
											options={[...Array(24)].map((_, index) => ({
												value: index.toString().padStart(2, '0'),
												label: `${index.toString().padStart(2, '0')}:00`,
											}))}
										/>
									</Form.Item>
								</div>
							</Form.Item>

							<Form.Item name='description' label='Mô tả'>
								<Input.TextArea
									rows={4}
									placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
								/>
							</Form.Item>

							<Form.Item name='agreement' valuePropName='checked' label='Cài đặt khác'>
								<Checkbox>Yêu cầu học viên đính kèm tệp</Checkbox>
							</Form.Item>

							<div className='my-10 flex items-center justify-center'>
								<div className='flex gap-10'>
									<Button htmlType='button' className='h-10 px-12'>
										Hủy
									</Button>
									<Button type='primary' htmlType='submit' className='h-10 px-12'>
										Lưu
									</Button>
								</div>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TeacherListAdd;
