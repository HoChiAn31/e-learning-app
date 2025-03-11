import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
	const data: ChartData<'pie', number[], string> = {
		labels: ['Số môn đã hoàn thành', 'Số môn chưa hoàn thành'],
		datasets: [
			{
				label: 'Tổng số môn',
				data: [7, 3],
				backgroundColor: ['#36A2EB', '#FF9F40'],
				borderColor: ['#36A2EB', '#FF9F40'],
				borderWidth: 1,
			},
		],
	};

	const options: ChartOptions<'pie'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom' as const,
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						const label = context.label || '';
						const value = (context.raw as number) || 0;
						const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
						const percentage = ((value / total) * 100).toFixed(0) + '%';
						return `${label}: ${value} (${percentage})`;
					},
				},
			},
		},
	};

	return (
		<div style={{ width: '300px', margin: '0 auto' }}>
			<Pie data={data} options={options} />
		</div>
	);
};

export default PieChart;
