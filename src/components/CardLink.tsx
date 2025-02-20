import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface CardLinkProps {
	link?: '#' | string;
	label?: string;
	type?: string;
	name?: string;
}

const CardLink: React.FC<CardLinkProps> = ({ link, label, type, name }) => {
	const location = useLocation();
	const isActive = location.pathname === link;
	if (type === 'assignment') {
		return (
			<div className='w-full px-6'>
				<div className="cursor-pointer font-['Mulish'] text-lg font-extrabold">
					<div
						className={`w-full rounded-lg border border-orange4 px-6 py-3 ${
							isActive ? 'bg-orange5 text-white' : 'bg-[#FFF9F4]'
						}`}
					>
						{name}
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className='w-full px-6'>
			{link && (
				<Link to={link} className="font-['Mulish'] text-lg font-extrabold">
					<div
						className={`w-full rounded-lg border border-orange4 px-6 py-3 ${
							isActive ? 'bg-orange5 text-white' : 'bg-[#FFF9F4]'
						}`}
					>
						{label}
					</div>
				</Link>
			)}
		</div>
	);
};

export default CardLink;
