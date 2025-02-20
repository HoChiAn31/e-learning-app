import { Button, ConfigProvider, Input, Modal, Table, TableColumnsType, TableProps } from 'antd';
import { Edit, Lists, Plus, Trash } from '../../../components/icon';
import SideBarAssignment from '../../../layouts/SideBarAssignment';
import Search from 'antd/es/transfer/search';
import { useState } from 'react';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
interface SemesterData {
	// key: React.Key;
	key: string;
	classCode: string;
	className: string;
	teacher: string;
	startDate: string;
	endDate: string;
}
const data: SemesterData[] = [
	{
		key: '1',
		classCode: 'CS101',
		className: 'Nhập môn lập trình',
		teacher: 'Nguyễn Văn A',
		startDate: '2024-09-01',
		endDate: '2024-12-15',
	},
	{
		key: '2',
		classCode: 'CS102',
		className: 'Cấu trúc dữ liệu và giải thuật',
		teacher: 'Trần Thị B',
		startDate: '2024-09-01',
		endDate: '2024-12-15',
	},
	{
		key: '3',
		classCode: 'CS103',
		className: 'Lập trình hướng đối tượng',
		teacher: 'Lê Văn C',
		startDate: '2024-09-01',
		endDate: '2024-12-15',
	},
	{
		key: '4',
		classCode: 'CS104',
		className: 'Cơ sở dữ liệu',
		teacher: 'Phạm Thị D',
		startDate: '2024-09-01',
		endDate: '2024-12-15',
	},
	{
		key: '5',
		classCode: 'CS105',
		className: 'Mạng máy tính',
		teacher: 'Hoàng Văn E',
		startDate: '2024-09-01',
		endDate: '2024-12-15',
	},
	{
		key: '6',
		classCode: 'CS106',
		className: 'Trí tuệ nhân tạo',
		teacher: 'Ngô Thị F',
		startDate: '2024-09-01',
		endDate: '2024-12-15',
	},
	{
		key: '7',
		classCode: 'CS107',
		className: 'Phát triển web',
		teacher: 'Đặng Văn G',
		startDate: '2024-09-01',
		endDate: '2024-12-15',
	},
	{
		key: '8',
		classCode: 'CS108',
		className: 'Kỹ thuật lập trình',
		teacher: 'Bùi Thị H',
		startDate: '2024-09-01',
		endDate: '2024-12-15',
	},
];

function InstructorAssignmentPage() {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);

	const handleEdit = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		// setIsModalOpen(true);
	};

	const handleDelete = (record: SemesterData) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.key);
		setIsModalOpenDelete(true);
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const columns: TableColumnsType<SemesterData> = [
		{
			title: 'Mã lớp',
			dataIndex: 'classCode',
			sorter: (a, b) => a.classCode.localeCompare(b.classCode),
			width: '10%',
		},

		{
			title: 'Tên lớp',
			dataIndex: 'className',
			sorter: (a, b) => a.className.localeCompare(b.className),
			width: '15%',
		},
		{
			title: 'Giáo viên chủ nhiệm',
			dataIndex: 'teacher',
			sorter: (a, b) => a.teacher.localeCompare(b.teacher),
			width: '15%',
		},
		{
			title: 'Ngày bắt đầu',
			dataIndex: 'teacher',
			sorter: (a, b) => a.teacher.localeCompare(b.teacher),
			width: '15%',
		},
		{
			title: 'Ngày kết thúc',
			dataIndex: 'teacher',
			sorter: (a, b) => a.teacher.localeCompare(b.teacher),
			width: '15%',
		},

		{
			title: 'Danh sách chủ đề',
			dataIndex: 'list',
			render: (_, record) => (
				<div className=''>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Lists />
					</Button>
				</div>
			),
			width: '15%',
		},
		{
			title: '',
			dataIndex: 'action',
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
			width: '30%',
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

	const rowSelection: TableRowSelection<SemesterData> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const onChange: TableProps<SemesterData>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};
	const handleOkDelete = () => {
		setIsModalOpenDelete(false);
	};
	const handleCancelDelete = () => {
		setIsModalOpenDelete(false);
	};
	return (
		<div>
			<>
				<SideBarAssignment />
				<div className='pl-[278px]'>
					<div className='px-6'>
						<div className='flex justify-end'>
							<div className='flex items-center gap-4'>
								<Trash />
								<div className='h-12 w-[1px] bg-[#c8c4c0]' />
								<Button
									className='h-[52px]'
									type='primary'
									icon={<Plus />}
									size='middle'
									// onClick={() => setIsModalOpen(true)}
								>
									<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
										Thêm mới
									</div>
								</Button>

								{/* Modal Add */}
								{/* <Modal
									title='Thêm lớp học mới'
									open={isModalOpen}
									onOk={handleOk}
									onCancel={handleCancel}
									styles={modalStyles}
									width={800}
									footer={[
										<Button className='w-40' key='back' onClick={handleCancel}>
											Hủy
										</Button>,
										<Button className='w-40' key='submit' type='primary' onClick={handleOk}>
											Lưu
										</Button>,
									]}
								>
									<div className='py-5'>
										<div className=''>
											<div className=''>
												<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
													Thông tin chung
												</div>
											</div>
											<div className='flex items-center justify-between py-5'>
												<div className='flex items-center gap-1'>
													<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
														Niên khóa:{' '}
													</div>
													<Select
														// defaultValue='2025-2026'
														placeholder='Niên khóa'
														style={{ width: 120 }}
														onChange={handleChangeDeclatation}
														options={[
															{ value: '2020-2021', label: '2020-2021' },
															{ value: '2021-2022', label: '2021-2022' },
															{ value: '2022-2023', label: '2022-2023' },
															{ value: '2023-2024', label: '2023-2024' },
															{ value: '2024-2025', label: '2024-2025' },
															{ value: '2025-2026', label: '2025-2026' },
														]}
													/>
												</div>
												<div className='flex items-center gap-1'>
													<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
														Khoa - Khối:{' '}
														<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</span>
													</div>
													<Select
														defaultValue='Khối 6'
														placeholder='Chọn khối'
														style={{ width: 120 }}
														onChange={handleChangeDeclatation}
														options={[
															{ value: 'Khối 6', label: 'Khối 6' },
															{ value: 'Khối 7', label: 'Khối 7' },
															{ value: 'Khối 8', label: 'Khối 8' },
															{ value: 'Khối 9', label: 'Khối 9' },
															{ value: 'Khối 10', label: 'Khối 10' },
															{ value: 'Khối 11', label: 'Khối 11' },
															{ value: 'Khối 12', label: 'Khối 12' },
														]}
													/>
												</div>
											</div>
											<div className='space-y-10'>
												<div className='flex h-5 items-center'>
													<div className='flex min-w-36 items-start justify-start'>
														<div className='flex items-center justify-center gap-0.5'>
															<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
																Tên lớp:
																<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
																	*
																</span>
															</div>
														</div>
													</div>
		
													<Input placeholder='Nhập tên lớp' />
												</div>
		
												<div className='flex h-5 items-center'>
													<div className='flex min-w-36 items-start justify-start'>
														<div className='flex items-center justify-center gap-0.5'>
															<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
																Số lượng học viên:
																<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
																	*
																</span>
															</div>
														</div>
													</div>
													<Input
														placeholder='Tìm kiếm'
														// className='h-10 w-[561px] bg-[#F0F3F6]'
														// variant='filled'
													/>
												</div>
		
												<div className='flex h-5 items-center'>
													<div className='flex min-w-36 items-start justify-start'>
														<div className='flex items-center justify-center gap-0.5'>
															<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
																Phân loại lớp:
																<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
																	*
																</span>
															</div>
														</div>
													</div>
													<Select
														defaultValue='Khối 6'
														placeholder='Chọn khối'
														onChange={handleChangeDeclatation}
														options={[
															{ value: 'Khối 6', label: 'Khối 6' },
															{ value: 'Khối 7', label: 'Khối 7' },
															{ value: 'Khối 8', label: 'Khối 8' },
															{ value: 'Khối 9', label: 'Khối 9' },
															{ value: 'Khối 10', label: 'Khối 10' },
															{ value: 'Khối 11', label: 'Khối 11' },
															{ value: 'Khối 12', label: 'Khối 12' },
														]}
														className='w-full'
													/>
												</div>
		
												<div className='flex h-5 items-center'>
													<div className='flex min-w-36 items-start justify-start'>
														<div className='flex items-center justify-center gap-0.5'>
															<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
																Giáo viên chủ nhiệm:
															</div>
														</div>
													</div>
		
													<Select
														defaultValue='Khoa học tự nhiên'
														onChange={handleChange}
														options={[
															{ value: 'Môn học bắt buộc', label: 'Môn học bắt buộc' },
															{ value: 'Môn học tự chọn', label: 'Môn học tự chọn' },
														]}
														className='w-full'
													/>
												</div>
												<div className='flex h-5 items-center'>
													<div className='flex min-w-36 items-start justify-start'>
														<div className='flex items-center justify-center gap-0.5'>
															<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
																Mô tả:
															</div>
														</div>
													</div>
		
													<Input placeholder='Nhập mô tả' />
												</div>
											</div>
		
											<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
		
											<div>
												<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
													Danh sách môn học
												</p>
												<div>
													<div className='flex items-center gap-2'>
														<Checkbox onChange={onChangeBox} />
														<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Kế thừa dữ liệu:{' '}
														</div>
														<Select
															// defaultValue='2025-2026'
															placeholder='Niên khóa'
															style={{ width: 120 }}
															onChange={handleChangeDeclatation}
															options={[
																{ value: '2020-2021', label: '2020-2021' },
																{ value: '2021-2022', label: '2021-2022' },
																{ value: '2022-2023', label: '2022-2023' },
																{ value: '2023-2024', label: '2023-2024' },
																{ value: '2024-2025', label: '2024-2025' },
																{ value: '2025-2026', label: '2025-2026' },
															]}
														/>
													</div>
												</div>
												<div className='space-y-3'>
													<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
														Danh sách môn học
													</p>
													<div className='space-y-4'>
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
													
														
													</div>
												</div>
											</div>
										</div>
									</div>
								</Modal> */}
							</div>
						</div>
						<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
							<div className='flex items-center justify-between'>
								<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
									Lớp học
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
									<Table<SemesterData>
										rowSelection={rowSelection}
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
							</div>
						</div>
					</div>
				</div>
			</>

			{/* Modal delete */}
			<Modal
				title='Xóa phân công'
				open={isModalOpenDelete}
				onOk={handleOkDelete}
				onCancel={handleCancelDelete}
				styles={modalStyles}
				footer={[
					<Button className='w-40' key='back' onClick={handleCancelDelete}>
						Hủy
					</Button>,
					<Button className='w-40' key='submit' type='primary' onClick={handleOkDelete}>
						Xác nhận
					</Button>,
				]}
			>
				<div className="font-['Source Sans Pro'] text-center text-base font-normal leading-tight text-[#373839]">
					Xác nhận muốn xoá phân công này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể
					hoàn tác.
				</div>
			</Modal>
		</div>
	);
}

export default InstructorAssignmentPage;
