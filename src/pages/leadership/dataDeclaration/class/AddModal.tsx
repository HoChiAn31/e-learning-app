import { Button, Checkbox, CheckboxProps, Form, Input, Modal, Select } from 'antd';
import { Minus, Plus } from '../../../../components/icon';
import { useState } from 'react';
import { dataDeclaration_class_add_edit } from '../../../../types/leadership';

interface AddClassModalProps {
	visible: boolean;
	onOk: (data: dataDeclaration_class_add_edit) => void;
	onCancel: () => void;
}

const modalStyles = {
	header: { textAlign: 'center' as 'center' },
	footer: { textAlign: 'center' as 'center' },
};

const subjects = [
	{ value: 'Toán học', label: 'Toán học' },
	{ value: 'Vật lý', label: 'Vật lý' },
	{ value: 'Hóa học', label: 'Hóa học' },
	{ value: 'Sinh học', label: 'Sinh học' },
	{ value: 'Lịch sử', label: 'Lịch sử' },
	{ value: 'Địa lý', label: 'Địa lý' },
	{ value: 'Tin học', label: 'Tin học' },
	{ value: 'Ngữ văn', label: 'Ngữ văn' },
	{ value: 'Tiếng Anh', label: 'Tiếng Anh' },
];

const dataTeachers = [
	{ value: 'Nguyễn Văn A', label: 'Nguyễn Văn A' },
	{ value: 'Trần Thị B', label: 'Trần Thị B' },
	{ value: 'Lê Văn C', label: 'Lê Văn C' },
	{ value: 'Huỳnh Thanh D', label: 'Huỳnh Thanh D' },
	{ value: 'Nguyễn Thanh E', label: 'Nguyễn Thanh E' },
	{ value: 'Đào Thị F', label: 'Đào Thị F' },
	{ value: 'Phạm Văn G', label: 'Phạm Văn G' },
];

export const AddClassModal: React.FC<AddClassModalProps> = ({ visible, onOk, onCancel }) => {
	const [form] = Form.useForm();
	const [subjectList, setSubjectList] = useState<string[]>([]);
	const [showSelect, setShowSelect] = useState(false);

	const onChangeBox: CheckboxProps['onChange'] = (e) =>
		console.log(`checked = ${e.target.checked}`);

	const addSubject = (value: string) => {
		if (!subjectList.includes(value)) {
			setSubjectList([...subjectList, value]);
		}
		setShowSelect(false);
	};

	const removeSubject = (subject: string) => {
		setSubjectList(subjectList.filter((sub) => sub !== subject));
	};

	const addSemester = () => setShowSelect(true);

	const handleSubmit = (values: any) => {
		const classData: dataDeclaration_class_add_edit = {
			classCode: values.className, // Sử dụng className làm classCode
			schoolYear: values.schoolYear,
			faculty: values.faculty,
			className: values.className,
			classQuantity: values.classQuantity,
			classType: values.classType,
			teacher: values.teacher,
			description: values.description,
			subjects: subjectList,
		};
		onOk(classData);
		form.resetFields();
		setSubjectList([]);
		setShowSelect(false);
	};

	const handleCancelModal = () => {
		form.resetFields();
		setSubjectList([]);
		setShowSelect(false);
		onCancel();
	};

	return (
		<Modal
			title='Thêm lớp học mới'
			open={visible}
			onOk={() => form.submit()}
			onCancel={handleCancelModal}
			styles={modalStyles}
			width={800}
			footer={[
				<Button className='w-40' key='back' onClick={handleCancelModal}>
					Hủy
				</Button>,
				<Button className='w-40' key='submit' type='primary' onClick={() => form.submit()}>
					Lưu
				</Button>,
			]}
		>
			<Form
				form={form}
				onFinish={handleSubmit}
				initialValues={{
					faculty: 'Khối 6',
					classType: 'Lớp căn bản',
				}}
			>
				<div className='py-5'>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
						Thông tin chung
					</div>
					<div className='flex items-center justify-between py-5'>
						<div className='flex items-center gap-1'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Niên khóa:{' '}
							</div>
							<Form.Item name='schoolYear' noStyle>
								<Select
									placeholder='Niên khóa'
									style={{ width: 120 }}
									options={[
										{ value: '2020-2021', label: '2020-2021' },
										{ value: '2021-2022', label: '2021-2022' },
										{ value: '2022-2023', label: '2022-2023' },
										{ value: '2023-2024', label: '2023-2024' },
										{ value: '2024-2025', label: '2024-2025' },
										{ value: '2025-2026', label: '2025-2026' },
									]}
								/>
							</Form.Item>
						</div>
						<div className='flex items-center gap-1'>
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Khoa - Khối:{' '}
								<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
									*
								</span>
							</div>
							<Form.Item
								name='faculty'
								noStyle
								rules={[{ required: true, message: 'Vui lòng chọn khối!' }]}
							>
								<Select
									placeholder='Chọn khối'
									style={{ width: 120 }}
									options={[
										{ value: 'Khối 6', label: 'Khối 6' },
										{ value: 'Khối 7', label: 'Khối 7' },
										{ value: 'Khối 8', label: 'Khối 8' },
										{ value: 'Khối 9', label: 'Khối 9' },
										{ value: 'Khối 10', label: 'Khối 10' },
										{ value: 'Khối 11', label: 'Khối 11' },
										{ value: 'Khối 12', label: 'Khối 12' },
									]}
								/>
							</Form.Item>
						</div>
					</div>
					<div className='space-y-10'>
						<div className='flex h-5 items-center'>
							<div className='flex min-w-36 items-start justify-start'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Tên lớp:
									<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
										*
									</span>
								</div>
							</div>
							<Form.Item
								name='className'
								noStyle
								rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
							>
								<Input placeholder='Nhập tên lớp' />
							</Form.Item>
						</div>
						<div className='flex h-5 items-center'>
							<div className='flex min-w-36 items-start justify-start'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Số lượng học viên:
									<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
										*
									</span>
								</div>
							</div>
							<Form.Item
								name='classQuantity'
								noStyle
								rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
							>
								<Input type='number' placeholder='Nhập số lượng' />
							</Form.Item>
						</div>
						<div className='flex h-5 items-center'>
							<div className='flex min-w-36 items-start justify-start'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Phân loại lớp:
									<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
										*
									</span>
								</div>
							</div>
							<Form.Item
								name='classType'
								noStyle
								rules={[{ required: true, message: 'Vui lòng chọn loại lớp!' }]}
							>
								<Select
									placeholder='Chọn loại lớp'
									options={[
										{ value: 'Lớp căn bản', label: 'Lớp căn bản' },
										{ value: 'Lớp nâng cao', label: 'Lớp nâng cao' },
									]}
									className='w-full'
								/>
							</Form.Item>
						</div>
						<div className='flex h-5 items-center'>
							<div className='flex min-w-36 items-start justify-start'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Giáo viên chủ nhiệm:
								</div>
							</div>
							<Form.Item name='teacher' noStyle>
								<Select allowClear options={dataTeachers} className='w-full' />
							</Form.Item>
						</div>
						<div className='flex items-start'>
							<div className='flex min-w-36 items-start justify-start'>
								<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
									Mô tả:
								</div>
							</div>
							<Form.Item name='description' noStyle>
								<Input.TextArea placeholder='Nhập mô tả' rows={2} />
							</Form.Item>
						</div>
					</div>
					<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>
					<div>
						<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
							Danh sách môn học
						</p>
						<div className='flex items-center gap-2'>
							<Checkbox onChange={onChangeBox} />
							<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
								Kế thừa dữ liệu:{' '}
							</div>
							<Select
								placeholder='Niên khóa'
								style={{ width: 120 }}
								onChange={() => {}}
								options={[
									{ value: '2020-2021', label: '2020-2021' },
									{ value: '2021-2022', label: '2021-2022' },
									{ value: '2022-2023', label: '2022-2023' },
									{ value: '2023-2024', label: '2023-2024' },
									{ value: '2024-2025', label: '2024-2025' },
									{ value: '2025-2026', label: '2025-2026' },
								]}
							/>
						</div>
						<div className='space-y-3'>
							<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
								Danh sách môn học
							</p>
							<div className='space-y-4'>
								{subjectList.length > 0 && (
									<div className='grid grid-cols-3 gap-4'>
										{subjectList.map((sub) => (
											<div className='flex items-center gap-1' key={sub}>
												<div
													onClick={() => removeSubject(sub)}
													className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
												>
													<Minus />
												</div>
												<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
													{sub}
												</div>
											</div>
										))}
									</div>
								)}
								{showSelect && (
									<Select
										placeholder='Chọn môn học'
										onChange={addSubject}
										className='mt-2'
										options={subjects}
									/>
								)}
								<div className='flex cursor-pointer gap-2' onClick={addSemester}>
									<div className='inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'>
										<Plus />
									</div>
									<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#0a7feb]">
										Thêm môn học mới
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</Modal>
	);
};
