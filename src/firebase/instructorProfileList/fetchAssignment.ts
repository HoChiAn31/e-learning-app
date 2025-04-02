import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import { assignmentData, assignmentFormData } from '../../types/leadership/instructor';

// Add Assignment
export const addAssignment = async (assignmentData: assignmentFormData): Promise<void> => {
	try {
		const assignmentRef = ref(db, 'Assignments');

		await push(assignmentRef, {
			classCode: assignmentData.classCode,
			className: assignmentData.className,
			startDate: assignmentData.startDate,
			endDate: assignmentData.endDate,
			academicYear: assignmentData.academicYear,
			grade: assignmentData.grade,
			studentCount: assignmentData.studentCount,
			classType: assignmentData.classType,
			description: assignmentData.description,
			subjects: assignmentData.subjects[0],
			instructorName: assignmentData.instructorName,
		});
		message.success('Thêm lớp học thành công!');
	} catch (error) {
		message.error('Thêm lớp học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Get Assignments
export const getAssignments = async (): Promise<assignmentData[]> => {
	try {
		const assignmentRef = ref(db, 'Assignments');
		const snapshot = await get(assignmentRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const assignments: assignmentData[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return assignments;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Update Assignment
export const updateAssignment = async (
	id: string,
	updatedData: Partial<assignmentData>,
): Promise<void> => {
	try {
		const assignmentRef = ref(db, `Assignments/${id}`);

		await update(assignmentRef, updatedData);

		message.success('Cập nhật lớp học thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật lớp học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Delete Assignment
export const deleteAssignment = async (id: string): Promise<void> => {
	try {
		const assignmentRef = ref(db, `Assignments/${id}`);

		await remove(assignmentRef);

		message.success('Xóa lớp học thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa lớp học thất bại. Vui lòng thử lại!');
		throw error;
	}
};
