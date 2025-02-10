import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface CardLinkProps {
	link: string;
	label: string;
}

const CardLink: React.FC<CardLinkProps> = ({ link, label }) => {
	const location = useLocation();
	const isActive = location.pathname === link;

	return (
		<div className='w-full px-6'>
			<Link to={link} className="font-['Mulish'] text-lg font-extrabold">
				<div
					className={`border-orange4 w-full rounded-lg border px-6 py-3 ${
						isActive ? 'bg-orange5 text-white' : 'bg-[#FFF9F4]'
					}`}
				>
					{label}
				</div>
			</Link>
		</div>
	);
};

export default CardLink;
