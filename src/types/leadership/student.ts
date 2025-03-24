export interface Leadership_Student_Add_Edit {
	fullName: string;
	gender?: 'Nam' | 'Nữ';
	birthDate: any; // Adjust this to a more specific type if needed (e.g., Moment)
	birthPlace: string;
	ethnicity: string;
	religion: string;
	schoolYear: string;
	gradeLevel: 'K10' | 'K11' | 'K12';
	className?: 'A1' | 'A2' | 'B1';
	studentId: string;
	enrollmentDate: any; // Adjust this to a more specific type if needed
	admissionType?: 'Trúng tuyển' | 'Chưa trúng tuyển';
	status: 'Đang theo học' | 'Đã chuyển lớp' | 'Đã chuyển trường' | 'Đã thôi học' | 'Bảo lưu';
	province: string;
	district: string;
	ward: string;
	address: string;
	email: string;
	phone: string;
	fatherName: string;
	motherName: string;
	guardianName: string;
	fatherBirthYear: string;
	motherBirthYear: string;
	guardianBirthYear: string;
	fatherOccupation: string;
	motherOccupation: string;
	guardianOccupation: string;
	fatherPhone: string;
	motherPhone: string;
	guardianPhone: string;
	avatar?: File; // Adjust this based on your actual type
}

export interface Leadership_Student {
	id: string;
	fullName: string;
	gender: 'Nam' | 'Nữ'; // Optional, chỉ có thể là "Nam" hoặc "Nữ"
	birthDate: any | null; // Sử dụng any tạm thời cho DatePicker, có thể thay bằng moment nếu cần
	birthPlace: string;
	ethnicity: string;
	religion: string;
	schoolYear: string;
	gradeLevel: 'K10' | 'K11' | 'K12';
	className?: 'A1' | 'A2' | 'B1';
	studentId: string;
	enrollmentDate: any | null; // Sử dụng any tạm thời cho DatePicker
	admissionType?: 'Trúng tuyển' | 'Chưa trúng tuyển'; // Optional
	status: 'Đang theo học' | 'Đã chuyển lớp' | 'Đã chuyển trường' | 'Đã thôi học' | 'Bảo lưu'; // Optional
	province: string;
	district: string;
	ward: string;
	address: string;
	email: string;
	phone: string;
	fatherName: string;
	motherName: string;
	guardianName: string;
	fatherBirthYear: string;
	motherBirthYear: string;
	guardianBirthYear: string;
	fatherOccupation: string;
	motherOccupation: string;
	guardianOccupation: string;
	fatherPhone: string;
	motherPhone: string;
	guardianPhone: string;
	avatar?: File;
}
export interface Leadership_StudentReward_Add_Edit {
	idStudent?: string | undefined;
	name: string;
	class: string;
	date: string | null;
	description: string;
	file?: null;
}
export interface Leadership_StudentReward {
	id: string;
	idStudent: string;
	name: string;
	class: string;
	date: string | null;
	description: string;
	file?: null;
}
export interface Leadership_Reservation {
	id: string;
	idStudent: string;
	class: string;
	name: string;
	date: string | null;
	description: string;
	file?: File | null;
}
export interface Leadership_Reservation_Add_Edit {
	class: string;
	name: string;
	date: string | null;
	idStudent: string;

	description: string;
	file?: File | null;
}
export interface Leadership_TransferForm {
	id: string;
	name: string;
	studentCode: string;
	transferDate: string | null;
	transferSemester: string;
	province: string;
	provinceCode: string;
	district: string;
	districtCode: string;
	transferFrom: string;
	description: string;
	file: File | null;
}
export interface Leadership_TransferForm_Add_Edit {
	name: string;
	studentCode: string;
	transferDate: string | null;
	provinceCode: string;
	transferSemester: string;
	province: string;
	district: string;
	districtCode: string;
	transferFrom: string;
	description: string;
	file: File | null;
}

export interface Leadership_Student_Transfer {
	studentInfor: Leadership_Student;
	studentTransfer: Leadership_TransferForm;
}

export interface Leadership_Student_Reserve {
	studentInfor: Leadership_Student;
	studentReserve: Leadership_StudentReward;
}
