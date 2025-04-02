export interface ClassSession {
	id: string;
	title: string;
	description: string;
	assistant: string;
	duration: {
		hours: string;
		minutes: string;
	};
	startDate: string;
	endDate: string;
	security: string;
	status?: boolean;
	autoStart?: boolean;
	notification?: boolean;
	allowEarlyAccess?: boolean;
	meetingLink?: string;
}

export interface ClassSessionForm {
	title: string;
	description: string;
	assistant: string;
	duration: {
		hours: string;
		minutes: string;
	};
	startDate: string;
	endDate: string;
	security: string;
	status?: boolean;
	autoStart?: boolean;
	notification?: boolean;
	allowEarlyAccess?: boolean;
	meetingLink?: string;
}
