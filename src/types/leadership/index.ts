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
