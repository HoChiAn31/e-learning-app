import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Row, Col } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface AddGroupUserModalProps {
	visible: boolean;
	onOk: () => void;
	onCancel: () => void;
}

const AddGroupUserModal: React.FC<AddGroupUserModalProps> = ({ visible, onOk, onCancel }) => {
	const [form] = Form.useForm();
	const [isDecentralization, setIsDecentralization] = useState(false);
	const modalStyles = {
		header: { textAlign: 'center' as const },
		footer: { textAlign: 'center' as const },
	};
	const categories = [
		{ label: 'Khai báo dữ liệu', name: 'concept' },
		{ label: 'Hồ sơ học viên', name: 'simpleUnderstanding' },
		{ label: 'Hồ sơ giảng viên', name: 'deepUnderstanding' },
		{ label: 'Thi cử', name: 'practice' },
		{ label: 'Cài đặt hệ thống', name: 'improvement' },
	];
	const permissions = ['view', 'edit', 'delete', 'add'];

	return (
		<Modal
			title='Thiết lập niên khoá'
			open={visible}
			onOk={onOk}
			onCancel={onCancel}
			styles={modalStyles}
			width={800}
			footer={[
				<Button key='back' onClick={onCancel}>
					Hủy
				</Button>,
				<Button key='submit' type='primary' onClick={onOk}>
					Lưu
				</Button>,
			]}
		>
			<div className='py-5'>
				<div className='space-y-10'>
					<div className='flex h-5 items-center justify-between gap-20'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Tên nhóm:
						</span>
						<Input
							placeholder='Nhập tên nhóm'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
						/>
					</div>
					<div className='flex items-start justify-between'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Ghi chú:
						</span>
						<TextArea
							placeholder='Nhập ghi chú'
							className='w-[561px] bg-[#F0F3F6]'
							variant='filled'
							rows={4}
						/>
					</div>
					<div className='flex items-start gap-20'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Phân quyền:
						</span>
						<div className='flex gap-4'>
							<Checkbox
								checked={isDecentralization}
								onChange={(e) => setIsDecentralization(e.target.checked)}
							>
								Toàn quyền quản trị
							</Checkbox>
							<Checkbox
								checked={!isDecentralization}
								onChange={(e) => setIsDecentralization(!e.target.checked)}
							>
								Tùy chọn
							</Checkbox>
						</div>
					</div>
				</div>
				<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
				{!isDecentralization && (
					<Form form={form} layout='vertical'>
						{categories.map((category) => (
							<div key={category.name} className='flex gap-4'>
								<div className='w-[160px] pt-0.5'>
									<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
										{category.label}:
									</span>
								</div>
								<Row gutter={16}>
									{permissions.map((permission) => (
										<Col span={4} key={permission}>
											<Form.Item name={[category.name, permission]} valuePropName='checked'>
												<Checkbox className='w-40'>
													{permission === 'view'
														? 'Xem'
														: permission === 'edit'
															? 'Chỉnh sửa'
															: permission === 'delete'
																? 'Xóa'
																: 'Thêm mới'}
												</Checkbox>
											</Form.Item>
										</Col>
									))}
								</Row>
							</div>
						))}
					</Form>
				)}
			</div>
		</Modal>
	);
};

export default AddGroupUserModal;
