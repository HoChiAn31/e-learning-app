import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import { GroupUsers, GroupUsers_add_edit } from '../../pages/leadership/systemSettings/users/type';

// Add new group user
export const addGroupUser = async (groupData: GroupUsers_add_edit): Promise<void> => {
	try {
		const groupUsersRef = ref(db, `GroupUsers`);

		await push(groupUsersRef, {
			groupName: groupData.groupName,
			totalMembers: groupData.totalMembers,
			note: groupData.note,
			isDataDeclaration: groupData.isDataDeclaration,
			isStudentProfile: groupData.isStudentProfile,
			isInstructorProfile: groupData.isInstructorProfile,
			isExam: groupData.isExam,
			isSetting: groupData.isSetting,
			role: groupData.role,
		});
		message.success('Thêm nhóm người dùng thành công!');
	} catch (error) {
		message.error('Thêm nhóm người dùng thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Get all group users
export const getGroupUsers = async (): Promise<GroupUsers[]> => {
	try {
		const groupUsersRef = ref(db, 'GroupUsers');
		const snapshot = await get(groupUsersRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const groupUsers: GroupUsers[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return groupUsers;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

// Update group user
export const updateGroupUser = async (
	id: string,
	updatedData: Partial<GroupUsers>,
): Promise<void> => {
	try {
		const groupUsersRef = ref(db, `GroupUsers/${id}`);

		await update(groupUsersRef, updatedData);

		message.success('Cập nhật nhóm người dùng thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Cập nhật nhóm người dùng thất bại. Vui lòng thử lại!');
		throw error;
	}
};

// Delete group user
export const deleteGroupUser = async (id: string): Promise<void> => {
	try {
		const groupUsersRef = ref(db, `GroupUsers/${id}`);

		await remove(groupUsersRef);

		message.success('Xóa nhóm người dùng thành công!');
	} catch (error) {
		console.error('Error:', error);
		message.error('Xóa nhóm người dùng thất bại. Vui lòng thử lại!');
		throw error;
	}
};
