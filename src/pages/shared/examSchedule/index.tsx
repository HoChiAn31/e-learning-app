import React, { useState } from 'react';
import { Calendar, Button, Layout, Checkbox, ConfigProvider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import viVN from 'antd/es/locale/vi_VN';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('vi');

const { Sider, Content } = Layout;

interface Event {
	date: string;
	title: string;
	type: 'exam' | 'review' | 'submission';
}

const events: Event[] = [
	{ date: '2020-08-09', title: 'Lịch Số - Giải tích I', type: 'exam' },
	{ date: '2020-08-12', title: 'Tổ chức dự án - 45 phút', type: 'exam' },
	{ date: '2020-08-13', title: 'Tổ chức dự án - 45 phút', type: 'review' },
	{ date: '2020-08-17', title: 'TỔNG - Anh - 45 phút', type: 'submission' },
];

const eventColors = {
	exam: 'bg-green-500',
	review: 'bg-orange-500',
	submission: 'bg-blue-500',
};

const SharedExamSchedulePage: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs('2020-08-01'));

	const dateCellRender = (value: Dayjs) => {
		const formattedDate = value.format('YYYY-MM-DD');
		const dayEvents = events.filter((event) => event.date === formattedDate);

		return (
			<div className='events'>
				{dayEvents.map((event, index) => (
					<div key={index} className={`${eventColors[event.type]} rounded-sm px-2`}>
						<span className={`rounded text-white`}>{event.title}</span>
					</div>
				))}
			</div>
		);
	};

	const onPanelChange = (value: Dayjs) => {
		setSelectedDate(value);
	};

	const customHeaderRender = () => {
		return (
			<div className='flex items-center justify-between p-4'>
				<Button
					icon={<LeftOutlined />}
					onClick={() => setSelectedDate(selectedDate.subtract(1, 'month'))}
				/>
				<span className='text-lg font-semibold'>
					Tháng {selectedDate.format('M')} - {selectedDate.format('YYYY')}
				</span>
				<Button
					icon={<RightOutlined />}
					onClick={() => setSelectedDate(selectedDate.add(1, 'month'))}
				/>
			</div>
		);
	};

	const renderSidebar = () => {
		const formattedDate = selectedDate.format('YYYY-MM-DD');
		// const dayEvents = events.filter((event) => event.date === formattedDate);

		return (
			<div className='flex flex-col gap-10 p-2'>
				<div className='space-y-5 rounded-xl bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
					<div className='flex items-center gap-4'>
						<div className="justify-start font-['Mulish'] text-[64px] font-extrabold tracking-wide text-[#373839]">
							12
						</div>
						<div className='h-14 w-[67px]'>
							<div className="font-['Source Sans Pro'] justify-start text-base font-normal leading-tight text-[#373839]">
								Tháng 8
							</div>
							<div className="font-['Source Sans Pro'] justify-start text-base font-normal leading-tight text-[#373839]">
								Thứ 5
							</div>
							<div className="font-['Source Sans Pro'] justify-start text-base font-normal leading-tight text-[#373839]">
								Năm 2020
							</div>
						</div>
					</div>
					<div className='relative h-1.5 w-[218px] rounded bg-[#ffa75e]' />
					<div className=''>
						<div className='relative flex w-[127px] items-center gap-1'>
							<div className='h-2 w-2 rounded-full bg-[#2dacee]' />
							<div className="relative justify-start font-['Mulish'] text-lg font-extrabold tracking-tight text-[#2dacee]">
								Toán Đại Số
							</div>
						</div>
						<div className='w-[214px]'>
							<ul className="font-['Source Sans Pro'] text-base text-[#373839]">
								<li className='flex font-semibold'>
									<p className='w-20'>Đối tượng:</p>
									<span className='text-[#9B9C9C]'>Kiểm tra tập trung</span>
								</li>
								<li className='flex font-semibold'>
									<p className='w-20'>Thời lượng:</p>
									<span className='text-[#9B9C9C]'>45 phút</span>
								</li>
								<li className='flex font-semibold'>
									<p className='w-20'>Nội dung:</p>
									<span className='text-[#9B9C9C]'>Ôn tập chương 5</span>
								</li>
								<li className='flex font-semibold'>
									<p className='w-20'>Hình thức:</p>
									<span className='text-[#9B9C9C]'>Tự luận</span>
								</li>
							</ul>
						</div>
					</div>
					<div className=''>
						<div className='relative flex w-[127px] items-center gap-1'>
							<div className='h-2 w-2 rounded-full bg-[#ffb923]' />
							<div className="justify-start font-['Mulish'] text-lg font-extrabold tracking-tight text-[#ffb923]">
								Tiếng Anh
							</div>
						</div>
						<div className='w-44'>
							<ul className="font-['Source Sans Pro'] w-44 text-base text-[#373839]">
								<li className='flex font-semibold'>
									<p className='w-20'>Đối tượng:</p>
									<span className='text-[#9B9C9C]'>10C1, 10C2</span>
								</li>
								<li className='flex font-semibold'>
									<p className='w-20'>Thời lượng:</p>
									<span className='text-[#9B9C9C]'>15 phút</span>
								</li>
								<li className='flex font-semibold'>
									<p className='w-20'>Nội dung:</p>
									<span className='text-[#9B9C9C]'>
										Academic <br /> Vocabulary
									</span>
								</li>
								<li className='flex font-semibold'>
									<p className='w-20'>Hình thức:</p>
									<span className='text-[#9B9C9C]'>Trắc nghiệm</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="font-['Source Sans Pro'] pt-10 text-sm font-normal italic text-[#ff5400] opacity-50">
						Cố gắng ôn tập cho các bài kiểm tra sắp tới nhé!
					</div>
				</div>
				<div className='mt-4 rounded-xl bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
					<h4 className='pb-4 font-semibold'>Lọc lịch thi</h4>
					<div className='space-y-2'>
						<div className='flex items-center'>
							<ConfigProvider
								theme={{
									token: {
										colorPrimary: '#FFB923',
									},
								}}
							>
								<Checkbox className='mr-2' />
							</ConfigProvider>
							<span>Kiểm tra 15 phút</span>
						</div>
						<div className='flex items-center'>
							<ConfigProvider
								theme={{
									token: {
										colorPrimary: '#2EACEE',
									},
								}}
							>
								<Checkbox className='mr-2' />
							</ConfigProvider>
							<span>Kiểm tra 45 phút</span>
						</div>
						<div className='flex items-center'>
							<ConfigProvider
								theme={{
									token: {
										colorPrimary: '#49C510',
									},
								}}
							>
								<Checkbox className='mr-2' />
							</ConfigProvider>
							<span>Thi giữa học kì</span>
						</div>
						<div className='flex items-center'>
							<Checkbox className='mr-2' />
							<span>Thi cuối học kì</span>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<div className="relative justify-start font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
				Lịch thi
			</div>
			<Layout className=''>
				<Content className='rounded-md bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
					<Calendar
						dateCellRender={dateCellRender}
						headerRender={customHeaderRender}
						onPanelChange={onPanelChange}
						value={selectedDate}
						locale={viVN as any}
						// onSelect={onSelect}
					/>
				</Content>
				<Sider width={300} className='bg-white'>
					{renderSidebar()}
				</Sider>
			</Layout>
		</div>
	);
};

export default SharedExamSchedulePage;
