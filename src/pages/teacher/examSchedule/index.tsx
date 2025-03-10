import React, { useState } from 'react';
import { Calendar as AntCalendar, Badge, Button, Layout } from 'antd';
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

const TeacherExamSchedulePage: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs('2020-08-01'));

	const dateCellRender = (value: Dayjs) => {
		const formattedDate = value.format('YYYY-MM-DD');
		const dayEvents = events.filter((event) => event.date === formattedDate);

		return (
			<ul className='events'>
				{dayEvents.map((event, index) => (
					<li key={index}>
						<Badge
							status='success'
							text={
								<span className={`rounded p-1 text-white ${eventColors[event.type]}`}>
									{event.title}
								</span>
							}
						/>
					</li>
				))}
			</ul>
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
		const dayEvents = events.filter((event) => event.date === formattedDate);

		return (
			<div className='flex flex-col gap-10 p-2'>
				<div className='rounded-xl bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
					<div className='flex w-[161px] items-center gap-4'>
						<div className="justify-start font-['Mulish'] text-[64px] font-extrabold tracking-wide text-[#373839]">
							12
						</div>
						<div className='h-14 w-[67px]'>
							<div className="justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-[#373839]">
								Tháng 8
							</div>
							<div className="justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-[#373839]">
								Thứ 5
							</div>
							<div className="justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-[#373839]">
								Năm 2020
							</div>
						</div>
					</div>
					<div className='relative w-[214px]'>
						<div className='relative flex w-[127px] items-center gap-1'>
							<div className='h-2 w-2 rounded-full bg-[#2dacee]' />
							<div className="relative justify-start font-['Mulish'] text-lg font-extrabold tracking-tight text-[#2dacee]">
								Toán Đại Số
							</div>
						</div>
						<div className='w-[214px]'>
							<ul className="font-['Source_Sans_Pro'] text-base text-[#373839]">
								<li className='font-semibold'>
									Đối tượng: <span className='pl-1 text-[#9B9C9C]'>Kiểm tra tập trung</span>
								</li>
								<li className='font-semibold'>
									Thời lượng: <span className='pl-1 text-[#9B9C9C]'>45 phút</span>
								</li>
								<li className='font-semibold'>
									Nội dung: <span className='pl-1 text-[#9B9C9C]'>Ôn tập chương 5</span>
								</li>
								<li className='font-semibold'>
									Hình thức: <span className='pl-1 text-[#9B9C9C]'>Tự luận</span>
								</li>
							</ul>
						</div>
					</div>
					<div className='w-44'>
						<div className='relative flex w-[127px] items-center gap-1'>
							<div className='h-2 w-2 rounded-full bg-[#ffb923]' />
							<div className="justify-start font-['Mulish'] text-lg font-extrabold tracking-tight text-[#ffb923]">
								Tiếng Anh
							</div>
						</div>
						<div className='w-44'>
							<ul className="w-44 font-['Source_Sans_Pro'] text-base text-[#373839]">
								<li className='font-semibold'>
									Đối tượng: <span className='pl-1 text-[#9B9C9C]'>10C1, 10C2</span>
								</li>
								<li className='font-semibold'>
									Thời lượng: <span className='pl-1 text-[#9B9C9C]'>15 phút</span>
								</li>
								<li className='font-semibold'>
									Nội dung:{' '}
									<span className='pl-1 text-[#9B9C9C]'>
										Academic <br /> Vocabulary
									</span>
								</li>
								<li className='font-semibold'>
									Hình thức: <span className='pl-1 text-[#9B9C9C]'>Trắc nghiệm</span>
								</li>
							</ul>
						</div>
					</div>
					{/* <h3 className='text-lg font-semibold'>
						{selectedDate.format('D')} Tháng {selectedDate.format('M')} Năm{' '}
						{selectedDate.format('YYYY')}
					</h3>
					<div className='mt-4'>
						<p className='text-gray-500'>Tổng lịch Số môn đang áp dụng: 5</p>
						<p className='text-gray-500'>Nội dung: Ôn tập</p>
						<p className='text-gray-500'>Hình thức: Trực tuyến</p>
					</div>
					<div className='mt-4'>
						{dayEvents.length > 0 ? (
							dayEvents.map((event, index) => (
								<div key={index} className='mb-2'>
									<span className={`mr-2 inline-block h-4 w-4 ${eventColors[event.type]}`}></span>
									<span>{event.title}</span>
								</div>
							))
						) : (
							<p>Không có lịch thi</p>
						)}
					</div> */}
				</div>
				<div className='mt-4 rounded-xl bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
					<h4 className='font-semibold'>Lọc lịch thi</h4>
					<div className='flex items-center'>
						<span className='mr-2 h-4 w-4 bg-green-500'></span>
						<span>Kiểm tra môn học</span>
					</div>
					<div className='flex items-center'>
						<span className='mr-2 h-4 w-4 bg-orange-500'></span>
						<span>Thi cuối học kỳ</span>
					</div>
					<div className='flex items-center'>
						<span className='mr-2 h-4 w-4 bg-blue-500'></span>
						<span>Ôn tập</span>
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
			<Layout className='h-screen'>
				<Content className='p-4'>
					<AntCalendar
						dateCellRender={dateCellRender}
						headerRender={customHeaderRender}
						onPanelChange={onPanelChange}
						value={selectedDate}
						locale={viVN as any} // Temporary type assertion (see notes below)
					/>
				</Content>
				<Sider width={300} className='bg-gray-100'>
					{renderSidebar()}
				</Sider>
			</Layout>
		</div>
	);
};

export default TeacherExamSchedulePage;
