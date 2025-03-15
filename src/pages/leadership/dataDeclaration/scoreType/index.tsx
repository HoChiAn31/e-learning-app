import { Button, ConfigProvider, Input, Select, Table, TableColumnsType, TableProps } from 'antd';
import { Edit, Plus, Search, Trash } from '../../../../components/icon';
import { useEffect, useState } from 'react';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import {
	dataDeclaration_scoreType,
	dataDeclaration_scoreType_add_edit,
} from '../../../../types/leadership';
import {
	addScoreType,
	deleteScoreType,
	getScoreTypes,
	updateScoreType,
} from '../../../../firebase/dataDeclaration/fetchScoreType';

function ScoreTypePage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false); // State cho EditModal
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [dataScoreType, setDataScoreType] = useState<dataDeclaration_scoreType[]>([]);
	const [selectedRecord, setSelectedRecord] = useState<dataDeclaration_scoreType | null>(null); // Bản ghi được chọn để chỉnh sửa
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const fetchScoreType = async () => {
		const data = await getScoreTypes();
		setDataScoreType(data);
	};

	useEffect(() => {
		fetchScoreType();
	}, []);

	const handleEdit = (record: dataDeclaration_scoreType) => {
		setSelectedRecord(record);
		setIsEditModalOpen(true);
	};

	const handleDelete = (record: dataDeclaration_scoreType) => {
		setDeleteId(record.id);
		setIsModalOpenDelete(true);
	};

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const columns: TableColumnsType<dataDeclaration_scoreType> = [
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

	const onChange: TableProps<dataDeclaration_scoreType>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const handleOkAdd = async (data: dataDeclaration_scoreType_add_edit) => {
		try {
			await addScoreType(data);
			setIsModalOpen(false);
			await fetchScoreType(); // Cập nhật danh sách sau khi thêm
		} catch (error) {
			console.error('Lỗi khi thêm loại điểm:', error);
		}
	};

	const handleOkEdit = async (data: dataDeclaration_scoreType_add_edit) => {
		if (selectedRecord) {
			try {
				await updateScoreType(selectedRecord.id, data); // Gọi hàm cập nhật
				setIsEditModalOpen(false);
				await fetchScoreType(); // Cập nhật danh sách sau khi chỉnh sửa
			} catch (error) {
				console.error('Lỗi khi cập nhật loại điểm:', error);
			}
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false); // Đóng cả hai modal nếu cần
	};

	const handleOkDelete = async (id: string) => {
		try {
			await deleteScoreType(id);
			setIsModalOpenDelete(false);
			setDeleteId(null);
			await fetchScoreType();
		} catch (error) {
			console.error('Lỗi khi cập nhật tổ - bộ môn:', error);
		}
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
				>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Thêm mới
					</div>
				</Button>

				<AddModal
					isModalOpen={isModalOpen}
					handleOk={handleOkAdd}
					handleCancel={handleCancel}
					handleChange={handleChange}
				/>

				<EditModal
					isModalOpen={isEditModalOpen}
					handleOk={handleOkEdit}
					handleCancel={handleCancel}
					handleChange={handleChange}
					record={selectedRecord}
				/>
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
						<Table<dataDeclaration_scoreType>
							columns={columns}
							dataSource={dataScoreType}
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

			<DeleteModal
				isModalOpenDelete={isModalOpenDelete}
				onOk={handleOkDelete}
				id={deleteId}
				onCancel={handleCancelDelete}
			/>
		</div>
	);
}

export default ScoreTypePage;
