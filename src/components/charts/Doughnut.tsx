// import React from 'react';
// import { Doughnut as ChartDoughnut } from 'react-chartjs-2';

// interface DoughnutProps {
// 	data: any;
// 	options: any;
// }

// const Doughnut: React.FC<DoughnutProps> = ({ data, options }) => {
// 	const chartData = {
// 		labels: [
// 			'Rạp BHD Star Bitexco',
// 			'Rạp CGV Vincom Đồng Khởi',
// 			'Rạp Galaxy Nguyễn Du',
// 			'Rạp Lotte Cinema Nam Sài Gòn',
// 			'Rạp Mega GS Cao Thắng',
// 		],
// 		datasets: [
// 			{
// 				label: 'Tổng vé bán ra',
// 				data: [140, 120, 95, 80, 50],
// 				backgroundColor: [
// 					'rgba(54, 162, 235, 0.6)',
// 					'rgba(255, 99, 132, 0.6)',
// 					'rgba(255, 206, 86, 0.6)',
// 					'rgba(75, 192, 192, 0.6)',
// 					'rgba(153, 102, 255, 0.6)',
// 				],
// 				borderColor: [
// 					'rgba(54, 162, 235, 1)',
// 					'rgba(255, 99, 132, 1)',
// 					'rgba(255, 206, 86, 1)',
// 					'rgba(75, 192, 192, 1)',
// 					'rgba(153, 102, 255, 1)',
// 				],
// 				borderWidth: 1,
// 			},
// 		],
// 	};
// 	const optionss = {
// 		responsive: true,
// 		scales: {
// 			// x: {
// 				beginAtZero: true,
// 			},
// 			y: {
// 				beginAtZero: true,
// 			},
// 		},
// 		plugins: {
// 			legend: {
// 				display: true,
// 				position: 'top',
// 			},
// 			title: {
// 				display: true,
// 				text: 'Tổng vé bán ra theo rạp',
// 			},
// 		},
// 	};
// 	return <ChartDoughnut data={chartData} options={optionss} />;
// };

// export default Doughnut;
// ====================================================================
// import React from 'react';
// import { Doughnut as ChartDoughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// interface DoughnutProps {
// 	data?: any;
// 	options?: any;
// }

// const Doughnut: React.FC<DoughnutProps> = ({ data, options }) => {
// 	const chartData = {
// 		labels: [
// 			'Rạp BHD Star Bitexco',
// 			'Rạp CGV Vincom Đồng Khởi',
// 			'Rạp Galaxy Nguyễn Du',
// 			'Rạp Lotte Cinema Nam Sài Gòn',
// 			'Rạp Mega GS Cao Thắng',
// 		],
// 		datasets: [
// 			{
// 				label: 'Tổng vé bán ra',
// 				data: [140, 120, 95, 80, 50],
// 				backgroundColor: [
// 					'rgba(54, 162, 235, 0.6)',
// 					'rgba(255, 99, 132, 0.6)',
// 					'rgba(255, 206, 86, 0.6)',
// 					'rgba(75, 192, 192, 0.6)',
// 					'rgba(153, 102, 255, 0.6)',
// 				],
// 				borderColor: [
// 					'rgba(54, 162, 235, 1)',
// 					'rgba(255, 99, 132, 1)',
// 					'rgba(255, 206, 86, 1)',
// 					'rgba(75, 192, 192, 1)',
// 					'rgba(153, 102, 255, 1)',
// 				],
// 				borderWidth: 1,
// 			},
// 		],
// 	};

// 	const optionss = {
// 		responsive: true,
// 		plugins: {
// 			legend: {
// 				display: true,
// 				position: 'top' as const, // Thêm `as const` để chỉ định rõ kiểu dữ liệu
// 			},
// 			title: {
// 				display: true,
// 				text: 'Tổng vé bán ra theo rạp',
// 			},
// 		},
// 	};

// 	return <ChartDoughnut data={chartData} options={optionss} />;
// };

// export default Doughnut;
// ========================================================
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ title, data }: { title: string; data: number[] }) => {
	const chartData = {
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
				data: data,
				backgroundColor: [
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 99, 132, 0.6)',
					'rgba(255, 206, 86, 0.6)',
					'rgba(75, 192, 192, 0.6)',
					'rgba(153, 102, 255, 0.6)',
				],
				borderColor: [
					'rgba(54, 162, 235, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'top' as const,
			},
			title: {
				display: true,
				text: title,
			},
		},
	};

	return <Doughnut data={chartData} options={options} />;
};

const GroupedCharts: React.FC = () => {
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
			<DoughnutChart title='Tổng vé bán ra (Tháng 1)' data={[140, 120, 95, 80, 50]} />
			<DoughnutChart title='Tổng vé bán ra (Tháng 2)' data={[100, 90, 70, 50, 30]} />
			<DoughnutChart title='Tổng vé bán ra (Tháng 3)' data={[160, 140, 120, 100, 80]} />
		</div>
	);
};

export default GroupedCharts;
