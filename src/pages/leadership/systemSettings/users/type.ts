export interface GroupUsers {
	key: number;
	groupName: string;
	totalMembers: number;
	note: string;
	isDataDeclaration: Permission;
	isStudentProfile: Permission;
	isInstructorProfile: Permission & { isEnterScore: boolean };
	isExam: Permission;
	isSetting: Permission;
}

export interface Permission {
	isReview: boolean;
	isEdit: boolean;
	isDelete: boolean;
	isAdd: boolean;
}

export interface listUsers {
	key: number;
	name: string;
	email: string;
	groupUser: string;
	status: string;
}

export interface userAdd {
	name: string;
	groupUser: string;
	email: string;
	status: 'true' | 'false';
}
