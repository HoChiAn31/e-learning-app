import { Button, Modal, message } from 'antd';
import { deleteDepartment } from '../../../../firebase/dataDeclaration/fetchDepartment';

interface DeleteDepartmentModalProps {
	isModalOpenDelete: boolean;
	setIsModalOpenDelete: (value: boolean) => void;
	departmentId: string | null; // ID của khoa cần xóa
	onDeleteSuccess: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

export default function DeleteDepartmentModal({
	isModalOpenDelete,
	setIsModalOpenDelete,
	departmentId,
	onDeleteSuccess,
}: DeleteDepartmentModalProps) {
	const handleOkDelete = async () => {
		if (!departmentId) return;

		try {
			await deleteDepartment(departmentId);
			message.success('Xóa khoa thành công!');
			onDeleteSuccess(); // Gọi callback để cập nhật danh sách
			setIsModalOpenDelete(false);
		} catch (error) {
			message.error('Xóa khoa thất bại. Vui lòng thử lại.');
		} finally {
		}
	};

	const handleCancelDelete = () => {
		setIsModalOpenDelete(false);
	};

	return (
		<Modal
			title='Xóa niên khoá'
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
				Xác nhận muốn xoá niên khoá này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể
				hoàn tác.
			</div>
		</Modal>
	);
}
