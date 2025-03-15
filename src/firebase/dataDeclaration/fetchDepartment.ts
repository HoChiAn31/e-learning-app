import { get, push, ref, remove, set, update } from 'firebase/database';
import { db } from '../config';
import {
	dataDeclaration_department,
	dataDeclaration_department_Add_Edit,
} from '../../types/leadership';

export const addDepartment = async (
	department: dataDeclaration_department_Add_Edit,
): Promise<void> => {
	try {
		const departmentRef = ref(db, `Leadership_departments`);

		await push(departmentRef, {
			departmentName: department.departmentName,
			headOfDepartment: department.headOfDepartment,
			subjectList: department.subjectList,
		});
	} catch (error) {
		console.error('Error adding department:', error);
		throw error;
	}
};
export const getDepartments = async (): Promise<dataDeclaration_department[]> => {
	try {
		const departmentRef = ref(db, 'Leadership_departments');
		const snapshot = await get(departmentRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const departments: dataDeclaration_department[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return departments;
		} else {
			console.log('No departments found.');
			return [];
		}
	} catch (error) {
		console.error('Error fetching departments:', error);
		throw error;
	}
};

export const updateDepartment = async (
	id: string,
	updatedData: Partial<dataDeclaration_department>,
): Promise<void> => {
	try {
		const departmentRef = ref(db, `Leadership_departments/${id}`);

		await update(departmentRef, updatedData);

		console.log('Department updated successfully:', id);
	} catch (error) {
		console.error('Error updating department:', error);
		throw error;
	}
};

export const deleteDepartment = async (id: string): Promise<void> => {
	try {
		const departmentRef = ref(db, `Leadership_departments/${id}`);

		await remove(departmentRef);

		console.log('Department deleted successfully:', id);
	} catch (error) {
		console.error('Error deleting department:', error);
		throw error;
	}
};
