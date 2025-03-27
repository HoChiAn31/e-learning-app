import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { InstructorData } from '../firebase/instructorProfileList/instructor';

const teacherOptions = [
	{ value: null, label: 'Tất cả giáo viên' },
	{ value: 'Nguyễn Văn A', label: 'Nguyễn Văn A' },
	{ value: 'Trần Thị B', label: 'Trần Thị B' },
	{ value: 'Lê Văn C', label: 'Lê Văn C' },
	{ value: 'Phạm Thị D', label: 'Phạm Thị D' },
	{ value: 'Hoàng Văn E', label: 'Hoàng Văn E' },
	{ value: 'Ngô Thị F', label: 'Ngô Thị F' },
	{ value: 'Đặng Văn G', label: 'Đặng Văn G' },
	{ value: 'Bùi Thị H', label: 'Bùi Thị H' },
];

interface SideBarAssignmentProps {
	onTeacherSelect: (teacher: { id: string; name: string }) => void;
	activeTeacher?: string | null;
	data: InstructorData[];
}

const SideBarAssignment = ({ onTeacherSelect, activeTeacher, data }: SideBarAssignmentProps) => {
	const [cardLinkData, setCardLinkData] = useState<InstructorData[]>([]);

	// Xử lý khi chọn giáo viên từ Select
	const handleTeacherChange = (value: string | null) => {
		if (value !== null) {
			const selectedTeacher = data.find((teacher) => teacher.fullName === value);
			if (selectedTeacher) {
				onTeacherSelect({ id: selectedTeacher.id, name: selectedTeacher.fullName });
			}
		}
	};

	// Xử lý khi chọn giáo viên từ danh sách card
	const handleTeacher = (id: string) => {
		const selectedTeacher = data.find((teacher) => teacher.id === id);
		if (selectedTeacher) {
			onTeacherSelect({ id: selectedTeacher.id, name: selectedTeacher.fullName });
		}
	};

	useEffect(() => {
		if (data.length > 0) {
			setCardLinkData(data);
		}
	}, [data]);

	console.log(cardLinkData);

	return (
		<div className='fixed z-50 h-[80vh] w-[278px] overflow-hidden rounded-2xl bg-white shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
			<div className='relative h-[150px] w-[278px] space-y-4 overflow-hidden bg-[#373839] p-6'>
				<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-white">
					Đang chọn xem:
				</div>
				<div className='flex items-center justify-between'>
					<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-white">
						Giáo viên:
					</div>
					<Select
						defaultValue={null}
						style={{ width: 150 }}
						onChange={handleTeacherChange}
						options={teacherOptions}
					/>
				</div>
			</div>

			<div className='space-y-4 py-4 2xl:space-y-6 2xl:py-14'>
				{cardLinkData.map((card) => (
					<div className='w-full px-6' key={card.id}>
						<div className="cursor-pointer font-['Mulish'] text-lg font-extrabold">
							<div
								className={`w-full rounded-lg border border-orange4 px-6 py-3 ${
									card.id === activeTeacher ? 'bg-orange5 text-white' : 'bg-[#FFF9F4]'
								}`}
								onClick={() => handleTeacher(card.id)}
							>
								{card.fullName}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SideBarAssignment;
