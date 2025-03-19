import { Modal, Table, TableColumnsType } from 'antd';
import { useState } from 'react';

interface Subject {
	key: string;
	subjectCode: string;
	subjectName: string;
}

interface ViewSubjectsModalProps {
	isModalOpen: boolean;
	onCancel: () => void;
	subjects: Subject[];
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

export default function ViewSubjectsModal({
	isModalOpen,
	onCancel,
	subjects,
}: ViewSubjectsModalProps) {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const columns: TableColumnsType<Subject> = [
		{
			title: 'Mã môn học',
			dataIndex: 'subjectCode',
			width: '30%',
		},
		{
			title: 'Tên môn học',
			dataIndex: 'subjectName',
			width: '70%',
		},
	];

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	return (
		<Modal
			title='Danh sách môn học'
			open={isModalOpen}
			onCancel={onCancel}
			styles={modalStyles}
			width={600}
			footer={null}
		>
			<div className='py-5'>
				<Table<Subject>
					rowSelection={rowSelection}
					columns={columns}
					dataSource={subjects}
					pagination={false}
					rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
				/>
			</div>
		</Modal>
	);
}
