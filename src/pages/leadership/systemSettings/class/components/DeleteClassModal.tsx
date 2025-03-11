import React from 'react';
import { Button, Modal } from 'antd';

interface DeleteGroupUserModalProps {
	visible: boolean;
	onOk: () => void;
	onCancel: () => void;
}

const DeleteGroupUserModal: React.FC<DeleteGroupUserModalProps> = ({ visible, onOk, onCancel }) => {
	const modalStyles = {
		header: { textAlign: 'center' as const },
		footer: { textAlign: 'center' as const },
	};

	return (
		<Modal
			title='Xóa lớp học'
			open={visible}
			onOk={onOk}
			onCancel={onCancel}
			styles={modalStyles}
			footer={[
				<Button className='w-40' key='back' onClick={onCancel}>
					Hủy
				</Button>,
				<Button className='w-40' key='submit' type='primary' onClick={onOk}>
					Xác nhận
				</Button>,
			]}
		>
			<div className="font-['Source Sans Pro'] text-center text-base font-normal leading-tight text-[#373839]">
				Xác nhận muốn xoá lớp học này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn
				tác.
			</div>
		</Modal>
	);
};

export default DeleteGroupUserModal;
