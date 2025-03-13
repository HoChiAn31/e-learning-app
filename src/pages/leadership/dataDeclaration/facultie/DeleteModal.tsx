import { Button, Modal } from 'antd';

interface DeleteModalProps {
	visible: boolean;
	id: string | null; // Thêm prop id để truyền ID của bản ghi
	onOk: (id: string) => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

export const DeleteModal: React.FC<DeleteModalProps> = ({ visible, id, onOk, onCancel }) => {
	const handleSubmit = () => {
		if (id) {
			onOk(id); // Truyền id trực tiếp khi xác nhận xóa
		}
	};

	return (
		<Modal
			title='Xác nhận xóa Khoa - Khối'
			open={visible}
			onOk={handleSubmit}
			onCancel={onCancel}
			styles={modalStyles}
			width={500}
			footer={[
				<Button className='w-40' key='back' onClick={onCancel}>
					Hủy
				</Button>,
				<Button
					className='w-40 bg-primary'
					key='submit'
					type='primary'
					danger
					onClick={handleSubmit}
				>
					Xóa
				</Button>,
			]}
		>
			<div className='py-5 text-center'>
				<p>
					Xác nhận muốn xóa Khoa - khối này và toàn bộ thông tin bên trong? Sau khi xóa sẽ không thể
					hoàn tác.
				</p>
			</div>
		</Modal>
	);
};
