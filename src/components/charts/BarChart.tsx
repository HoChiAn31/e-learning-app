// import React from 'react';
// import { Bar } from 'react-chartjs-2';

// interface BarChartProps {
// 	data: any;
// 	options: any;
// }

// const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
// 	return <Bar data={data} options={options} />;
// };

// export default BarChart;
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	Title,
} from 'chart.js';
import { Select } from 'antd';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const BarChart: React.FC = () => {
	const chartData = {
		labels: ['6A1', '6A2', '6A3', '6A4', '6A5', '6A6', '6A7', '6A8'],
		datasets: [
			{
				label: 'Giỏi',
				data: [10, 15, 12, 20, 18, 14, 16, 11],
				backgroundColor: '#C83901',
				// borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
				borderRadius: 16,
				borderSkipped: false,
			},
			{
				label: 'Khá',
				data: [20, 25, 22, 18, 24, 26, 30, 19],
				backgroundColor: '#FF7506',
				// borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
				borderRadius: 16,
				borderSkipped: false,
			},
			{
				label: 'Trung Bình',
				data: [15, 12, 18, 14, 10, 8, 12, 16],
				backgroundColor: '#FFA75E',
				// borderColor: 'rgba(255, 206, 86, 1)',
				borderWidth: 1,
				borderRadius: 16,
				borderSkipped: false,
			},
			{
				label: 'Yếu',
				data: [5, 2, 4, 6, 3, 5, 2, 4],
				backgroundColor: '#FFD8B8',
				// borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
				borderRadius: 16,
				borderSkipped: false,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'bottom' as const,
				labels: {
					usePointStyle: false, // Dùng hình tròn thay cho hình vuông
					// padding: 20,
					boxWidth: 30,
					borderRadius: 16,
					// borderColor: '#ffffff',
					generateLabels: (chart: any) => {
						return chart.data.datasets.map((dataset: any, index: number) => ({
							text: dataset.label,
							fillStyle: dataset.backgroundColor,
							hidden: !chart.isDatasetVisible(index),
							index,
						}));
					},
				},
			},
			title: {
				display: false,
				text: 'Thống kê kết quả học tập',
			},
		},
		scales: {
			x: {
				stacked: false,
				grid: {
					display: false, // Ẩn đường dọc
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 25, // Mỗi bước là 25
					max: 50, // Giá trị lớn nhất là 50
				},
				title: {
					display: false,
					text: 'Số lượng học sinh',
				},
			},
		},
	};
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	return (
		<div className='p-5'>
			<div className='mb-4 flex items-center justify-between'>
				<h2 className="font-['Source Sans Pro'] text-base font-bold tracking-tight">
					Thống kê kết quả học tập
				</h2>
				<Select
					style={{ width: 120 }}
					onChange={handleChange}
					placeholder='Chọn khối'
					options={[
						{ value: 'THCS', label: 'THCS' },
						{ value: 'THPT', label: 'THPT' },
						{ value: 'CH', label: 'CH' },
					]}
				/>
			</div>
			<div className='flex h-[360px] items-center justify-center'>
				<Bar data={chartData} options={options} width={800} height={400} />
			</div>
		</div>
	);
};

export default BarChart;
