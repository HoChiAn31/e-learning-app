import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import {
	SystemSettings_subject,
	SystemSettings_subject_Add_Edit,
} from '../../pages/leadership/systemSettings/subject/type';

// Add new subject setting
export const addSubjectSetting = async (
	subjectData: SystemSettings_subject_Add_Edit,
): Promise<void> => {
	try {
		const subjectSettingsRef = ref(db, `SystemSettings_Subjects`);

		await push(subjectSettingsRef, {
			subjectType: subjectData.subjectType,
			subjectStatus: subjectData.subjectStatus,
			description: subjectData.description,
		});
		message.success('Thêm cài đặt môn học thành công!');
	} catch (error) {
		message.error('Thêm cài đặt môn học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Get all subject settings
export const getSubjectSettings = async (): Promise<SystemSettings_subject[]> => {
	try {
		const subjectSettingsRef = ref(db, 'SystemSettings_Subjects');
		const snapshot = await get(subjectSettingsRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const subjectSettings: SystemSettings_subject[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return subjectSettings;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Update subject setting
export const updateSubjectSetting = async (
	id: string,
	updatedData: Partial<SystemSettings_subject>,
): Promise<void> => {
	try {
		const subjectSettingsRef = ref(db, `SystemSettings_Subjects/${id}`);

		await update(subjectSettingsRef, updatedData);

		message.success('Cập nhật cài đặt môn học thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật cài đặt môn học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Delete subject setting
export const deleteSubjectSetting = async (id: string): Promise<void> => {
	try {
		const subjectSettingsRef = ref(db, `SystemSettings_Subjects/${id}`);

		await remove(subjectSettingsRef);

		message.success('Xóa cài đặt môn học thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa cài đặt môn học thất bại. Vui lòng thử lại!');
		throw error;
	}
};
