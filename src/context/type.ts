export interface User {
	key: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	role: string;
	avatar?: string;
	name?: string;
	username?: string;
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
	setUser: (user: User) => void;
}
