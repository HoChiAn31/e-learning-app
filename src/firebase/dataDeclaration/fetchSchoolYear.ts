import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import {
	dataDeclaration_schoolYear,
	dataDeclaration_schoolYear_add_edit,
} from '../../types/leadership';

// Thêm một năm học mới
export const addSchoolYear = async (
	schoolYearData: dataDeclaration_schoolYear_add_edit,
): Promise<void> => {
	try {
		const schoolYearRef = ref(db, `SchoolYears`);

		await push(schoolYearRef, {
			academicYearFrom: schoolYearData.academicYearFrom,
			academicYearTo: schoolYearData.academicYearTo,
			semesters: schoolYearData.semesters,
		});
		message.success('Thêm năm học thành công!');
	} catch (error) {
		message.error('Thêm năm học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Lấy danh sách tất cả năm học
export const getSchoolYears = async (): Promise<dataDeclaration_schoolYear[]> => {
	try {
		const schoolYearRef = ref(db, 'SchoolYears');
		const snapshot = await get(schoolYearRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const schoolYears: dataDeclaration_schoolYear[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return schoolYears;
		} else {
			console.log('No school years found.');
			return [];
		}
	} catch (error) {
		console.error('Error fetching school years:', error);
		throw error;
	}
};

// Cập nhật thông tin một năm học
export const updateSchoolYear = async (
	id: string,
	updatedData: Partial<dataDeclaration_schoolYear>,
): Promise<void> => {
	try {
		const schoolYearRef = ref(db, `SchoolYears/${id}`);

		await update(schoolYearRef, updatedData);

		console.log('School year updated successfully:', id);
		message.success('Cập nhật năm học thành công!');
	} catch (error) {
		console.error('Error updating school year:', error);
		message.error('Cập nhật năm học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Xóa một năm học
export const deleteSchoolYear = async (id: string): Promise<void> => {
	try {
		const schoolYearRef = ref(db, `SchoolYears/${id}`);

		await remove(schoolYearRef);

		message.success('Xóa năm học thành công!');
	} catch (error) {
		console.error('Error deleting school year:', error);
		message.error('Xóa năm học thất bại. Vui lòng thử lại!');
		throw error;
	}
};
