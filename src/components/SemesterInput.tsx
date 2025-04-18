import React, { useEffect, useState } from 'react';
import { Input, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { Minus } from './icon';

interface SemesterInputProps {
	semesterName: string;
	startDate?: string; // Added to receive initial start date
	endDate?: string; // Added to receive initial end date
	onRemove: () => void;
	onChange: (data: { semesterName: string; startDate: string; endDate: string }) => void;
}

const SemesterInput: React.FC<SemesterInputProps> = ({
	semesterName: initialSemesterName,
	startDate: initialStartDate,
	endDate: initialEndDate,
	onRemove,
	onChange,
}) => {
	const [name, setName] = useState(initialSemesterName);
	const [startDate, setStartDate] = useState<Moment | null>(
		initialStartDate ? moment(initialStartDate) : null,
	);
	const [endDate, setEndDate] = useState<Moment | null>(
		initialEndDate ? moment(initialEndDate) : null,
	);

	// Sync with parent props when they change
	useEffect(() => {
		setName(initialSemesterName);
		setStartDate(initialStartDate ? moment(initialStartDate) : null);
		setEndDate(initialEndDate ? moment(initialEndDate) : null);
	}, [initialSemesterName, initialStartDate, initialEndDate]);

	// Notify parent of changes whenever name, startDate, or endDate updates
	useEffect(() => {
		onChange({
			semesterName: name,
			startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
			endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
		});
	}, [name, startDate, endDate, onChange]);

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
				placeholder={initialSemesterName}
				className='w-[244px]'
				value={name}
				onChange={(e) => setName(e.target.value)}
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
					onChange={(date) => setStartDate(date)}
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
					onChange={(date) => setEndDate(date)}
				/>
			</div>
		</div>
	);
};

export default SemesterInput;
