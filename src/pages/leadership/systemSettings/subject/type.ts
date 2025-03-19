export interface subjectProps {
	key: React.Key;
	type: string;
	status: boolean;
	description: string;
}

export interface subjectAddProps {
	type: string;
	status: boolean;
	description: string;
}
export interface SystemSettings_subject {
	id: string;
	subjectType: string;
	subjectStatus: boolean;
	description: string;
}

export interface SystemSettings_subject_Add_Edit {
	subjectType: string;
	subjectStatus: boolean;
	description: string;
}
