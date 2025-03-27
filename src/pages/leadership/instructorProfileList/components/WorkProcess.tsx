import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Select, DatePicker, Table, ConfigProvider } from 'antd';
import { ArrowDown, Plus, Search, Edit, Trash, Minus } from '../../../../components/icon';
import dayjs from 'dayjs';
import {
	addInstructorWorkProcess,
	getInstructorWorkProcess,
	updateInstructorWorkProcess,
	deleteInstructorWorkProcess,
} from '../../../../firebase/instructorProfileList/fetchWorkProcess';

interface ListProcess {
	id: string;
	instructorId?: string;
	workUnit: string;
	department: string;
	position: string;
	startDate: string;
	endDate: string;
	workUnits?: string[];
}

interface WorkProcessForm {
	instructorId: string;
	workUnit: string;
	department: string;
	position: string;
	startDate: string;
	endDate: string;
	workUnits: string[];
}

interface WorkProcessProps {
	instructorId: string;
	fullName: string;
}

const departmentOptions = [
	{ value: 'Toán - Lý - Hóa', label: 'Toán - Lý - Hóa' },
	{ value: 'Văn - Anh - Anh', label: 'Văn - Anh - Anh' },
	{ value: 'Toán -Hóa - Sinh', label: 'Toán -Hóa - Sinh' },
];

const positionOptions = [
	{ value: 'Giảng viên', label: 'Giảng viên' },
	{ value: 'Trợ giảng', label: 'Trợ giảng' },
	{ value: 'Trưởng Bộ Môn', label: 'Trưởng Bộ Môn' },
	{ value: 'Phó Hiệu trưởng', label: 'Phó Hiệu trưởng' },
	{ value: 'Bộ phận Giáo vụ', label: 'Bộ phận Giáo vụ' },
];

const workUnitOptions = [
	{ value: 'Trường THPT Nguyễn Trãi', label: 'Trường THPT Nguyễn Trãi' },
	{ value: 'Trường THPT Lê Quý Đôn', label: 'Trường THPT Lê Quý Đôn' },
	{ value: 'Trường THCS Trần Phú', label: 'Trường THCS Trần Phú' },
	{ value: 'Trường Đại học Sư phạm', label: 'Trường Đại học Sư phạm' },
];

const WorkProcess: React.FC<WorkProcessProps> = ({ instructorId, fullName }) => {
	const [processData, setProcessData] = useState<ListProcess[]>([]);
	const [filteredData, setFilteredData] = useState<ListProcess[]>([]); // Dữ liệu đã lọc
	const [searchText, setSearchText] = useState(''); // Giá trị ô tìm kiếm
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isActive, setIsActive] = useState(true);
	const [showSelect, setShowSelect] = useState(false);
	const [selectedProcess, setSelectedProcess] = useState<ListProcess | null>(null);

	const [workProcessForm, setWorkProcessForm] = useState<WorkProcessForm>({
		instructorId: instructorId,
		workUnit: '',
		department: '',
		position: '',
		startDate: '',
		endDate: '',
		workUnits: [],
	});

	const fetchProcessData = async () => {
		try {
			const data = await getInstructorWorkProcess();
			setProcessData(data);
			setFilteredData(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchProcessData();
	}, []);

	const handleSearch = (value: string) => {
		setSearchText(value);
		const filtered = processData.filter((item) =>
			Object.values(item).join(' ').toLowerCase().includes(value.toLowerCase()),
		);
		setFilteredData(filtered);
	};

	const processColumns = [
		{ title: 'Đơn vị công tác', dataIndex: 'workUnit', width: '15%' },
		{ title: 'Tổ/ Bộ môn', dataIndex: 'department', width: '15%' },
		{ title: 'Chức vụ', dataIndex: 'position', width: '15%' },
		{ title: 'Ngày bắt đầu', dataIndex: 'startDate', width: '15%' },
		{ title: 'Ngày kết thúc', dataIndex: 'endDate', width: '15%' },
		{
			title: '',
			dataIndex: 'action',
			align: 'center' as const,
			render: (_: any, record: ListProcess) => (
				<div className=''>
					<Button type='link' onClick={() => handleEditProcess(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => handleDeleteProcess(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '15%',
		},
	];

	const handleWorkProcessChange = (field: keyof WorkProcessForm, value: string | string[]) => {
		setWorkProcessForm((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleOkModal = async () => {
		try {
			await addInstructorWorkProcess(workProcessForm);
			setWorkProcessForm({
				instructorId,
				workUnit: '',
				department: '',
				position: '',
				startDate: '',
				endDate: '',
				workUnits: [],
			});
			setIsModalOpen(false);
			fetchProcessData();
		} catch (err) {
			console.error(err);
		}
	};

	const handleEditProcess = (record: ListProcess) => {
		setSelectedProcess(record);
		setWorkProcessForm({
			instructorId: record.instructorId || instructorId,
			workUnit: record.workUnit,
			department: record.department,
			position: record.position,
			startDate: record.startDate,
			endDate: record.endDate,
			workUnits: record.workUnits || [],
		});
		setIsEditModalOpen(true);
	};

	const handleOkEditModal = async () => {
		if (selectedProcess) {
			try {
				await updateInstructorWorkProcess(selectedProcess.id, workProcessForm);
				setIsEditModalOpen(false);
				setWorkProcessForm({
					instructorId,
					workUnit: '',
					department: '',
					position: '',
					startDate: '',
					endDate: '',
					workUnits: [],
				});
				fetchProcessData();
			} catch (err) {
				console.error(err);
			}
		}
	};

	const handleDeleteProcess = (record: ListProcess) => {
		setSelectedProcess(record);
		setIsDeleteModalOpen(true);
	};

	const handleOkDeleteModal = async () => {
		if (selectedProcess) {
			try {
				await deleteInstructorWorkProcess(selectedProcess.id);
				setIsDeleteModalOpen(false);
				fetchProcessData();
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<div>
			<div className='my-5'>
				<div
					onClick={() => setIsActive(!isActive)}
					className={`${isActive ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21]' : 'bg-white'} inline-flex h-14 w-[1640px] cursor-pointer items-center justify-start gap-[13px] overflow-hidden rounded-lg border border-[#f2f2f2] py-3 pl-3`}
				>
					<div className={`${isActive ? '' : '-rotate-90'}`}>
						<ArrowDown color={isActive ? '#ffffff' : '#ff7506'} />
					</div>
					<div
						className={`${isActive ? 'text-white' : 'text-[#373839]'} font-['Mulish'] text-lg font-extrabold tracking-tight`}
					>
						Quá trình công tác
					</div>
				</div>
			</div>
			{isActive && (
				<>
					<div className='flex w-[1640px] items-center justify-between pb-5'>
						<Input
							placeholder='Tìm kiếm quá trình công tác'
							className='h-10 w-[438px]'
							prefix={<Search />}
							value={searchText}
							onChange={(e) => handleSearch(e.target.value)}
						/>
						<Button
							type='primary'
							icon={<Plus />}
							className='h-4 py-5'
							onClick={() => setIsModalOpen(true)}
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
									headerColor: '#ffffff',
									borderColor: '#f2f2f2',
								},
							},
						}}
					>
						<Table<ListProcess>
							columns={processColumns}
							dataSource={filteredData}
							pagination={{
								position: ['bottomRight'],
								showSizeChanger: true,
								pageSizeOptions: ['5', '10', '20', '50'],
								defaultPageSize: 5,
							}}
							rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
							className='w-[1640px]'
						/>
					</ConfigProvider>

					{/* Add Modal */}
					<Modal
						title='Thêm mới quá trình công tác'
						open={isModalOpen}
						onOk={handleOkModal}
						onCancel={() => setIsModalOpen(false)}
						styles={{ header: { textAlign: 'center' }, footer: { textAlign: 'center' } }}
						width={800}
						footer={[
							<Button className='w-40' key='back' onClick={() => setIsModalOpen(false)}>
								Hủy
							</Button>,
							<Button className='w-40' key='submit' type='primary' onClick={handleOkModal}>
								Xác nhận
							</Button>,
						]}
					>
						<div className='py-5'>
							<div className='space-y-10'>
								<div className='flex h-5 items-center'>
									<div className='flex min-w-44 items-start justify-start'>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Tên Giảng viên:
										</div>
									</div>
									<Input
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={fullName}
										disabled
									/>
								</div>
								<div className='flex h-5 items-center'>
									<div className='flex min-w-44 items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Đơn vị công tác:
											</p>
											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</p>
										</div>
									</div>
									<Input
										placeholder='Nhập đơn vị công tác'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={workProcessForm.workUnit}
										onChange={(e) => handleWorkProcessChange('workUnit', e.target.value)}
									/>
								</div>
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
									<Select
										value={workProcessForm.department}
										onChange={(value) => handleWorkProcessChange('department', value)}
										options={departmentOptions}
										className='h-10 w-[561px] bg-[#F0F3F6]'
										placeholder='Nhập tổ/bộ môn'
										variant='filled'
									/>
								</div>
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
									<Select
										value={workProcessForm.position}
										onChange={(value) => handleWorkProcessChange('position', value)}
										options={positionOptions}
										className='h-10 w-[561px] bg-[#F0F3F6]'
										placeholder='Nhập chức vụ'
										variant='filled'
									/>
								</div>
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
									<DatePicker
										format='DD/MM/YYYY'
										className='h-10 w-[561px]'
										placeholder='Chọn ngày bắt đầu'
										value={
											workProcessForm.startDate
												? dayjs(workProcessForm.startDate, 'DD/MM/YYYY')
												: null
										}
										onChange={(date) =>
											handleWorkProcessChange('startDate', date ? date.format('DD/MM/YYYY') : '')
										}
									/>
								</div>
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
									<DatePicker
										format='DD/MM/YYYY'
										className='h-10 w-[561px]'
										placeholder='Chọn ngày kết thúc'
										value={
											workProcessForm.endDate ? dayjs(workProcessForm.endDate, 'DD/MM/YYYY') : null
										}
										onChange={(date) =>
											handleWorkProcessChange('endDate', date ? date.format('DD/MM/YYYY') : '')
										}
									/>
								</div>
							</div>
							<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
							<div className='space-y-3'>
								<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
									Danh sách đơn vị công tác bổ sung
								</p>
								<div className='space-y-4'>
									{showSelect && (
										<Select
											placeholder='Lựa chọn đơn vị công tác'
											style={{ width: '100%' }}
											onChange={(value) =>
												handleWorkProcessChange('workUnits', [...workProcessForm.workUnits, value])
											}
											className='mt-2'
											options={workUnitOptions}
										/>
									)}
									{workProcessForm.workUnits.length > 0 && (
										<div className='grid grid-cols-2 gap-4'>
											{workProcessForm.workUnits.map((unit) => (
												<div key={unit} className='flex items-center gap-1'>
													<div
														onClick={() =>
															handleWorkProcessChange(
																'workUnits',
																workProcessForm.workUnits.filter((u) => u !== unit),
															)
														}
														className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
													>
														<Minus />
													</div>
													<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
														{unit}
													</div>
												</div>
											))}
										</div>
									)}
									<div className='flex cursor-pointer gap-2' onClick={() => setShowSelect(true)}>
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
					</Modal>

					{/* Edit Modal */}
					<Modal
						title='Chỉnh sửa quá trình công tác'
						open={isEditModalOpen}
						onOk={handleOkEditModal}
						onCancel={() => setIsEditModalOpen(false)}
						styles={{ header: { textAlign: 'center' }, footer: { textAlign: 'center' } }}
						width={800}
						footer={[
							<Button className='w-40' key='back' onClick={() => setIsEditModalOpen(false)}>
								Hủy
							</Button>,
							<Button className='w-40' key='submit' type='primary' onClick={handleOkEditModal}>
								Cập nhật
							</Button>,
						]}
					>
						<div className='py-5'>
							<div className='space-y-10'>
								<div className='flex h-5 items-center'>
									<div className='flex min-w-44 items-start justify-start'>
										<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
											Tên Giảng viên:
										</div>
									</div>
									<Input
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={fullName}
										disabled
									/>
								</div>
								<div className='flex h-5 items-center'>
									<div className='flex min-w-44 items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Đơn vị công tác:
											</p>
											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</p>
										</div>
									</div>
									<Input
										placeholder='Nhập đơn vị công tác'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={workProcessForm.workUnit}
										onChange={(e) => handleWorkProcessChange('workUnit', e.target.value)}
									/>
								</div>
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
									<Select
										value={workProcessForm.department}
										onChange={(value) => handleWorkProcessChange('department', value)}
										options={departmentOptions}
										className='h-10 w-[561px] bg-[#F0F3F6]'
										placeholder='Nhập tổ/bộ môn'
										variant='filled'
									/>
								</div>
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
									<Select
										value={workProcessForm.position}
										onChange={(value) => handleWorkProcessChange('position', value)}
										options={positionOptions}
										className='h-10 w-[561px] bg-[#F0F3F6]'
										placeholder='Nhập chức vụ'
										variant='filled'
									/>
								</div>
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
									<DatePicker
										format='DD/MM/YYYY'
										className='h-10 w-[561px]'
										placeholder='Chọn ngày bắt đầu'
										value={
											workProcessForm.startDate
												? dayjs(workProcessForm.startDate, 'DD/MM/YYYY')
												: null
										}
										onChange={(date) =>
											handleWorkProcessChange('startDate', date ? date.format('DD/MM/YYYY') : '')
										}
									/>
								</div>
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
									<DatePicker
										format='DD/MM/YYYY'
										className='h-10 w-[561px]'
										placeholder='Chọn ngày kết thúc'
										value={
											workProcessForm.endDate ? dayjs(workProcessForm.endDate, 'DD/MM/YYYY') : null
										}
										onChange={(date) =>
											handleWorkProcessChange('endDate', date ? date.format('DD/MM/YYYY') : '')
										}
									/>
								</div>
							</div>
							<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
							<div className='space-y-3'>
								<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
									Danh sách đơn vị công tác bổ sung
								</p>
								<div className='space-y-4'>
									{showSelect && (
										<Select
											placeholder='Lựa chọn đơn vị công tác'
											style={{ width: '100%' }}
											onChange={(value) =>
												handleWorkProcessChange('workUnits', [...workProcessForm.workUnits, value])
											}
											className='mt-2'
											options={workUnitOptions}
										/>
									)}
									{workProcessForm.workUnits.length > 0 && (
										<div className='grid grid-cols-2 gap-4'>
											{workProcessForm.workUnits.map((unit) => (
												<div key={unit} className='flex items-center gap-1'>
													<div
														onClick={() =>
															handleWorkProcessChange(
																'workUnits',
																workProcessForm.workUnits.filter((u) => u !== unit),
															)
														}
														className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
													>
														<Minus />
													</div>
													<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
														{unit}
													</div>
												</div>
											))}
										</div>
									)}
									<div className='flex cursor-pointer gap-2' onClick={() => setShowSelect(true)}>
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
					</Modal>

					{/* Delete Confirmation Modal */}
					<Modal
						title='Xác nhận xóa'
						open={isDeleteModalOpen}
						onOk={handleOkDeleteModal}
						onCancel={() => setIsDeleteModalOpen(false)}
						styles={{ header: { textAlign: 'center' }, footer: { textAlign: 'center' } }}
						width={400}
						footer={[
							<Button className='w-40' key='back' onClick={() => setIsDeleteModalOpen(false)}>
								Hủy
							</Button>,
							<Button
								className='w-40'
								key='submit'
								type='primary'
								danger
								onClick={handleOkDeleteModal}
							>
								Xóa
							</Button>,
						]}
					>
						<p className="font-['Source Sans Pro'] text-center text-base">
							Bạn có chắc chắn muốn xóa quá trình công tác này không?
						</p>
					</Modal>
				</>
			)}
		</div>
	);
};

export default WorkProcess;
