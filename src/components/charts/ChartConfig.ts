import { ChartConfiguration } from 'chart.js';
export const chartTicketCinema: ChartConfiguration<'bar'> = {
	type: 'bar',
	data: {
		labels: [
			'Rạp BHD Star Bitexco',
			'Rạp CGV Vincom Đồng Khởi',
			'Rạp Galaxy Nguyễn Du',
			'Rạp Lotte Cinema Nam Sài Gòn',
			'Rạp Mega GS Cao Thắng',
		],
		datasets: [
			{
				label: 'Tổng vé bán ra',
				data: [140, 120, 95, 80, 50],
				backgroundColor: 'rgba(54, 162, 235, 0.6)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			},
		],
	},
	options: {
		responsive: true,
		scales: {
			x: {
				beginAtZero: true,
			},
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				display: true,
				position: 'top',
			},
			title: {
				display: true,
				text: 'Tổng vé bán ra theo rạp',
			},
		},
	},
};
