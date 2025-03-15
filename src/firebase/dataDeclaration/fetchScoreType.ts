import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import {
	dataDeclaration_scoreType,
	dataDeclaration_scoreType_add_edit,
} from '../../types/leadership';

// Thêm một scoreType mới
export const addScoreType = async (
	scoreType: dataDeclaration_scoreType_add_edit,
): Promise<void> => {
	try {
		const scoreTypeRef = ref(db, `Leadership_scoreTypes`); // Đường dẫn đến node scoreTypes

		await push(scoreTypeRef, {
			scoreType: scoreType.scoreType,
			coefficient: scoreType.coefficient,
			semester1: scoreType.semester1,
			semester2: scoreType.semester2,
		});
	} catch (error) {
		console.error('Error adding scoreType:', error);
		throw error;
	}
};

// Lấy danh sách tất cả scoreTypes
export const getScoreTypes = async (): Promise<dataDeclaration_scoreType[]> => {
	try {
		const scoreTypeRef = ref(db, 'Leadership_scoreTypes');
		const snapshot = await get(scoreTypeRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const scoreTypes: dataDeclaration_scoreType[] = Object.keys(data).map((key) => ({
				id: key, // Key từ Firebase sẽ là ID
				...data[key],
			}));

			return scoreTypes;
		} else {
			console.log('No scoreTypes found.');
			return [];
		}
	} catch (error) {
		console.error('Error fetching scoreTypes:', error);
		throw error;
	}
};

// Cập nhật một scoreType
export const updateScoreType = async (
	id: string,
	updatedData: Partial<dataDeclaration_scoreType>,
): Promise<void> => {
	try {
		const scoreTypeRef = ref(db, `Leadership_scoreTypes/${id}`);

		await update(scoreTypeRef, updatedData);

		console.log('ScoreType updated successfully:', id);
	} catch (error) {
		console.error('Error updating scoreType:', error);
		throw error;
	}
};

// Xóa một scoreType
export const deleteScoreType = async (id: string): Promise<void> => {
	try {
		const scoreTypeRef = ref(db, `Leadership_scoreTypes/${id}`);

		await remove(scoreTypeRef);

		console.log('ScoreType deleted successfully:', id);
	} catch (error) {
		console.error('Error deleting scoreType:', error);
		throw error;
	}
};
