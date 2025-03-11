import React, { useState } from 'react';
import { Button, Checkbox, Input, Table, Modal, Select, Avatar } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Menu } from '../../../components/icon';

const { Search } = Input;
const { Option } = Select;

interface NotificationProps {
	key: string;
	name: string;
	time: string;
	checked?: boolean;
	avatar?: string;
}

const initialDataSource: NotificationProps[] = [
	{
		key: '1',
		name: 'Lorem ipsum đẫ sinh đẻn trong mỏi bình luận',
		time: '5 phút trước',
		avatar: 'https://via.placeholder.com/40',
	},
	{
		key: '2',
		name: 'Lorem ipsum đẫ sinh đẻn trong mỏi bình luận',
		time: '7 phút trước',
		avatar: 'https://via.placeholder.com/40',
	},
	{
		key: '3',
		name: 'Lorem ipsum đẫ sinh đẻn trong mỏi bình luận',
		time: '10 phút trước',
		avatar: 'https://via.placeholder.com/40',
	},
	{
		key: '4',
		name: 'Lorem ipsum đẫ sinh đẻn trong mỏi bình luận',
		time: '1 ngày trước 04:53',
		avatar: 'https://via.placeholder.com/40',
	},
	{
		key: '5',
		name: 'Lorem ipsum đẫ sinh đẻn trong mỏi bình luận',
		time: '1 ngày trước 15:12',
		avatar: 'https://via.placeholder.com/40',
	},
	{
		key: '6',
		name: 'Lorem ipsum đẫ sinh đẻn trong mỏi bình luận',
		time: '2 ngày trước 17:50',
		avatar: 'https://via.placeholder.com/40',
	},
	{
		key: '7',
		name: 'Lorem ipsum đẫ sinh đẻn trong mỏi bình luận',
		time: '26 Th11 11:20',
		avatar: 'https://via.placeholder.com/40',
	},
	{
		key: '8',
		name: 'Lorem ipsum đẫ sinh đẻn trong mỏi bình luận',
		time: '26 Th11 18:10',
		avatar: 'https://via.placeholder.com/40',
	},
	{
		key: '9',
		name: 'Lorem ipsum đẫ sinh đẻn trong mỏi bình luận',
		time: '25 Th11 08:03',
		avatar: 'https://via.placeholder.com/40',
	},
	{
		key: '10',
		name: 'Lorem ipsum đẫ sinh đẻn trong mỏi bình luận',
		time: '25 Th11 10:53',
		avatar: 'https://via.placeholder.com/40',
	},
];

const TeacherNotificationPage: React.FC = () => {
	const [isActive, setIsActive] = useState('user');
	const [dataSource, setDataSource] = useState<NotificationProps[]>(
		initialDataSource.map((item) => ({ ...item, checked: false })),
	);
	const [selectAll, setSelectAll] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [recipient, setRecipient] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [message, setMessage] = useState<string>('');

	const handleSelectAllChange = (e: any) => {
		const checked = e.target.checked;
		setSelectAll(checked);
		setDataSource(
			dataSource.map((item) => ({
				...item,
				checked,
			})),
		);
	};

	const handleRowCheckboxChange = (key: string, checked: boolean) => {
		const updatedDataSource = dataSource.map((item) =>
			item.key === key ? { ...item, checked } : item,
		);
		setDataSource(updatedDataSource);

		const allChecked = updatedDataSource.every((item) => item.checked);
		setSelectAll(allChecked);
	};

	const columns = [
		{
			title: '',
			dataIndex: 'checkbox',
			key: 'checkbox',
			render: (_: any, record: NotificationProps) => (
				<Checkbox
					checked={record.checked}
					onChange={(e) => handleRowCheckboxChange(record.key, e.target.checked)}
				/>
			),
			width: '5%',
		},
		{
			title: 'Avatar',
			dataIndex: 'avatar',
			key: 'avatar',
			render: (avatar: string) => <Avatar src={avatar} size={40} />,
			width: '10%',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: '65%',
			render: (text: string) => <div dangerouslySetInnerHTML={{ __html: text }} />, // Render HTML content
		},
		{
			title: 'Time',
			dataIndex: 'time',
			key: 'time',
			width: '20%',
		},
	];

	const rowClassName = (record: NotificationProps, index: number) => {
		return `transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white hover:bg-gray-50'}`;
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		console.log('Recipient:', recipient);
		console.log('Message:', message);

		const newNotification: NotificationProps = {
			key: (dataSource.length + 1).toString(),
			name: message, // Store the HTML content
			time: 'Vừa xong',
			checked: false,
			avatar: 'https://via.placeholder.com/40',
		};
		setDataSource([newNotification, ...dataSource]);

		setRecipient('');
		setMessage('');
		setTitle('');
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setRecipient('');
		setMessage('');
		setIsModalVisible(false);
	};

	// Customize ReactQuill toolbar
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
		<div>
			<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
				Thông báo
			</div>
			<div className=''>
				{/* Header */}
				<div className='flex items-center justify-between px-6 pt-5'>
					<div className='mb-4 flex w-[561px] items-center gap-2 rounded-2xl bg-[#F2F2F2] p-1'>
						<Button
							size='middle'
							onClick={() => setIsActive('user')}
							shape='round'
							className={`${
								isActive === 'user' ? 'bg-black text-white' : 'bg-[#F2F2F2] text-[#373839]'
							} w-full border-none`}
						>
							<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
								Thông báo người dùng
							</div>
						</Button>
						<Button
							size='middle'
							onClick={() => setIsActive('system')}
							shape='round'
							className={`${
								isActive === 'system' ? 'bg-black text-white' : 'bg-[#F2F2F2] text-[#373839]'
							} w-full border-none`}
						>
							<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
								Thông báo hệ thống
							</div>
						</Button>
					</div>
					<Button type='primary' className='h-10 bg-orange-500 px-5' onClick={showModal}>
						<p className={`font-['Mulish'] text-lg font-extrabold tracking-tight text-white`}>
							Tạo thông báo
						</p>
					</Button>
				</div>

				<div className='mx-auto bg-white p-4 shadow-md'>
					<div className='flex w-full items-center justify-between'>
						<div className='mb-4 ml-4 flex items-center gap-5'>
							<Checkbox checked={selectAll} onChange={handleSelectAllChange} />
							<Search placeholder='Tên người dùng' style={{ width: 300 }} enterButton />
						</div>
						<Button type='link'>
							<Menu />
						</Button>
					</div>
					<div className=''>
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={{
								pageSize: 10,
								total: 100,
								showSizeChanger: false,
							}}
							showHeader={false}
							rowClassName={rowClassName}
						/>
					</div>
				</div>
			</div>

			{/* Modal for creating a new notification */}
			<Modal
				title={<div className='text-lg font-bold'>Gửi thông báo mới</div>}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='Gửi'
				cancelText=''
				okButtonProps={{ className: 'bg-orange-500 border-none hover:bg-orange-600' }}
				cancelButtonProps={{ style: { display: 'none' } }}
				width={600}
			>
				<div className='space-y-4'>
					<div>
						<Select
							value={recipient}
							onChange={(value) => setRecipient(value)}
							// style={{ width: '100%' }}
							className='w-full'
						>
							<Option value='all'>Tất cả người dùng</Option>
							<Option value='teachers'>Giáo viên</Option>
							<Option value='students'>Học sinh</Option>
						</Select>
					</div>
					<div>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Nhập nội dung thông báo'
							className='w-full'
						/>
					</div>
					<div>
						<ReactQuill
							value={message}
							onChange={setMessage}
							placeholder='Nhập nội dung thông báo'
							modules={quillModules}
							className='h-32' // Adjust height using Tailwind or CSS
						/>
					</div>
					;
				</div>
			</Modal>
		</div>
	);
};

export default TeacherNotificationPage;
