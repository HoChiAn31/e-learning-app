import React from 'react';
import { Select } from 'antd';

const academicYears = [
	{ value: '2020-2021', label: '2020-2021' },
	{ value: '2021-2022', label: '2021-2022' },
	{ value: '2022-2023', label: '2022-2023' },
	{ value: '2023-2024', label: '2023-2024' },
	{ value: '2024-2025', label: '2024-2025' },
];

const AcademicYearsSelect: React.FC = () => (
	<Select
		style={{ width: 120 }}
		onChange={(value) => console.log(`selected ${value}`)}
		options={academicYears}
		placeholder='Chọn kỳ'
	/>
);

export default AcademicYearsSelect;
