import { FC, useState } from 'react';
import { ArrowDown, Camera, Edit, Plus, Search, Trash, UserAvatar } from '../../../components/icon';
import { Button, ConfigProvider, Input, Modal, Table, TableColumnsType, TableProps } from 'antd';
import { TableStudentSemester1 } from './TableStudentSemester1';

interface InforStudentProps {
	onInforStudent: () => void;
	onCancel: () => void;
}

interface ListAward {
	key: string;
	description: string;
	decision: string;
	date: string;
}
const data: ListAward[] = [
	{
		key: '75151476-430f-477a-8378-686ecd606fd2',
		description: 'Nhân viên xuất sắc tháng 6',
		decision: 'https://example.com/decision_1.pdf',
		date: '2024-06-01',
	},
	{
		key: 'bd0a3c73-936c-496e-9ed5-9c20efea0fe1',
		description: 'Đạt thành tích cao trong dự án ABC',
		decision: 'https://example.com/decision_2.pdf',
		date: '2024-06-02',
	},
	{
		key: '919a718f-9166-46f4-b203-cdee12928f9d',
		description: 'Đóng góp nổi bật trong hoạt động thiện nguyện',
		decision: 'https://example.com/decision_3.pdf',
		date: '2024-06-03',
	},
	{
		key: 'b3f3d23a-5ff5-4931-8a9d-6477160aacec',
		description: 'Hoàn thành xuất sắc nhiệm vụ quý II',
		decision: 'https://example.com/decision_4.pdf',
		date: '2024-06-04',
	},
	{
		key: '02c48b5f-1a51-45f7-bcd1-dd5a90b8ed7b',
		description: 'Sáng kiến cải tiến quy trình làm việc',
		decision: 'https://example.com/decision_5.pdf',
		date: '2024-06-05',
	},
];

const InforStudent: FC<InforStudentProps> = ({ onInforStudent, onCancel }) => {
	const [isActive, setIsActive] = useState('general'); //process
	const [semester, setSemester] = useState(1);
	const [activeItem, setActiveItem] = useState('1'); //1:learning  2:award 3:disciplinary
	const [isModal, setIsModal] = useState<boolean>(false);

	const handleEdit = (record: ListAward) => {
		console.log('Edit academic year:', record);
	};

	const handleDelete = (record: ListAward) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.key);
	};

	const onChange: TableProps<ListAward>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};
	const columns: TableColumnsType<ListAward> = [
		{
			title: 'STT',
			dataIndex: 'index',
			width: '5%',
			render: (_, __, index) => index + 1,
		},

		{
			title: 'Nội dung khen thưởng',
			dataIndex: 'description',
			width: '25%',
		},
		{
			title: 'Quyết định khen thưởng',
			dataIndex: 'decision',
			width: '25%',
		},
		{
			title: 'Ngày quyết định',
			dataIndex: 'date',
			width: '15%',
		},
		{
			title: '',
			dataIndex: 'action',
			align: 'center',
			render: (_, record) => (
				<div className=''>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '15%',
		},
	];
	const modalStyles = {
		header: {
			textAlign: 'center' as 'center',
		},
		footer: {
			textAlign: 'center' as 'center',
		},
	};
	const handleOk = () => {
		setIsModal(false);
	};
	const handleCancel = () => {
		setIsModal(false);
	};

	return (
		<div className=''>
			<div className='flex items-center justify-between py-6'>
				<div className='flex items-center gap-2'>
					<Button
						// type='primary'
						size='middle'
						onClick={() => setIsActive('general')}
						shape='round'
						className={`${isActive === 'general' ? 'bg-black text-white' : 'bg-white text-black'}`}
					>
						<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
							Thông tin chung
						</div>
					</Button>
					<Button
						// type='primary'
						size='middle'
						onClick={() => setIsActive('process')}
						shape='round'
						className={`${isActive === 'process' ? 'bg-black text-white' : 'bg-white text-black'}`}
					>
						<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
							Quá trình học tập
						</div>
					</Button>
				</div>
				<div className='flex items-center gap-2'>
					<Trash />
					<div className='h-12 w-[1px] bg-[#c8c4c0]' />
					<Button
						className='h-[52px]'
						// type='primary'
						// icon={<Plus />}
						size='middle'
						// onClick={() => setIsModalFile(true)}
						// variant='outlined'
					>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-primary">
							Xuất file
						</div>
					</Button>
					<Button
						className='h-[52px]'
						type='primary'
						icon={<Plus />}
						size='middle'
						// onClick={handleIsAddStudent}
					>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
							Thêm mới
						</div>
					</Button>
				</div>
			</div>
			{isActive === 'general' ? (
				<>
					<div className='w-[1640px] bg-white shadow-md'>
						<div className='inline-flex h-14 w-[1640px] items-center justify-start overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-[#cc5c00] pb-4 pl-[63px] pr-[1430px] pt-[17px]'>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
								Thông tin chung
							</div>
						</div>
						<div className='flex gap-28 px-16 pt-10'>
							<div>
								<div className='relative'>
									<div className='flex h-[220px] w-[220px] items-end justify-center overflow-hidden rounded-full bg-[#EFEFEF]'>
										<UserAvatar />
										<div className='absolute -bottom-8'>
											<button>
												<Camera />
											</button>
										</div>
									</div>
								</div>
							</div>
							{/* Infor */}
							<div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
									Thông tin học viên
								</div>
								<div className='flex items-center gap-28'>
									{/* Left */}
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Họ và tên:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Giới tính:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Ngày sinh:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Nơi sinh:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Dân tộc:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Tôn giáo:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
									</div>
									{/* Right */}
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Niên khoá:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Khối:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Mã học viên:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Ngày nhập học:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Hình thức:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Trạng thái:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='h-4 w-[1640px] bg-[#f2f2f2] shadow-[inset_0px_4px_8px_0px_rgba(154,202,245,0.15)]' />
					<div className='w-[1640px] bg-white pt-2'>
						<div className='flex gap-28 px-16 py-10'>
							<div className='w-[220px]'></div>
							{/* Infor */}
							<div>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#cc5c00]">
									Địa chỉ liên hệ
								</div>
								<div className='flex items-center gap-28'>
									{/* Left */}
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Tỉnh/Thành phố:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Quận/Huyện:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Xã/Phường:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
									</div>
									{/* Right */}
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Địa chỉ:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Email :
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Điện thoại
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='w-[1640px] bg-white shadow-md'>
						<div className='inline-flex h-14 w-[1640px] items-center justify-start overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-[#cc5c00] pb-4 pl-[63px] pr-[1430px] pt-[17px]'>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
								Thông tin gia đình
							</div>
						</div>
						<div className='flex gap-28 px-16 pt-10'>
							<div>
								<div className='flex items-center gap-28'>
									{/* Row1 */}
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Họ và tên:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Giới tính:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Ngày sinh:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
									</div>
									{/* Row2 */}
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Niên khoá:
											</p>
											<Input className='inline-flex h-10 w-[104px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Khối:
											</p>
											<Input className='inline-flex h-10 w-[104px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Mã học viên:
											</p>
											<Input className='inline-flex h-10 w-[104px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
									</div>
									{/* Row3 */}
									<div className='space-y-4'>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Niên khoá:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Khối:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
										<div className='flex items-center gap-x-[55px]'>
											<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
												Mã học viên:
											</p>
											<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
										</div>
									</div>
								</div>
								<div className="font-['Source Sans Pro'] pt-5 text-base font-bold tracking-tight text-[#cc5c00]">
									Thông tin học viên
								</div>
								<div className='flex items-center gap-4 pb-5'>
									<div className='flex items-center gap-x-[55px]'>
										<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
											Điện thoại
										</p>
										<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
									</div>
									<div className='flex items-center gap-x-[55px]'>
										<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
											Điện thoại
										</p>
										<Input className='inline-flex h-10 w-[360px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
									</div>
									<div className='flex items-center gap-x-[55px]'>
										<p className="font-['Source Sans Pro'] w-[112px] text-base font-bold tracking-tight text-[#373839] opacity-80">
											Điện thoại
										</p>
										<Input className='inline-flex h-10 w-[200px] items-center justify-start gap-6 overflow-hidden rounded-lg border bg-[#F2F2F2] px-4 py-2' />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='flex items-center justify-center pt-12'>
						<div className='flex items-center gap-4'>
							<Button onClick={onInforStudent} className='w-[146px]'>
								Hủy
							</Button>
							<Button onClick={onCancel} className='w-[146px]'>
								Lưu
							</Button>
						</div>
					</div>
				</>
			) : (
				<div>
					{/* general */}
					<div className='relative h-[258px] w-[1640px] overflow-hidden rounded-2xl border border-[#ff7506] bg-[#fff9f4]'>
						<div className="absolute left-[64px] top-[24px] font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
							Thông tin chung
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[64px] top-[71px] text-base font-bold tracking-tight text-[#373839]">
							Niên khoá:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[448px] top-[71px] text-base font-bold tracking-tight text-[#373839]">
							Giáo viên chủ nhiệm:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[64px] top-[107px] text-base font-bold tracking-tight text-[#373839]">
							Khoa - Khối:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[448px] top-[107px] text-base font-bold tracking-tight text-[#373839]">
							Số lượng học viên:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[64px] top-[143px] text-base font-bold tracking-tight text-[#373839]">
							Mã lớp học:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[448px] top-[143px] text-base font-bold tracking-tight text-[#373839]">
							Loại lớp học:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[64px] top-[179px] text-base font-bold tracking-tight text-[#373839]">
							Tên lớp học:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[448px] top-[179px] text-base font-bold tracking-tight text-[#373839]">
							Số lượng môn học:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[1024px] top-[71px] text-base font-bold tracking-tight text-[#373839]">
							Mô tả:
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[168px] top-[71px] text-base font-normal leading-tight text-[#373839] opacity-80">
							2020 - 2021
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[616px] top-[71px] text-base font-normal leading-tight text-[#373839] opacity-80">
							Phạm Thị B
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[1085px] top-[71px] w-[299px] text-base font-normal leading-tight text-[#373839] opacity-80">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus quam vel
							aliquam lacinia.
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[616px] top-[107px] text-base font-normal leading-tight text-[#373839] opacity-80">
							45 học viên
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[616px] top-[143px] text-base font-normal leading-tight text-[#373839] opacity-80">
							Lớp học căn bản
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[616px] top-[179px] text-base font-normal leading-tight text-[#373839] opacity-80">
							10 môn học
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[168px] top-[107px] text-base font-normal leading-tight text-[#373839] opacity-80">
							Khối 6
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[168px] top-[179px] text-base font-normal leading-tight text-[#373839] opacity-80">
							6A1
						</div>
						<div className="font-['Source Sans Pro'] absolute left-[168px] top-[143px] text-base font-normal leading-tight text-[#373839] opacity-80">
							2020-6A1
						</div>
					</div>
					{/* Learning */}
					<>
						<div className='my-5'>
							<div
								onClick={() => setActiveItem('learning')}
								className={`${activeItem === 'learning' ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21]' : 'bg-white'} inline-flex h-14 w-[1640px] cursor-pointer items-center justify-start gap-[13px] overflow-hidden rounded-lg border border-[#f2f2f2] py-3 pl-3 pr-[1440px]`}
							>
								{' '}
								<div className={` ${activeItem === 'learning' ? '' : '-rotate-90'} `}>
									<ArrowDown color={activeItem === 'learning' ? '#ffffff' : '#ff7506'} />
								</div>
								<div
									className={`${activeItem === 'learning' ? 'text-white' : 'text-[#373839]'} font-['Mulish'] text-lg font-extrabold tracking-tight`}
								>
									Kết quả học tập
								</div>
							</div>
						</div>
						{activeItem === 'learning' && (
							<div>
								<div className='relative h-[152px] w-[1512px] overflow-hidden rounded-lg bg-white shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
									<div className='absolute left-0 top-0 h-[99px] w-[1512px] overflow-hidden rounded-tl-lg rounded-tr-lg'>
										<div className="absolute left-[1082px] top-[64px] font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
											Điểm trung bình
										</div>
										<div className='absolute left-[1275px] top-[64px] inline-flex items-start justify-start gap-10'>
											<div className="text-center font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
												Học lực
											</div>
											<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
												Hạnh kiểm
											</div>
										</div>
										<div className='absolute left-[585px] top-[63.50px] inline-flex items-start justify-start gap-[60px]'>
											<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
												Học lực
											</div>
											<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
												Hạnh kiểm
											</div>
											<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
												Điểm trung bình
											</div>
										</div>
									</div>
									<div className="font-['Source Sans Pro'] absolute left-[585px] top-[116px] text-base font-normal leading-tight text-[#373839]">
										Khá
									</div>
									<div className="font-['Source Sans Pro'] absolute left-[1275px] top-[116px] text-base font-bold tracking-tight text-[#49c40f]">
										Khá
									</div>
									<div className="font-['Source Sans Pro'] absolute left-[712px] top-[116px] text-base font-normal leading-tight text-[#373839]">
										Tốt
									</div>
									<div className="font-['Source Sans Pro'] absolute left-[1382px] top-[116px] text-base font-bold tracking-tight text-[#49c40f]">
										Tốt
									</div>
									<div className="font-['Source Sans Pro'] absolute left-[869px] top-[116px] text-base font-normal leading-tight text-[#373839]">
										7.7
									</div>
									<div className="font-['Source Sans Pro'] absolute left-[52px] top-[116px] text-base font-normal leading-tight text-[#373839]">
										Khá
									</div>
									<div className="font-['Source Sans Pro'] absolute left-[179px] top-[116px] text-base font-normal leading-tight text-[#373839]">
										Tốt
									</div>
									<div className="font-['Source Sans Pro'] absolute left-[336px] top-[116px] text-base font-normal leading-tight text-[#373839]">
										7.7
									</div>
									<div data-svg-wrapper className='absolute left-[533px] top-[51px]'>
										<svg
											width='2'
											height='101'
											viewBox='0 0 2 101'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path d='M1 0L1.00001 101' stroke='#C9C4C0' />
										</svg>
									</div>
									<div data-svg-wrapper className='absolute left-[1067px] top-[51px]'>
										<svg
											width='2'
											height='101'
											viewBox='0 0 2 101'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path d='M1 0L1 101' stroke='#C9C4C0' />
										</svg>
									</div>
									<div data-svg-wrapper className='absolute left-[1242px] top-[51px]'>
										<svg
											width='2'
											height='47'
											viewBox='0 0 2 47'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path d='M1 0L1 47' stroke='white' />
										</svg>
									</div>
									<div className="font-['Source Sans Pro'] absolute left-[1112px] top-[115px] text-base font-bold tracking-tight text-[#49c40f]">
										7.0
									</div>
									<div className='absolute left-[52px] top-[64px] inline-flex items-start justify-start gap-[60px]'>
										<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
											Học lực
										</div>
										<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
											Hạnh kiểm
										</div>
										<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
											Điểm trung bình
										</div>
									</div>
									<div className='absolute left-0 top-0 h-[51px] w-[1512px] overflow-hidden bg-[#823b00]'>
										<div data-svg-wrapper className='absolute left-[533px] top-0'>
											<svg
												width='2'
												height='51'
												viewBox='0 0 2 51'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path d='M1 0L1 98' stroke='white' />
											</svg>
										</div>
										<div data-svg-wrapper className='absolute left-[1067px] top-[-0px]'>
											<svg
												width='2'
												height='51'
												viewBox='0 0 2 51'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path d='M1 -6.10352e-05L1 97.9999' stroke='white' />
											</svg>
										</div>
										<div className="absolute left-0 top-[12px] h-[27px] w-[517px] text-center font-['Mulish'] text-[22px] font-extrabold tracking-tight text-white">
											Học kỳ 1
										</div>
										<div className="absolute left-[517px] top-[12px] h-[27px] w-[518px] text-center font-['Mulish'] text-[22px] font-extrabold tracking-tight text-white">
											Học kỳ 2
										</div>
										<div className="absolute left-[1251px] top-[12px] font-['Mulish'] text-[22px] font-extrabold tracking-tight text-white">
											Cả năm
										</div>
									</div>
								</div>
								<Button
									// type='primary'
									size='middle'
									onClick={() => setSemester(1)}
									shape='round'
									className={`${semester === 1 ? 'bg-black text-white' : 'bg-white text-black'}`}
								>
									<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
										Học kì I
									</div>
								</Button>
								<Button
									// type='primary'
									size='middle'
									onClick={() => setSemester(2)}
									shape='round'
									className={`${semester === 2 ? 'bg-black text-white' : 'bg-white text-black'}`}
								>
									<div className={`font-['Mulish'] text-lg font-extrabold tracking-tight`}>
										Học kì II
									</div>
								</Button>

								{semester === 1 ? (
									<TableStudentSemester1 />
								) : semester === 2 ? (
									<TableStudentSemester1 />
								) : null}
							</div>
						)}
					</>
					{/* List awards */}
					<>
						<div className='my-5'>
							<div
								onClick={() => setActiveItem('award')}
								className={`${activeItem === 'award' ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21]' : 'bg-white'} inline-flex h-14 w-[1640px] cursor-pointer items-center justify-start gap-[13px] overflow-hidden rounded-lg border border-[#f2f2f2] py-3 pl-3`}
							>
								{' '}
								<div className={` ${activeItem === 'award' ? '' : '-rotate-90'} `}>
									<ArrowDown color={activeItem === 'award' ? '#ffffff' : '#ff7506'} />
								</div>
								<div
									className={`${activeItem === 'award' ? 'text-white' : 'text-[#373839]'} font-['Mulish'] text-lg font-extrabold tracking-tight`}
								>
									Danh sách khen thưởng
								</div>
							</div>
						</div>
						{activeItem === 'award' && (
							<>
								<div className='flex w-[1640px] justify-end'>
									<Input placeholder='Tìm kiếm' className='h-10 w-[438px]' prefix={<Search />} />
								</div>
								<ConfigProvider
									theme={{
										components: {
											Table: {
												headerBg: '#373839',
												headerFilterHoverBg: '#373839',
												headerSortHoverBg: '#373839',
												headerSortActiveBg: '#373839',
												headerSplitColor: '#373839',
												headerColor: '#ffffff',
												borderColor: '#f2f2f2',
											},
										},
									}}
								>
									<Table<ListAward>
										columns={columns}
										dataSource={data}
										onChange={onChange}
										rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
										pagination={{
											position: ['bottomRight'],
											showSizeChanger: true,
											pageSizeOptions: ['5', '10', '20', '50'],
											defaultPageSize: 5,
										}}
									/>
								</ConfigProvider>
							</>
						)}
					</>
					{/* disciplinary */}
					<>
						<div className='my-5'>
							<div
								onClick={() => setActiveItem('disciplinary')}
								className={`${activeItem === 'disciplinary' ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21]' : 'bg-white'} inline-flex h-14 w-[1640px] cursor-pointer items-center justify-start gap-[13px] overflow-hidden rounded-lg border border-[#f2f2f2] py-3 pl-3`}
							>
								{' '}
								<div className={` ${activeItem === 'disciplinary' ? '' : '-rotate-90'} `}>
									<ArrowDown color={activeItem === 'disciplinary' ? '#ffffff' : '#ff7506'} />
								</div>
								<div
									className={`${activeItem === 'disciplinary' ? 'text-white' : 'text-[#373839]'} font-['Mulish'] text-lg font-extrabold tracking-tight`}
								>
									Danh sách khen thưởng
								</div>
							</div>
						</div>
						{activeItem === 'disciplinary' && (
							<>
								<div className='flex w-[1640px] justify-end'>
									<Input placeholder='Tìm kiếm' className='h-10 w-[438px]' prefix={<Search />} />
								</div>
								<ConfigProvider
									theme={{
										components: {
											Table: {
												headerBg: '#373839',
												headerFilterHoverBg: '#373839',
												headerSortHoverBg: '#373839',
												headerSortActiveBg: '#373839',
												headerSplitColor: '#373839',
												headerColor: '#ffffff',
												borderColor: '#f2f2f2',
											},
										},
									}}
								>
									<Table<ListAward>
										columns={columns}
										dataSource={data}
										onChange={onChange}
										rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
										pagination={{
											position: ['bottomRight'],
											showSizeChanger: true,
											pageSizeOptions: ['5', '10', '20', '50'],
											defaultPageSize: 5,
										}}
									/>
								</ConfigProvider>
							</>
						)}
						{/*Modal Add  */}
						<Modal
							title='Xóa'
							open={isModal}
							onOk={handleOk}
							onCancel={handleCancel}
							styles={modalStyles}
							footer={[
								<Button className='w-40' key='back' onClick={handleCancel}>
									Hủy
								</Button>,
								<Button className='w-40' key='submit' type='primary' onClick={handleOk}>
									Xác nhận
								</Button>,
							]}
						>
							<div className="font-['Source Sans Pro'] text-center text-base font-normal leading-tight text-[#373839]">
								Xác nhận muốn xoá môn học này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không
								thể hoàn tác.
							</div>
						</Modal>
					</>
				</div>
			)}
		</div>
	);
};
export default InforStudent;
