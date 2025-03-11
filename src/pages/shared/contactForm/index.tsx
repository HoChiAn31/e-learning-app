import React, { useState } from 'react';
import { Radio, Input, Button } from 'antd';
import ReactQuill from 'react-quill';
import { Mail, Phone, Position } from '../../../components/icon';

const SharedContactFormPage: React.FC = () => {
	const [formType, setFormType] = useState<string>('Dịch vụ');
	const [subject, setSubject] = useState<string>('');
	const [message, setMessage] = useState<string>('');

	const handleFormTypeChange = (e: any) => {
		setFormType(e.target.value);
	};

	const handleSubmit = () => {
		console.log('Form Type:', formType);
		console.log('Subject:', subject);
		console.log('Message:', message);
	};

	const quillModules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline'],
			['link'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['clean'], // Remove formatting button
		],
	};

	return (
		<div className='relative flex h-[800px] items-center rounded-md bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
			{/* Main Form Section */}
			<div className='flex-1 space-y-6 p-8'>
				<div className='space-y-2'>
					<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
						Bạn có thắc mắc?
					</div>
					<div className="justify-start font-['Mulish'] text-lg font-semibold tracking-tight text-black opacity-50">
						Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất có thể.
					</div>
				</div>

				<div className='rounded-lg'>
					<Radio.Group onChange={handleFormTypeChange} value={formType} className='mb-4 space-x-8'>
						<Radio value='Dịch vụ'>Dịch vụ</Radio>
						<Radio value='Hỗ trợ'>Hỗ trợ</Radio>
						<Radio value='Sample'>Sample</Radio>
						<Radio value='Samples'>Samples</Radio>
					</Radio.Group>

					<Input
						placeholder='Chủ đề'
						className='mb-4 w-full'
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
					/>
					<div>
						<ReactQuill
							value={message}
							onChange={setMessage}
							placeholder='Nhập nội dung thông báo'
							modules={quillModules}
							className='h-80'
						/>
					</div>
					<div className='flex items-center justify-center pb-20 pt-16'>
						<Button type='primary' className='h-12 px-10' onClick={handleSubmit}>
							Gửi
						</Button>
					</div>
				</div>
			</div>

			{/* Sidebar Section */}
			<div className='w-[420px]'>
				<div className='sticky z-50 space-y-6'>
					<div className='flex w-[484px] items-center justify-center bg-[#FEF3EF] py-40 text-gray-800 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
						<div className='space-y-5'>
							<p className="font-['Mulish'] text-[28px] font-extrabold tracking-wide text-[#373839]">
								Thông tin
							</p>
							<ul className='space-y-8'>
								<li className='flex'>
									<div className='mr-2 border-r-2 border-[#373839] px-2'>
										<Position />
									</div>
									<div>
										<div>
											<span className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
												CN1:
											</span>
											<span className="font-['Source Sans Pro'] text-lg font-semibold tracking-tight text-[#373839]">
												{' '}
												86/33 Âu Cơ, Phường 9, Quận Tân Bình
											</span>
										</div>
										<div>
											<span className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
												CN2:
											</span>
											<span className="font-['Source Sans Pro'] text-lg font-semibold tracking-tight text-[#373839]">
												{' '}
												86/33 Âu Cơ, Phường 9, Quận Tân Bình
											</span>
										</div>
										<div>
											<span className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
												CN3:
											</span>
											<span className="font-['Source Sans Pro'] text-lg font-semibold tracking-tight text-[#373839]">
												{' '}
												86/33 Âu Cơ, Phường 9, Quận Tân Bình
											</span>
										</div>
									</div>
								</li>
								<li className='flex'>
									<div className='mr-2 border-r-2 border-[#373839] px-2'>
										<Phone />
									</div>
									<div>
										<div>
											<span className="font-['Source Sans Pro'] text-lg font-semibold tracking-tight text-[#373839]">
												(028) 2243 6888
											</span>
										</div>

										<div>
											<span className="font-['Source Sans Pro'] text-lg font-semibold tracking-tight text-[#373839]">
												(028) 6268 1426
											</span>
										</div>
									</div>
								</li>
								<li className='flex'>
									<div className='mr-2 border-r-2 border-[#373839] px-2'>
										<Mail />
									</div>
									<div>
										<div>
											<span className="font-['Source Sans Pro'] text-lg font-semibold tracking-tight text-[#373839]">
												media.info@alta.com.vn
											</span>
										</div>
									</div>
								</li>
								<li> </li>
							</ul>
						</div>
					</div>
				</div>
				<div className='absolute -right-16 bottom-0 top-0'>
					<div className='h-[800px] w-[280px] bg-[#cc5c00]' />
				</div>
			</div>
		</div>
	);
};

export default SharedContactFormPage;
