import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import { dataDeclaration_subject_add_edit } from '../../types/leadership';

export interface dataDeclaration_subject {
	id: string;
	subjectGroup: string;
	subjectName: string;
	subjectCode: string;
	subjectType: string;
	numberLessonSemester1: number;
	numberLessonSemester2: number;
}

export const addSubject = async (subject: dataDeclaration_subject_add_edit): Promise<void> => {
	try {
		const subjectRef = ref(db, 'Leadership_subjects');

		await push(subjectRef, {
			subjectGroup: subject.subjectGroup,
			subjectName: subject.subjectName,
			subjectCode: subject.subjectCode,
			subjectType: subject.subjectType,
			numberLessonSemester1: subject.numberLessonSemester1,
			numberLessonSemester2: subject.numberLessonSemester2,
		});
		message.success('Thêm môn học thành công!');
	} catch (error) {
		message.error('Thất bại. Vui lòng thử lại!');
		console.error('Error:', error);
		throw error;
	}
};

// Get all subjects
export const getSubjects = async (): Promise<dataDeclaration_subject[]> => {
	try {
		const subjectRef = ref(db, 'Leadership_subjects');
		const snapshot = await get(subjectRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const subjects: dataDeclaration_subject[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return subjects;
		} else {
			console.log('No subjects found.');
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Update subject
export const updateSubject = async (
	id: string,
	updatedData: Partial<dataDeclaration_subject>,
): Promise<void> => {
	try {
		const subjectRef = ref(db, `Leadership_subjects/${id}`);

		await update(subjectRef, updatedData);

		message.success('Cập nhật môn học thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật thất bại!');
		throw error;
	}
};

// Delete subject
export const deleteSubject = async (id: string): Promise<void> => {
	try {
		const subjectRef = ref(db, `Leadership_subjects/${id}`);

		await remove(subjectRef);

		message.success('Xóa môn học thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa thất bại!');
		throw error;
	}
};
