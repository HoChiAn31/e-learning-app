import React from 'react';
import { Button, ConfigProvider, Input, Table, TableColumnsType, TableProps } from 'antd';
import { Edit, Trash, Search } from '../../../../components/icon';
import { dataDeclaration_schoolYear } from '../../../../types/leadership';

interface SemesterTableProps {
	data: dataDeclaration_schoolYear[];
	onEdit: (record: dataDeclaration_schoolYear) => void;
	onDelete: (record: dataDeclaration_schoolYear) => void;
}

export const Tables: React.FC<SemesterTableProps> = ({ data, onEdit, onDelete }) => {
	// Define the columns for the school year table
	const columns: TableColumnsType<dataDeclaration_schoolYear> = [
		{
			title: 'STT',
			dataIndex: 'index',
			key: 'index',
			render: (_, __, index) => index + 1,
			width: '10%',
		},
		{
			title: 'Niên khóa',
			render: (_, record) => `${record.academicYearFrom} - ${record.academicYearTo}`,
			sorter: (a, b) => a.academicYearFrom.localeCompare(b.academicYearFrom),
			width: '30%',
		},
		{
			title: 'Thời gian bắt đầu',
			render: (_, record) => (record.semesters.length > 0 ? record.semesters[0].startDate : 'N/A'),
			width: '20%',
		},
		{
			title: 'Thời gian kết thúc',
			render: (_, record) =>
				record.semesters.length > 0 ? record.semesters[record.semesters.length - 1].endDate : 'N/A',
			width: '20%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div>
					<Button type='link' onClick={() => onEdit(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => onDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '20%',
		},
	];

	return (
		<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
			<div className='flex items-center justify-between'>
				<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
					Niên khoá
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
					<Table<dataDeclaration_schoolYear>
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
		</div>
	);
};
