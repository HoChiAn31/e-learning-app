import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config'; // Giả định bạn đã cấu hình Firebase
import { message } from 'antd';
import { examScheduleData, examScheduleFormData } from '../../types/leadership/instructor';
import moment from 'moment';

export const addExamSchedule = async (examSchedule: examScheduleFormData): Promise<void> => {
	try {
		const examScheduleRef = ref(db, 'ExamSchedules');
		const examDate = examSchedule.examDate
			? moment(examSchedule.examDate).format('YYYY-MM-DD')
			: null;
		await push(examScheduleRef, {
			schoolYear: examSchedule.schoolYear,
			grade: examSchedule.grade,
			classType: examSchedule.classType,
			subject: examSchedule.subject,
			examName: examSchedule.examName,
			duration: examSchedule.duration,
			examDate: examDate,
			assignmentType: examSchedule.assignmentType,
			allClassTeachers: examSchedule.allClassTeachers,
			specificTeachers: examSchedule.specificTeachers,
			newAllTeacher: examSchedule.newAllTeacher,
			newClass: examSchedule.newClass,
			newSpecificTeacher: examSchedule.newSpecificTeacher,
		});

		message.success('Thêm lịch thi thành công!');
	} catch (error) {
		message.error('Thêm lịch thi thất bại. Vui lòng thử lại!');
		throw error;
	}
};

export const getExamSchedules = async (): Promise<examScheduleData[]> => {
	try {
		const examScheduleRef = ref(db, 'ExamSchedules');
		const snapshot = await get(examScheduleRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const examScheduleList: examScheduleData[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return examScheduleList;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error fetching exam schedules:', error);
		throw error;
	}
};

export const updateExamSchedule = async (
	id: string,
	updatedData: Partial<examScheduleData>,
): Promise<void> => {
	try {
		const examScheduleRef = ref(db, `ExamSchedules/${id}`);

		await update(examScheduleRef, updatedData);

		message.success('Cập nhật lịch thi thành công!');
	} catch (error) {
		console.error('Error updating exam schedule:', error);
		message.error('Cập nhật lịch thi thất bại. Vui lòng thử lại!');
		throw error;
	}
};

export const deleteExamSchedule = async (id: string): Promise<void> => {
	try {
		const examScheduleRef = ref(db, `ExamSchedules/${id}`);

		await remove(examScheduleRef);

		message.success('Xóa lịch thi thành công!');
	} catch (error) {
		console.error('Error deleting exam schedule:', error);
		message.error('Xóa lịch thi thất bại. Vui lòng thử lại!');
		throw error;
	}
};
