import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config'; // Giả định bạn đã config Firebase
import { message } from 'antd';
import {
	Leadership_Reservation,
	Leadership_Reservation_Add_Edit,
} from '../../types/leadership/student';

// Thêm dữ liệu bảo lưu
export const addReservation = async (
	reservation: Leadership_Reservation_Add_Edit,
): Promise<void> => {
	try {
		const reservationRef = ref(db, 'Reservations');

		await push(reservationRef, {
			idStudent: reservation.idStudent,
			class: reservation.class,
			name: reservation.name,
			date: reservation.date,
			description: reservation.description,
			file: reservation.file ? reservation.file.name : null, // Lưu tên file hoặc null
		});
		message.success('Thêm dữ liệu bảo lưu thành công!');
	} catch (error) {
		message.error('Thêm dữ liệu bảo lưu thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Lấy danh sách tất cả dữ liệu bảo lưu
export const getReservation = async (): Promise<Leadership_Reservation[]> => {
	try {
		const reservationRef = ref(db, 'Reservations');
		const snapshot = await get(reservationRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const reservationList: Leadership_Reservation[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return reservationList;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Cập nhật thông tin dữ liệu bảo lưu
export const updateReservation = async (
	id: string,
	updatedData: Partial<Leadership_Reservation>,
): Promise<void> => {
	try {
		const reservationRef = ref(db, `Reservations/${id}`);

		await update(reservationRef, updatedData);

		message.success('Cập nhật dữ liệu bảo lưu thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật dữ liệu bảo lưu thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Xóa dữ liệu bảo lưu
export const deleteReservation = async (id: string): Promise<void> => {
	try {
		const reservationRef = ref(db, `Reservations/${id}`);

		await remove(reservationRef);

		message.success('Xóa dữ liệu bảo lưu thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa dữ liệu bảo lưu thất bại. Vui lòng thử lại!');
		throw error;
	}
};
