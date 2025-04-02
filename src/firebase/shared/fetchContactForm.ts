import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config';
import { message } from 'antd';
import { contactForm, contactFormAddEdit } from '../../types/shared/contactForm';

export const addContactForm = async (formData: contactFormAddEdit): Promise<void> => {
	try {
		const formRef = ref(db, `ContactForms`);

		await push(formRef, {
			role: formData.role,
			formType: formData.formType,
			subject: formData.subject,
			message: formData.message,
		});
		message.success('Gửi biểu mẫu liên hệ thành công! Chúng tôi sẽ sớm phản hồi cho bạn.');
	} catch (error) {
		message.error('Thêm biểu mẫu liên hệ thất bại. Vui lòng thử lại!');
		throw error;
	}
};

export const getContactForms = async (): Promise<contactForm[]> => {
	try {
		const formRef = ref(db, 'ContactForms');
		const snapshot = await get(formRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const contactForms: contactForm[] = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
			}));

			return contactForms;
		} else {
			console.log('No contact forms found.');
			return [];
		}
	} catch (error) {
		console.error('Error fetching contact forms:', error);
		throw error;
	}
};

export const updateContactForm = async (
	id: string,
	updatedData: Partial<contactFormAddEdit>,
): Promise<void> => {
	try {
		const formRef = ref(db, `ContactForms/${id}`);

		await update(formRef, updatedData);

		console.log('Contact form updated successfully:', id);
		message.success('Cập nhật biểu mẫu liên hệ thành công!');
	} catch (error) {
		console.error('Error updating contact form:', error);
		message.error('Cập nhật biểu mẫu liên hệ thất bại. Vui lòng thử lại!');
		throw error;
	}
};

export const deleteContactForm = async (id: string): Promise<void> => {
	try {
		const formRef = ref(db, `ContactForms/${id}`);

		await remove(formRef);

		message.success('Xóa biểu mẫu liên hệ thành công!');
	} catch (error) {
		console.error('Error deleting contact form:', error);
		message.error('Xóa biểu mẫu liên hệ thất bại. Vui lòng thử lại!');
		throw error;
	}
};
