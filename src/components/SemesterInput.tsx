import React, { useState } from 'react';
import { Input, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

import { Moment } from 'moment';
import { Minus } from './icon';

interface SemesterInputProps {
	semesterName: string;
	onRemove: () => void;
	onChange: (data: { semesterName: string; startDate: string; endDate: string }) => void;
}

const SemesterInput: React.FC<SemesterInputProps> = ({ semesterName, onRemove, onChange }) => {
	const [name, setName] = useState(semesterName);
	const [startDate, setStartDate] = useState<Moment | null>(null);
	const [endDate, setEndDate] = useState<Moment | null>(null);

	// Gọi onChange khi bất kỳ trường nào thay đổi
	const handleChange = () => {
		onChange({
			semesterName: name,
			startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
			endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
		});
	};

	return (
		<div className='flex items-center gap-2'>
			<div
				className='inline-flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0a7feb] bg-[#0a7feb] p-[3px]'
				onClick={onRemove}
			>
				<Minus />
			</div>
			<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
				Tên học kì:
			</p>
			<Input
				placeholder={semesterName}
				className='w-[244px]'
				value={name}
				onChange={(e) => {
					setName(e.target.value);
					handleChange();
				}}
			/>
			<div className='flex items-center gap-1'>
				<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
					Từ
				</p>
				<DatePicker
					format='YYYY-MM-DD'
					style={{ width: '100%' }}
					suffixIcon={<CalendarOutlined />}
					placeholder='Chọn ngày'
					value={startDate}
					onChange={(date) => {
						setStartDate(date);
						handleChange();
					}}
				/>
			</div>
			<div className='flex items-center gap-1'>
				<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
					Đến
				</p>
				<DatePicker
					format='YYYY-MM-DD'
					style={{ width: '100%' }}
					suffixIcon={<CalendarOutlined />}
					placeholder='Chọn ngày'
					value={endDate}
					onChange={(date) => {
						setEndDate(date);
						handleChange();
					}}
				/>
			</div>
		</div>
	);
};

export default SemesterInput;
