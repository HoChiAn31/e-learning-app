// dataDeclaration
export interface SemesterData {
	id: string;
	facultie: string;
	facultieName: string;
	facultyHead?: string;
}

export interface dataTeacher {
	id: string;
	name: string;
}

// Department
export interface dataDeclaration_department {
	id: string;
	departmentName: string;
	headOfDepartment: string;
	subjectList: string[];
}
export interface dataDeclaration_department_Add_Edit {
	departmentName: string;
	headOfDepartment: string;
	subjectList: string[];
}

export interface dataDeclaration_facultie {
	id: string;
	facultyCode: string;
	facultyName: string;
	facultyHead: string;
}
export interface dataDeclaration_facultie_Add_Edit {
	facultyCode: string;
	facultyName: string;
	facultyHead: string;
}

export interface dataDeclaration_subject {
	id: string;
	subjectGroup: string;
	subjectName: string;
	subjectCode: string;
	subjectType: string;
	numberLessonSemester1: number;
	numberLessonSemester2: number;
}
export interface dataDeclaration_subject_add_edit {
	subjectGroup: string;
	subjectName: string;
	subjectCode: string;
	subjectType: string;
	numberLessonSemester1: number;
	numberLessonSemester2: number;
}

export interface dataDeclaration_class {
	id: string;
	classCode: string;
	className: string;
	teacher: string;
	classType: string;
	classQuantity: number;
	description: string;
	schoolYear: string;
	faculty: string;
	subjects: string[];
}
export interface dataDeclaration_class_add_edit {
	classCode: string;
	className: string;
	teacher: string;
	classType: string;
	classQuantity: number;
	description: string;
	schoolYear: string;
	faculty: string;
	subjects: string[];
}
export interface dataDeclaration_scoreType {
	id: string;
	scoreType: string;
	coefficient: number;
	semester1: number;
	semester2: number;
}
export interface dataDeclaration_scoreType_add_edit {
	scoreType: string;
	coefficient: number;
	semester1: number;
	semester2: number;
}
export interface dataDeclaration_schoolYear {
	id: string;
	academicYearFrom: string;
	academicYearTo: string;
	semesters: { semesterName: string; startDate: string; endDate: string }[];
}
export interface dataDeclaration_schoolYear_add_edit {
	academicYearFrom: string;
	academicYearTo: string;
	semesters: { semesterName: string; startDate: string; endDate: string }[];
}
