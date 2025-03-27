import React, { useEffect, useState } from 'react';
import {
	Button,
	Input,
	Modal,
	Select,
	DatePicker,
	Table,
	ConfigProvider,
	TableColumnsType,
} from 'antd';
import {
	ArrowDown,
	Plus,
	Search,
	Edit,
	Trash,
	PaperClip,
	Minus,
} from '../../../../components/icon';
import dayjs from 'dayjs';
import {
	addTrainingProgram,
	getTrainingPrograms,
	updateTrainingProgram,
	deleteTrainingProgram,
} from '../../../../firebase/instructorProfileList/fetchTranningProgram';

interface TrainingProgram {
	id: string;
	instructorId: string;
	trainingFacility: string;
	major: string;
	startDate: string;
	endDate: string;
	form: string;
	certificate: string;
	trainingPrograms: string[];
	attachment?: File | null;
}

interface TrainingProgramForm {
	instructorId: string;
	trainingFacility: string;
	major: string;
	startDate: string;
	endDate: string;
	form: string;
	certificate: string;
	trainingPrograms: string[];
	attachment?: File | null;
}

interface TrainingProgramProps {
	instructorId: string;
	fullName: string;
}

const trainingProgramsOptions = [
	{ value: 'Đào tạo quản lý giáo dục', label: 'Đào tạo quản lý giáo dục' },
	{ value: 'Đào tạo kỹ năng sư phạm', label: 'Đào tạo kỹ năng sư phạm' },
	{ value: 'Đào tạo công nghệ thông tin', label: 'Đào tạo công nghệ thông tin' },
	{ value: 'Đào tạo ngoại ngữ', label: 'Đào tạo ngoại ngữ' },
	{ value: 'Đào tạo chuyên sâu Toán học', label: 'Đào tạo chuyên sâu Toán học' },
];

const TrainingProgram: React.FC<TrainingProgramProps> = ({ instructorId, fullName }) => {
	const [trainingData, setTrainingData] = useState<TrainingProgram[]>([]);
	const [filteredData, setFilteredData] = useState<TrainingProgram[]>([]);
	const [searchText, setSearchText] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [showSelect, setShowSelect] = useState(false);
	const [selectedTraining, setSelectedTraining] = useState<TrainingProgram | null>(null);

	const [trainingProgramForm, setTrainingProgramForm] = useState<TrainingProgramForm>({
		instructorId,
		trainingFacility: '',
		major: '',
		startDate: '',
		endDate: '',
		form: '',
		certificate: '',
		trainingPrograms: [],
		attachment: null,
	});

	const fetchTrainingData = async () => {
		try {
			const data = await getTrainingPrograms();
			setTrainingData(data);
			setFilteredData(data);
		} catch (error) {
			console.error('Error fetching training data:', error);
		}
	};

	useEffect(() => {
		fetchTrainingData();
	}, []);

	const handleSearch = (value: string) => {
		setSearchText(value);
		const filtered = trainingData.filter((item) =>
			Object.values(item).join(' ').toLowerCase().includes(value.toLowerCase()),
		);
		setFilteredData(filtered);
	};

	const trainingColumns: TableColumnsType<TrainingProgram> = [
		{ title: 'Cơ quan/ Đơn vị', dataIndex: 'trainingFacility', width: '20%' },
		{ title: 'Chuyên ngành', dataIndex: 'major', width: '15%' },
		{ title: 'Ngày bắt đầu', dataIndex: 'startDate', width: '15%' },
		{ title: 'Ngày kết thúc', dataIndex: 'endDate', width: '15%' },
		{ title: 'Văn bằng/ Chứng chỉ', dataIndex: 'certificate', width: '15%' },
		{ title: 'Hình thức', dataIndex: 'form', width: '10%' },
		{
			title: '',
			dataIndex: 'action',
			align: 'center' as const,
			render: (_: any, record: TrainingProgram) => (
				<div className=''>
					<Button type='link' onClick={() => handleEditTraining(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => handleDeleteTraining(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '15%',
		},
	];

	const handleTrainingProgramChange = (
		field: keyof TrainingProgramForm,
		value: string | string[] | File | null,
	) => {
		setTrainingProgramForm((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleOkModal = async () => {
		try {
			await addTrainingProgram(trainingProgramForm);
			setTrainingProgramForm({
				instructorId,
				trainingFacility: '',
				major: '',
				startDate: '',
				endDate: '',
				form: '',
				certificate: '',
				trainingPrograms: [],
				attachment: null,
			});
			fetchTrainingData();
			setIsModalOpen(false);
		} catch (error) {
			console.error('Error adding training program:', error);
		}
	};

	const handleEditTraining = (record: TrainingProgram) => {
		setSelectedTraining(record);
		setTrainingProgramForm({
			instructorId: record.instructorId,
			trainingFacility: record.trainingFacility,
			major: record.major,
			startDate: record.startDate,
			endDate: record.endDate,
			form: record.form,
			certificate: record.certificate,
			trainingPrograms: record.trainingPrograms || [],
			attachment: record.attachment || null,
		});
		setIsEditModalOpen(true);
	};

	const handleOkEditModal = async () => {
		if (selectedTraining) {
			try {
				await updateTrainingProgram(selectedTraining.id, trainingProgramForm);
				setIsEditModalOpen(false);
				setTrainingProgramForm({
					instructorId,
					trainingFacility: '',
					major: '',
					startDate: '',
					endDate: '',
					form: '',
					certificate: '',
					trainingPrograms: [],
					attachment: null,
				});
				fetchTrainingData();
			} catch (error) {
				console.error('Error updating training program:', error);
			}
		}
	};

	const handleDeleteTraining = (record: TrainingProgram) => {
		setSelectedTraining(record);
		setIsDeleteModalOpen(true);
	};

	const handleOkDeleteModal = async () => {
		if (selectedTraining) {
			try {
				await deleteTrainingProgram(selectedTraining.id);
				setIsDeleteModalOpen(false);
				fetchTrainingData();
			} catch (error) {
				console.error('Error deleting training program:', error);
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
						Thông tin đào tạo
					</div>
				</div>
			</div>
			{isActive && (
				<>
					<div className='flex w-[1640px] items-center justify-between pb-5'>
						<Input
							placeholder='Tìm kiếm chương trình đào tạo'
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
						<Table<TrainingProgram>
							columns={trainingColumns}
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
						title='Thêm mới chương trình đào tạo'
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
											Giảng viên:
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
												Cơ sở đào tạo:
											</p>
											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</p>
										</div>
									</div>
									<Input
										placeholder='Nhập cơ sở đào tạo'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={trainingProgramForm.trainingFacility}
										onChange={(e) =>
											handleTrainingProgramChange('trainingFacility', e.target.value)
										}
									/>
								</div>
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
										placeholder='Nhập chuyên ngành'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={trainingProgramForm.major}
										onChange={(e) => handleTrainingProgramChange('major', e.target.value)}
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
											trainingProgramForm.startDate
												? dayjs(trainingProgramForm.startDate, 'DD/MM/YYYY')
												: null
										}
										onChange={(date) =>
											handleTrainingProgramChange(
												'startDate',
												date ? date.format('DD/MM/YYYY') : '',
											)
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
											trainingProgramForm.endDate
												? dayjs(trainingProgramForm.endDate, 'DD/MM/YYYY')
												: null
										}
										onChange={(date) =>
											handleTrainingProgramChange('endDate', date ? date.format('DD/MM/YYYY') : '')
										}
									/>
								</div>
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
										placeholder='Nhập hình thức'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={trainingProgramForm.form}
										onChange={(e) => handleTrainingProgramChange('form', e.target.value)}
									/>
								</div>
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
										placeholder='Nhập văn bằng/chứng chỉ'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={trainingProgramForm.certificate}
										onChange={(e) => handleTrainingProgramChange('certificate', e.target.value)}
									/>
								</div>
								<div className='flex items-center gap-0.5'>
									<div className="font-['Source Sans Pro'] w-44 text-base font-bold tracking-tight text-[#373839]">
										Tệp đính kèm:
									</div>
									<div className='flex items-center gap-2'>
										<Input
											prefix={<PaperClip />}
											placeholder='Tệp đính kèm'
											className='h-10 w-[336px] bg-[#F0F3F6]'
											variant='filled'
											value={
												trainingProgramForm.attachment ? trainingProgramForm.attachment.name : ''
											}
											disabled
										/>
										<Button
											onClick={() => {
												const input = document.createElement('input');
												input.type = 'file';
												input.onchange = (e) => {
													const files = (e.target as HTMLInputElement).files;
													if (files) handleTrainingProgramChange('attachment', files[0]);
												};
												input.click();
											}}
										>
											Chọn tệp tải lên...
										</Button>
									</div>
								</div>
							</div>
							<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
							<div className='space-y-3'>
								<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
									Danh sách chương trình đào tạo
								</p>
								<div className='space-y-4'>
									{showSelect && (
										<Select
											placeholder='Lựa chọn chương trình đào tạo'
											style={{ width: '100%' }}
											onChange={(value) =>
												handleTrainingProgramChange('trainingPrograms', [
													...trainingProgramForm.trainingPrograms,
													value,
												])
											}
											className='mt-2'
											options={trainingProgramsOptions}
										/>
									)}
									{trainingProgramForm.trainingPrograms.length > 0 && (
										<div className='grid grid-cols-3 gap-4'>
											{trainingProgramForm.trainingPrograms.map((program) => (
												<div className='flex items-center gap-1' key={program}>
													<div
														onClick={() =>
															handleTrainingProgramChange(
																'trainingPrograms',
																trainingProgramForm.trainingPrograms.filter((s) => s !== program),
															)
														}
														className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
													>
														<Minus />
													</div>
													<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
														{program}
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
											Thêm chương trình đào tạo
										</div>
									</div>
								</div>
							</div>
						</div>
					</Modal>

					{/* Edit Modal */}
					<Modal
						title='Chỉnh sửa chương trình đào tạo'
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
											Giảng viên:
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
												Cơ sở đào tạo:
											</p>
											<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
												*
											</p>
										</div>
									</div>
									<Input
										placeholder='Nhập cơ sở đào tạo'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={trainingProgramForm.trainingFacility}
										onChange={(e) =>
											handleTrainingProgramChange('trainingFacility', e.target.value)
										}
									/>
								</div>
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
										placeholder='Nhập chuyên ngành'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={trainingProgramForm.major}
										onChange={(e) => handleTrainingProgramChange('major', e.target.value)}
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
											trainingProgramForm.startDate
												? dayjs(trainingProgramForm.startDate, 'DD/MM/YYYY')
												: null
										}
										onChange={(date) =>
											handleTrainingProgramChange(
												'startDate',
												date ? date.format('DD/MM/YYYY') : '',
											)
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
											trainingProgramForm.endDate
												? dayjs(trainingProgramForm.endDate, 'DD/MM/YYYY')
												: null
										}
										onChange={(date) =>
											handleTrainingProgramChange('endDate', date ? date.format('DD/MM/YYYY') : '')
										}
									/>
								</div>
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
										placeholder='Nhập hình thức'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={trainingProgramForm.form}
										onChange={(e) => handleTrainingProgramChange('form', e.target.value)}
									/>
								</div>
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
										placeholder='Nhập văn bằng/chứng chỉ'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
										value={trainingProgramForm.certificate}
										onChange={(e) => handleTrainingProgramChange('certificate', e.target.value)}
									/>
								</div>
								<div className='flex items-center gap-0.5'>
									<div className="font-['Source Sans Pro'] w-44 text-base font-bold tracking-tight text-[#373839]">
										Tệp đính kèm:
									</div>
									<div className='flex items-center gap-2'>
										<Input
											prefix={<PaperClip />}
											placeholder='Tệp đính kèm'
											className='h-10 w-[336px] bg-[#F0F3F6]'
											variant='filled'
											value={
												trainingProgramForm.attachment ? trainingProgramForm.attachment.name : ''
											}
											disabled
										/>
										<Button
											onClick={() => {
												const input = document.createElement('input');
												input.type = 'file';
												input.onchange = (e) => {
													const files = (e.target as HTMLInputElement).files;
													if (files) handleTrainingProgramChange('attachment', files[0]);
												};
												input.click();
											}}
										>
											Chọn tệp tải lên...
										</Button>
									</div>
								</div>
							</div>
							<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
							<div className='space-y-3'>
								<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
									Danh sách chương trình đào tạo
								</p>
								<div className='space-y-4'>
									{showSelect && (
										<Select
											placeholder='Lựa chọn chương trình đào tạo'
											style={{ width: '100%' }}
											onChange={(value) =>
												handleTrainingProgramChange('trainingPrograms', [
													...trainingProgramForm.trainingPrograms,
													value,
												])
											}
											className='mt-2'
											options={trainingProgramsOptions}
										/>
									)}
									{trainingProgramForm.trainingPrograms.length > 0 && (
										<div className='grid grid-cols-3 gap-4'>
											{trainingProgramForm.trainingPrograms.map((program) => (
												<div className='flex items-center gap-1' key={program}>
													<div
														onClick={() =>
															handleTrainingProgramChange(
																'trainingPrograms',
																trainingProgramForm.trainingPrograms.filter((s) => s !== program),
															)
														}
														className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
													>
														<Minus />
													</div>
													<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
														{program}
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
											Thêm chương trình đào tạo
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
							Bạn có chắc chắn muốn xóa chương trình đào tạo này không?
						</p>
					</Modal>
				</>
			)}
		</div>
	);
};

export default TrainingProgram;
