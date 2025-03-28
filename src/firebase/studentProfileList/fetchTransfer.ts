import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import {
	Leadership_TransferForm,
	Leadership_TransferForm_Add_Edit,
} from '../../types/leadership/student';
import moment from 'moment';

// Thêm một bản ghi chuyển trường
export const addTransfer = async (
	transferData: Leadership_TransferForm_Add_Edit,
): Promise<void> => {
	try {
		const transferRef = ref(db, 'StudentTransfers');

		const formattedData = {
			name: transferData.name,
			studentCode: transferData.studentCode,
			transferDate: transferData.transferDate,
			transferSemester: transferData.transferSemester,
			province: transferData.province,
			district: transferData.district,
			transferFrom: transferData.transferFrom,
			reason: transferData.description,
			file: transferData.file ? transferData.file.name : null,
		};

		await push(transferRef, formattedData);
		message.success('Thêm thông tin chuyển trường thành công!');
	} catch (error) {
		message.error('Thêm thông tin chuyển trường thất bại. Vui lòng thử lại!');
		throw error;
	}
};

export const getTransfers = async (): Promise<Leadership_TransferForm[]> => {
	try {
		const transferRef = ref(db, 'StudentTransfers');
		const snapshot = await get(transferRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const transfers: Leadership_TransferForm[] = Object.keys(data).map((key) => ({
				id: key,
				name: data[key].name,
				studentCode: data[key].studentCode,
				transferDate: data[key].transferDate
					? moment(data[key].transferDate).format('YYYY-MM-DD')
					: null,
				transferSemester: data[key].transferSemester,
				province: data[key].province,
				provinceCode: data[key].provinceCode || '', // Ensure provinceCode exists
				district: data[key].district,
				districtCode: data[key].districtCode || '', // Ensure districtCode exists
				transferFrom: data[key].transferFrom,
				description: data[key].description || '', // Ensure description exists
				file: data[key].file instanceof File ? data[key].file : null, // Proper file handling
			}));

			return transfers;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error fetching transfers:', error);
		throw error;
	}
};

export const updateTransfer = async (
	id: string,
	updatedData: Partial<Leadership_TransferForm>,
): Promise<void> => {
	try {
		const transferRef = ref(db, `StudentTransfers/${id}`);

		const formattedData = {
			...(updatedData.name && { name: updatedData.name }),
			...(updatedData.studentCode && { studentCode: updatedData.studentCode }),
			...(updatedData.transferDate !== undefined && {
				transferDate: updatedData.transferDate
					? new Date(updatedData.transferDate).toISOString() // Convert string to Date
					: null,
			}),
			...(updatedData.transferSemester && { transferSemester: updatedData.transferSemester }),
			...(updatedData.province && { province: updatedData.province }),
			...(updatedData.district && { district: updatedData.district }),
			...(updatedData.transferFrom && { transferFrom: updatedData.transferFrom }),
			...(updatedData.description && { reason: updatedData.description }),
			...(updatedData.file !== undefined && {
				file: updatedData.file ? updatedData.file.name : null,
			}),
		};

		await update(transferRef, formattedData);
		message.success('Cập nhật thông tin chuyển trường thành công!');
	} catch (error) {
		console.error('Error updating transfer:', error);
		message.error('Cập nhật thông tin chuyển trường thất bại. Vui lòng thử lại!');
		throw error;
	}
};
export const deleteTransfer = async (id: string): Promise<void> => {
	try {
		const transferRef = ref(db, `StudentTransfers/${id}`);

		await remove(transferRef);
		message.success('Xóa thông tin chuyển trường thành công!');
	} catch (error) {
		console.error('Error deleting transfer:', error);
		message.error('Xóa thông tin chuyển trường thất bại. Vui lòng thử lại!');
		throw error;
	}
};
