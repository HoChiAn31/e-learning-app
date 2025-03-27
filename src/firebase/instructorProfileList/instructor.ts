import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';

// Interfaces
export interface InstructorData {
	id: string;
	instructorCode: string;
	department: string;
	teachingSubject: string;
	fullName: string;
	dateOfBirth: string;
	placeOfBirth: string;
	ethnicity: string;
	dateOfEntry: string;
	nationality: string;
	religion: string;
	status: string;
	secondarySubject: string[];
	alias: string;
	province: string;
	ward: string;
	district: string;
	address: string;
	email: string;
	phoneNumber: string;
	gender: string;
	unionEntryDate: string;
	partyEntryDate: string;
	familyInfo: FamilyInfo[];
	idCardNumber?: string;
	unionEntryPlace?: string;
	partyEntryPlace?: string;
}

export interface FamilyInfo {
	id: string;
	contactName: string;
	address: string;
	phoneNumber: string;
}

export interface InstructorDataAddEdit {
	instructorCode: string;
	department: string;
	teachingSubject: string;
	fullName: string;
	dateOfBirth: string;
	placeOfBirth: string;
	ethnicity: string;
	dateOfEntry: string;
	nationality: string;
	religion: string;
	status: string;
	secondarySubject: string[];
	alias: string;
	province: string;
	ward: string;
	district: string;
	address: string;
	email: string;
	phoneNumber: string;
	gender: string;
	unionEntryDate: string;
	partyEntryDate: string;
	familyInfo: FamilyInfo[];
	idCardNumber?: string;
	unionEntryPlace?: string;
	partyEntryPlace?: string;
}

// Add new instructor
export const addInstructor = async (instructorData: InstructorDataAddEdit): Promise<void> => {
	try {
		const instructorsRef = ref(db, 'Instructors');

		await push(instructorsRef, {
			instructorCode: instructorData.instructorCode,
			department: instructorData.department,
			teachingSubject: instructorData.teachingSubject,
			fullName: instructorData.fullName,
			dateOfBirth: instructorData.dateOfBirth,
			placeOfBirth: instructorData.placeOfBirth,
			ethnicity: instructorData.ethnicity,
			dateOfEntry: instructorData.dateOfEntry,
			nationality: instructorData.nationality,
			religion: instructorData.religion,
			status: instructorData.status,
			secondarySubject: instructorData.secondarySubject,
			alias: instructorData.alias,
			province: instructorData.province,
			ward: instructorData.ward,
			district: instructorData.district,
			address: instructorData.address,
			email: instructorData.email,
			phoneNumber: instructorData.phoneNumber,
			gender: instructorData.gender,
			unionEntryDate: instructorData.unionEntryDate,
			partyEntryDate: instructorData.partyEntryDate,
			familyInfo: instructorData.familyInfo,
			idCardNumber: instructorData.idCardNumber,
			unionEntryPlace: instructorData.unionEntryPlace,
			partyEntryPlace: instructorData.partyEntryPlace,
		});

		message.success('Thêm giảng viên thành công!');
	} catch (error) {
		message.error('Thêm giảng viên thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Get all instructors
export const getInstructors = async (): Promise<InstructorData[]> => {
	try {
		const instructorsRef = ref(db, 'Instructors');
		const snapshot = await get(instructorsRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const instructors: InstructorData[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return instructors;
		}
		return [];
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Update instructor
export const updateInstructor = async (
	id: string,
	updatedData: Partial<InstructorData>,
): Promise<void> => {
	try {
		const instructorRef = ref(db, `Instructors/${id}`);

		await update(instructorRef, updatedData);

		message.success('Cập nhật thông tin giảng viên thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật thông tin giảng viên thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Delete instructor
export const deleteInstructor = async (id: string): Promise<void> => {
	try {
		const instructorRef = ref(db, `Instructors/${id}`);

		await remove(instructorRef);

		message.success('Xóa giảng viên thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa giảng viên thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Get instructor by ID
export const getInstructorById = async (id: string): Promise<InstructorData | null> => {
	try {
		const instructorRef = ref(db, `Instructors/${id}`);
		const snapshot = await get(instructorRef);

		if (snapshot.exists()) {
			return {
				id,
				...snapshot.val(),
			};
		}
		return null;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};
