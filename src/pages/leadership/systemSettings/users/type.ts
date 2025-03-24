export interface GroupUsers {
	id: string;
	groupName: string;
	totalMembers: number;
	note: string;
	isDataDeclaration: Permission;
	isStudentProfile: Permission;
	isInstructorProfile: Permission & { isEnterScore: boolean };
	isExam: Permission;
	isSetting: Permission;
	role?: string;
}
export interface GroupUsers_add_edit {
	groupName: string;
	totalMembers: number;
	note: string;
	isDataDeclaration: Permission;
	isStudentProfile: Permission;
	isInstructorProfile: Permission & { isEnterScore: boolean };
	isExam: Permission;
	isSetting: Permission;
	role?: string;
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

export interface dataUsers {
	id: string;
	name: string;
	groupUser: string;
	email: string;
	status: boolean;
}
export interface userAdd_Add_Edit {
	name: string;
	groupUser: string;
	email: string;
	status: boolean;
}
