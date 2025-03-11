import React, { useState } from 'react';
import { Layout, List, Avatar, Typography, Input, Button, ConfigProvider, Modal } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Calendar, Clock, Comment, View } from './icon';
import TextArea from 'antd/es/input/TextArea';
const { Text } = Typography;
const { Sider, Content } = Layout;

// Định nghĩa kiểu cho tin nhắn
interface Message {
	id: number;
	user: string;
	time: string;
	content: string;
	isReplied?: boolean;
}

// Định nghĩa kiểu cho đối tượng messages
interface Messages {
	[key: string]: Message[];
}

// Định nghĩa kiểu cho topic
interface Topic {
	id: number;
	title: string;
	content: string;
	date: string;
	views?: number;
	comments?: number;
}

// Dữ liệu mẫu cho danh sách người dùng
const users = [
	{ id: 1, name: 'Nguyễn Ngọc Nguyên', time: '13:13', avatar: 'https://via.placeholder.com/40' },
	{ id: 2, name: 'Hideo Mai', time: '13:22', avatar: 'https://via.placeholder.com/40' },
	{ id: 3, name: 'Lor', time: '13:30', avatar: 'https://via.placeholder.com/40' },
	{ id: 4, name: 'Binz', time: '13:50', avatar: 'https://via.placeholder.com/40' },
	{ id: 5, name: 'Lê Don', time: '14:00', avatar: 'https://via.placeholder.com/40' },
];

// Dữ liệu mẫu cho tin nhắn
const messages: Messages = {
	'Nguyễn Ngọc Nguyên': [
		{
			id: 1,
			user: 'Nguyễn Ngọc Nguyên',
			time: '13:13',
			content: 'Chào bạn, mình là Nguyên!',
			isReplied: true,
		},
	],
	'Hideo Mai': [
		{
			id: 1,
			user: 'Hideo Mai',
			time: '13:22',
			content: 'Lorem ipsum dolor sit amet...',
			isReplied: false,
		},
		{
			id: 2,
			user: 'Trịnh Thành Tâm',
			time: '13:30',
			content: 'Etiam nec bibendum...',
			isReplied: true,
		},
	],
	Lor: [{ id: 1, user: 'Lor', time: '13:30', content: 'Hello, how are you?', isReplied: false }],
	Binz: [{ id: 1, user: 'Binz', time: '13:50', content: 'Hi there!', isReplied: true }],
	'Lê Don': [{ id: 1, user: 'Lê Don', time: '14:00', content: 'What’s up?', isReplied: false }],
};

// Dữ liệu mẫu cho topics
const initialTopics: Topic[] = [
	{
		id: 1,
		title: 'Tại sao nước biển lại mặn?',
		content: 'Thảo luận xem vì sao? Thích thì mặn hong thích thì mặn :)) Sed lobortis purus dui.',
		date: '15 Th10',
		views: 10,
		comments: 22,
	},
	{
		id: 2,
		title: 'Làm thế nào để học React tốt hơn?',
		content: 'Chia sẻ kinh nghiệm học React, các tài liệu hữu ích...',
		date: '12 Th10',
		views: 15,
		comments: 30,
	},
];

const ChatInterface: React.FC = () => {
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [showInput, setShowInput] = useState(false);
	const [messageContent, setMessageContent] = useState('');
	const [activeTab, setActiveTab] = useState('1');
	const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
	const [isModal, setIsModal] = useState(false);
	const [topics, setTopics] = useState<Topic[]>(initialTopics); // State để quản lý topics

	// State để lưu trữ dữ liệu topic trong modal
	const [topicForm, setTopicForm] = useState({
		title: '',
		content: '',
		closeTime: '16:00',
		closeDate: '22 tháng 10, 2020',
		file: null as File | null,
	});

	const modalStyles = {
		header: { textAlign: 'center' as 'center', titleFontSize: 40 },
		footer: { textAlign: 'center' as 'center' },
	};

	const handleTopicClick = (topic: Topic) => {
		setSelectedTopic(topic);
		setSelectedUser(topic.title);
	};

	const openModalWithTopic = (topic?: Topic) => {
		if (topic) {
			setTopicForm({
				title: topic.title,
				content: topic.content,
				closeTime: '16:00',
				closeDate: topic.date,
				file: null,
			});
		} else {
			setTopicForm({
				title: '',
				content: '',
				closeTime: '16:00',
				closeDate: '22 tháng 10, 2020',
				file: null,
			});
		}
		setIsModal(true);
	};

	const handleFormChange = (field: string, value: string | File | null) => {
		setTopicForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSendMessage = () => {
		if (selectedUser && messageContent.trim()) {
			const newMessage: Message = {
				id: Date.now(),
				user: 'You',
				time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				content: messageContent,
				isReplied: false,
			};
			messages[selectedUser] = [...(messages[selectedUser] || []), newMessage];
			setMessageContent('');
		}
	};

	const getCurrentMessages = () => {
		if (!selectedUser) return [];
		const userMessages = messages[selectedUser] || [];
		switch (activeTab) {
			case '2':
				return [...userMessages].sort((a, b) => (b.isReplied ? 1 : -1));
			case '3':
				return [...userMessages].sort(
					(a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
				);
			case '1':
			default:
				return userMessages;
		}
	};

	const currentMessages = getCurrentMessages();

	const handleOk = () => {
		// Tạo topic mới từ dữ liệu trong topicForm
		const newTopic: Topic = {
			id: Date.now(), // Tạo ID duy nhất dựa trên timestamp
			title: topicForm.title,
			content: topicForm.content,
			date: topicForm.closeDate, // Sử dụng closeDate làm date của topic
			views: 0, // Giá trị mặc định
			comments: 0, // Giá trị mặc định
		};

		// Thêm topic mới vào danh sách topics
		setTopics((prevTopics) => [...prevTopics, newTopic]);

		// Reset form và đóng modal
		setTopicForm({
			title: '',
			content: '',
			closeTime: '16:00',
			closeDate: '22 tháng 10, 2020',
			file: null,
		});
		setIsModal(false);
	};

	const handleCancel = () => {
		setIsModal(false);
	};

	return (
		<Layout className='min-h-screen bg-gray-100'>
			<div
				className={`flex space-x-4 bg-white p-4 shadow-md ${activeTab === '4' ? 'flex items-center justify-between' : ''}`}
			>
				<div className='flex gap-4'>
					<Button
						type={activeTab === '1' ? 'primary' : 'default'}
						onClick={() => setActiveTab('1')}
						className='flex h-12 items-center'
					>
						Tất cả câu hỏi{' '}
						<span className='ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-xs text-white'>
							10
						</span>
					</Button>
					<Button
						type={activeTab === '2' ? 'primary' : 'default'}
						onClick={() => setActiveTab('2')}
						className='h-12'
					>
						Đã trả lời
					</Button>
					<Button
						type={activeTab === '3' ? 'primary' : 'default'}
						onClick={() => setActiveTab('3')}
						className='h-12'
					>
						Gần đây nhất
					</Button>
					<Button
						type={activeTab === '4' ? 'primary' : 'default'}
						onClick={() => setActiveTab('4')}
						className='h-12'
					>
						Topics
					</Button>
				</div>
				{activeTab === '4' && (
					<Button type='primary' onClick={() => openModalWithTopic()} className='h-12'>
						Tạo topic mới
					</Button>
				)}
			</div>

			<Layout>
				<Sider width={400} className='bg-white shadow-lg'>
					{activeTab === '4' ? (
						<>
							<div>input</div>
							<List
								dataSource={topics} // Sử dụng state topics thay vì mảng tĩnh
								renderItem={(item) => (
									<List.Item className='cursor-pointer p-2' onClick={() => handleTopicClick(item)}>
										<div
											className={`space-y-4 rounded-lg border border-primary p-2 ${selectedTopic?.id === item.id ? 'bg-[#f0f3f6]' : 'bg-white'}`}
										>
											<div className='flex items-center justify-between'>
												<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#373839]">
													{item.title}
												</div>
												<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839] opacity-50">
													{item.date}
												</div>
											</div>
											<div className="font-['Source Sans Pro'] w-[375px] text-base font-normal leading-tight text-[#373839] opacity-70">
												{item.content}
											</div>
											<div className='flex items-center gap-20'>
												<div className='flex w-11 items-center gap-2'>
													<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839] opacity-50">
														{item.views}
													</div>
													<div>
														<View />
													</div>
												</div>
												<div className='flex w-11 items-center gap-2'>
													<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839] opacity-50">
														{item.comments}
													</div>
													<div>
														<Comment />
													</div>
												</div>
											</div>
										</div>
									</List.Item>
								)}
							/>
						</>
					) : (
						<List
							itemLayout='horizontal'
							dataSource={users}
							renderItem={(item) => (
								<List.Item
									className={`cursor-pointer p-2 hover:bg-gray-100 ${selectedUser === item.name ? 'bg-gray-200' : ''}`}
									onClick={() => setSelectedUser(item.name)}
								>
									<List.Item.Meta
										avatar={<Avatar src={item.avatar} icon={<UserOutlined />} />}
										title={<Text>{item.name}</Text>}
										description={<Text type='secondary'>{item.time}</Text>}
									/>
								</List.Item>
							)}
						/>
					)}
				</Sider>

				<Content className='bg-white p-6 shadow-lg'>
					{activeTab !== '4' && (
						<>
							<div className='mb-4 flex items-center justify-between'>
								<Text strong>{selectedUser || 'Chọn người dùng để trò chuyện'}</Text>
								<Text
									type='secondary'
									onClick={() => {
										if (selectedUser) setShowInput(true);
									}}
									className='cursor-pointer hover:underline'
								>
									Trò chuyện
								</Text>
							</div>
							<div className='space-y-4'>
								{currentMessages.length > 0 ? (
									currentMessages.map((msg: Message) => (
										<div key={msg.id} className='flex items-start'>
											<Avatar src='https://via.placeholder.com/40' className='mr-2' />
											<div>
												<Text strong>{msg.user}</Text>
												<Text type='secondary' className='ml-2'>
													{msg.time}
												</Text>
												<p className='mt-1'>{msg.content}</p>
											</div>
										</div>
									))
								) : (
									<Text type='secondary'>Chưa có tin nhắn. Vui lòng chọn người dùng!</Text>
								)}
							</div>
							{showInput && selectedUser && (
								<div className='mt-4 flex items-center space-x-2'>
									<Input
										value={messageContent}
										onChange={(e) => setMessageContent(e.target.value)}
										placeholder='Nhập tin nhắn...'
										className='w-full'
									/>
									<Button
										icon={<SendOutlined />}
										onClick={handleSendMessage}
										disabled={!messageContent.trim()}
										type='primary'
									/>
								</div>
							)}
						</>
					)}
					{activeTab === '4' && selectedTopic && (
						<div className='p-4'>
							<Text strong>{selectedTopic.title}</Text>
							<p className='mt-2'>{selectedTopic.content}</p>
							<div className="font-['Source Sans Pro'] mt-4 text-base font-normal leading-tight text-[#373839] opacity-50">
								<span>Ngày: {selectedTopic.date}</span>
								<span className='ml-4'>Lượt xem: {selectedTopic.views}</span>
								<span className='ml-4'>Bình luận: {selectedTopic.comments}</span>
							</div>
							<Button type='link' onClick={() => openModalWithTopic(selectedTopic)}>
								Chỉnh sửa topic
							</Button>
						</div>
					)}
					{activeTab === '4' && !selectedTopic && (
						<Text type='secondary'>Chọn một topic để thảo luận!</Text>
					)}
				</Content>
			</Layout>

			<ConfigProvider theme={{ components: { Modal: { titleFontSize: 28 } } }}>
				<Modal
					title='Tạo topic mới'
					open={isModal}
					onOk={handleOk}
					onCancel={handleCancel}
					width={800}
					styles={modalStyles}
					footer={[
						<Button className='w-40' key='back' onClick={handleCancel}>
							Hủy
						</Button>,
						<Button className='w-40' key='submit' type='primary' onClick={handleOk}>
							Tạo Topic
						</Button>,
					]}
				>
					<div className='space-y-4 pb-10'>
						<div className='gap-4'>
							<Input
								placeholder='Chủ đề topic'
								className='h-10 w-full bg-[#F0F3F6]'
								variant='filled'
								value={topicForm.title}
								onChange={(e) => handleFormChange('title', e.target.value)}
							/>
						</div>
						<div className='gap-4'>
							<TextArea
								placeholder='Mô tả và câu hỏi cho topic này...'
								className='h-10 w-full bg-[#F0F3F6]'
								variant='filled'
								rows={4}
								value={topicForm.content}
								onChange={(e) => handleFormChange('content', e.target.value)}
							/>
						</div>
						<div className='flex items-center gap-4'>
							<div className="font-['Source Sans Pro'] w-40 text-base font-bold tracking-tight text-[#373839]">
								Thời gian đóng topic:
							</div>
							<div className='flex items-center gap-10'>
								<div className='flex items-center gap-1'>
									<Clock />
									<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-black opacity-50">
										{topicForm.closeTime}
									</div>
								</div>
								<div className='flex items-center gap-1'>
									<Calendar />
									<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-black opacity-50">
										{topicForm.closeDate}
									</div>
								</div>
							</div>
						</div>
						<div className='flex items-center gap-4'>
							<div className="font-['Source Sans Pro'] w-40 text-base font-bold tracking-tight text-[#373839]">
								File đính kèm:
							</div>
							<div className='flex items-center gap-2'>
								<Button>Chọn tệp tải lên...</Button>
							</div>
						</div>
					</div>
				</Modal>
			</ConfigProvider>
		</Layout>
	);
};

export default ChatInterface;
