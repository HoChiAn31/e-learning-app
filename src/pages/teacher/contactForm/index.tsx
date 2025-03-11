import React, { useState } from 'react';
import { Radio, Input, Button } from 'antd';
import ReactQuill from 'react-quill';

const TeacherContactFormPage: React.FC = () => {
	const [formType, setFormType] = useState<string>('Dịch vụ');
	const [message, setMessage] = useState<string>('');

	const handleFormTypeChange = (e: any) => {
		setFormType(e.target.value);
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
						<Radio value='Dịch vụ' className=''>
							Dịch vụ
						</Radio>
						<Radio value='Hỗ trợ' className=''>
							Hỗ trợ
						</Radio>
						<Radio value='Sample' className=''>
							Sample
						</Radio>
						<Radio value='Samples' className=''>
							Sample
						</Radio>
					</Radio.Group>

					<Input
						placeholder='Chủ đề'
						// autoSize={{ minRows: 4, maxRows: 6 }}
						className='mb-4 w-full'
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
						<Button type='primary' className='bg-gray-500 text-white'>
							Gửi
						</Button>
					</div>
				</div>
			</div>

			{/* Sidebar Section */}
			<div className='w-[420px]'>
				{/* <div className='absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform'> */}
				<div className='sticky z-50'>
					<div className='h-[340px] w-[460px] bg-[#FEF3EF] text-gray-800'>
						<h3 className='mb-4 text-xl font-semibold'>Thông tin</h3>
						<ul className='space-y-2'>
							<li>
								<span className='mr-2'>📍</span>
								<span>CNE: 86/33 Au Co, Phường 9, Quận Tân Bình</span>
							</li>
							<li>
								<span className='mr-2'>📍</span>
								<span>CNE: 86/33 Au Co, Phường 9, Quận Tân Bình</span>
							</li>
							<li>
								<span className='mr-2'>📞</span>
								<span>(028) 6243 6888</span>
							</li>
							<li>
								<span className='mr-2'>📧</span>
								<span>media.info@alta.com.vn</span>
							</li>
						</ul>
					</div>
				</div>
				{/* </div> */}
				<div className='absolute -right-16 bottom-0 top-0'>
					<div className='h-[800px] w-[280px] bg-[#cc5c00]' />
				</div>
			</div>
		</div>
	);
};

export default TeacherContactFormPage;
