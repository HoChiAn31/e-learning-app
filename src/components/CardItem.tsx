import { Link } from 'react-router-dom';

export const CardItem = ({
	id,
	title,
	description,
	bgType,
	to,
}: {
	id?: string;
	title: string;
	description: string;
	bgType?: 'blue' | null;
	to: string;
}) => {
	return (
		<div className='h-[120px] w-[430px]' key={id}>
			<Link className='relative' to={to}>
				<img
					src={
						bgType === 'blue'
							? 'https://i.imgur.com/6xglIVw.png'
							: 'https://i.imgur.com/JZkVVnG.png'
					}
					alt=''
				/>
				<div className='absolute left-1/2 top-1/2 w-[360px] -translate-x-1/2 -translate-y-1/2 transform text-center'>
					<p className="font-['Mulish'] text-[28px] font-extrabold tracking-wide text-white">
						{title}
					</p>
					<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
						{description}
					</p>
				</div>
			</Link>
		</div>
	);
};
