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
	status: 'Đang theo học' | 'Đã chuyển lớp' | 'Đã chuyển trường' | 'Đã thôi học';
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
	status: 'Đang theo học' | 'Đã chuyển lớp' | 'Đã chuyển trường' | 'Đã thôi học'; // Optional
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
