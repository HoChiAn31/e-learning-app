import React from 'react';
import { Layout, Avatar, Input, Button } from 'antd';
import { UserOutlined, VideoCameraOutlined, AudioOutlined } from '@ant-design/icons';
import {
	Exit,
	Mic,
	Pressentation,
	Video,
	Volume,
	ZooomIn,
	ZooomOut,
} from '../../../components/icon';
const { Header, Content, Sider } = Layout;
const { Search } = Input;
//https://i.imgur.com/EfU74V3.png
// https://i.imgur.com/5QzeVf3.png
//https://i.imgur.com/fNBJTBc.png
// https://i.imgur.com/isK6rgP.png
// https://i.imgur.com/y7iRBl1.png
// https://i.imgur.com/cYJqgqF.png
//https://i.imgur.com/p02Guni.png
// https://i.imgur.com/S3JeFAu.png
// https://i.imgur.com/UturQnP.png
// https://i.imgur.com/czm6JRn.png
const TeacherClassMeetingPage: React.FC = () => {
	const userList = [
		{ id: 1, name: 'Thành Tam - GV', avatar: 'https://i.imgur.com/EfU74V3.png' },
		{ id: 2, name: 'Trần Thanh', avatar: 'https://i.imgur.com/5QzeVf3.png' },
		{ id: 3, name: 'Nguyễn Văn A', avatar: 'https://i.imgur.com/fNBJTBc.png' },
		{ id: 4, name: 'Phạm Văn C', avatar: 'https://i.imgur.com/isK6rgP.png' },
		{ id: 5, name: 'Bùi Thị Hồng', avatar: 'https://i.imgur.com/y7iRBl1.png' },
		{ id: 6, name: 'Lê Thị Hoa', avatar: 'https://i.imgur.com/cYJqgqF.png' },
		{ id: 7, name: 'Hoàng Văn Dũng', avatar: 'https://i.imgur.com/p02Guni.png' },
		{ id: 8, name: 'Trần Thị Mai', avatar: 'https://i.imgur.com/S3JeFAu.png' },
		{ id: 9, name: 'Nguyễn Thành Long', avatar: 'https://i.imgur.com/UturQnP.png' },
	];

	return (
		<Layout className='min-h-[80vh] bg-gray-100'>
			{/* Sidebar for user list */}
			<Sider width={200} className='scrollbar-hidden h-[800px] overflow-y-auto bg-white'>
				<div className='space-y-4'>
					{userList.map((user) => (
						<div key={user.id} className='flex items-center space-x-2'>
							{/* <Avatar src={user.avatar} icon={<UserOutlined />} /> */}
							<div className='relative h-[104px] w-[205px] overflow-hidden'>
								<img
									src={user.avatar}
									className='absolute left-0 top-0 h-[104px] w-[205px] bg-black/60'
								/>
								<div className="font-['Source Sans Pro'] absolute left-[7px] top-[4px] text-base font-normal leading-tight text-white">
									{user.name}
								</div>
							</div>
							{/* <span className='text-sm'>{user.name}</span> */}
						</div>
					))}
				</div>
			</Sider>

			{/* Main content area */}
			<Layout className='relative'>
				<Content className='flex items-center justify-center bg-gray-200'>
					<div
						className='relative h-full w-full bg-cover bg-center'
						style={{ backgroundImage: 'url(https://i.imgur.com/JPqNN37.jpeg)' }}
					>
						{/* Simulated video area with placeholder image */}
						<div className='flex h-14 items-center justify-between bg-black/60 px-4'>
							{/*  */}
							<div className='relative h-8 w-[133px]'>
								<div className='absolute left-[35px] top-[8px] h-4 w-[98px]'>
									<div className='absolute left-0 top-[6px] h-1 w-[98px] rounded-lg bg-[#823b00]' />
									<div className='absolute left-0 top-[6px] h-1 w-[65px] rounded-lg bg-[#fff9f4]' />
									<div className='absolute left-[59px] top-0 h-4 w-4 rounded-full bg-[#fff9f4]' />
								</div>
								<div data-svg-wrapper className='absolute left-0 top-0'>
									<Volume />
								</div>
							</div>
							{/*  */}
							<div className='relative h-[30px] w-[114px]'>
								<div className="font-['Source Sans Pro'] absolute left-[35px] top-[4px] text-base font-normal leading-tight text-white">
									09/45 slides
								</div>
								<Pressentation />
							</div>
							{/*  */}
							<div className='flex items-center gap-20'>
								<div className='relative flex h-[25px] w-[125px] items-center gap-2'>
									<div className='h-[25px] items-center justify-start gap-2.5 rounded-[5px] bg-white px-2.5 py-0.5'>
										<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
											90%
										</div>
									</div>
									<ZooomIn />
									<ZooomOut />
								</div>

								<div data-svg-wrapper className='relative'>
									<Exit />
								</div>
							</div>
						</div>
						<div className='absolute bottom-16 left-8 flex items-center gap-2'>
							<div className='flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[#373839] opacity-80 hover:opacity-50'>
								<Video />
							</div>
							<div className='flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[#373839] opacity-80 hover:opacity-50'>
								<Mic />
							</div>
						</div>
						<div className='absolute bottom-0 left-0 right-0 flex w-full items-center bg-[#373839] px-4 py-2'>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
								Lịch Sử Tiết 5: Tìm hiểu văn hóa Hy Lạp - GV: Trần Thanh Tâm{' '}
							</div>
						</div>
					</div>
				</Content>

				{/* Chat and input area */}
				<div className='flex flex-col space-y-2 bg-white p-4'>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
						Chia sẻ tiết học:
					</div>
					<div className='flex w-[500px] items-center gap-2'>
						<Input
							placeholder='Nhập tin nhắn...'
							// enterButton='Gửi'
							size='large'
							// onSearch={(value) => console.log(value)}
						/>
						<Button type='primary' size='small' className='h-10'>
							Copy link
						</Button>
					</div>
				</div>
			</Layout>
		</Layout>
	);
};

export default TeacherClassMeetingPage;
