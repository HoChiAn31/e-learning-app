import React from 'react';

interface CustomSliderProps {
	value: number;
	grade: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ value, grade }) => {
	const percentage = ((value - 0) / 2000) * 100;

	return (
		<div className='flex w-full flex-col items-center py-2'>
			<div className='relative w-full'>
				<div className='flex items-center justify-between pb-1'>
					<p className="font-['Source Sans Pro'] text-base font-normal text-[#373839]">
						Khối {grade}
					</p>
					<p className="font-['Source Sans Pro'] text-right text-base font-normal text-[#c8c4c0]">
						{value}
					</p>
				</div>
				<div className='h-2 rounded-lg bg-gray-300'>
					<div className='h-2 rounded-lg bg-primary' style={{ width: `${percentage}%` }}></div>
				</div>
			</div>
		</div>
	);
};

export default CustomSlider;
