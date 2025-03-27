import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import {
	instructorWorkProcess,
	instructorWorkProcessForm,
} from '../../types/leadership/instructor';

// Add Instructor Work Process
export const addInstructorWorkProcess = async (
	workProcessData: instructorWorkProcessForm,
): Promise<void> => {
	try {
		const workProcessRef = ref(db, 'InstructorWorkProcesses');

		await push(workProcessRef, {
			instructorId: workProcessData.instructorId,
			workUnit: workProcessData.workUnit,
			department: workProcessData.department,
			position: workProcessData.position,
			startDate: workProcessData.startDate,
			endDate: workProcessData.endDate,
			workUnits: workProcessData.workUnits,
		});
		message.success('Thêm quá trình công tác thành công!');
	} catch (error) {
		message.error('Thêm quá trình công tác thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Get Instructor Work Process
export const getInstructorWorkProcess = async (): Promise<instructorWorkProcess[]> => {
	try {
		const workProcessRef = ref(db, 'InstructorWorkProcesses');
		const snapshot = await get(workProcessRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const workProcesses: instructorWorkProcess[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return workProcesses;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Update Instructor Work Process
export const updateInstructorWorkProcess = async (
	id: string,
	updatedData: Partial<instructorWorkProcess>,
): Promise<void> => {
	try {
		const workProcessRef = ref(db, `InstructorWorkProcesses/${id}`);

		await update(workProcessRef, updatedData);

		message.success('Cập nhật quá trình công tác thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật quá trình công tác thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Delete Instructor Work Process
export const deleteInstructorWorkProcess = async (id: string): Promise<void> => {
	try {
		const workProcessRef = ref(db, `InstructorWorkProcesses/${id}`);

		await remove(workProcessRef);

		message.success('Xóa quá trình công tác thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa quá trình công tác thất bại. Vui lòng thử lại!');
		throw error;
	}
};
