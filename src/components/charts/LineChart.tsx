import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
	Title,
	Filler, // Thêm Filler để hỗ trợ màu nền
} from 'chart.js';

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
	Title,
	Filler,
);

const LineChart: React.FC = () => {
	const chartData = {
		labels: ['5/2', '6/2', '7/2', '8/2', '9/2', '10/2'],
		datasets: [
			{
				label: 'Lượng truy cập',
				data: [120, 150, 180, 200, 170, 210],
				// borderColor: '#FF7506',
				backgroundColor: (context: any) => {
					const chart = context.chart;
					const { ctx, chartArea } = chart;
					if (!chartArea) {
						return;
					}
					const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
					gradient.addColorStop(0, 'rgba(255, 117, 6, 0.5)'); // Màu cam với độ trong suốt 50%
					gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)'); // Màu trắng với độ trong suốt 50%
					return gradient;
				},
				fill: true,
				borderWidth: 2,
				pointRadius: 0,
				pointHoverRadius: 0,
				// pointBackgroundColor: '#C83901',
				tension: 0.4,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'bottom' as const,
			},
			title: {
				display: false,
				text: 'Thống kê lượng truy cập',
			},
		},
		scales: {
			x: {
				grid: {
					display: true, // Ẩn đường dọc
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 50, // Mỗi bước là 50
					max: 250, // Giá trị lớn nhất là 250
				},
				title: {
					display: true,
					text: 'Số lượt truy cập',
				},
			},
		},
	};

	return (
		<div className='h-[328px] p-5'>
			<div className='mb-4 flex items-center justify-between'>
				<h2 className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-primary">
					Thống kê lượng truy cập
				</h2>
				<input
					type='text'
					placeholder='Tìm kiếm ngày...'
					style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc' }}
				/>
			</div>
			<Line data={chartData} options={options} />
		</div>
	);
};

export default LineChart;
