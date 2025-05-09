import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import {
	dataDeclaration_facultie,
	dataDeclaration_facultie_Add_Edit,
} from '../../types/leadership';
import { message } from 'antd';

export const addFaculty = async (faculty: dataDeclaration_facultie_Add_Edit): Promise<void> => {
	try {
		const facultyRef = ref(db, `Leadership_faculties`);

		await push(facultyRef, {
			facultyCode: faculty.facultyCode,
			facultyName: faculty.facultyName,
			facultyHead: faculty.facultyHead,
		});
		message.success('Thêm thành công!');
	} catch (error) {
		message.error('Thất bại. Vui long thử lại!');
		throw error;
	}
};

export const getFaculties = async (): Promise<dataDeclaration_facultie[]> => {
	try {
		const facultyRef = ref(db, 'Leadership_faculties');
		const snapshot = await get(facultyRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const faculties: dataDeclaration_facultie[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return faculties;
		} else {
			console.log('No faculties found.');
			return [];
		}
	} catch (error) {
		console.error('Error fetching faculties:', error);
		throw error;
	}
};

export const updateFaculty = async (
	id: string,
	updatedData: Partial<dataDeclaration_facultie>,
): Promise<void> => {
	try {
		const facultyRef = ref(db, `Leadership_faculties/${id}`);

		await update(facultyRef, updatedData);

		console.log('Faculty updated successfully:', id);
		message.success('Cập nhật thành công!');
	} catch (error) {
		console.error('Error updating faculty:', error);
		throw error;
	}
};

export const deleteFaculty = async (id: string): Promise<void> => {
	try {
		const facultyRef = ref(db, `Leadership_faculties/${id}`);

		await remove(facultyRef);

		message.success('Xóa thành công!');
	} catch (error) {
		console.error('Error deleting faculty:', error);
		throw error;
	}
};
