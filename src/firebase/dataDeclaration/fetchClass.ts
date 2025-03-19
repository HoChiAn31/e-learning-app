import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import { dataDeclaration_class, dataDeclaration_class_add_edit } from '../../types/leadership';

export const addClass = async (classData: dataDeclaration_class_add_edit): Promise<void> => {
	try {
		const classRef = ref(db, `Classes`);

		await push(classRef, {
			classCode: classData.classCode,
			className: classData.className,
			teacher: classData.teacher,
			classType: classData.classType,
			classQuantity: classData.classQuantity,
			description: classData.description,
			schoolYear: classData.schoolYear,
			faculty: classData.faculty,
			subjects: classData.subjects,
		});
		message.success('Thêm lớp học thành công!');
	} catch (error) {
		message.error('Thêm lớp học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Lấy danh sách tất cả lớp học
export const getClasses = async (): Promise<dataDeclaration_class[]> => {
	try {
		const classRef = ref(db, 'Classes');
		const snapshot = await get(classRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const classes: dataDeclaration_class[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return classes;
		} else {
			console.log('No classes found.');
			return [];
		}
	} catch (error) {
		console.error('Error fetching classes:', error);
		throw error;
	}
};

// Cập nhật thông tin một lớp học
export const updateClass = async (
	id: string,
	updatedData: Partial<dataDeclaration_class>,
): Promise<void> => {
	try {
		const classRef = ref(db, `Classes/${id}`);

		await update(classRef, updatedData);

		console.log('Class updated successfully:', id);
		message.success('Cập nhật lớp học thành công!');
	} catch (error) {
		console.error('Error updating class:', error);
		message.error('Cập nhật lớp học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Xóa một lớp học
export const deleteClass = async (id: string): Promise<void> => {
	try {
		const classRef = ref(db, `Classes/${id}`);

		await remove(classRef);

		message.success('Xóa lớp học thành công!');
	} catch (error) {
		console.error('Error deleting class:', error);
		message.error('Xóa lớp học thất bại. Vui lòng thử lại!');
		throw error;
	}
};
