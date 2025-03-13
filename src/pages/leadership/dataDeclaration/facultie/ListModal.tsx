import { Button, Modal } from 'antd';

interface ListModalProps {
	visible: boolean;
	onOk: () => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

export const ListModal: React.FC<ListModalProps> = ({ visible, onOk, onCancel }) => {
	return (
		<Modal
			title='Danh sách lớp học'
			open={visible}
			onOk={onOk}
			onCancel={onCancel}
			styles={modalStyles}
			width={800}
			footer={[
				<Button className='w-40' key='back' onClick={onCancel}>
					Hủy
				</Button>,
				<Button className='w-40' key='submit' type='primary' onClick={onOk}>
					Lưu
				</Button>,
			]}
		>
			{/* Nội dung của modal danh sách lớp học có thể thêm sau */}
		</Modal>
	);
};
