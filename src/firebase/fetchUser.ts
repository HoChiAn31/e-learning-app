import { get, ref, set } from 'firebase/database';
import { db } from './config';
import { User } from '../types';

export const fetchUsers = async (): Promise<User[]> => {
	try {
		const usersRef = ref(db, 'user');

		const snapshot = await get(usersRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const users: User[] = Object.keys(data).map((key) => ({
				key,
				...data[key],
			}));

			return users;
		} else {
			return [];
		}
	} catch (error) {
		throw error;
	}
};
