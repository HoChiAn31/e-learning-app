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
import { Edit, Plus, Search, Trash } from '../../../../components/icon';
import { useState } from 'react';

interface SemesterData {
	// key: React.Key;
	key: string;
	scoreType: string;
	coefficient: number;
	semester1: number;
	semester2: number;
}
const data: SemesterData[] = [
	{
		key: '1',
		scoreType: 'Kiểm tra miệng',
		coefficient: 0.15,
		semester1: 9.0,
		semester2: 8.0,
	},
	{
		key: '2',
		scoreType: 'Kiểm tra 15 phút',
		coefficient: 0.1,
		semester1: 8.5,
		semester2: 7.5,
	},
	{
		key: '3',
		scoreType: 'Kiểm tra 45 phút',
		coefficient: 0.2,
		semester1: 7.0,
		semester2: 6.5,
	},
	{
		key: '4',
		scoreType: 'Kiểm tra giữa kỳ',
		coefficient: 0.25,
		semester1: 8.8,
		semester2: 7.9,
	},
	{
		key: '5',
		scoreType: 'Kiểm tra cuối kỳ',
		coefficient: 0.3,
		semester1: 8.3,
		semester2: 8.7,
	},
];

function ScoreTypePage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);

	const handleEdit = (record: SemesterData) => {
		console.log('Edit academic year:', record);
		setIsModalOpen(true);
	};

	const handleDelete = (record: SemesterData) => {
		console.log('Remove academic year:', record);
		console.log('Remove academic year key:', record.key);
		setIsModalOpenDelete(true);
	};
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	const columns: TableColumnsType<SemesterData> = [
		{
			title: 'Loại điểm',
			dataIndex: 'scoreType',
			sorter: (a, b) => a.scoreType.localeCompare(b.scoreType),
			width: '15%',
		},

		{
			title: 'Hệ số',
			dataIndex: 'coefficient',
			sorter: (a, b) => a.coefficient - b.coefficient,
			width: '15%',
		},
		{
			title: 'Số cột điểm tối thiểu',
			children: [
				{
					title: 'Học kì 1',
					dataIndex: 'semester1',
					width: '15%',
				},
				{
					title: 'Học kì 2',
					dataIndex: 'semester2',
					width: '15%',
				},
			],
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
			width: '20%',
		},
	];

	const onChange: TableProps<SemesterData>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	// Modal add
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const modalStyles = {
		header: {
			textAlign: 'center' as 'center',
		},
		footer: {
			textAlign: 'center' as 'center',
		},
	};
	const handleOkDelete = () => {
		setIsModalOpenDelete(false);
	};
	const handleCancelDelete = () => {
		setIsModalOpenDelete(false);
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
					title='Thêm loại điểm mới'
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
							<div className='flex items-center justify-between'>
								<div className='flex h-5 items-center'>
									<div className='flex items-start justify-start'>
										<div className='flex w-28 items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Tên loại điểm:
											</div>
										</div>
									</div>
									<Input />
									{/* <Select
										defaultValue='Khoa học tự nhiên'
										onChange={handleChange}
										options={[
											{ value: 'Khoa học tự nhiên', label: 'Khoa học tự nhiên' },
											{ value: 'Văn hóa xã hội', label: 'Văn hóa xã hội' },
										]}
										className='w-[400px]'
									/> */}
								</div>
								<div className='flex h-5 items-center'>
									<div className='flex items-start justify-start'>
										<div className='flex items-center justify-center gap-0.5'>
											<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
												Hệ số:
											</div>
										</div>
									</div>

									<Select
										// defaultValue='1'
										style={{ width: 120 }}
										onChange={handleChange}
										placeholder='Chọn hệ số'
										options={[
											{ value: '1', label: '1' },
											{ value: '2', label: '2' },
										]}
										className=''
									/>
								</div>
							</div>

							<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>

							<div>
								<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
									Số cột điểm tối thiểu
								</p>

								<div className='flex items-center justify-between py-5'>
									<div className='flex items-center gap-1'>
										<p className="font-['Source Sans Pro'] w-24 text-base font-bold tracking-tight text-[#373839]">
											Học kì I:
										</p>
										<Input placeholder='Nhập số tiết' value={45} />
									</div>
									<div className='flex items-center gap-1'>
										<p className="font-['Source Sans Pro'] w-24 text-base font-bold tracking-tight text-[#373839]">
											Học kì II:
										</p>
										<Input placeholder='Nhập số tiết' value={24} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			</div>

			<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<div className='flex items-center justify-between'>
					<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
						Loại điểm
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
							// rowSelection={rowSelection}
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
			<Modal
				title='Xóa'
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
					Xác nhận muốn xoá môn học này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể
					hoàn tác.
				</div>
			</Modal>
		</div>
	);
}

export default ScoreTypePage;
