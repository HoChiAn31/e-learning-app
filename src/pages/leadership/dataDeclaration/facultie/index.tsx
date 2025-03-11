import { Button, ConfigProvider, Input, Modal, Table, TableColumnsType, TableProps } from 'antd';
import { Edit, List, Plus, Search, Trash } from '../../../../components/icon';
import { useState } from 'react';
interface SemesterData {
	id: string;
	facultie: string;
	facultieName: string;
}

interface SemesterDataAdd {
	facultie: string;
	facultieName: string;
}

interface dataTeacher {
	id: string;
	name: string;
}
const data: SemesterData[] = [
	{ id: '550e8400-e29b-41d4-a716-446655440000', facultie: 'K09', facultieName: 'Khối 9' },
	{ id: '550e8400-e29b-41d4-a716-446655440001', facultie: 'K10', facultieName: 'Khối 10' },
	{ id: '550e8400-e29b-41d4-a716-446655440002', facultie: 'K11', facultieName: 'Khối 11' },
];

const dataTeacher: dataTeacher[] = [
	{ id: '550e8400-e29b-41d4-a715-446655440000', name: 'Nguyễn Văn A' },
	{ id: '550e8400-e29b-41d4-a715-446655440001', name: 'Trần Thị B' },
	{ id: '550e8400-e29b-41d4-a715-446655440002', name: 'Lê Văn C' },
	{ id: '550e8400-e29b-41d4-a715-446655440003', name: 'Huỳnh Thanh D' },
	{ id: '550e8400-e29b-41d4-a715-446655440004', name: 'Nguyễn Thanh E' },
	{ id: '550e8400-e29b-41d4-a715-446655440004', name: 'Đào Thị F' },
	{ id: '550e8400-e29b-41d4-a715-446655440004', name: 'Phạm Văn G' },
];
function FacultiePage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [IsModalList, setIsModalOpenList] = useState<boolean>(false);
	const handleEditList = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		setIsModalOpenList(true);
	};
	const handleEdit = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		setIsModalOpen(true);
	};

	const handleDelete = (record: SemesterData) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.id);
		setIsModalOpenDelete(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const handleOkList = () => {
		setIsModalOpenList(false);
	};
	const handleCancelList = () => {
		setIsModalOpenList(false);
	};
	const modalStyles = {
		header: {
			textAlign: 'center' as 'center',
		},
		footer: {
			textAlign: 'center' as 'center',
		},
	};
	const columns: TableColumnsType<SemesterData> = [
		{
			title: 'Mã khoa - khối',
			dataIndex: 'facultie',
			sorter: (a, b) => a.facultie.localeCompare(b.facultie),
			width: '15%',
		},
		{
			width: '10%',
		},
		{
			title: 'Tên khoa - khối',
			dataIndex: 'facultieName',
			sorter: (a, b) => a.facultieName.localeCompare(b.facultieName),
			width: '15%',
		},
		{
			width: '10%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div className=''>
					<Button type='link' onClick={() => handleEditList(record)}>
						<List />
					</Button>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '20%',
		},
	];
	const onChange: TableProps<SemesterData>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};
	return (
		<div>
			<div className='flex w-full items-end justify-end'>
				<Button
					className='py-5'
					type='primary'
					icon={<Plus />}
					size='middle'
					onClick={() => setIsModalOpen(true)}
					// onClick={showModal}
				>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Thêm mới
					</div>
				</Button>
				{/* Modal Add */}
				<Modal
					title='Thêm Tổ - Bộ môn mới'
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
							{/* left */}
							<div className='space-y-10'>
								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Mã khoa - khối:
											</div>
										</div>
									</div>
									<Input
										placeholder='Tìm kiếm'
										className='h-10 w-[561px] bg-[#F0F3F6]'
										variant='filled'
									/>
								</div>

								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Khoa - khối:
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

								<div className='flex h-5 items-center justify-between'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Trưởng khoa - khối:
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
							</div>
						</div>
					</div>
				</Modal>
			</div>
			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
						Khoa - Khối
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
			{/* Modal List */}
			<Modal
				title='Danh sách lớp học'
				open={IsModalList}
				onOk={handleOkList}
				onCancel={handleCancelList}
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
			></Modal>
		</div>
	);
}

export default FacultiePage;
