import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config'; // Giả định bạn đã cấu hình Firebase
import { message } from 'antd';
import moment from 'moment';
import { ClassSession, ClassSessionForm } from '../../types/teacher';

export const addClassSession = async (classSession: ClassSessionForm): Promise<void> => {
	try {
		const classSessionRef = ref(db, 'ClassSessions');
		const startDate = classSession.startDate
			? moment(classSession.startDate).format('YYYY-MM-DD HH:mm')
			: null;
		const endDate = classSession.endDate
			? moment(classSession.endDate).format('YYYY-MM-DD HH:mm')
			: null;

		await push(classSessionRef, {
			title: classSession.title,
			description: classSession.description,
			assistant: classSession.assistant,
			duration: {
				hours: classSession.duration.hours,
				minutes: classSession.duration.minutes,
			},
			startDate: startDate,
			endDate: endDate,
			security: classSession.security,
			status: classSession.status || false,
			autoStart: classSession.autoStart || false,
			notification: classSession.notification || false,
			allowEarlyAccess: classSession.allowEarlyAccess || false,
			meetingLink: classSession.meetingLink || '',
		});

		message.success('Thêm phiên học thành công!');
	} catch (error) {
		message.error('Thêm phiên học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

export const getClassSessions = async (): Promise<ClassSession[]> => {
	try {
		const classSessionRef = ref(db, 'ClassSessions');
		const snapshot = await get(classSessionRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const classSessionList: ClassSession[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return classSessionList;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error fetching class sessions:', error);
		throw error;
	}
};

export const updateClassSession = async (
	id: string,
	updatedData: Partial<ClassSession>,
): Promise<void> => {
	try {
		const classSessionRef = ref(db, `ClassSessions/${id}`);

		if (updatedData.startDate) {
			updatedData.startDate = moment(updatedData.startDate).format('YYYY-MM-DD HH:mm');
		}
		if (updatedData.endDate) {
			updatedData.endDate = moment(updatedData.endDate).format('YYYY-MM-DD HH:mm');
		}

		await update(classSessionRef, updatedData);

		message.success('Cập nhật phiên học thành công!');
	} catch (error) {
		console.error('Error updating class session:', error);
		message.error('Cập nhật phiên học thất bại. Vui lòng thử lại!');
		throw error;
	}
};
export const deleteClassSession = async (id: string): Promise<void> => {
	try {
		const classSessionRef = ref(db, `ClassSessions/${id}`);

		await remove(classSessionRef);

		message.success('Xóa phiên học thành công!');
	} catch (error) {
		console.error('Error deleting class session:', error);
		message.error('Xóa phiên học thất bại. Vui lòng thử lại!');
		throw error;
	}
};
