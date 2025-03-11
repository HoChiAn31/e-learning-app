import React from 'react';
import { Select } from 'antd';

const semester = [
	{ value: 'HKI', label: 'HKI' },
	{ value: 'HKII', label: 'HKII' },
	{ value: 'HKIII', label: 'HKIII' },
];

const SemesterSelect: React.FC = () => (
	<Select
		style={{ width: 120 }}
		onChange={(value) => console.log(`selected ${value}`)}
		options={semester}
		placeholder='Chọn kỳ'
	/>
);

export default SemesterSelect;
