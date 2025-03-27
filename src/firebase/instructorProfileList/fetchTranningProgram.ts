import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import { trainingProgramForm } from '../../types/leadership/instructor';
import TrainingProgram from '../../pages/leadership/instructorProfileList/components/TrainingProgram';

// Add Training Program
export const addTrainingProgram = async (trainingData: trainingProgramForm): Promise<void> => {
	try {
		const trainingRef = ref(db, 'TrainingPrograms');

		await push(trainingRef, {
			instructorId: trainingData.instructorId,
			trainingFacility: trainingData.trainingFacility,
			major: trainingData.major,
			startDate: trainingData.startDate,
			endDate: trainingData.endDate,
			form: trainingData.form,
			certificate: trainingData.certificate,
			trainingPrograms: trainingData.trainingPrograms,
			attachment: trainingData.attachment || null,
		});
		message.success('Thêm chương trình đào tạo thành công!');
	} catch (error) {
		message.error('Thêm chương trình đào tạo thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Get Training Programs
export const getTrainingPrograms = async (): Promise<TrainingProgram[]> => {
	try {
		const trainingRef = ref(db, 'TrainingPrograms');
		const snapshot = await get(trainingRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const trainingPrograms: TrainingProgram[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return trainingPrograms;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Update Training Program
export const updateTrainingProgram = async (
	id: string,
	updatedData: Partial<TrainingProgram>,
): Promise<void> => {
	try {
		const trainingRef = ref(db, `TrainingPrograms/${id}`);

		await update(trainingRef, updatedData);

		message.success('Cập nhật chương trình đào tạo thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật chương trình đào tạo thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Delete Training Program
export const deleteTrainingProgram = async (id: string): Promise<void> => {
	try {
		const trainingRef = ref(db, `TrainingPrograms/${id}`);

		await remove(trainingRef);

		message.success('Xóa chương trình đào tạo thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa chương trình đào tạo thất bại. Vui lòng thử lại!');
		throw error;
	}
};
