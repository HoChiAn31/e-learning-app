import React, { useState } from 'react';
import { Button, Checkbox, Input, Modal, Row, Col } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { GroupUsers, Permission } from '../type';

interface AddGroupUserModalProps {
	visible: boolean;
	initialData?: Partial<GroupUsers>; // Optional initial data for editing
	onOk: () => void;
	onCancel: () => void;
	onChange: (data: GroupUsers) => void; // Callback to update parent state
}

const AddGroupUserModal: React.FC<AddGroupUserModalProps> = ({
	visible,
	initialData = {},
	onOk,
	onCancel,
	onChange,
}) => {
	const [isDecentralization, setIsDecentralization] = useState(false);

	// Initial state based on GroupUsers interface
	const [groupData, setGroupData] = useState<GroupUsers>({
		key: initialData.key || Date.now(), // Use timestamp as a temporary key if not provided
		groupName: initialData.groupName || '',
		totalMembers: initialData.totalMembers || 0,
		note: initialData.note || '',
		isDataDeclaration: initialData.isDataDeclaration || {
			isReview: false,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
		isStudentProfile: initialData.isStudentProfile || {
			isReview: false,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
		isInstructorProfile: initialData.isInstructorProfile || {
			isReview: false,
			isEdit: false,
			isDelete: false,
			isAdd: false,
			isEnterScore: false,
		},
		isExam: initialData.isExam || { isReview: false, isEdit: false, isDelete: false, isAdd: false },
		isSetting: initialData.isSetting || {
			isReview: false,
			isEdit: false,
			isDelete: false,
			isAdd: false,
		},
	});

	const modalStyles = {
		header: { textAlign: 'center' as const },
		footer: { textAlign: 'center' as const },
	};

	const categories = [
		{ label: 'Khai báo dữ liệu', name: 'isDataDeclaration' },
		{ label: 'Hồ sơ học viên', name: 'isStudentProfile' },
		{ label: 'Hồ sơ giảng viên', name: 'isInstructorProfile' },
		{ label: 'Thi cử', name: 'isExam' },
		{ label: 'Cài đặt hệ thống', name: 'isSetting' },
	];

	const permissions = ['isReview', 'isEdit', 'isDelete', 'isAdd'] as const;
	const permissionLabels: Record<(typeof permissions)[number], string> = {
		isReview: 'Xem',
		isEdit: 'Chỉnh sửa',
		isDelete: 'Xóa',
		isAdd: 'Thêm mới',
	};

	// Handle input changes for text fields
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const updatedData = { ...groupData, [name]: value };
		setGroupData(updatedData);
		onChange(updatedData); // Notify parent of changes
	};

	// Handle permission checkbox changes
	const handlePermissionChange = (
		category: keyof Pick<
			GroupUsers,
			'isDataDeclaration' | 'isStudentProfile' | 'isInstructorProfile' | 'isExam' | 'isSetting'
		>,
		permission: keyof Permission,
		checked: boolean,
	) => {
		const currentCategory = groupData[category];
		const updatedCategory = {
			...(currentCategory as Permission),
			[permission]: checked,
		} as Permission;

		// Handle the special case for isInstructorProfile
		if (category === 'isInstructorProfile') {
			(updatedCategory as Permission & { isEnterScore: boolean }).isEnterScore =
				groupData.isInstructorProfile.isEnterScore;
		}

		const updatedData = {
			...groupData,
			[category]: updatedCategory,
		};
		setGroupData(updatedData);
		onChange(updatedData); // Notify parent of changes
	};

	// Handle isEnterScore for isInstructorProfile
	const handleEnterScoreChange = (checked: boolean) => {
		const updatedData = {
			...groupData,
			isInstructorProfile: {
				...groupData.isInstructorProfile,
				isEnterScore: checked,
			},
		};
		setGroupData(updatedData);
		onChange(updatedData); // Notify parent of changes
	};

	// Handle decentralization toggle
	const handleDecentralizationChange = (checked: boolean) => {
		setIsDecentralization(checked);
		if (checked) {
			// Set all permissions to true when "Toàn quyền quản trị" is checked
			const fullPermissions: Permission = {
				isReview: true,
				isEdit: true,
				isDelete: true,
				isAdd: true,
			};
			const updatedData: GroupUsers = {
				...groupData,
				isDataDeclaration: fullPermissions,
				isStudentProfile: fullPermissions,
				isInstructorProfile: { ...fullPermissions, isEnterScore: true },
				isExam: fullPermissions,
				isSetting: fullPermissions,
			};
			setGroupData(updatedData);
			onChange(updatedData);
		}
	};

	return (
		<Modal
			title='Thiết lập nhóm người dùng'
			open={visible}
			onOk={onOk}
			onCancel={onCancel}
			styles={modalStyles}
			width={800}
			footer={[
				<Button key='back' onClick={onCancel}>
					Hủy
				</Button>,
				<Button key='submit' type='primary' onClick={onOk}>
					Lưu
				</Button>,
			]}
		>
			<div className='py-5'>
				<div className='space-y-10'>
					<div className='flex h-5 items-center gap-24'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Tên nhóm:
						</span>
						<Input
							name='groupName'
							placeholder='Nhập tên nhóm'
							className='h-10 w-[561px] bg-[#F0F3F6]'
							variant='filled'
							value={groupData.groupName}
							onChange={handleInputChange}
						/>
					</div>
					<div className='flex items-start gap-28'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Ghi chú:
						</span>
						<TextArea
							name='note'
							placeholder='Nhập ghi chú'
							className='w-[561px] bg-[#F0F3F6]'
							variant='filled'
							rows={4}
							value={groupData.note}
							onChange={handleInputChange}
						/>
					</div>
					<div className='flex items-start gap-20'>
						<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
							Phân quyền:
						</span>
						<div className='flex gap-4'>
							<Checkbox
								checked={isDecentralization}
								onChange={(e) => handleDecentralizationChange(e.target.checked)}
							>
								Toàn quyền quản trị
							</Checkbox>
							<Checkbox
								checked={!isDecentralization}
								onChange={(e) => handleDecentralizationChange(!e.target.checked)}
							>
								Tùy chọn
							</Checkbox>
						</div>
					</div>
				</div>
				<div className='my-5 h-[0px] w-[756px] border border-[#c4c8c0]'></div>
				{!isDecentralization && (
					<div>
						{categories.map((category) => (
							<div key={category.name} className='mb-4 flex items-start gap-4'>
								<div className='w-[160px] pt-0.5'>
									<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
										{category.label}:
									</span>
								</div>
								<div className='w-[60%]'>
									<Row gutter={[8, 8]}>
										{permissions.map((permission) => (
											<Col className='gutter-row' span={6} key={permission}>
												<Checkbox
													checked={
														(groupData[category.name as keyof GroupUsers] as Permission)[permission]
													}
													onChange={(e) =>
														handlePermissionChange(
															category.name as keyof Pick<
																GroupUsers,
																| 'isDataDeclaration'
																| 'isStudentProfile'
																| 'isInstructorProfile'
																| 'isExam'
																| 'isSetting'
															>,
															permission,
															e.target.checked,
														)
													}
												>
													{permissionLabels[permission]}
												</Checkbox>
											</Col>
										))}
										{category.name === 'isInstructorProfile' && (
											<Col span={4}>
												<Checkbox
													checked={groupData.isInstructorProfile.isEnterScore}
													onChange={(e) => handleEnterScoreChange(e.target.checked)}
												>
													Nhập điểm
												</Checkbox>
											</Col>
										)}
									</Row>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</Modal>
	);
};

export default AddGroupUserModal;
