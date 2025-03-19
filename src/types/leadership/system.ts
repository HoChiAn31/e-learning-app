export interface Leadership_system_tranning {
	id: string;
	educationlevel: string;
	type: string;
	status: boolean;
	isEnure: boolean;
	description: string;
	isCredit: boolean;
	trainingTimeYears: number;
	requiredCourses: number;
	electiveCourses: number;
}

export interface Leadership_system_tranning_add_edit {
	educationlevel: string;
	type: string;
	status: boolean;
	isEnure: boolean;
	description: string;
	isCredit: boolean;
	trainingTimeYears: number;
	requiredCourses: number;
	electiveCourses: number;
}
