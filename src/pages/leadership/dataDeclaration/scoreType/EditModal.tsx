import { Button, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import {
	dataDeclaration_scoreType,
	dataDeclaration_scoreType_add_edit,
} from '../../../../types/leadership';

interface EditScoreTypeModalProps {
	isModalOpen: boolean;
	handleOk: (data: dataDeclaration_scoreType_add_edit) => void;
	handleCancel: () => void;
	handleChange: (value: string) => void;
	record: dataDeclaration_scoreType_add_edit | null; // Bản ghi cần chỉnh sửa
}

const modalStyles = {
	header: {
		textAlign: 'center' as 'center',
	},
	footer: {
		textAlign: 'center' as 'center',
	},
};

const scoreTypeOptions = [
	{ value: 'Kiểm tra miệng', label: 'Kiểm tra miệng' },
	{ value: 'Kiểm tra 15 phút', label: 'Kiểm tra 15 phút' },
	{ value: 'Kiểm tra 45 phút', label: 'Kiểm tra 45 phút' },
	{ value: 'Kiểm tra giữa kỳ', label: 'Kiểm tra giữa kỳ' },
	{ value: 'Kiểm tra cuối kỳ', label: 'Kiểm tra cuối kỳ' },
];

const EditModal = ({
	isModalOpen,
	handleOk,
	handleCancel,
	handleChange,
	record,
}: EditScoreTypeModalProps) => {
	// Khởi tạo state với dữ liệu từ record
	const [formData, setFormData] = useState<dataDeclaration_scoreType_add_edit>({
		scoreType: '',
		coefficient: 1,
		semester1: 45,
		semester2: 24,
	});
	console.log(record);
	// Cập nhật formData khi record thay đổi
	useEffect(() => {
		if (record) {
			setFormData({
				scoreType: record.scoreType,
				coefficient: record.coefficient,
				semester1: record.semester1,
				semester2: record.semester2,
			});
		}
	}, [record]);
	console.log(formData);
	const handleInputChange = (
		field: keyof dataDeclaration_scoreType_add_edit,
		value: string | number,
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const onOk = () => {
		handleOk(formData);
	};

	return (
		<Modal
			title='Chỉnh sửa loại điểm'
			open={isModalOpen}
			onOk={onOk}
			onCancel={handleCancel}
			styles={modalStyles}
			width={800}
			footer={[
				<Button className='w-40' key='back' onClick={handleCancel}>
					Hủy
				</Button>,
				<Button className='w-40' key='submit' type='primary' onClick={onOk}>
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
							<Select
								style={{ width: 200 }}
								value={formData.scoreType || undefined}
								onChange={(value) => handleInputChange('scoreType', value)}
								placeholder='Chọn loại điểm'
								options={scoreTypeOptions}
								defaultValue={formData.scoreType || undefined}
							/>
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
								style={{ width: 120 }}
								value={formData.coefficient.toString()}
								onChange={(value) => {
									handleChange(value);
									handleInputChange('coefficient', parseFloat(value));
								}}
								placeholder='Chọn hệ số'
								options={[
									{ value: '0.1', label: '0.1' },
									{ value: '0.15', label: '0.15' },
									{ value: '0.2', label: '0.2' },
									{ value: '0.25', label: '0.25' },
									{ value: '0.3', label: '0.3' },
								]}
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
								<input
									className='w-32 rounded border p-1'
									placeholder='Nhập số tiết'
									value={formData.semester1}
									onChange={(e) => handleInputChange('semester1', parseFloat(e.target.value) || 0)}
									type='number'
								/>
							</div>
							<div className='flex items-center gap-1'>
								<p className="font-['Source Sans Pro'] w-24 text-base font-bold tracking-tight text-[#373839]">
									Học kì II:
								</p>
								<input
									className='w-32 rounded border p-1'
									placeholder='Nhập số tiết'
									value={formData.semester2}
									onChange={(e) => handleInputChange('semester2', parseFloat(e.target.value) || 0)}
									type='number'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default EditModal;
