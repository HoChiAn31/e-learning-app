import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
	if (remainingTime === 0) {
		return <div className='timer'>Hết giờ</div>;
	}
	const minutes = Math.floor(remainingTime / 60);
	const seconds = remainingTime % 60;

	return (
		<div className='h-[102px] w-[102px] rounded-full border-4 border-[#2f80ed] px-2 py-4'>
			<div className="font-['Source Sans Pro'] text-center text-base font-semibold text-[#c8c4c0]">
				Còn lại
			</div>
			<div className="text-center font-['Mulish'] text-[22px] font-extrabold text-[#56ccf2]">
				{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
			</div>
		</div>
	);
};

const Timer = ({ duration }: { duration: number }) => (
	<div className='flex flex-col items-center'>
		<CountdownCircleTimer
			isPlaying
			duration={duration}
			colors={['#2f80ed', '#56ccf2']}
			colorsTime={[duration * 0.7, duration * 0.5]}
			size={140}
		>
			{renderTime}
		</CountdownCircleTimer>
	</div>
);

export default Timer;
