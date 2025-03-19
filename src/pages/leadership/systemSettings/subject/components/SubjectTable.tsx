import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, Table } from 'antd';
import { SystemSettings_subject, subjectProps } from '../type';
import { Edit, Search, Trash } from '../../../../../components/icon';
import DeleteGroupUserModal from './DeleteSubjectModal';
import { deleteSubjectSetting } from '../../../../../firebase/systems/subject';

export const subjectData: subjectProps[] = [
	{
		key: 1,
		type: 'Môn nâng cao',
		status: true,
		description: 'Môn học dành cho học sinh có năng lực cao, giúp nâng cao kiến thức chuyên sâu.',
	},
	{
		key: 2,
		type: 'Môn tăng cường',
		status: true,
		description: 'Môn học giúp củng cố và mở rộng kiến thức nền tảng cho học sinh.',
	},
	{
		key: 3,
		type: 'Môn cơ bản',
		status: false,
		description: 'Môn học cung cấp kiến thức cơ bản, phù hợp với tất cả học sinh.',
	},
	{
		key: 4,
		type: 'Môn phụ đạo',
		status: false,
		description: 'Môn học hỗ trợ học sinh gặp khó khăn trong việc tiếp thu kiến thức.',
	},
];

interface SubjectTable {
	isModalOpenDeleteGroupUsers?: boolean;
	setValueSearchs?: (value: string) => void;
	dataSubject: SystemSettings_subject[];
	selectedClassKeys?: number | string | null;
	setSelectedClassKeys?: (key: number | string | null) => void;
	onDeleteOK?: () => void;
}
const SubjectTable: React.FC<SubjectTable> = ({ dataSubject, onDeleteOK }) => {
	const [isModalOpenDeleteGroupUser, setIsModalOpenDeleteGroupUser] = useState(false);
	const [valueSearch, setValueSearch] = useState<string>('');
	const [data, setData] = useState<SystemSettings_subject[]>([]);
	const [selectedClassKey, setSelectedClassKey] = useState<string>('');

	useEffect(() => {
		setData(dataSubject);
	}, [dataSubject]);

	const columns = [
		{
			title: 'Loại lớp',
			dataIndex: 'subjectType',
			sorter: (a: SystemSettings_subject, b: SystemSettings_subject) =>
				a.subjectType.localeCompare(b.subjectType),
			width: '15%',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'subjectStatus',
			sorter: (a: SystemSettings_subject, b: SystemSettings_subject) =>
				Number(a.subjectStatus) - Number(b.subjectStatus),
			render: (status: boolean) => (status ? 'Đang hoạt động' : 'Vô hiệu hóa'),
			width: '10%',
		},
		{ title: 'Ghi chú', dataIndex: 'description', width: '30%' },
		{
			title: 'Hành động',
			dataIndex: 'action',
			render: (_: any, record: SystemSettings_subject) => (
				<div>
					<Button type='link' onClick={() => console.log('Edit:', record)}>
						<Edit />
					</Button>
					<Button
						type='link'
						onClick={() => {
							setSelectedClassKey(record.id as string);
							setIsModalOpenDeleteGroupUser(true);
						}}
					>
						<Trash />
					</Button>
				</div>
			),
			width: '20%',
		},
	];

	const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setValueSearch(e.target.value);
	};

	useEffect(() => {
		if (valueSearch.trim() === '') {
			setData(dataSubject);
		} else {
			const filteredData = subjectData.filter((d) =>
				d.type.toLowerCase().includes(valueSearch.toLowerCase()),
			);
			setData(dataSubject);
		}
	}, [valueSearch]);

	// Hàm xóa lớp học
	const handleDeleteClass = async () => {
		if (selectedClassKey !== null) {
			setData((prevData) => prevData.filter((item) => item.id !== selectedClassKey));
		}
		await deleteSubjectSetting(selectedClassKey);

		setIsModalOpenDeleteGroupUser(false);
		onDeleteOK?.();
		setSelectedClassKey('');
	};

	return (
		<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
			<div className='flex items-center justify-between'>
				<span className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
					Danh sách các loại lớp học
				</span>
				<Input
					placeholder='Tìm kiếm'
					className='w-[438px] rounded-full bg-[#F0F3F6]'
					prefix={<Search />}
					variant='filled'
					onChange={handleChangeValue}
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
					<Table<SystemSettings_subject>
						columns={columns}
						dataSource={data}
						pagination={{
							position: ['bottomRight'],
							showSizeChanger: true,
							pageSizeOptions: ['5', '10', '20', '50'],
							defaultPageSize: 5,
						}}
					/>
				</ConfigProvider>
			</div>
			{/* Modal xác nhận xóa */}
			<DeleteGroupUserModal
				visible={isModalOpenDeleteGroupUser}
				onOk={handleDeleteClass} // Gọi hàm xóa khi xác nhận
				onCancel={() => {
					setIsModalOpenDeleteGroupUser(false);
					setSelectedClassKey('');
				}}
			/>
		</div>
	);
};

export default SubjectTable;
