import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { User, UserContextType } from './type';

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext<UserContextType>({
	isLogin: false,
	setIsLogin: () => {},
	role: '',
	setRole: () => {},
	isLoading: false,
	setIsLoading: () => {},
	login: async () => {},
	logout: () => {},
	user: null,
	setUser: () => {},
});

export const UserProvider = ({ children }: AuthProviderProps): JSX.Element => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [role, setRole] = useState<string>('leadership');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>({
		key: '',
		role: '',
		name: '',
	});
	useEffect(() => {
		const storedUser = localStorage.getItem('userToken');
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			setUser(parsedUser);
			setRole(parsedUser.role);
			setIsLogin(true);
		}
	}, []);
	const login = async (credentials: { username: string; password: string }) => {
		try {
			setIsLoading(true);
			setIsLogin(true);
			setRole('student');
		} catch (error) {
			console.error('Login failed:', error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setIsLogin(false);
		setRole('');
		setUser(null);
		setIsLoading(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isLogin,
				setIsLogin,
				role,
				setRole,
				isLoading,
				setIsLoading,
				login,
				logout,
				user,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
