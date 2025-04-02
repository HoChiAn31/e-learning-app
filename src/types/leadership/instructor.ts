export interface instructorData {
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

export interface instructorAddEdit {
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
export interface instructorWorkProcess {
	id: string;
	instructorId: string;
	workUnit: string;
	department: string;
	position: string;
	startDate: string;
	endDate: string;
	workUnits?: string[];
}
export interface instructorWorkProcessForm {
	instructorId: string;
	workUnit: string;
	department: string;
	position: string;
	startDate: string;
	endDate: string;
	workUnits?: string[];
}

export interface trainingProgram {
	id: string;
	instructorId: string;
	trainingFacility: string;
	major: string;
	startDate: string;
	endDate: string;
	form: string;
	certificate: string;
	trainingPrograms: string[];
	attachment?: File | null;
}
export interface trainingProgramForm {
	instructorId: string;
	trainingFacility: string;
	major: string;
	startDate: string;
	endDate: string;
	form: string;
	certificate: string;
	trainingPrograms: string[];
	attachment?: File | null;
}

export interface assignmentData {
	id: string;
	classCode: string;
	className: string;
	startDate: string;
	endDate: string;
	academicYear: string;
	grade: string;
	studentCount: number;
	classType: string;
	description: string;
	subjects: string[];
	instructorName: string;
	inheritYear?: string;
}

export interface assignmentFormData {
	classCode: string;
	className: string;
	startDate: string;
	endDate: string;
	academicYear: string;
	grade: string;
	studentCount: number;
	classType: string;
	description: string;
	subjects: string[];
	instructorName?: string | null;
	inheritYear?: string;
}
export interface assignmentFormDataEdit {
	id?: string;
	classCode: string;
	className: string;
	startDate: string;
	endDate: string;
	academicYear: string;
	grade: string;
	studentCount: number;
	classType: string;
	description: string;
	subjects: string[];
	instructorName?: string | null;
	inheritYear?: string;
}
export interface examScheduleData {
	id: string;
	schoolYear: string | undefined;
	grade: string | undefined;
	classType: string | undefined;
	subject: string | undefined;
	examName: string[];
	duration: string | undefined;
	examDate: string;
	assignmentType: string | undefined;
	allClassTeachers: string[];
	specificTeachers: { class: string; teacher: string }[];
	newAllTeacher: string;
	newClass: string;
	newSpecificTeacher: string;
}
export interface examScheduleFormData {
	schoolYear: string | undefined;
	grade: string | undefined;
	classType: string | undefined;
	subject: string | undefined;
	examName: string[];
	duration: string | undefined;
	examDate: string;
	assignmentType: string | undefined;
	allClassTeachers: string[];
	specificTeachers: { class: string; teacher: string }[];
	newAllTeacher: string;
	newClass: string;
	newSpecificTeacher: string;
}
