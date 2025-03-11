import { FC, useState } from 'react';
import {
	ArrowDown,
	Camera,
	Edit,
	Minus,
	PaperClip,
	Plus,
	Search,
	Trash,
	UserAvatar,
} from '../../../components/icon';
import {
	Button,
	ConfigProvider,
	Input,
	Modal,
	Select,
	Table,
	TableColumnsType,
	TableProps,
} from 'antd';

// type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface InforInstructorProps {
	onInforInstructor: () => void;
	onCancel: () => void;
}

interface ListProcess {
	key: string;
	agency: string;
	department: string;
	position: string;
	startDate: string;
	endDate: string;
	certificate?: string;
	form?: string;
}
const data: ListProcess[] = [
	{
		key: '1',
		agency: 'Trường THPT Nguyễn Trãi',
		department: 'Bộ phận Giáo vụ',
		position: 'Giáo viên Toán',
		startDate: '01/09/2010',
		endDate: '31/05/2015',
		certificate: 'Đại học Sư phạm Toán',
		form: 'Cử nhân',
	},
	{
		key: '2',
		agency: 'Trường THPT Lê Quý Đôn',
		department: 'Ban Giám hiệu',
		position: 'Phó Hiệu trưởng',
		startDate: '01/06/2015',
		endDate: '31/05/2018',
		certificate: 'Đại học Quản lý Giáo dục',
		form: 'Cử nhân',
	},
	{
		key: '3',
		agency: 'Trường THPT Trần Phú',
		department: 'Bộ môn Tiếng Anh',
		position: 'Giáo viên Tiếng Anh',
		startDate: '01/09/2018',
		endDate: '31/05/2021',
		certificate: 'Cao đẳng Sư phạm Tiếng Anh',
		form: 'Tại chức',
	},
	{
		key: '4',
		agency: 'Trường THPT Chuyên Hà Nội - Amsterdam',
		department: 'Bộ phận Hành chính',
		position: 'Trưởng phòng Học vụ',
		startDate: '01/06/2021',
		endDate: 'Hiện tại',
		certificate: 'Đại học Quản lý Hành chính',
		form: 'Cử nhân',
	},
];

const subjects = [
	{ value: 'LMS 01', label: 'LMS 01' },
	{ value: 'LMS 02', label: 'LMS 02' },
	{ value: 'LMS 03', label: 'LMS 03' },
];

const InforInstructor: FC<InforInstructorProps> = ({ onInforInstructor, onCancel }) => {
	const [isActive, setIsActive] = useState('general'); //process
	const [activeItem, setActiveItem] = useState('1'); //1:learning  2:award 3:disciplinary
	const [isModal, setIsModal] = useState<boolean>(false);

	const [isModalTranningProcessAdd, setIsModalTranningProcessAdd] = useState<boolean>(false);
	const [isModalTranningProgramAdd, setIsModalTranningProgramAdd] = useState<boolean>(false);

	const [subjectList, setSubjectList] = useState<string[]>([]);
	const [showSelect, setShowSelect] = useState(false);
	const handleEdit = (record: ListProcess) => {
		console.log('Edit academic year:', record);
	};

	const handleDelete = (record: ListProcess) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.key);
	};

	const onChange: TableProps<ListProcess>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};
	const columns: TableColumnsType<ListProcess> = [
		{
			title: 'Cơ quan/ Đơn vị',
			dataIndex: 'agency',
			width: '15%',
		},
		{
			title: 'Tổ/ Bộ môn',
			dataIndex: 'department',
			width: '15%',
		},
		{
			title: 'Chức vụ',
			dataIndex: 'position',
			width: '15%',
		},
		{
			title: 'Ngày bắt đầu',
			dataIndex: 'startDate',
			width: '15%',
		},
		{
			title: 'Ngày kết thúc',
			dataIndex: 'endDate',
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
	const columnTrainingInformations: TableColumnsType<ListProcess> = [
		{
			title: 'Cơ quan/ Đơn vị',
			dataIndex: 'agency',
			width: '20%',
		},
		{
			title: 'Chuyên ngành',
			dataIndex: 'department',
			width: '15%',
		},
		{
			title: 'Ngày bắt đầu',
			dataIndex: 'startDate',
			width: '15%',
		},
		{
			title: 'Ngày kết thúc',
			dataIndex: 'endDate',
			width: '15%',
		},
		{
			title: 'Văn bằng/ Chứng chỉ',
			dataIndex: 'certificate',
			width: '15%',
		},
		{
			title: 'Hình thức',
			dataIndex: 'form',
			width: '10%',
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
	const handleChangeStartDate = (value: string) => {
		console.log(`selected ${value}`);
	};
	// Modal Tranning Process Add

	const handleOkModalTranningProgramAdd = () => {
		setIsModalTranningProgramAdd(false);
	};
	const handleCancelModalTranningProgramAdd = () => {
		setIsModalTranningProgramAdd(false);
	};

	const handleOkModalTranningProcessAdd = () => {
		setIsModalTranningProcessAdd(false);
	};
	const handleCancelModalTranningProcessAdd = () => {
		setIsModalTranningProcessAdd(false);
	};

	const addSubject = (value: string) => {
		console.log(value);
		if (!subjectList.includes(value)) {
			setSubjectList([...subjectList, value]);
		}
		setShowSelect(false); // Ẩn select sau khi chọn xong
	};
	const removeSubject = (subject: string) => {
		setSubjectList(subjectList.filter((sub) => sub !== subject));
	};
	const addSemester = () => {
		// setSemesters([...semesters, { department: `Học kì `, headOfDepartment: '' }]);
		setShowSelect(true);
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
							Quá trình công tác
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
						// onClick={handleIsAddInstructor}
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
							<Button onClick={onInforInstructor} className='w-[146px]'>
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

					{/* process */}
					<>
						<div className='my-5'>
							<div
								onClick={() => setActiveItem('process')}
								className={`${activeItem === 'process' ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21]' : 'bg-white'} inline-flex h-14 w-[1640px] cursor-pointer items-center justify-start gap-[13px] overflow-hidden rounded-lg border border-[#f2f2f2] py-3 pl-3`}
							>
								{' '}
								<div className={` ${activeItem === 'process' ? '' : '-rotate-90'} `}>
									<ArrowDown color={activeItem === 'process' ? '#ffffff' : '#ff7506'} />
								</div>
								<div
									className={`${activeItem === 'process' ? 'text-white' : 'text-[#373839]'} font-['Mulish'] text-lg font-extrabold tracking-tight`}
								>
									Quá trình công tác
								</div>
							</div>
						</div>
						{activeItem === 'process' && (
							<>
								<div className='flex w-[1640px] items-center justify-between pb-5'>
									<Input placeholder='Tìm kiếm' className='h-10 w-[438px]' prefix={<Search />} />
									<Button
										type='primary'
										icon={<Plus />}
										className='h-4 py-5'
										onClick={() => setIsModalTranningProcessAdd(true)}
									>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-white">
											Thêm
										</div>
									</Button>
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
									<Table<ListProcess>
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
										className='w-[1640px]'
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
									Thông tin đào tạo
								</div>
							</div>
						</div>
						{activeItem === 'disciplinary' && (
							<>
								<div className='flex w-[1640px] items-center justify-between'>
									<Input placeholder='Tìm kiếm' className='h-10 w-[438px]' prefix={<Search />} />
									<Button
										type='primary'
										icon={<Plus />}
										className='h-4 py-5'
										onClick={() => setIsModalTranningProgramAdd(true)}
									>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-white">
											Thêm
										</div>
									</Button>
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
									<Table<ListProcess>
										columns={columnTrainingInformations}
										dataSource={data}
										onChange={onChange}
										rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
										pagination={{
											position: ['bottomRight'],
											showSizeChanger: true,
											pageSizeOptions: ['5', '10', '20', '50'],
											defaultPageSize: 5,
										}}
										className='w-[1640px]'
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
						{/*Modal add training program */}
						<Modal
							title='Thêm mới chương trình đào tạo'
							open={isModalTranningProgramAdd}
							onOk={handleOkModalTranningProgramAdd}
							onCancel={handleCancelModalTranningProgramAdd}
							styles={modalStyles}
							width={800}
							footer={[
								<Button className='w-40' key='back' onClick={handleCancelModalTranningProgramAdd}>
									Hủy
								</Button>,
								<Button
									className='w-40'
									key='submit'
									type='primary'
									onClick={handleOkModalTranningProgramAdd}
								>
									Xác nhận
								</Button>,
							]}
						>
							<div>
								<div className='py-5'>
									<div className=''>
										<div className='space-y-10'>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Giảng viên:
														</div>
													</div>
												</div>
												<Input
													placeholder='Tìm kiếm'
													className='h-10 w-[561px] bg-[#F0F3F6]'
													// prefix={<Search />}
													variant='filled'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Cơ sở đào tạo:
														</p>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>
												<Input
													placeholder='Tìm kiếm'
													className='h-10 w-[561px] bg-[#F0F3F6]'
													// prefix={<Search />}
													variant='filled'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Chuyên ngành:
														</p>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>
												<Input
													placeholder='Tìm kiếm'
													className='h-10 w-[561px] bg-[#F0F3F6]'
													// prefix={<Search />}
													variant='filled'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Ngày bắt đầu:
														</div>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>

												<Select
													defaultValue='Khoa học tự nhiên'
													style={{ width: 120 }}
													onChange={handleChangeStartDate}
													options={[
														{ value: 'Khoa học tự nhiên', label: 'Khoa học tự nhiên' },
														{ value: 'Văn hóa xã hội', label: 'Văn hóa xã hội' },
													]}
													className='!w-[561px]'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Ngày kết thúc:
														</div>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>

												<Select
													defaultValue='Khoa học tự nhiên'
													style={{ width: 120 }}
													onChange={handleChangeStartDate}
													options={[
														{ value: 'Khoa học tự nhiên', label: 'Khoa học tự nhiên' },
														{ value: 'Văn hóa xã hội', label: 'Văn hóa xã hội' },
													]}
													className='!w-[561px]'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Hình thức:
														</p>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>
												<Input
													placeholder='Tìm kiếm'
													className='h-10 w-[561px] bg-[#F0F3F6]'
													// prefix={<Search />}
													variant='filled'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Văn bằng/Chứng chỉ:
														</p>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>
												<Input
													placeholder='Tìm kiếm'
													className='h-10 w-[561px] bg-[#F0F3F6]'
													// prefix={<Search />}
													variant='filled'
												/>
											</div>
											{/*  */}
											<div className='flex items-center gap-0.5'>
												<div className="font-['Source Sans Pro'] w-44 text-base font-bold tracking-tight text-[#373839]">
													Tệp đính kèm:
												</div>
												<div className='flex items-center gap-2'>
													<Input
														prefix={<PaperClip />}
														placeholder='Tìm kiếm'
														className='h-10 w-[336px] bg-[#F0F3F6]'
														variant='filled'
													/>
													<Button>Chọn tệp tải lên...</Button>
												</div>
											</div>
										</div>

										<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
										<div className='space-y-3'>
											<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
												Danh sách môn học
											</p>
											<div className='space-y-4'>
												{/* Thêm môn học mới */}
												{showSelect && (
													<Select
														placeholder='Lựa chọn'
														style={{ width: '100%' }}
														onChange={addSubject}
														className='mt-2'
														options={subjects}
													/>
												)}

												{subjectList.length > 0 && (
													<div className='grid grid-cols-3 gap-4'>
														{subjectList.map((sub) => (
															<div className='flex items-center gap-1'>
																<div
																	onClick={() => removeSubject(sub)}
																	className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
																>
																	<Minus />
																</div>
																<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
																	{sub}
																</div>
															</div>
														))}
													</div>
												)}
												<div className='flex cursor-pointer gap-2' onClick={addSemester}>
													<div className='inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'>
														<Plus />
													</div>
													<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#0a7feb]">
														Thêm đơn vị công tác
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Modal>
						{/*Modal add training process */}
						<Modal
							title='Thêm mới quá trình công tác'
							open={isModalTranningProcessAdd}
							onOk={handleOkModalTranningProcessAdd}
							onCancel={handleCancelModalTranningProcessAdd}
							styles={modalStyles}
							width={800}
							footer={[
								<Button className='w-40' key='back' onClick={handleCancelModalTranningProcessAdd}>
									Hủy
								</Button>,
								<Button
									className='w-40'
									key='submit'
									type='primary'
									onClick={handleOkModalTranningProcessAdd}
								>
									Xác nhận
								</Button>,
							]}
						>
							<div>
								<div className='py-5'>
									<div className=''>
										<div className='space-y-10'>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Giảng viên:
														</div>
													</div>
												</div>
												<Input
													placeholder='Tìm kiếm'
													className='h-10 w-[561px] bg-[#F0F3F6]'
													// prefix={<Search />}
													variant='filled'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Cơ quan/Đơn vị:
														</p>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>
												<Input
													placeholder='Tìm kiếm'
													className='h-10 w-[561px] bg-[#F0F3F6]'
													// prefix={<Search />}
													variant='filled'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Tổ/Bộ môn:
														</p>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>
												<Input
													placeholder='Tìm kiếm'
													className='h-10 w-[561px] bg-[#F0F3F6]'
													// prefix={<Search />}
													variant='filled'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Chức vụ:
														</p>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>
												<Input
													placeholder='Tìm kiếm'
													className='h-10 w-[561px] bg-[#F0F3F6]'
													// prefix={<Search />}
													variant='filled'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Ngày bắt đầu:
														</div>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>

												<Select
													defaultValue='Khoa học tự nhiên'
													style={{ width: 120 }}
													onChange={handleChangeStartDate}
													options={[
														{ value: 'Khoa học tự nhiên', label: 'Khoa học tự nhiên' },
														{ value: 'Văn hóa xã hội', label: 'Văn hóa xã hội' },
													]}
													className='!w-[561px]'
												/>
											</div>
											{/*  */}
											<div className='flex h-5 items-center'>
												<div className='flex min-w-44 items-start justify-start'>
													<div className='flex items-center justify-center gap-0.5'>
														<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Ngày kết thúc:
														</div>
														<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</p>
													</div>
												</div>

												<Select
													defaultValue='Khoa học tự nhiên'
													style={{ width: 120 }}
													onChange={handleChangeStartDate}
													options={[
														{ value: 'Khoa học tự nhiên', label: 'Khoa học tự nhiên' },
														{ value: 'Văn hóa xã hội', label: 'Văn hóa xã hội' },
													]}
													className='!w-[561px]'
												/>
											</div>
										</div>

										<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
										<div className='space-y-3'>
											<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
												Danh sách môn học
											</p>
											<div className='space-y-4'>
												{/* Thêm môn học mới */}
												{showSelect && (
													<Select
														placeholder='Lựa chọn'
														style={{ width: '100%' }}
														onChange={addSubject}
														className='mt-2'
														options={subjects}
													/>
												)}

												{subjectList.length > 0 && (
													<div className='grid grid-cols-3 gap-4'>
														{subjectList.map((sub) => (
															<div className='flex items-center gap-1'>
																<div
																	onClick={() => removeSubject(sub)}
																	className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
																>
																	<Minus />
																</div>
																<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
																	{sub}
																</div>
															</div>
														))}
													</div>
												)}
												<div className='flex cursor-pointer gap-2' onClick={addSemester}>
													<div className='inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'>
														<Plus />
													</div>
													<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#0a7feb]">
														Thêm đơn vị công tác
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Modal>
					</>
				</div>
			)}
		</div>
	);
};
export default InforInstructor;
