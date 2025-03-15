import { Button, Modal } from 'antd';

interface DeleteClassModalProps {
	visible: boolean;
	onOk: () => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

export const DeleteClassModal: React.FC<DeleteClassModalProps> = ({ visible, onOk, onCancel }) => {
	const handleSubmit = () => onOk();
	const handleCancelModal = () => onCancel();

	return (
		<Modal
			title='Xóa'
			open={visible}
			onOk={handleSubmit}
			onCancel={handleCancelModal}
			styles={modalStyles}
			footer={[
				<Button className='w-40' key='back' onClick={handleCancelModal}>
					Hủy
				</Button>,
				<Button className='w-40' key='submit' type='primary' onClick={handleSubmit}>
					Xác nhận
				</Button>,
			]}
		>
			<div className="font-['Source Sans Pro'] text-center text-base font-normal leading-tight text-[#373839]">
				Xác nhận muốn xoá môn học này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn
				tác.
			</div>
		</Modal>
	);
};
