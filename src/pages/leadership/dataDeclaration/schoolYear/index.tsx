import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Plus } from '../../../../components/icon';
import { Tables } from './Table';
import { AddModal } from './AddModal';
import { EditModal } from './EditModal';
import { DeleteModal } from './DeleteModal';
import {
	addSchoolYear,
	getSchoolYears,
	updateSchoolYear,
} from '../../../../firebase/dataDeclaration/fetchSchoolYear';
import {
	dataDeclaration_schoolYear,
	dataDeclaration_schoolYear_add_edit,
} from '../../../../types/leadership';

const DataDeclarationPage = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string>('');
	const [dataEdit, setDataEdit] = useState<dataDeclaration_schoolYear | null>(null);
	const [data, setData] = useState<dataDeclaration_schoolYear[]>([]);
	const fetchSchoolYear = async () => {
		try {
			const response = await getSchoolYears();
			console.log(response);
			// const schoolYearData = await response.json();
			setData(response);
		} catch (error) {
			console.error('Error fetching school year data:', error);
		}
	};
	useEffect(() => {
		fetchSchoolYear();
	}, []);
	const showAddModal = () => {
		setSelectedId('');
		setIsAddModalOpen(true);
	};

	const handleEdit = (record: dataDeclaration_schoolYear) => {
		setSelectedId(record.id);
		setDataEdit(record);
		setIsEditModalOpen(true);
	};

	const handleDelete = (record: dataDeclaration_schoolYear) => {
		setSelectedId(record.id.toString());
		setIsDeleteModalOpen(true);
	};

	const handleAddOk = (newData: {
		academicYearFrom: string;
		academicYearTo: string;
		semesters: { semesterName: string; startDate: string; endDate: string }[];
	}) => {
		// const newSemester: SemesterData = {
		// 	id: (data.length + 1).toString(),
		// 	index: data.length + 1,
		// 	academicYear: `${newData.academicYearFrom}-${newData.academicYearTo}`,
		// 	startTime: newData.semesters[0].startDate,
		// 	endTime: newData.semesters[0].endDate,
		// };
		console.log(newData);
		addSchoolYear(newData);

		setIsAddModalOpen(false);
	};

	const handleEditOk = async (editedData: {
		academicYearFrom: string;
		academicYearTo: string;
		semesters: { semesterName: string; startDate: string; endDate: string }[];
	}) => {
		try {
			await updateSchoolYear(selectedId, editedData);
			await fetchSchoolYear(); // Refresh data
			setIsEditModalOpen(false);
		} catch (error) {
			console.error('Error updating school year:', error);
		}
	};

	const handleDeleteOk = (id: string) => {
		// setData(data.filter((item) => item.id !== id));
		setIsDeleteModalOpen(false);
		setSelectedId('');
	};

	return (
		<div className=''>
			<div className='flex w-full items-end justify-end'>
				<Button
					className='py-5'
					type='primary'
					icon={<Plus />}
					size='middle'
					onClick={showAddModal}
				>
					<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						Thêm mới
					</div>
				</Button>
			</div>

			<Tables data={data} onEdit={handleEdit} onDelete={handleDelete} />

			<AddModal
				visible={isAddModalOpen}
				initialData={undefined}
				onOk={handleAddOk}
				onCancel={() => setIsAddModalOpen(false)}
			/>

			<EditModal
				visible={isEditModalOpen}
				record={dataEdit}
				onOk={handleEditOk}
				onCancel={() => setIsEditModalOpen(false)}
			/>

			<DeleteModal
				visible={isDeleteModalOpen}
				id={selectedId}
				onOk={handleDeleteOk}
				onCancel={() => {
					setIsDeleteModalOpen(false);
					setSelectedId('');
				}}
			/>
		</div>
	);
};

export default DataDeclarationPage;
