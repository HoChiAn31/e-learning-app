import React from 'react';
import { Select } from 'antd';

const subject = [
	{ value: 'Vật Lý', label: 'Vật Lý' },
	{ value: 'Toán', label: 'Toán' },
	{ value: 'Sinh', label: 'Sinh' },
];

const SubjectSelect: React.FC = () => (
	<Select
		style={{ width: 120 }}
		onChange={(value) => console.log(`selected ${value}`)}
		options={subject}
		placeholder='Chọn môn'
	/>
);

export default SubjectSelect;
