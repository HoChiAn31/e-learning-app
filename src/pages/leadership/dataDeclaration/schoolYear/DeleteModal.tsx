import { Button, Modal } from 'antd';

interface DeleteSemesterModalProps {
	visible: boolean;
	id: string | null; // ID của niên khóa cần xóa
	onOk: (id: string) => void; // Hàm xử lý khi xác nhận xóa
	onCancel: () => void; // Hàm xử lý khi hủy
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

export const DeleteModal: React.FC<DeleteSemesterModalProps> = ({
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
			title='Xác nhận xóa niên khóa'
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
					danger // Thêm thuộc tính danger để nút "Xóa" có màu đỏ
					onClick={handleSubmit}
				>
					Xóa
				</Button>,
			]}
		>
			<div className='py-5 text-center'>
				<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
					Xác nhận muốn xóa niên khóa này và toàn bộ thông tin bên trong? Sau khi xóa sẽ không thể
					hoàn tác.
				</p>
			</div>
		</Modal>
	);
};
