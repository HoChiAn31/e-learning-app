import React from 'react';

const ConfigPage = () => {
	return (
		<div className='flex items-center justify-center p-4'>
			<div className='min-h-[80vh] w-full rounded-lg bg-white p-6 shadow-lg'>
				<div className='grid grid-cols-2 gap-6'>
					{/* Left Column - Form */}

					<div className='space-y-5'>
						<div className="font-['Mulish'] text-[28px] font-extrabold tracking-wide text-[#373839]">
							Cấu hình
						</div>
						<div className=''>
							<div className='flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(154,202,245,0.25)]'>
								<img src='https://i.imgur.com/cycXAQ7.png' alt='' />
							</div>
						</div>
						<div className=''>
							<p className='text-center text-sm text-gray-600'>Thème đang sử dụng</p>
						</div>
						<div className='flex items-center'>
							<div className="font-['Source Sans Pro'] w-28 text-base font-bold tracking-tight text-[#373839]">
								Captcha:
							</div>
							<div className='flex items-center'>
								<input type='checkbox' className='mr-2' />
								<span className='text-gray-700'>Kích hoạt captcha để nhận vào hệ thống</span>
							</div>
						</div>
						<div className='flex items-center'>
							<p className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
								Ngôn ngữ:
							</p>
							<input
								type='text'
								className='w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
								placeholder='Tiếng Việt'
							/>
						</div>
					</div>

					{/* Right Column - Theme Selection */}
					<div>
						<div className="font-['Mulish'] text-[28px] font-extrabold tracking-wide text-[#373839]">
							Theme hiện có
						</div>
						<div className='grid grid-cols-3 gap-4'>
							{[
								'Lorem ipsum dolor sit',
								'Lorem ipsum dolor sit',
								'Lorem ipsum dolor sit',
								'Lorem ipsum dolor sit',
								'Lorem ipsum dolor sit',

								'Lorem ipsum dolor sit',
							].map((theme, index) => (
								<div>
									<div className='flex items-center justify-center'>
										<div className='h-[113px] w-[201px] rounded-lg bg-[#ecf7fd]' />
									</div>
									<div key={index} className='text-center text-gray-500'>
										{theme}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Buttons */}
				<div className='mt-6 flex justify-end space-x-4'>
					<button className='rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-100'>
						Hủy
					</button>
					<button className='rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600'>
						Lưu
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfigPage;
