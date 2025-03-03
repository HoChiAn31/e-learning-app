// import { Link } from 'react-router-dom';

// export const CardItem = ({
// 	id,
// 	title,
// 	description,
// 	bgType,
// 	to,
// }: {
// 	id?: string;
// 	title: string;
// 	description: string;
// 	bgType?: 'blue' | null;
// 	to: string;
// }) => {
// 	return (
// 		<div className='h-[120px] w-[430px]' key={id}>
// 			<Link className='relative' to={to}>
// 				<img
// 					src={
// 						bgType === 'blue'
// 							? 'https://i.imgur.com/6xglIVw.png'
// 							: 'https://i.imgur.com/JZkVVnG.png'
// 					}
// 					alt=''
// 				/>
// 				<div className='absolute left-1/2 top-1/2 w-[360px] -translate-x-1/2 -translate-y-1/2 transform text-center'>
// 					<p className="font-['Mulish'] text-[28px] font-extrabold tracking-wide text-white">
// 						{title}
// 					</p>
// 					<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
// 						{description}
// 					</p>
// 				</div>
// 			</Link>
// 		</div>
// 	);
// };
import { Link } from 'react-router-dom';

interface CardItemProps {
	id?: string;
	title: string;
	description?: string; // Dùng cho trường hợp 1
	quantity?: number; // Dùng cho trường hợp 2 và 3
	bgType?: 'blue' | 'default' | 'other';
	to?: string; // Dùng khi cần Link
}

export const CardItem: React.FC<CardItemProps> = ({
	id,
	title,
	description,
	quantity,
	bgType,
	to,
}) => {
	// Logic chọn background image
	const getBackgroundImage = () => {
		if (bgType) {
			return bgType === 'blue'
				? 'https://i.imgur.com/6xglIVw.png'
				: 'https://i.imgur.com/JZkVVnG.png';
		}
		if (id) {
			return id === '1'
				? 'https://i.imgur.com/6xglIVw.png'
				: id === '2'
					? 'https://i.imgur.com/JZkVVnG.png'
					: 'https://i.imgur.com/5CmJYHN.png';
		}
		return 'https://i.imgur.com/JZkVVnG.png'; // Default fallback
	};

	// Nội dung card
	const content = (
		<div className='relative'>
			<img src={getBackgroundImage()} alt='' className='h-[160px]' />
			<div className='absolute left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 transform text-center'>
				{quantity !== undefined && description === undefined ? (
					// Trường hợp 2: Chỉ có quantity
					<>
						<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
							{title}
						</p>
						<p className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-white">
							{quantity}
						</p>
					</>
				) : (
					//  : quantity !== undefined && description !== undefined ? (
					// 	// Trường hợp 3: Có cả title và quantity
					// 	<>
					// 		<p className="font-['Mulish'] text-[28px] font-extrabold tracking-wide text-white">
					// 			{title}
					// 		</p>
					// 		<p className="font-['Mulish'] text-2xl font-extrabold tracking-tight text-white">
					// 			{quantity}
					// 		</p>
					// 	</>
					// )
					// Trường hợp 1: Chỉ có title hoặc title + description
					<>
						<p className="font-['Mulish'] text-[28px] font-extrabold tracking-wide text-white">
							{title}
						</p>
						{description && (
							<p className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
								{description}
							</p>
						)}
					</>
				)}
			</div>
		</div>
	);

	return (
		<div className={to ? 'h-[120px] w-[430px]' : ''} key={id}>
			{to ? (
				<Link className='relative' to={to}>
					{content}
				</Link>
			) : (
				content
			)}
		</div>
	);
};
