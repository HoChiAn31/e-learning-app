import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import {
	Leadership_system_tranning,
	Leadership_system_tranning_add_edit,
} from '../../types/leadership/system';

export const addTrainingSetting = async (
	trainingData: Leadership_system_tranning_add_edit,
): Promise<void> => {
	try {
		const trainingSettingsRef = ref(db, `Leadership_System_Training`);

		await push(trainingSettingsRef, {
			educationlevel: trainingData.educationlevel,
			type: trainingData.type,
			status: trainingData.status,
			isEnure: trainingData.isEnure,
			description: trainingData.description,
			isCredit: trainingData.isCredit,
			trainingTimeYears: trainingData.trainingTimeYears,
			requiredCourses: trainingData.requiredCourses,
			electiveCourses: trainingData.electiveCourses,
		});
		message.success('Thêm cài đặt đào tạo thành công!');
	} catch (error) {
		message.error('Thêm cài đặt đào tạo thất bại. Vui lòng thử lại!');
		throw error;
	}
};

export const getTrainingSettings = async (): Promise<Leadership_system_tranning[]> => {
	try {
		const trainingSettingsRef = ref(db, 'Leadership_System_Training');
		const snapshot = await get(trainingSettingsRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const trainingSettings: Leadership_system_tranning[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return trainingSettings;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

export const updateTrainingSetting = async (
	id: string,
	updatedData: Partial<Leadership_system_tranning>,
): Promise<void> => {
	try {
		const trainingSettingsRef = ref(db, `Leadership_System_Training/${id}`);

		await update(trainingSettingsRef, updatedData);

		message.success('Cập nhật cài đặt đào tạo thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật cài đặt đào tạo thất bại. Vui lòng thử lại!');
		throw error;
	}
};

export const deleteTrainingSetting = async (id: string): Promise<void> => {
	try {
		const trainingSettingsRef = ref(db, `Leadership_System_Training/${id}`);

		await remove(trainingSettingsRef);

		message.success('Xóa cài đặt đào tạo thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa cài đặt đào tạo thất bại. Vui lòng thử lại!');
		throw error;
	}
};
