import { Button, DatePicker, Input, Modal, Select } from 'antd';

import {
	assignmentFormData,
	assignmentFormDataEdit,
} from '../../../../types/leadership/instructor';
import moment from 'moment';

interface EditAssignmentModalProps {
	isModalOpen: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	formData: assignmentFormDataEdit;
	setFormData: React.Dispatch<React.SetStateAction<assignmentFormDataEdit>>;
	optionInstructor: { value: string; label: string }[];
	optionClassName: { value: string; label: string }[];
}

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({
	isModalOpen,
	handleOk,
	handleCancel,
	formData,
	setFormData,
	optionInstructor,
	// optionSubject,
	optionClassName,
}) => {
	const modalStyles = {
		header: { textAlign: 'center' as 'center' },
		footer: { textAlign: 'center' as 'center' },
	};
	const handleChangeDeclatation = (value: string, type: keyof assignmentFormData) => {
		setFormData((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const handleDateChange = (date: moment.Moment | null, type: 'startDate' | 'endDate') => {
		setFormData((prev) => ({
			...prev,
			[type]: date ? date.format('YYYY-MM-DD') : '', // Save in "YYYY-MM-DD" format
		}));
	};
	return (
		<Modal
			title={<div className='text-lg font-bold text-gray-800'>Cập nhật lịch giảng dạy</div>}
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			styles={modalStyles}
			width={600}
			footer={[
				<Button className='w-32 border-gray-300 text-gray-700' key='back' onClick={handleCancel}>
					Hủy
				</Button>,
				<Button
					className='w-32 border-orange-500 bg-orange-500 text-white'
					key='submit'
					onClick={handleOk}
				>
					Lưu
				</Button>,
			]}
		>
			<div className='space-y-4 py-5'>
				{/* Instructor */}
				<div className='flex items-center gap-4'>
					<label className='w-32 text-base font-semibold text-gray-700'>Giảng viên:</label>
					<Input value={formData.instructorName || ''} className='w-full' variant='borderless' />
				</div>

				{/* Subject */}
				<div className='flex items-center gap-4'>
					<label className='w-32 text-base font-semibold text-gray-700'>Môn học:</label>
					<Input value={formData.subjects} variant='borderless' className='w-full' />
				</div>

				{/* Class */}
				<div className='flex items-center gap-4'>
					<label className='w-32 text-base font-semibold text-gray-700'>Lớp học:</label>
					<Select
						placeholder='Chọn lớp'
						value={formData.className}
						onChange={(value) => handleChangeDeclatation(value, 'className')}
						options={optionClassName}
						className='w-full'
					/>
				</div>

				{/* Start Date */}
				<div className='flex items-center gap-4'>
					<label className='w-32 text-base font-semibold text-gray-700'>
						Ngày bắt đầu: <span className='text-red-500'>*</span>
					</label>
					<DatePicker
						format='DD/MM/YYYY'
						value={formData.startDate ? moment(formData.startDate, 'YYYY-MM-DD') : null} // Parse from "YYYY-MM-DD"
						onChange={(date) => handleDateChange(date, 'startDate')}
						className='w-full'
					/>
				</div>

				{/* End Date */}
				<div className='flex items-center gap-4'>
					<label className='w-32 text-base font-semibold text-gray-700'>
						Ngày kết thúc: <span className='text-red-500'>*</span>
					</label>
					<DatePicker
						format='DD/MM/YYYY'
						value={formData.endDate ? moment(formData.endDate, 'YYYY-MM-DD') : null} // Parse from "YYYY-MM-DD"
						onChange={(date) => handleDateChange(date, 'endDate')}
						className='w-full'
					/>
				</div>

				{/* Description */}
				<div className='flex items-start gap-4'>
					<label className='w-32 text-base font-semibold text-gray-700'>Mô tả:</label>
					<Input.TextArea
						placeholder='Lorem ipsum dolor sit amet...'
						value={formData.description}
						onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
						rows={4}
						className='w-full'
					/>
				</div>
			</div>
		</Modal>
	);
};

export default EditAssignmentModal;
