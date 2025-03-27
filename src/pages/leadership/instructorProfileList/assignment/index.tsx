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

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

// Interface cho dữ liệu phân công giảng dạy
interface AssignmentData {
	key: string;
	classCode: string;
	className: string;
	teacher: string;
	startDate: string;
	endDate: string;
	academicYear: string;
	grade: string;
	studentCount: number;
	classType: string;
	description: string;
	subjects: string[];
}

// Interface cho dữ liệu form
interface AssignmentFormData {
	classCode: string;
	className: string;
	teacher: string;
	startDate: string;
	endDate: string;
	academicYear: string;
	grade: string;
	studentCount: number;
	classType: string;
	description: string;
	subjects: string[];
}

// Dữ liệu mẫu ban đầu
const initialData: AssignmentData[] = [
	{
		key: '1',
		classCode: 'CS101',
		className: 'Nhập môn lập trình',
		teacher: 'Nguyễn Văn A',
		startDate: '2024-09-01',
		endDate: '2024-12-15',
		academicYear: '2024-2025',
		grade: 'Khối 10',
		studentCount: 30,
		classType: 'Khối 10',
		description: 'Lớp cơ bản về lập trình',
		subjects: ['Lập trình cơ bản', 'Thuật toán'],
	},
	{
		key: '2',
		classCode: 'CS102',
		className: 'Cấu trúc dữ liệu và giải thuật',
		teacher: 'Trần Thị B',
		startDate: '2024-09-01',
		endDate: '2024-12-15',
		academicYear: '2024-2025',
		grade: 'Khối 11',
		studentCount: 25,
		classType: 'Khối 11',
		description: 'Lớp nâng cao về cấu trúc dữ liệu',
		subjects: ['Cấu trúc dữ liệu', 'Giải thuật'],
	},
];

function InstructorAssignmentPage() {
	// State cho danh sách phân công giảng dạy
	const [assignments, setAssignments] = useState<AssignmentData[]>(initialData);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [subjectList, setSubjectList] = useState<string[]>([]);
	const [activeTeacher, setActiveTeacher] = useState<string | null>('');
	const [activeName, setActiveName] = useState<string | null>('');
	const [instructorData, setInstructorData] = useState<InstructorData[]>([]);
	const [optionInstructor, setOptionInstructor] = useState<{ value: string; label: string }[]>([]);

	const [academicYear, setAcademicYear] = useState<string>('');
	const [grade, setGrade] = useState<string>('');
	const [className, setClassName] = useState<string>('');
	const [studentCount, setStudentCount] = useState<number>(0);
	const [classType, setClassType] = useState<string>('');
	const [teacher, setTeacher] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [inheritData, setInheritData] = useState<boolean>(false);
	const [inheritYear, setInheritYear] = useState<string>('');

	const fetchInstructorData = async () => {
		try {
			const data = await getInstructors();
			setInstructorData(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchInstructorData();
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

	// Reset form
	const resetForm = () => {
		setAcademicYear('');
		setGrade('');
		setClassName('');
		setStudentCount(40);
		setClassType('');
		setTeacher('');
		setDescription('');
		setInheritData(false);
		setInheritYear('');
		setSubjectList([]);
	};

	const handleOk = () => {
		const newAssignment: AssignmentFormData = {
			classCode: `CS${100 + assignments.length + 1}`,
			className: className,
			teacher: optionInstructor?.find((opt) => opt.value === teacher)?.label || '',
			startDate: '2024-09-01',
			endDate: '2024-12-15',
			academicYear: academicYear,
			grade: grade,
			studentCount: studentCount || 0,
			classType: classType,
			description: description,
			subjects: [...subjectList],
		};

		setIsModalOpen(false);
		resetForm();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		resetForm();
	};

	const handleChangeDeclatation = (value: string, type: string) => {
		switch (type) {
			case 'academicYear':
				setAcademicYear(value);
				break;
			case 'grade':
				setGrade(value);
				break;
			case 'classType':
				setClassType(value);
				break;
			case 'inheritYear':
				setInheritYear(value);
				break;
			default:
				break;
		}
	};

	const handleChange = (value: string) => {
		setTeacher(value);
	};

	const onChangeBox = (e: any) => {
		setInheritData(e.target.checked);
	};

	const removeSubject = (subject: string) => {
		setSubjectList((prev) => prev.filter((sub) => sub !== subject));
	};

	const addSubject = (subject: string) => {
		if (subject && !subjectList.includes(subject)) {
			setSubjectList((prev) => [...prev, subject]);
		}
	};

	const handleEdit = (record: AssignmentData) => {
		console.log('Edit assignment:', record);
		setIsModalOpen(true);
		setAcademicYear(record.academicYear);
		setGrade(record.grade);
		setClassName(record.className);
		setStudentCount(record.studentCount);
		setClassType(record.classType);
		setTeacher(optionInstructor?.find((opt) => opt.label === record.teacher)?.value || '');
		setDescription(record.description);
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
			dataIndex: 'classCode',
			sorter: (a, b) => a.classCode.localeCompare(b.classCode),
			width: '10%',
		},
		{
			title: 'Tên lớp',
			dataIndex: 'className',
			sorter: (a, b) => a.className.localeCompare(b.className),
			width: '15%',
		},
		{
			title: 'Giáo viên chủ nhiệm',
			dataIndex: 'teacher',
			sorter: (a, b) => a.teacher.localeCompare(b.teacher),
			width: '15%',
		},
		{
			title: 'Ngày bắt đầu',
			dataIndex: 'startDate',
			sorter: (a, b) => a.startDate.localeCompare(b.startDate),
			width: '15%',
		},
		{
			title: 'Ngày kết thúc',
			dataIndex: 'endDate',
			sorter: (a, b) => a.endDate.localeCompare(b.endDate),
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
		setAssignments((prev) =>
			prev.filter((assignment) => !selectedRowKeys.includes(assignment.key)),
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
	};

	return (
		<div>
			<>
				<SideBarAssignment
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

								{/* Modal Add */}
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
														value={academicYear}
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
														value={grade}
														onChange={(value) => handleChangeDeclatation(value, 'grade')}
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
													<Input
														placeholder='Nhập tên lớp'
														value={className}
														onChange={(e) => setClassName(e.target.value)}
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
														value={studentCount}
														onChange={(e) => setStudentCount(Number(e.target.value))}
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
														value={classType}
														onChange={(value) => handleChangeDeclatation(value, 'classType')}
														options={[
															{ value: 'Khối 6', label: 'Khối 6' },
															{ value: 'Khối 7', label: 'Khối 7' },
															{ value: 'Khối 8', label: 'Khối 8' },
															{ value: 'Khối 9', label: 'Khối 9' },
															{ value: 'Khối 10', label: 'Khối 10' },
															{ value: 'Khối 11', label: 'Khối 11' },
															{ value: 'Khối 12', label: 'Khối 12' },
														]}
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
														value={teacher}
														onChange={handleChange}
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
														value={description}
														onChange={(e) => setDescription(e.target.value)}
													/>
												</div>
											</div>

											<div className='my-5 h-[0px] w-[756px] border border-[#c8c4c0]'></div>

											<div>
												<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
													Danh sách môn học
												</p>
												<div>
													<div className='flex items-center gap-2'>
														<Checkbox checked={inheritData} onChange={onChangeBox} />
														<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
															Kế thừa dữ liệu:{' '}
														</div>
														<Select
															placeholder='Niên khóa'
															style={{ width: 120 }}
															value={inheritYear}
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
												</div>
												<div className='space-y-3'>
													<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#cc5c00]">
														Danh sách môn học
													</p>
													<div className='space-y-4'>
														<Input.Search
															placeholder='Nhập môn học và nhấn Enter để thêm'
															enterButton='Thêm'
															onSearch={addSubject}
														/>
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
										dataSource={assignments}
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

			{/* Modal delete */}
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
