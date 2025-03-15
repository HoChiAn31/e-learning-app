import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import { Leadership_Student, Leadership_Student_Add_Edit } from '../../types/leadership/student';
import moment from 'moment';

// export interface DataDeclaration_Student extends DataDeclaration_Student_Add_Edit {
// 	id: string;
// }

// Thêm một học sinh mới
export const addStudent = async (studentData: Leadership_Student_Add_Edit): Promise<void> => {
	try {
		const studentRef = ref(db, 'Students');

		// Format birthDate và enrollmentDate thành chuỗi
		const formattedBirthDate = studentData.birthDate
			? moment(studentData.birthDate).format('YYYY-MM-DD')
			: null;
		const formattedEnrollmentDate = studentData.enrollmentDate
			? moment(studentData.enrollmentDate).format('YYYY-MM-DD')
			: null;

		await push(studentRef, {
			fullName: studentData.fullName,
			gender: studentData.gender,
			birthDate: formattedBirthDate, // Sử dụng giá trị đã format
			birthPlace: studentData.birthPlace,
			ethnicity: studentData.ethnicity,
			religion: studentData.religion,
			schoolYear: studentData.schoolYear,
			gradeLevel: studentData.gradeLevel,
			className: studentData.className,
			studentId: studentData.studentId,
			enrollmentDate: formattedEnrollmentDate, // Sử dụng giá trị đã format
			admissionType: studentData.admissionType,
			status: studentData.status,
			province: studentData.province,
			district: studentData.district,
			ward: studentData.ward,
			address: studentData.address,
			email: studentData.email,
			phone: studentData.phone,
			fatherName: studentData.fatherName,
			motherName: studentData.motherName,
			guardianName: studentData.guardianName,
			fatherBirthYear: studentData.fatherBirthYear,
			motherBirthYear: studentData.motherBirthYear,
			guardianBirthYear: studentData.guardianBirthYear,
			fatherOccupation: studentData.fatherOccupation,
			motherOccupation: studentData.motherOccupation,
			guardianOccupation: studentData.guardianOccupation,
			fatherPhone: studentData.fatherPhone,
			motherPhone: studentData.motherPhone,
			guardianPhone: studentData.guardianPhone,
		});
		message.success('Thêm học sinh thành công!');
	} catch (error) {
		message.error('Thêm học sinh thất bại. Vui lòng thử lại!');
		throw error;
	}
};
// Lấy danh sách tất cả học sinh
export const getStudents = async (): Promise<Leadership_Student[]> => {
	try {
		const studentRef = ref(db, 'Students');
		const snapshot = await get(studentRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const students: Leadership_Student[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return students;
		} else {
			console.log('No students found.');
			return [];
		}
	} catch (error) {
		console.error('Error fetching students:', error);
		throw error;
	}
};

// Cập nhật thông tin một học sinh
export const updateStudent = async (
	id: string,
	updatedData: Partial<Leadership_Student_Add_Edit>,
): Promise<void> => {
	try {
		const studentRef = ref(db, `Students/${id}`);

		await update(studentRef, updatedData);

		console.log('Student updated successfully:', id);
		message.success('Cập nhật thông tin học sinh thành công!');
	} catch (error) {
		console.error('Error updating student:', error);
		message.error('Cập nhật thông tin học sinh thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Xóa một học sinh
export const deleteStudent = async (id: string): Promise<void> => {
	try {
		const studentRef = ref(db, `Students/${id}`);

		await remove(studentRef);

		message.success('Xóa học sinh thành công!');
	} catch (error) {
		console.error('Error deleting student:', error);
		message.error('Xóa học sinh thất bại. Vui lòng thử lại!');
		throw error;
	}
};
