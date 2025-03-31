import {
	Button,
	ConfigProvider,
	Input,
	Modal,
	Select,
	Checkbox,
	Table,
	TableColumnsType,
	TableProps,
} from 'antd';
import { Edit, Lists, Plus, Trash, Minus } from '../../../../components/icon';
import SideBarAssignment from '../../../../layouts/SideBarAssignment';
import Search from 'antd/es/transfer/search';
import { useEffect, useState } from 'react';
import {
	InstructorData,
	getInstructors,
} from '../../../../firebase/instructorProfileList/instructor';
import { dataDeclaration_class } from '../../../../types/leadership';
import { getClasses } from '../../../../firebase/dataDeclaration/fetchClass';
import {
	addAssignment,
	getAssignments,
} from '../../../../firebase/instructorProfileList/fetchAssignment';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface AssignmentData {
	id: string;
	classCode: string;
	className: string;
	startDate: string;
	endDate: string;
	academicYear: string;
	grade: string;
	studentCount: number;
	classType: string;
	description: string;
	subjects: string[];
	instructorName: string;

	inheritYear?: string;
}

interface AssignmentFormData {
	classCode: string;
	className: string;
	startDate: string;
	endDate: string;
	academicYear: string;
	grade: string;
	studentCount: number;
	classType: string;
	description: string;
	subjects: string[];
	instructorName?: string;

	inheritYear?: string;
}

function InstructorAssignmentPage() {
	// const [assignments, setAssignments] = useState<AssignmentData[]>(initialData);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [showSelect, setShowSelect] = useState<boolean>(false); // Thêm state cho Select
	const [subjectList, setSubjectList] = useState<string[]>([]);
	const [activeTeacher, setActiveTeacher] = useState<string | null>('');
	const [activeName, setActiveName] = useState<string | null>('');
	const [activeSubject, setActiveSubject] = useState<string | null>('');
	const [instructorData, setInstructorData] = useState<InstructorData[]>([]);
	const [optionInstructor, setOptionInstructor] = useState<{ value: string; label: string }[]>([]);
	const [dataClass, setDataClass] = useState<dataDeclaration_class[]>([]);
	const [optionClassName, setOptionClassName] = useState<{ value: string; label: string }[]>([]);
	const [optionClassType, setOptionClassType] = useState<{ value: string; label: string }[]>([]);
	const [isInheritData, setIsInheritData] = useState<boolean>(false);
	const [selectedGrade, setSelectedGrade] = useState<string>('');
	const [formData, setFormData] = useState<AssignmentFormData>({
		classCode: '',
		className: '',
		startDate: '',
		endDate: '',
		academicYear: '',
		grade: '',
		studentCount: 0,
		classType: '',
		description: '',
		subjects: [],
		instructorName: activeName || undefined,
	});
	const [dataAssignment, setDataAssignment] = useState<AssignmentData[]>([]);
	const [dataAssignmentFilter, setDataAssignmenttFilter] = useState<AssignmentData[]>([]);

	const fetchDataAssignment = async () => {
		try {
			const data = await getAssignments();
			console.log('Data assignment:', data);
			setDataAssignment(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	useEffect(() => {
		fetchDataAssignment();
	}, []);

	useEffect(() => {
		if (dataAssignment.length > 0 && activeName && activeSubject) {
			const filter = dataAssignment.filter(
				(assignment) =>
					assignment.instructorName === activeName && assignment.subjects.includes(activeSubject),
			);
			setDataAssignmenttFilter(filter);
		} else {
			setDataAssignmenttFilter(dataAssignment);
		}
	}, [dataAssignment, activeName, activeSubject]);
	const fetchInstructorData = async () => {
		try {
			const data = await getInstructors();
			setInstructorData(data);
			setActiveTeacher(data[0].id);
			setActiveName(data[0].fullName);
			setFormData((prev) => ({ ...prev, instructorName: data[0].fullName }));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const fetchDataClass = async () => {
		try {
			const data = await getClasses();
			console.log('Data class:', data);
			setDataClass(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchInstructorData();
		fetchDataClass();
	}, []);

	useEffect(() => {
		if (instructorData.length > 0) {
			const filterOption = instructorData.map((d) => ({
				value: d.id,
				label: d.fullName,
			}));
			setOptionInstructor(filterOption);
		}
	}, [instructorData]);

	useEffect(() => {
		if (selectedGrade) {
			const filter = dataClass.filter((data) => data.faculty === selectedGrade);
			console.log('Filter:', filter);

			setOptionClassName(
				filter.map((d) => ({
					value: d.className,
					label: d.className,
				})),
			);
			setOptionClassType(
				filter.map((d) => ({
					value: d.classType,
					label: d.classType,
				})),
			);
		}
	}, [selectedGrade]);

	const resetForm = () => {
		setFormData({
			classCode: '',
			className: '',
			startDate: '',
			endDate: '',
			academicYear: '',
			grade: '',
			studentCount: 40,
			classType: '',
			description: '',
			subjects: [],
			instructorName: activeName || undefined,
		});
		setSubjectList([]);
		setShowSelect(false); // Reset Select visibility
	};

	const handleOk = async () => {
		try {
			if (formData.className) {
				const existingClass = dataClass.find((data) => data.className === formData.className);

				const newAssignment = {
					classCode: existingClass?.classCode || `CS${100 + dataAssignment.length + 1}`,
					className: formData.className,
					instructorName: activeName,
					startDate: '2025-09-01',
					endDate: '2025-12-15',
					academicYear: formData.academicYear,
					grade: formData.grade,
					studentCount: formData.studentCount || 40,
					classType: formData.classType,
					description: formData.description,
					subjects: [...subjectList],
				};

				await addAssignment(newAssignment);
				setIsModalOpen(false);
				setShowSelect(false);
				console.log(newAssignment);
			}
		} catch (error) {
			console.error('Error creating new assignment:', error);
		}
		// resetForm();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		// resetForm();
	};

	const handleChangeDeclatation = (value: string, type: keyof AssignmentFormData) => {
		setFormData((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const handleChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			instructorName: value,
		}));
	};

	const onChangeBox = (e: any) => {
		// setFormData((prev) => ({
		// 	...prev,
		// 	inheritData: e.target.checked,
		// }));
		setIsInheritData(!isInheritData);
	};

	const removeSubject = (subject: string) => {
		setSubjectList((prev) => prev.filter((sub) => sub !== subject));
	};

	const addSubject = (subject: string) => {
		if (subject && !subjectList.includes(subject)) {
			setSubjectList((prev) => [...prev, subject]);
			setShowSelect(false);
		}
	};

	const handleEdit = (record: AssignmentData) => {
		console.log('Edit assignment:', record);
		setIsModalOpen(true);
		setFormData({
			classCode: record.classCode,
			className: record.className,
			startDate: record.startDate,
			endDate: record.endDate,
			academicYear: record.academicYear,
			grade: record.grade,
			studentCount: record.studentCount,
			classType: record.classType,
			description: record.description,
			subjects: record.subjects,
			instructorName:
				activeName || optionInstructor?.find((opt) => opt.label === record.instructorName)?.value,
		});
		setSubjectList([...record.subjects]);
	};

	const handleDelete = (record: AssignmentData) => {
		console.log('Remove assignment:', record);
		setIsModalOpenDelete(true);
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const columns: TableColumnsType<AssignmentData> = [
		{
			title: 'Mã lớp',
			dataIndex: 'id',

			width: '20%',
		},
		{
			title: 'Tên lớp',
			dataIndex: 'className',

			width: '15%',
		},
		{
			title: 'Ngày bắt đầu',
			dataIndex: 'startDate',
			width: '15%',
		},
		{
			title: 'Ngày kết thúc',
			dataIndex: 'endDate',
			width: '15%',
		},
		{
			title: 'Danh sách chủ đề',
			dataIndex: 'subjects',
			render: (_, record) => (
				<div>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Lists />
					</Button>
				</div>
			),
			width: '15%',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div>
					<Button type='link' onClick={() => handleEdit(record)}>
						<Edit />
					</Button>
					<Button type='link' onClick={() => handleDelete(record)}>
						<Trash />
					</Button>
				</div>
			),
			width: '15%',
		},
	];

	const modalStyles = {
		header: { textAlign: 'center' as 'center' },
		footer: { textAlign: 'center' as 'center' },
	};

	const rowSelection: TableRowSelection<AssignmentData> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const onChange: TableProps<AssignmentData>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const handleOkDelete = () => {
		setDataAssignment((prev) =>
			prev.filter((assignment) => !selectedRowKeys.includes(assignment.id)),
		);
		setSelectedRowKeys([]);
		setIsModalOpenDelete(false);
	};

	const handleCancelDelete = () => {
		setIsModalOpenDelete(false);
	};

	const handleSelectTeacher = (value: { id: string; name: string }) => {
		setActiveTeacher(value.id);
		setActiveName(value.name);
		setFormData((prev) => ({ ...prev, instructorName: value.name }));
	};
	const handleChangeSubject = (subject: string) => {
		console.log('value', subject);
		setActiveSubject(subject);
		setSubjectList((prev) => [...prev, subject]);
	};
	return (
		<div>
			<>
				<SideBarAssignment
					onSelectSubject={handleChangeSubject}
					data={instructorData}
					onTeacherSelect={handleSelectTeacher}
					activeTeacher={activeTeacher}
				/>
				<div className='pl-[278px]'>
					<div className='px-6'>
						<div className='flex justify-end'>
							<div className='flex items-center gap-4'>
								<Trash />
								<div className='h-12 w-[1px] bg-[#c8c4c0]' />
								<Button
									className='h-[52px]'
									type='primary'
									icon={<Plus />}
									size='middle'
									onClick={() => setIsModalOpen(true)}
								>
									<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
										Thêm mới
									</div>
								</Button>

								<Modal
									title='Thêm phân công giảng dạy'
									open={isModalOpen}
									onOk={handleOk}
									onCancel={handleCancel}
									styles={modalStyles}
									width={800}
									footer={[
										<Button className='w-40' key='back' onClick={handleCancel}>
											Hủy
										</Button>,
										<Button className='w-40' key='submit' type='primary' onClick={handleOk}>
											Lưu
										</Button>,
									]}
								>
									<div className='py-5'>
										<div>
											<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
												Thông tin chung
											</div>
											<div className='flex items-center justify-between py-5'>
												<div className='flex items-center gap-1'>
													<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
														Niên khóa:{' '}
													</div>
													<Select
														placeholder='Niên khóa'
														style={{ width: 120 }}
														value={formData.academicYear}
														onChange={(value) => handleChangeDeclatation(value, 'academicYear')}
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
												<div className='flex items-center gap-1'>
													<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
														Khoa - Khối:{' '}
														<span className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#ed2025]">
															*
														</span>
													</div>
													<Select
														placeholder='Chọn khối'
														style={{ width: 120 }}
														value={formData.grade}
														onChange={(value) => {
															handleChangeDeclatation(value, 'grade');
															setSelectedGrade(value);
														}}
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
													<Select
														placeholder='Chọn lớp'
														value={formData.className}
														onChange={(value) => {
															handleChangeDeclatation(value, 'className');
														}}
														options={optionClassName}
														className='w-full'
													/>
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
													<Input
														placeholder='Nhập số lượng'
														value={formData.studentCount}
														onChange={(e) =>
															setFormData((prev) => ({
																...prev,
																studentCount: Number(e.target.value),
															}))
														}
													/>
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
													<Select
														placeholder='Chọn phân loại'
														value={formData.classType}
														onChange={(value) => handleChangeDeclatation(value, 'classType')}
														options={optionClassType}
														className='w-full'
													/>
												</div>

												<div className='flex h-5 items-center'>
													<div className='flex min-w-36 items-start justify-start'>
														<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Giáo viên chủ nhiệm:
														</div>
													</div>
													<Select
														placeholder='Chọn giáo viên'
														value={formData.instructorName}
														onChange={(value) => handleChangeDeclatation(value, 'instructorName')}
														options={optionInstructor}
														className='w-full'
													/>
												</div>

												<div className='flex h-5 items-center'>
													<div className='flex min-w-36 items-start justify-start'>
														<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Mô tả:
														</div>
													</div>
													<Input
														placeholder='Nhập mô tả'
														value={formData.description}
														onChange={(e) =>
															setFormData((prev) => ({ ...prev, description: e.target.value }))
														}
													/>
												</div>
											</div>

											<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>

											<div>
												<div className='flex items-center gap-2'>
													<Checkbox checked={isInheritData} onChange={onChangeBox} />
													<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
														Kế thừa dữ liệu:{' '}
													</div>
													<Select
														placeholder='Niên khóa'
														style={{ width: 120 }}
														value={formData.inheritYear}
														onChange={(value) => handleChangeDeclatation(value, 'inheritYear')}
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

												<div className='mt-5 space-y-3'>
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
																style={{ width: '100%' }}
																onChange={addSubject}
																className='mt-2'
																options={[
																	{ value: 'Toán học', label: 'Toán học' },
																	{ value: 'Vật lý', label: 'Vật lý' },
																	{ value: 'Hóa học', label: 'Hóa học' },
																	{ value: 'Sinh học', label: 'Sinh học' },
																	{ value: 'Lịch sử', label: 'Lịch sử' },
																	{ value: 'Địa lý', label: 'Địa lý' },
																	{ value: 'Tin học', label: 'Tin học' },
																	{ value: 'Ngữ văn', label: 'Ngữ văn' },
																	{ value: 'Tiếng Anh', label: 'Tiếng Anh' },
																]}
															/>
														)}
														<div
															className='flex cursor-pointer gap-2'
															onClick={() => setShowSelect(true)}
														>
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
									</div>
								</Modal>
							</div>
						</div>
						<div className='mt-2 rounded-2xl bg-white p-4 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
							<div className='flex items-center justify-between'>
								<div className="font-['Mulish'] text-[22px] font-extrabold tracking-tight text-[#373839]">
									Danh sách phân công giảng dạy
								</div>
								<Input
									placeholder='Tìm kiếm'
									className='w-[438px] rounded-full bg-[#F0F3F6]'
									prefix={<Search />}
									variant='filled'
								/>
							</div>
							<div className='pt-5'>
								<ConfigProvider
									theme={{
										components: {
											Table: {
												headerBg: '#FF7506',
												headerFilterHoverBg: '#FF7506',
												headerSortHoverBg: '#FF7506',
												headerSortActiveBg: '#FF7506',
												headerSplitColor: '#FF7506',
												borderColor: '#f2f2f2',
											},
										},
									}}
								>
									<Table<AssignmentData>
										rowSelection={rowSelection}
										columns={columns}
										dataSource={dataAssignmentFilter}
										onChange={onChange}
										rowClassName={(_, index) => (index % 2 !== 0 ? 'bg-[#F0F3F6]' : '')}
										pagination={{
											position: ['bottomRight'],
											showSizeChanger: true,
											pageSizeOptions: ['5', '10', '20', '50'],
											defaultPageSize: 5,
										}}
									/>
								</ConfigProvider>
							</div>
						</div>
					</div>
				</div>
			</>

			<Modal
				title='Xóa phân công'
				open={isModalOpenDelete}
				onOk={handleOkDelete}
				onCancel={handleCancelDelete}
				styles={modalStyles}
				footer={[
					<Button className='w-40' key='back' onClick={handleCancelDelete}>
						Hủy
					</Button>,
					<Button className='w-40' key='submit' type='primary' onClick={handleOkDelete}>
						Xác nhận
					</Button>,
				]}
			>
				<div className="font-['Source Sans Pro'] text-center text-base font-normal leading-tight text-[#373839]">
					Xác nhận muốn xoá phân công này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể
					hoàn tác.
				</div>
			</Modal>
		</div>
	);
}

export default InstructorAssignmentPage;
