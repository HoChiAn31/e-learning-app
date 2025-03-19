import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';

// Interfaces
export interface SystemSettings_class {
	id: string;
	classType: string;
	classStatus: boolean;
	description: string;
}

export interface SystemSettings_Class_Add_Edit {
	classType: string;
	classStatus: boolean;
	description: string;
}

// Add new class setting
export const addClassSetting = async (classData: SystemSettings_Class_Add_Edit): Promise<void> => {
	try {
		const classSettingsRef = ref(db, `SystemSettings_Classes`);

		await push(classSettingsRef, {
			classType: classData.classType,
			classStatus: classData.classStatus,
			description: classData.description,
		});
		message.success('Thêm cài đặt lớp học thành công!');
	} catch (error) {
		message.error('Thêm cài đặt lớp học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Get all class settings
export const getClassSettings = async (): Promise<SystemSettings_class[]> => {
	try {
		const classSettingsRef = ref(db, 'SystemSettings_Classes');
		const snapshot = await get(classSettingsRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const classSettings: SystemSettings_class[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return classSettings;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Update class setting
export const updateClassSetting = async (
	id: string,
	updatedData: Partial<SystemSettings_class>,
): Promise<void> => {
	try {
		const classSettingsRef = ref(db, `SystemSettings_Classes/${id}`);

		await update(classSettingsRef, updatedData);

		message.success('Cập nhật cài đặt lớp học thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật cài đặt lớp học thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Delete class setting
export const deleteClassSetting = async (id: string): Promise<void> => {
	try {
		const classSettingsRef = ref(db, `SystemSettings_Classes/${id}`);

		await remove(classSettingsRef);

		message.success('Xóa cài đặt lớp học thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa cài đặt lớp học thất bại. Vui lòng thử lại!');
		throw error;
	}
};
