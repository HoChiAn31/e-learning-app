import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import {
	Leadership_StudentReward,
	Leadership_StudentReward_Add_Edit,
} from '../../types/leadership/student';

export const addStudentReward = async (
	classData: Leadership_StudentReward_Add_Edit,
): Promise<void> => {
	try {
		const studentRewardRef = ref(db, `StudentRewards`);

		await push(studentRewardRef, {
			idStudent: classData.idStudent,
			name: classData.name,
			class: classData.class,
			date: classData.date,
			description: classData.description,
		});
		message.success('Thêm khen thưởng thành công!');
	} catch (error) {
		message.error('Thêm khen thưởng thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Lấy danh sách tất cả lớp học
export const getStudentReward = async (): Promise<Leadership_StudentReward[]> => {
	try {
		const studentRewardRef = ref(db, 'StudentRewards');
		const snapshot = await get(studentRewardRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const studentReward: Leadership_StudentReward[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return studentReward;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Cập nhật thông tin một lớp học
export const updateStudentReward = async (
	id: string,
	updatedData: Partial<Leadership_StudentReward>,
): Promise<void> => {
	try {
		const studentRewardRef = ref(db, `StudentRewards/${id}`);

		await update(studentRewardRef, updatedData);

		// console.log('Class updated successfully:', id);
		message.success('Cập nhật khen thưởng thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật khen thưởng thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Xóa một lớp học
export const deleteStudentReward = async (id: string): Promise<void> => {
	try {
		const studentRewardRef = ref(db, `StudentRewards/${id}`);

		await remove(studentRewardRef);

		message.success('Xóa khen thưởng thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa khen thưởng thất bại. Vui lòng thử lại!');
		throw error;
	}
};
