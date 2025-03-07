import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from './icon';

interface BreadcrumbLinkProps {
	to: string; // Đường dẫn điều hướng
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	setIsAddStudent?: (value: boolean) => void;
	currentPage: string;
	parentPage: string;
	middleTitle?: string; // Tiêu đề giữa (tuỳ chọn)
}

const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
	to,
	onClick,
	setIsAddStudent,
	currentPage,
	parentPage,
	middleTitle,
}) => {
	return (
		<div className='inline-flex h-[60px] items-center justify-center'>
			<div className='inline-flex items-center justify-start gap-2 px-2.5'>
				<Link
					to={to}
					className="cursor-pointer font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]"
					onClick={onClick}
				>
					{parentPage}
				</Link>
				<div data-svg-wrapper className='relative'>
					<ArrowRight />
				</div>
				{middleTitle && (
					<>
						<span className="font-['Mulish'] text-lg font-extrabold tracking-tight text-[#c8c4c0]">
							{middleTitle}
						</span>
						<div data-svg-wrapper className='relative'>
							<ArrowRight />
						</div>
					</>
				)}
				<span className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
					{currentPage}
				</span>
			</div>
		</div>
	);
};

export default BreadcrumbLink;
