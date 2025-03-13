import { Button, Input, Modal, Select } from 'antd';
import { useState, useEffect } from 'react';
import { dataDeclaration_facultie } from '../../../../types/leadership';

interface EditModalProps {
	visible: boolean;
	record: dataDeclaration_facultie | null;
	onOk: (data: {
		id: string;
		facultyCode: string;
		facultyName: string;
		facultyHead: string;
	}) => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

export const EditModal: React.FC<EditModalProps> = ({ visible, record, onOk, onCancel }) => {
	const [editFaculty, setEditFaculty] = useState<string>('');
	const [editFacultyHead, setEditFacultyHead] = useState<string>('');

	useEffect(() => {
		if (record) {
			setEditFaculty(record.facultyName);
			setEditFacultyHead(record.facultyHead || '');
		}
	}, [record]);

	const handleEditFacultyChange = (value: string) => {
		setEditFaculty(value);
	};

	const handleEditFacultyHeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditFacultyHead(e.target.value);
	};

	const getEditFacultyCode = () => {
		switch (editFaculty) {
			case 'Khối 10':
				return 'K10';
			case 'Khối 11':
				return 'K11';
			case 'Khối 12':
				return 'K12';
			default:
				return '';
		}
	};

	const handleSubmit = () => {
		if (record) {
			onOk({
				id: record.id,
				facultyCode: getEditFacultyCode(),
				facultyName: editFaculty,
				facultyHead: editFacultyHead,
			});
		}
	};

	const handleCancelModal = () => {
		setEditFaculty('');
		setEditFacultyHead('');
		onCancel();
	};

	return (
		<Modal
			title='Chỉnh sửa Khoa - Khối'
			open={visible}
			onOk={handleSubmit}
			onCancel={handleCancelModal}
			styles={modalStyles}
			width={800}
			footer={[
				<Button className='w-40' key='back' onClick={handleCancelModal}>
					Hủy
				</Button>,
				<Button className='w-40 bg-primary' key='submit' type='primary' onClick={handleSubmit}>
					Lưu
				</Button>,
			]}
		>
			<div className='py-5'>
				<div className='space-y-10'>
					<div className='flex h-5 items-center justify-between'>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Mã khoa - khối:
						</div>
						<Input value={getEditFacultyCode()} disabled className='h-10 w-[561px] bg-[#F0F3F6]' />
					</div>
					<div className='flex h-5 items-center justify-between'>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Khoa - khối:
						</div>
						<Select
							value={editFaculty || undefined}
							onChange={handleEditFacultyChange}
							placeholder='Chọn khối'
							className='h-10 w-[561px]'
							options={[
								{ value: 'Khối 10', label: 'Khối 10' },
								{ value: 'Khối 11', label: 'Khối 11' },
								{ value: 'Khối 12', label: 'Khối 12' },
							]}
						/>
					</div>
					<div className='flex h-5 items-center justify-between'>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Trưởng khoa - khối:
						</div>
						<Input
							value={editFacultyHead}
							onChange={handleEditFacultyHeadChange}
							placeholder='Nhập tên trưởng khoa'
							className='h-10 w-[561px] bg-[#F0F3F6]'
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};
