import { Button, ConfigProvider, Input, Modal, Table, TableColumnsType, TableProps } from 'antd';
import {
	ArrowRight,
	Dowload,
	Eyes,
	PaperClip,
	Plus,
	Search,
	Trash,
	Update,
} from '../../../components/icon';
import { Key, useEffect, useState } from 'react';
import AddInstructor from './AddInstructor';
import EditInstructor from './EditInstructor';
import InforInstructor from './InforInstructor';
import { instructorData } from '../../../types/leadership/instructor';
import {
	getInstructors,
	updateInstructor,
	// Giả sử bạn sẽ thêm deleteInstructor
	// deleteInstructor,
} from '../../../firebase/instructorProfileList/instructor';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const InstructorProfileListPage = () => {
	const [isModalFile, setIsModalFile] = useState<boolean>(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
	const [isAddInstructor, setIsAddInstructor] = useState<boolean>(false);
	const [isEditInstructor, setIsEditInstructor] = useState<boolean>(false);
	const [isInforInstructor, setIsInforInstructor] = useState<boolean>(false);
	const [dataInstructor, setDataInstructor] = useState<instructorData[]>([]);
	const [dataInstructorSelected, setDataInstructorSelected] = useState<
		instructorData | undefined
	>();
	const [instructorToDelete, setInstructorToDelete] = useState<instructorData | null>(null);
	const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

	// Fetch data instructor
	const fetchDataInstuctor = async () => {
		try {
			const data = await getInstructors();
			console.log('Data instructors:', data);
			setDataInstructor(data);
		} catch (error) {
			console.log('Error fetching instructors', error);
		}
	};

	useEffect(() => {
		fetchDataInstuctor();
	}, []);

	const handleIsAddInstructor = () => {
		setIsAddInstructor(!isAddInstructor);
		fetchDataInstuctor();
	};

	const handleIsEditInstructor = () => {
		setIsEditInstructor(!isAddInstructor);
	};

	const handleIsInforInstructor = async (data: instructorData) => {
		console.log('Infor instructor:', data);
		console.log('Infor instructor id:', data.id);
		try {
			updateInstructor(data.id, data);
			setIsInforInstructor(!isInforInstructor);
			fetchDataInstuctor();
		} catch (error) {
			console.log('Error updating instructor', error);
		}
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection: TableRowSelection<instructorData> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const onChange: TableProps<instructorData>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const handleInforInstructor = (record: instructorData) => {
		console.log('View instructor:', record);
		setIsInforInstructor(!isInforInstructor);
		setDataInstructorSelected(record);
	};

	const handleEditInstructor = (record: instructorData) => {
		console.log('Edit instructor:', record);
		setIsEditInstructor(!isEditInstructor);
	};

	const handleDelete = (record: instructorData) => {
		console.log('Remove instructor:', record);
		console.log('Remove instructor id:', record.id);
		setInstructorToDelete(record);
		setIsModalDeleteOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (instructorToDelete) {
			try {
				// Uncomment và implement hàm deleteInstructor khi sẵn sàng
				// await deleteInstructor(instructorToDelete.id);
				console.log('Deleted instructor with id:', instructorToDelete.id);
				setIsModalDeleteOpen(false);
				setInstructorToDelete(null);
				await fetchDataInstuctor();
			} catch (error) {
				console.log('Error deleting instructor', error);
			}
		}
	};

	const handleCancelDelete = () => {
		setIsModalDeleteOpen(false);
		setInstructorToDelete(null);
	};

	const columns: TableColumnsType<instructorData> = [
		{
			title: 'Mã giảng viên',
			dataIndex: 'instructorCode',
			sorter: (a, b) => a.instructorCode.localeCompare(b.instructorCode),
			width: '15%',
		},
		{
			title: 'Tên giảng viên',
			dataIndex: 'fullName',
			sorter: (a, b) => a.fullName.localeCompare(b.fullName),
			width: '20%',
		},
		{
			title: 'Ngày sinh',
			dataIndex: 'dateOfBirth',
			sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
			width: '10%',
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
			sorter: (a, b) => a.gender.localeCompare(b.gender),
			width: '10%',
		},
		{
			title: 'Tổ - Bộ môn',
			dataIndex: 'department',
			sorter: (a, b) => a.department.localeCompare(b.department),
			width: '10%',
		},
		{
			title: 'Tình trạng',
			dataIndex: 'status',
			sorter: (a, b) => a.status.localeCompare(b.status),
			width: '15%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className='flex'>
					<Button type='link' onClick={() => handleInforInstructor(record)}>
						<Eyes color='#ff7506' />
					</Button>
					<Button type='link' onClick={() => handleEditInstructor(record)}>
						<Update />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '30%',
		},
	];

	const handleOkFile = () => {
		setIsModalFile(false);
	};

	const handleCancelFile = () => {
		setIsModalFile(false);
	};

	const modalStyles = {
		header: {
			textAlign: 'center' as 'center',
		},
		footer: {
			textAlign: 'center' as 'center',
		},
	};

	const handleCancelAddInstructor = () => {
		setIsAddInstructor(false);
	};

	const handleCancelEditInstructor = () => {
		setIsEditInstructor(false);
	};

	return (
		<div>
			{/* Title */}
			{isAddInstructor ? (
				<div className='inline-flex h-[60px] items-center justify-center'>
					<div className='inline-flex items-center justify-start gap-2 px-2.5'>
						<div
							className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
							onClick={() => setIsAddInstructor(false)}
						>
							Hồ sơ giảng viên
						</div>
						<div data-svg-wrapper className='relative'>
							<ArrowRight />
						</div>
						<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
							Thêm giảng viên
						</div>
					</div>
				</div>
			) : isEditInstructor ? (
				<div className='inline-flex h-[60px] items-center justify-center'>
					<div className='inline-flex items-center justify-start gap-2 px-2.5'>
						<div
							className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
							onClick={() => setIsEditInstructor(false)}
						>
							Hồ sơ giảng viên
						</div>
						<div data-svg-wrapper className='relative'>
							<ArrowRight />
						</div>
						<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
							Chỉnh sửa thông tin giảng viên
						</div>
					</div>
				</div>
			) : isInforInstructor ? (
				<div className='inline-flex h-[60px] items-center justify-center'>
					<div className='inline-flex items-center justify-start gap-2 px-2.5'>
						<div
							className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
							onClick={() => setIsInforInstructor(false)}
						>
							Hồ sơ giảng viên
						</div>
						<div data-svg-wrapper className='relative'>
							<ArrowRight />
						</div>
						<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
							Thông tin giảng viên
						</div>
					</div>
				</div>
			) : (
				<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
					Hồ sơ giảng viên
				</div>
			)}

			{/* Header */}
			{isAddInstructor ? (
				<AddInstructor
					onAddInstructor={handleIsAddInstructor}
					onCancel={handleCancelAddInstructor}
				/>
			) : isEditInstructor ? (
				<EditInstructor
					onEditInstructor={handleIsEditInstructor}
					onCancel={handleCancelEditInstructor}
				/>
			) : isInforInstructor && dataInstructorSelected ? (
				<InforInstructor
					onEditInstructor={handleIsInforInstructor}
					onCancel={handleCancelEditInstructor}
					instructorData={dataInstructorSelected}
				/>
			) : (
				<>
					<div className='flex items-center justify-end'>
						<div className='flex items-center gap-2'>
							<Trash />
							<div className='h-12 w-[1px] bg-[#c8c4c0]' />
							<Button className='h-[52px]' size='middle' onClick={() => setIsModalFile(true)}>
								<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-primary">
									Xuất file
								</div>
							</Button>
							<Button
								className='h-[52px]'
								type='primary'
								icon={<Plus />}
								size='middle'
								onClick={handleIsAddInstructor}
							>
								<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
									Thêm mới
								</div>
							</Button>
						</div>
					</div>

					{/* Table */}
					<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
						<div className='flex items-center justify-between'>
							<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
								Danh sách giảng viên
							</div>
							<Input
								placeholder='Tìm kiếm'
								className='w-[438px] rounded-full bg-[#F0F3F6]'
								prefix={<Search />}
								variant='filled'
							/>
						</div>
						<div className='pt-5'>
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
								<Table<instructorData>
									rowSelection={rowSelection}
									columns={columns}
									dataSource={dataInstructor}
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
						</div>
					</div>

					{/* Modal File */}
					<ConfigProvider
						theme={{
							components: {
								Modal: {
									titleFontSize: 28,
								},
							},
						}}
					>
						<Modal
							title='Xuất file hồ sơ'
							open={isModalFile}
							onOk={handleOkFile}
							onCancel={handleCancelFile}
							width={800}
							styles={modalStyles}
							footer={[
								<Button className='w-40' key='back' onClick={handleCancelFile}>
									Hủy
								</Button>,
								<Button className='w-40' key='submit' type='primary' onClick={handleOkFile}>
									Lưu
								</Button>,
							]}
						>
							<div className='space-y-4 pb-10'>
								<div className='flex items-center gap-4'>
									<div className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
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
								<div className='flex items-center gap-4'>
									<div className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Tải file mẫu:
									</div>
									<div className='flex items-center gap-2'>
										<Dowload />
										<div className="font-['Source Sans Pro'] text-base font-normal italic text-[#373839]">
											[Tải xuống file mẫu]
										</div>
									</div>
								</div>
							</div>
						</Modal>
					</ConfigProvider>

					{/* Modal Delete */}
					<ConfigProvider
						theme={{
							components: {
								Modal: {
									titleFontSize: 28,
								},
							},
						}}
					>
						<Modal
							title='Xác nhận xóa giảng viên'
							open={isModalDeleteOpen}
							onOk={handleConfirmDelete}
							onCancel={handleCancelDelete}
							width={600}
							styles={modalStyles}
							footer={[
								<Button className='w-40' key='cancel' onClick={handleCancelDelete}>
									Hủy
								</Button>,
								<Button
									className='w-40'
									key='submit'
									type='primary'
									danger
									onClick={handleConfirmDelete}
								>
									Xóa
								</Button>,
							]}
						>
							<div className='space-y-4 pb-10'>
								<div className="font-['Source Sans Pro'] text-center text-lg font-normal tracking-tight text-[#373839]">
									Bạn có chắc chắn muốn xóa giảng viên này không?
								</div>
								{instructorToDelete && (
									<div className="font-['Source Sans Pro'] text-center text-base font-bold tracking-tight text-[#373839]">
										{instructorToDelete.fullName} - {instructorToDelete.instructorCode}
									</div>
								)}
								<div className="font-['Source Sans Pro'] text-center text-sm text-[#ff0000]">
									Hành động này không thể hoàn tác!
								</div>
							</div>
						</Modal>
					</ConfigProvider>
				</>
			)}
		</div>
	);
};

export default InstructorProfileListPage;
