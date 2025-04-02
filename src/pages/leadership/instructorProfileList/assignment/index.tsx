import { useEffect, useState } from 'react';
import {
	Button,
	ConfigProvider,
	Input,
	Modal,
	Select,
	Table,
	TableColumnsType,
	TableProps,
	message,
} from 'antd';
import { Edit, Lists, Plus, Search, Trash } from '../../../../components/icon';
import SideBarAssignment from '../../../../layouts/SideBarAssignment';

import {
	InstructorData,
	getInstructors,
} from '../../../../firebase/instructorProfileList/instructor';
import { getClasses } from '../../../../firebase/dataDeclaration/fetchClass';
import {
	addAssignment,
	deleteAssignment,
	getAssignments,
	updateAssignment,
} from '../../../../firebase/instructorProfileList/fetchAssignment';
import AddAssignmentModal from './AddAssignmentModal';
import EditAssignmentModal from './EditAssignmentModal';
import {
	assignmentData,
	assignmentFormData,
	assignmentFormDataEdit,
} from '../../../../types/leadership/instructor';
import { dataDeclaration_class } from '../../../../types/leadership';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

function InstructorAssignmentPage() {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
	const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
	const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);
	const [showSelect, setShowSelect] = useState<boolean>(false);
	// SideBar
	const [activeTeacher, setActiveTeacher] = useState<string | null>('');
	const [activeName, setActiveName] = useState<string>('');
	const [activeSubject, setActiveSubject] = useState<string | null>('');
	//
	const [instructorData, setInstructorData] = useState<InstructorData[]>([]);
	const [optionInstructor, setOptionInstructor] = useState<{ value: string; label: string }[]>([]);
	const [dataClass, setDataClass] = useState<dataDeclaration_class[]>([]);
	const [dataAssignment, setDataAssignment] = useState<assignmentData[]>([]);
	const [dataSubjectFilter, setDataSubjectFilter] = useState<assignmentData[]>([]);

	const [dataAssignmentFilter, setDataAssignmenttFilter] = useState<assignmentData[]>([]);
	const [optionClassName, setOptionClassName] = useState<{ value: string; label: string }[]>([]);
	const [optionClassType, setOptionClassType] = useState<{ value: string; label: string }[]>([]);
	const [isInheritData, setIsInheritData] = useState<boolean>(false);
	const [selectedGrade, setSelectedGrade] = useState<string>('');
	const [selectedId, setSelectedId] = useState<string>('');
	const [selectedDelete, setSelectedDelete] = useState<string>('');
	const [formData, setFormData] = useState<assignmentFormData>({
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
	const [formDataEdit, setFormDataEdit] = useState<assignmentFormDataEdit>({
		id: '',
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
	// console.log('--------------------------------');
	// console.log('activeTeacher', activeTeacher);
	// console.log('activeName', activeName);
	// console.log('activeSubject', activeSubject);
	// console.log('--------------------------------');

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
	// filter subject
	useEffect(() => {
		if (dataAssignment.length > 0 && activeSubject) {
			console.log('activeSubject:', activeSubject);

			const filter = dataAssignment.filter((assignment) =>
				assignment.subjects.includes(activeSubject),
			);
			console.log('filter:', filter);
			setDataSubjectFilter(filter);

			setDataAssignmenttFilter(filter);
		} else {
			setDataAssignmenttFilter(dataAssignment);
		}
	}, [dataAssignment, activeSubject]);

	// filter name
	useEffect(() => {
		if (dataAssignment.length > 0 && activeName) {
			console.log('activeName:', activeName);

			const filter = dataSubjectFilter.filter(
				(assignment) => assignment.instructorName === activeName,
			);
			console.log('filter:', filter);
			setDataAssignmenttFilter(filter);
		} else {
			setDataAssignmenttFilter(dataAssignment);
		}
	}, [dataAssignment, activeName]);
	const fetchInstructorData = async () => {
		try {
			const data = await getInstructors();
			setInstructorData(data);
			setActiveTeacher(data[0].id);
			// setActiveName(data[0].fullName);
			setFormData((prev) => ({ ...prev, instructorName: data[0].fullName }));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const fetchDataClass = async () => {
		try {
			const data = await getClasses();
			// console.log('Data class:', data);
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
				value: d.fullName,
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

	const handleOkAdd = async () => {
		try {
			if (formData.className) {
				const existingClass = dataClass.find((data) => data.className === formData.className);

				const baseAssignment = {
					classCode: existingClass?.classCode || `CS${100 + dataAssignment.length + 1}`,
					className: formData.className,
					instructorName: activeName || formData.instructorName,
					startDate: '2025-09-01',
					endDate: '2025-12-15',
					academicYear: formData.academicYear,
					grade: formData.grade,
					studentCount: formData.studentCount || 40,
					classType: formData.classType,
					description: formData.description,
					subjects: formData.subjects || [],
					inheritYear: isInheritData ? formData.inheritYear : undefined,
				};

				if (isInheritData) {
					for (let i = 0; i < (formData.subjects || []).length; i++) {
						const subject = formData.subjects[i];
						const newAssignment = {
							...baseAssignment,
							classCode: `CS${100 + dataAssignment.length + i + 1}`,
							subjects: [subject],
						};
						console.log(newAssignment);
						await addAssignment(newAssignment);
					}
				} else if (formData.subjects && formData.subjects.length > 0) {
					// await addAssignment(baseAssignment);
				}

				await fetchDataAssignment();
				setIsModalOpenAdd(false);
				setShowSelect(false);
			}
		} catch (error) {
			console.error('Error creating new assignment:', error);
		}
	};

	const handleCancelAdd = () => {
		setIsModalOpenAdd(false);
	};

	const handleOkEdit = async () => {
		try {
			const updatedAssignment: assignmentData = {
				id: selectedId,
				classCode: formDataEdit.classCode,
				className: formDataEdit.className,
				instructorName: formDataEdit.instructorName || activeName,
				startDate: formDataEdit.startDate,
				endDate: formDataEdit.endDate,
				academicYear: formDataEdit.academicYear,
				grade: formDataEdit.grade,
				studentCount: formDataEdit.studentCount || 40,
				classType: formDataEdit.classType,
				description: formDataEdit.description,
				subjects: formDataEdit.subjects,
			};

			await updateAssignment(selectedId, updatedAssignment);
			await fetchDataAssignment();
			setIsModalOpenEdit(false);
		} catch (error) {
			console.error('Error updating assignment:', error);
		}
	};
	const handleCancelEdit = () => {
		setIsModalOpenEdit(false);
	};

	const handleEdit = (record: assignmentData) => {
		console.log('Edit assignment:', record);
		setIsModalOpenEdit(true);
		setSelectedId(record.id);
		setFormDataEdit({
			...record,
			subjects: record.subjects,
		});
	};

	const handleDelete = (record: assignmentData) => {
		console.log('Remove assignment:', record);
		setSelectedDelete(record.id);
		setIsModalOpenDelete(true);
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const columns: TableColumnsType<assignmentData> = [
		{
			title: 'Mã lớp',
			dataIndex: 'id',
			width: '20%',
		},
		{
			title: 'Tên lớp',
			dataIndex: 'className',
			width: '10%',
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
			title: 'Môn học',
			dataIndex: 'subjects',
			width: '10%',
		},
		{
			title: 'Giáo viên',
			dataIndex: 'instructorName',
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

	const rowSelection: TableRowSelection<assignmentData> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const onChange: TableProps<assignmentData>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const handleOkDelete = async () => {
		try {
			deleteAssignment(selectedDelete);
			setSelectedRowKeys([]);
			fetchDataAssignment();
			setIsModalOpenDelete(false);
		} catch (error) {
			console.error('Error:', error);
		}
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
	};

	return (
		<div>
			<>
				<SideBarAssignment
					dataAssignment={dataAssignment}
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
									onClick={() => setIsModalOpenAdd(true)}
								>
									<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
										Thêm mới
									</div>
								</Button>
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
									<Table<assignmentData>
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

			<AddAssignmentModal
				isModalOpen={isModalOpenAdd}
				handleOk={handleOkAdd}
				handleCancel={handleCancelAdd}
				formData={formData}
				setFormData={setFormData}
				showSelect={showSelect}
				setShowSelect={setShowSelect}
				isInheritData={isInheritData}
				setIsInheritData={setIsInheritData}
				optionClassName={optionClassName}
				optionClassType={optionClassType}
				optionInstructor={optionInstructor}
				selectedGrade={selectedGrade}
				setSelectedGrade={setSelectedGrade}
			/>

			<EditAssignmentModal
				isModalOpen={isModalOpenEdit}
				handleOk={handleOkEdit}
				handleCancel={handleCancelEdit}
				formData={formDataEdit}
				setFormData={setFormDataEdit}
				optionClassName={optionClassName}
				optionInstructor={optionInstructor}
			/>

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
