import { Button, Modal } from 'antd';

interface DeleteScoreTypeModalProps {
	isModalOpenDelete: boolean;
	id: string | null;
	onOk: (id: string) => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

const DeleteModal = ({ isModalOpenDelete, id, onOk, onCancel }: DeleteScoreTypeModalProps) => {
	const handleSubmit = () => {
		if (id) {
			console.log(id);

			onOk(id);
		}
	};
	return (
		<Modal
			title='Xóa'
			open={isModalOpenDelete}
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

export default DeleteModal;
