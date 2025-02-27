export interface tranningProps {
	key: React.Key;
	type: string;
	status: boolean;
	description: string;
}

export interface tranningAddProps {
	type: string;
	status: boolean;
	description: string;
	classStatus: boolean;
	classType: string;
	trainingTimeYears: number;
	requiredCourses: number;
	electiveCourses: number;
}
