export interface User {
	id: string;
	firstName?: string;
	lastName?: string;
	email: string;
	role: string;
	avatar?: string;
	name?: string;
}
export interface UserContextType {
	isLogin: boolean;
	setIsLogin: (value: boolean) => void;
	role: string;
	setRole: (role: string) => void;
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
	login: (credentials: { username: string; password: string }) => Promise<void>;
	logout: () => void;
	user: User | null;
}
