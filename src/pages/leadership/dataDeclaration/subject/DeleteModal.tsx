import { Button, Modal } from 'antd';

interface DeleteModalProps {
	visible: boolean;
	onOk: () => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

export const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onOk, onCancel }) => {
	return (
		<Modal
			title='Xóa'
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
				Xác nhận muốn xóa môn học này và toàn bộ thông tin bên trong? Sau khi xóa sẽ không thể hoàn
				tác.
			</div>
		</Modal>
	);
};
