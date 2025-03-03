import { InputNumberProps, Select, Slider } from 'antd';
import MyBarChart from '../../components/charts/MyBarChart';
import Doughnut from '../../components/charts/Doughnut';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';
import { useState } from 'react';
import CustomSlider from '../../components/CustomSlider';

const DataQuantity = [
	{
		id: '1',
		quantity: 5000,
		title: 'Học viên',
	},
	{
		id: '2',
		quantity: 1500,
		title: 'Giảng viên',
	},
	{
		id: '3',
		quantity: 5000,
		title: 'Lớp học',
	},
];
// https://i.imgur.com/6xglIVw.png
// https://i.imgur.com/JZkVVnG.png
// https://i.imgur.com/5CmJYHN.png
const HomePage = () => {
	const [inputValue, setInputValue] = useState(1);

	const onChange: InputNumberProps['onChange'] = (newValue) => {
		setInputValue(newValue as number);
	};
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	const CardItem = ({ id, title, quantity }: { id: string; quantity: number; title: string }) => {
		return (
			<div className='' key={id}>
				<div className='relative'>
					<img
						src={
							id === '1'
								? 'https://i.imgur.com/6xglIVw.png'
								: id === '2'
									? 'https://i.imgur.com/JZkVVnG.png'
									: 'https://i.imgur.com/5CmJYHN.png'
						}
						alt=''
					/>
					<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
						<p className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-white">
							{quantity}
						</p>
						<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
							{title}
						</p>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div>
			<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
				Tổng quan
			</div>
			<div className='flex pt-10'>
				<div className='flex items-center gap-2'>
					<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
						Niên khoá
					</p>
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
				{DataQuantity.map((data) => (
					<CardItem key={data.id} {...data} />
				))}
			</div>
			<div className='flex gap-4'>
				<div className='w-[75%] rounded-md bg-white shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
					<BarChart />
				</div>
				<div className='flex w-1/4 flex-col rounded-md bg-white px-3 py-5 shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
					<div className='flex items-center justify-between'>
						<h2 className="font-['Source Sans Pro'] text-base font-bold">Số lượng học viên</h2>
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
					<div className='flex flex-col space-y-6 pt-6'>
						<CustomSlider grade={6} value={1500} />
						<CustomSlider grade={7} value={1000} />
						<CustomSlider grade={8} value={1200} />
						<CustomSlider grade={9} value={900} />
					</div>
				</div>
			</div>

			<div className='rounded-md bg-white shadow-[4px_4px_25px_4px_rgba(154,202,245,0.25)]'>
				<LineChart />
			</div>
		</div>
	);
};

export default HomePage;
