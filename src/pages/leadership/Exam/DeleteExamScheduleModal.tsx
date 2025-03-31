import { Button, Modal } from 'antd';
import { deleteExamSchedule } from '../../../firebase/instructorProfileList/fetchExamSchedule';

// Component DeleteExamScheduleModal
interface DeleteExamScheduleModalProps {
	isModalOpenDelete: boolean;
	setIsModalOpenDelete: (value: boolean) => void;
	examScheduleId: string | null; // ID của lịch thi cần xóa
	onDeleteSuccess: () => void; // Callback để cập nhật danh sách sau khi xóa
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};
export const DeleteExamScheduleModal: React.FC<DeleteExamScheduleModalProps> = ({
	isModalOpenDelete,
	setIsModalOpenDelete,
	examScheduleId,
	onDeleteSuccess,
}) => {
	const handleOkDelete = async () => {
		if (!examScheduleId) return;

		try {
			await deleteExamSchedule(examScheduleId); // Gọi hàm xóa từ Firebase

			onDeleteSuccess(); // Cập nhật danh sách
			setIsModalOpenDelete(false);
		} catch (error) {
			console.error('Err:', error);
		}
	};

	const handleCancelDelete = () => {
		setIsModalOpenDelete(false);
	};

	return (
		<Modal
			title='Xóa lịch thi'
			open={isModalOpenDelete}
			onOk={handleOkDelete}
			onCancel={handleCancelDelete}
			styles={modalStyles}
			footer={[
				<Button key='back' onClick={handleCancelDelete}>
					Hủy
				</Button>,
				<Button key='submit' type='primary' onClick={handleOkDelete}>
					Xóa
				</Button>,
			]}
		>
			<div className="font-['Source Sans Pro'] text-center text-base font-normal leading-tight text-[#373839]">
				Xác nhận muốn xóa lịch thi này và toàn bộ thông tin bên trong? Sau khi xóa sẽ không thể hoàn
				tác.
			</div>
		</Modal>
	);
};
