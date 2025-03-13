import { Button, Input, Modal, Select } from 'antd';
import { useState } from 'react';

interface AddModalProps {
	visible: boolean;
	onOk: (data: { facultyCode: string; facultyName: string; facultyHead: string }) => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};
const dataTeachers = [
	{ value: 'Nguyễn Văn A', label: 'Nguyễn Văn A' },
	{ value: 'Trần Thị B', label: 'Trần Thị B' },
	{ value: 'Lê Văn C', label: 'Lê Văn C' },
	{ value: 'Huỳnh Thanh D', label: 'Huỳnh Thanh D' },
	{ value: 'Nguyễn Thanh E', label: 'Nguyễn Thanh E' },
	{ value: 'Đào Thị F', label: 'Đào Thị F' },
	{ value: 'Phạm Văn G', label: 'Phạm Văn G' },
];
export const AddModal: React.FC<AddModalProps> = ({ visible, onOk, onCancel }) => {
	const [selectedFaculty, setSelectedFaculty] = useState<string>('');
	const [facultyHead, setFacultyHead] = useState<string>('');

	const handleFacultyChange = (value: string) => {
		setSelectedFaculty(value);
	};

	const handleFacultyHeadChange = (e: string) => {
		setFacultyHead(e);
	};

	const getFacultyCode = () => {
		switch (selectedFaculty) {
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
		onOk({
			facultyCode: getFacultyCode(),
			facultyName: selectedFaculty,
			facultyHead: facultyHead,
		});
	};

	const handleCancelModal = () => {
		setSelectedFaculty('');
		setFacultyHead('');
		onCancel();
	};

	return (
		<Modal
			title='Thêm lập Khoa - Khối'
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
						<Input value={getFacultyCode()} disabled className='h-10 w-[561px] bg-[#F0F3F6]' />
					</div>
					<div className='flex h-5 items-center justify-between'>
						<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Khoa - khối:
						</div>
						<Select
							value={selectedFaculty || undefined}
							onChange={handleFacultyChange}
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

						<Select
							value={facultyHead || undefined}
							onChange={handleFacultyHeadChange}
							placeholder='Chọn khối'
							className='h-10 w-[561px]'
							options={dataTeachers}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};
