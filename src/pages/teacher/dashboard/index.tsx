import { useState } from 'react';
import { CardItem } from '../../../components/CardItem';
import { courseProps } from './components/type';
import { Button, ConfigProvider, Table, TableColumnsType, TableProps } from 'antd';
import { Eyes, Info, Trash, Update } from '../../../components/icon';
const data: courseProps[] = [
	{
		name: 'Toán',
		class: '10A1',
		time: 'Thứ 2 - 8:00',
		date: '12/05 - 30/07',
		status: 'Chưa hoàn thành',
	},
	{
		name: 'Lý',
		class: '10A1',
		time: 'Thứ 3 - 9:00',
		date: '12/05 - 30/07',
		status: 'Đã hoàn thành',
	},
	{
		name: 'Hóa',
		class: '10A1',
		time: 'Thứ 4 - 10:00',
		date: '12/05 - 30/07',
		status: 'Chưa hoàn thành',
	},
	{
		name: 'Văn',
		class: '10A1',
		time: 'Thứ 5 - 8:00',
		date: '12/05 - 30/07',
		status: 'Đã hoàn thành',
	},
	{
		name: 'Sử',
		class: '10A1',
		time: 'Thứ 6 - 9:00',
		date: '12/05 - 30/07',
		status: 'Chưa hoàn thành',
	},
	{
		name: 'Địa',
		class: '10A1',
		time: 'Thứ 2 - 10:00',
		date: '12/05 - 30/07',
		status: 'Đã hoàn thành',
	},
	{
		name: 'Sinh',
		class: '10A1',
		time: 'Thứ 3 - 8:00',
		date: '12/05 - 30/07',
		status: 'Chưa hoàn thành',
	},
	{
		name: 'Anh',
		class: '10A1',
		time: 'Thứ 4 - 9:00',
		date: '12/05 - 30/07',
		status: 'Đã hoàn thành',
	},
];
function TeacherDashBoardPage() {
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
				<div className='flex'>
					<Button type='link' onClick={() => handleViewCourse(record)}>
						<Info />
					</Button>
				</div>
			),
			width: '10%',
		},
	];

	// Hàm xử lý hành động (cần được triển khai trong component của bạn)
	const handleViewCourse = (record: courseProps) => {
		console.log('View course:', record);
	};

	const handleEditCourse = (record: courseProps) => {
		console.log('Edit course:', record);
	};

	const handleDeleteCourse = (record: courseProps) => {
		console.log('Delete course:', record);
	};

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
					<CardItem
						id='3'
						title='Khóa học của tôi'
						quantity={25}
						bgType='default' // Optional
					/>
					<CardItem
						id='3'
						title='Khóa học của tôi'
						quantity={25}
						bgType='default' // Optional
					/>
					<CardItem
						id='3'
						title='Khóa học của tôi'
						quantity={25}
						bgType='default' // Optional
					/>
					<CardItem
						id='3'
						title='Khóa học của tôi'
						quantity={25}
						bgType='default' // Optional
					/>
				</div>
				<div>
					<div className="font-['Mulish'] text-[28px] font-extrabold tracking-wide text-[#373839]">
						Thống kê kết quả học tập của học viên
					</div>
					{/*  */}
					<div className='relative h-[427px] w-[595px]'>
						<div className='absolute left-0 top-0 h-[427px] w-[595px] rounded-2xl bg-white shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]' />
						<div className='absolute left-[307px] top-[65px] h-[165px] w-[235px]'>
							<div className='absolute left-0 top-[30px] h-[235px] w-px origin-top-left -rotate-90 bg-[#823b00]' />
							<div className='absolute left-0 top-[102px] h-[235px] w-px origin-top-left -rotate-90 bg-[#823b00]' />
							<div className="font-['Source Sans Pro'] absolute left-0 top-[36px] text-base font-normal leading-tight text-[#373839]">
								Tổng số học sinh giỏi:
							</div>
							<div className="font-['Source Sans Pro'] absolute left-0 top-[108px] text-base font-normal leading-tight text-[#373839]">
								Tổng số học sinh trung bình:
							</div>
							<div className="font-['Source Sans Pro'] absolute left-0 top-0 text-base font-normal leading-tight text-[#373839]">
								Tổng số lớp:
							</div>
							<div className="font-['Source Sans Pro'] absolute left-0 top-[72px] text-base font-normal leading-tight text-[#373839]">
								Tổng số học sinh khá:
							</div>
							<div className="font-['Source Sans Pro'] absolute left-0 top-[144px] text-base font-normal leading-tight text-[#373839]">
								Tổng số học sinh yếu:
							</div>
							<div className="font-['Source Sans Pro'] absolute left-[208px] top-[38px] text-base font-bold tracking-tight text-[#2dacee]">
								300
							</div>
							<div className="font-['Source Sans Pro'] absolute left-[217px] top-[1px] text-base font-bold tracking-tight text-[#373839]">
								10
							</div>
							<div className="font-['Source Sans Pro'] absolute left-[208px] top-[72px] text-base font-bold tracking-tight text-[#ff7506]">
								125
							</div>
							<div className="font-['Source Sans Pro'] absolute left-[217px] top-[108px] text-base font-bold tracking-tight text-[#49c40f]">
								75
							</div>
							<div className="font-['Source Sans Pro'] absolute left-[225px] top-[144px] text-base font-bold tracking-tight text-[#c8c4c0]">
								0
							</div>
							<div className='absolute left-0 top-[66px] h-[235px] w-px origin-top-left -rotate-90 bg-[#823b00]' />
							<div className='absolute left-0 top-[138px] h-[235px] w-px origin-top-left -rotate-90 bg-[#823b00]' />
						</div>
						<div className='absolute left-[74px] top-[65px] h-[166px] w-[166px]'>
							<div className='absolute left-[6px] top-[5px] h-40 w-40'>
								<div className='absolute left-[160px] top-0 h-40 w-40 origin-top-left rotate-90 rounded-full bg-gradient-to-bl from-[#5445b6] to-[#cf5be3]' />
								<div className="font-['Source Sans Pro'] absolute left-[112px] top-[90px] text-lg font-semibold tracking-tight text-white">
									15%
								</div>
							</div>
							<div className='absolute left-[6px] top-0 h-40 w-40'>
								<div className='absolute left-[160px] top-0 h-40 w-40 origin-top-left rotate-90 rounded-full bg-gradient-to-r from-[#fdc830] to-[#f37335]' />
								<div className="font-['Source Sans Pro'] absolute left-[100px] top-[34px] text-lg font-semibold tracking-tight text-white">
									25%
								</div>
							</div>
							<div className='absolute left-0 top-[6px] h-40 w-40'>
								<div className='absolute left-0 top-[160px] h-40 w-40 origin-top-left -rotate-90 rounded-full bg-gradient-to-r from-[#56ccf2] to-[#2f80ed]' />
								<div className="font-['Source Sans Pro'] absolute left-[29px] top-[69px] text-lg font-semibold tracking-tight text-white">
									60%
								</div>
							</div>
						</div>
						<div className='absolute left-[74px] top-[268px]'>
							<div className='absolute left-0 top-[2px] h-4 w-8 rounded-sm bg-gradient-to-r from-[#56ccf2] to-[#2f80ed]' />
							<div className="font-['Source Sans Pro'] absolute left-[44px] top-0 w-40 text-base font-normal leading-tight text-[#373839] opacity-50">
								Tổng số học sinh giỏi
							</div>
						</div>
						<div className='absolute left-[74px] top-[297px]'>
							<div className='absolute left-0 top-[2px] h-4 w-8 rounded-sm bg-gradient-to-r from-[#fdc830] to-[#f37335]' />
							<div className="font-['Source Sans Pro'] absolute left-[44px] top-0 w-40 text-base font-normal leading-tight text-[#373839] opacity-50">
								Tổng số học sinh khá
							</div>
						</div>
						<div className='absolute left-[74px] top-[326px]'>
							<div className='absolute left-0 top-[2px] h-4 w-8 rounded-sm bg-gradient-to-l from-[#45b649] to-[#dce35b]' />
							<div className="font-['Source Sans Pro'] absolute left-[44px] top-0 w-60 text-base font-normal leading-tight text-[#373839] opacity-50">
								Tổng số học sinh trung bình
							</div>
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
								// rowSelection={rowSelection}
								columns={columns}
								dataSource={data}
								onChange={onChange}
								rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
								pagination={false}
								showHeader={false}
								// pagination={{
								// 	position: ['bottomRight'],
								// 	showSizeChanger: true,
								// 	pageSizeOptions: ['5', '10', '20', '50'],
								// 	defaultPageSize: 5,
								// }}
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
								// pagination={{
								// 	position: ['bottomRight'],
								// 	showSizeChanger: true,
								// 	pageSizeOptions: ['5', '10', '20', '50'],
								// 	defaultPageSize: 5,
								// }}
							/>
						</ConfigProvider>
					</div>
				)}
			</div>
		</div>
	);
}

export default TeacherDashBoardPage;
