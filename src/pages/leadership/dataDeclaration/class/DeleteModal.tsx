import { Button, Modal } from 'antd';

interface DeleteClassModalProps {
	visible: boolean;
	id: string | null;
	onOk: (id: string) => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

export const DeleteClassModal: React.FC<DeleteClassModalProps> = ({
	visible,
	id,
	onOk,
	onCancel,
}) => {
	const handleSubmit = () => {
		if (id) {
			onOk(id); // Truyền id trực tiếp khi xác nhận xóa
		}
	};

	return (
		<Modal
			title='Xóa lớp học'
			open={visible}
			onOk={handleSubmit}
			onCancel={onCancel}
			styles={modalStyles}
			footer={[
				<Button className='w-40' key='back' onClick={onCancel}>
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
