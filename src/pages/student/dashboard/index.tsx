import { useState } from 'react';
import { CardItem } from '../../../components/CardItem';
import { courseProps } from './components/type';
import { Button, ConfigProvider, Table, TableColumnsType, TableProps } from 'antd';
import { Info } from '../../../components/icon';
import PieChart from '../../../components/charts/PieChart';
import { Link, useNavigate } from 'react-router-dom';
const data: courseProps[] = [
	{
		key: '1',
		name: 'Toán',
		class: '10A1',
		time: 'Thứ 2 - 8:00',
		date: '12/05 - 30/07',
		status: 'Chưa hoàn thành',
	},
	{
		key: '2',
		name: 'Lý',
		class: '10A1',
		time: 'Thứ 3 - 9:00',
		date: '12/05 - 30/07',
		status: 'Đã hoàn thành',
	},
	{
		key: '3',
		name: 'Hóa',
		class: '10A1',
		time: 'Thứ 4 - 10:00',
		date: '12/05 - 30/07',
		status: 'Chưa hoàn thành',
	},
	{
		key: '4',
		name: 'Văn',
		class: '10A1',
		time: 'Thứ 5 - 8:00',
		date: '12/05 - 30/07',
		status: 'Đã hoàn thành',
	},
	{
		key: '5',
		name: 'Sử',
		class: '10A1',
		time: 'Thứ 6 - 9:00',
		date: '12/05 - 30/07',
		status: 'Chưa hoàn thành',
	},
	{
		key: '6',
		name: 'Địa',
		class: '10A1',
		time: 'Thứ 2 - 10:00',
		date: '12/05 - 30/07',
		status: 'Đã hoàn thành',
	},
	{
		key: '7',
		name: 'Sinh',
		class: '10A1',
		time: 'Thứ 3 - 8:00',
		date: '12/05 - 30/07',
		status: 'Chưa hoàn thành',
	},
	{
		key: '8',
		name: 'Anh',
		class: '10A1',
		time: 'Thứ 4 - 9:00',
		date: '12/05 - 30/07',
		status: 'Đã hoàn thành',
	},
];

function StudentDashBoardPage() {
	const nav = useNavigate();
	const [semester, SetSemester] = useState<number>(0);

	const columns: TableColumnsType<courseProps> = [
		{
			// title: 'Tên môn học',
			dataIndex: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
			width: '20%',
		},
		{
			// title: 'Lớp',
			dataIndex: 'class',
			sorter: (a, b) => a.class.localeCompare(b.class),
			width: '15%',
		},
		{
			// title: 'Thời gian',
			dataIndex: 'time',
			sorter: (a, b) => a.time.localeCompare(b.time),
			width: '20%',
		},
		{
			// title: 'Ngày học',
			dataIndex: 'date',
			sorter: (a, b) => a.date.localeCompare(b.date),
			width: '20%',
		},
		{
			// title: 'Trạng thái',
			dataIndex: 'status',
			sorter: (a, b) => a.status.localeCompare(b.status),
			width: '15%',
		},
		{
			// title: 'Hành động',
			dataIndex: 'action',
			render: (_, record) => (
				<div className=''>
					<Link to={`/student/class/detail/${record.key}`}>
						<Info />
					</Link>
				</div>
			),
			width: '10%',
		},
	];

	const onChange: TableProps<courseProps>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};
	return (
		<div className='flex gap-5'>
			{/* left */}
			<div className='space-y-3'>
				<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
					Tổng quan
				</div>
				<div className='grid grid-cols-2'>
					<CardItem id='3' title='Khóa học của tôi' quantity={10} bgType='default' />
					<CardItem id='3' title='Khóa học đã hoàn thành' quantity={2} bgType='blue' />
					<CardItem id='3' title='Khóa học chưa hoàn thành' quantity={8} bgType='default' />
					<CardItem id='3' title='Tổng điểm trung bình' quantity={5.0} bgType='blue' />
				</div>
				<div className='relative'>
					<div className="font-['Mulish'] text-[28px] font-extrabold tracking-wide text-[#373839]">
						Thống kê kết quả học tập của học viên
					</div>

					<div className='flex items-center bg-white'>
						<PieChart />
						<div className=''>
							{/* <div className='left-0 top-[30px] h-[235px] w-px origin-top-left rotate-90 bg-[#823b00]' /> */}

							<div className='flex items-center justify-between py-2'>
								<div className="w-60 justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-[#373839]">
									Tổng số môn:
								</div>
								<div className="justify-start font-['Source_Sans_Pro'] text-base font-bold tracking-tight text-[#373839]">
									10
								</div>
							</div>

							<div className='flex items-center justify-between border-y border-[#823b00] py-2'>
								<div className="w-60 justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-[#373839]">
									Số môn đã hoàn thành:
								</div>
								<div className="justify-start font-['Source_Sans_Pro'] text-base font-bold tracking-tight text-[#2dacee]">
									7
								</div>
							</div>
							<div className='flex items-center justify-between py-2'>
								<div className="w-60 justify-start font-['Source_Sans_Pro'] text-base font-normal leading-tight text-[#373839]">
									Số môn chưa hoàn thành:
								</div>

								<div className="justify-start font-['Source_Sans_Pro'] text-base font-bold tracking-tight text-[#ff7506]">
									3
								</div>
							</div>
							{/* <div className='left-0 top-[66px] h-[235px] w-px origin-top-left rotate-90 bg-[#823b00]' /> */}
						</div>
					</div>
				</div>
			</div>
			{/* right */}
			<div className='space-y-5'>
				<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
					Tất cả khóa học
				</div>
				{/*  */}
				<div
					onClick={() => {
						if (semester === 1) {
							SetSemester(0);
						} else {
							SetSemester(1);
						}
					}}
					className='flex h-14 w-[1028px] cursor-pointer items-center justify-start gap-1 overflow-hidden rounded-lg bg-white pl-[7px] pr-[830px] pt-[5px] shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'
				>
					<div data-svg-wrapper className='relative'>
						<svg
							width='46'
							height='46'
							viewBox='0 0 46 46'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16.0473 10.3366C15.5901 10.8135 15.3335 11.4587 15.3335 12.1312C15.3335 12.8036 15.5901 13.4488 16.0473 13.9257L24.7368 23.064L16.0473 32.0749C15.5901 32.5519 15.3335 33.197 15.3335 33.8695C15.3335 34.542 15.5901 35.1871 16.0473 35.664C16.2755 35.9026 16.547 36.092 16.8461 36.2212C17.1452 36.3505 17.4661 36.417 17.7901 36.417C18.1142 36.417 18.435 36.3505 18.7341 36.2212C19.0332 36.092 19.3047 35.9026 19.5329 35.664L29.9407 24.8712C30.1708 24.6346 30.3534 24.3531 30.478 24.0429C30.6027 23.7327 30.6668 23.4 30.6668 23.064C30.6668 22.7279 30.6027 22.3952 30.478 22.085C30.3534 21.7748 30.1708 21.4933 29.9407 21.2567L19.5329 10.3366C19.3047 10.098 19.0332 9.90866 18.7341 9.77942C18.435 9.65019 18.1142 9.58366 17.7901 9.58366C17.4661 9.58366 17.1452 9.65019 16.8461 9.77942C16.547 9.90866 16.2755 10.098 16.0473 10.3366Z'
								fill='#FF7506'
							/>
						</svg>
					</div>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
						Học kỳ II - 2020
					</div>
				</div>
				{semester === 1 && (
					<div>
						<ConfigProvider
							theme={{
								components: {
									Table: {
										headerBg: '#FF7506',
										headerFilterHoverBg: '#FF7506',
										headerSortHoverBg: '#FF7506',
										headerSortActiveBg: '#FF7506',
										headerSplitColor: '#FF7506',
										borderColor: '#f2f2f2',
									},
								},
							}}
						>
							<Table<courseProps>
								columns={columns}
								dataSource={data}
								onChange={onChange}
								rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
								pagination={false}
								showHeader={false}
							/>
						</ConfigProvider>
					</div>
				)}
				{/*  */}
				<div
					onClick={() => {
						if (semester === 2) {
							SetSemester(0);
						} else {
							SetSemester(2);
						}
					}}
					className='flex h-14 w-[1028px] cursor-pointer items-center justify-start gap-1 overflow-hidden rounded-lg bg-white py-[5px] pl-[7px] pr-[836px] shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'
				>
					<div data-svg-wrapper className='relative'>
						<svg
							width='46'
							height='46'
							viewBox='0 0 46 46'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16.0473 10.3366C15.5901 10.8135 15.3335 11.4587 15.3335 12.1312C15.3335 12.8036 15.5901 13.4488 16.0473 13.9257L24.7368 23.064L16.0473 32.0749C15.5901 32.5519 15.3335 33.197 15.3335 33.8695C15.3335 34.542 15.5901 35.1871 16.0473 35.664C16.2755 35.9026 16.547 36.092 16.8461 36.2212C17.1452 36.3505 17.4661 36.417 17.7901 36.417C18.1142 36.417 18.435 36.3505 18.7341 36.2212C19.0332 36.092 19.3047 35.9026 19.5329 35.664L29.9407 24.8712C30.1708 24.6346 30.3534 24.3531 30.478 24.0429C30.6027 23.7327 30.6668 23.4 30.6668 23.064C30.6668 22.7279 30.6027 22.3952 30.478 22.085C30.3534 21.7748 30.1708 21.4933 29.9407 21.2567L19.5329 10.3366C19.3047 10.098 19.0332 9.90866 18.7341 9.77942C18.435 9.65019 18.1142 9.58366 17.7901 9.58366C17.4661 9.58366 17.1452 9.65019 16.8461 9.77942C16.547 9.90866 16.2755 10.098 16.0473 10.3366Z'
								fill='#FF7506'
							/>
						</svg>
					</div>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
						Học kỳ I - 2020
					</div>
				</div>
				{semester === 2 && (
					<div>
						<ConfigProvider
							theme={{
								components: {
									Table: {
										headerBg: '#FF7506',
										headerFilterHoverBg: '#FF7506',
										headerSortHoverBg: '#FF7506',
										headerSortActiveBg: '#FF7506',
										headerSplitColor: '#FF7506',
										borderColor: '#f2f2f2',
									},
								},
							}}
						>
							<Table<courseProps>
								// rowSelection={rowSelection}
								columns={columns}
								dataSource={data}
								onChange={onChange}
								rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
								pagination={false}
								showHeader={false}
							/>
						</ConfigProvider>
					</div>
				)}
			</div>
		</div>
	);
}

export default StudentDashBoardPage;
