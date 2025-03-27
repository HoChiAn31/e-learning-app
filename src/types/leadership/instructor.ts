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
