import { Select } from 'antd';

import CardLink from '../components/CardLink';

const cardLinkData = [
	{
		id: 1,
		link: '/dataDeclaration',
		label: 'Niên khoá',
	},
	{
		id: 2,
		link: '/dataDeclaration/department',
		label: 'Tổ - Bộ môn',
	},
	{
		id: 3,
		link: '/dataDeclaration/facultie',
		label: 'Khoa - Khối',
	},
	{
		id: 4,
		link: '/dataDeclaration/subject',
		label: 'Môn học',
	},
	{
		id: 5,
		link: '/dataDeclaration/class',
		label: 'Lớp học',
	},
	{
		id: 6,
		link: '/dataDeclaration/scoreType',
		label: 'Loại điểm',
	},
];
const SideBarDataDeclaration = () => {
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	return (
		<div className='fixed z-50 h-[80vh] w-[278px] overflow-hidden rounded-2xl bg-white shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
			{/*  */}
			<div className='relative h-[150px] w-[278px] space-y-4 overflow-hidden bg-[#373839] p-6'>
				<div className="font-['Source Sans Pro'] text-base font-normal leading-tight text-white">
					Đang chọn xem:
				</div>
				<div className='flex items-center justify-between'>
					<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-white">
						Trường:
					</div>
					<Select
						defaultValue='THCS'
						style={{ width: 120 }}
						onChange={handleChange}
						options={[
							{ value: 'THCS', label: 'THCS' },
							{ value: 'THPT', label: 'THPT' },
							{ value: 'CH', label: 'CH' },
						]}
					/>
				</div>
				<div className='flex items-center justify-between'>
					<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-white">
						Niên khoá:{' '}
					</div>
					<Select
						defaultValue='2025-2026'
						style={{ width: 120 }}
						onChange={handleChange}
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

			<div className='space-y-6 py-14'>
				{cardLinkData.map((card) => (
					<CardLink key={card.id} link={card.link} label={card.label} />
				))}
			</div>
		</div>
	);
};

export default SideBarDataDeclaration;
