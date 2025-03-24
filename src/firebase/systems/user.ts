import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';

// Interfaces
export interface userAdd {
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

// Add new user
export const addUser = async (userData: userAdd_Add_Edit): Promise<void> => {
	try {
		const usersRef = ref(db, 'SystemSettings_Users');

		await push(usersRef, {
			name: userData.name,
			groupUser: userData.groupUser,
			email: userData.email,
			status: userData.status,
		});
		message.success('Thêm người dùng thành công!');
	} catch (error) {
		message.error('Thêm người dùng thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Get all users
export const getUsers = async (): Promise<userAdd[]> => {
	try {
		const usersRef = ref(db, 'SystemSettings_Users');
		const snapshot = await get(usersRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const users: userAdd[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return users;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Update user
export const updateUser = async (id: string, updatedData: Partial<userAdd>): Promise<void> => {
	try {
		const usersRef = ref(db, `SystemSettings_Users/${id}`);

		await update(usersRef, updatedData);

		message.success('Cập nhật người dùng thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật người dùng thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Delete user
export const deleteUser = async (id: string): Promise<void> => {
	try {
		const usersRef = ref(db, `SystemSettings_Users/${id}`);

		await remove(usersRef);

		message.success('Xóa người dùng thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa người dùng thất bại. Vui lòng thử lại!');
		throw error;
	}
};
