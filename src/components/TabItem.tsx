'use client';
// import Link from 'next/link';
import React, { ElementType, FC, useEffect, useState } from 'react';

// import { ChevronDown, ChevronUp } from 'lucide-react';

import { Link } from 'react-router-dom';

interface TabItemProps {
	activeMainTab: string;
	setActiveMainTab: (tabName: string) => void;
	activeSubTab: string;
	setActiveSubTab: (subTabName: string) => void;
	tabName: string;
	title: string;
	// icon: React.ReactNode;
	isIcon?: boolean;
	subItems?: { name: string; label: string; icon: React.ReactNode }[];
	icon?: React.ReactNode;
	onCheckClick: () => void;
}

const TabItem: FC<TabItemProps> = ({
	activeMainTab,
	setActiveMainTab,
	activeSubTab,
	setActiveSubTab,
	tabName,
	title,
	subItems,
	icon: Icon,
	isIcon,
	onCheckClick,
}) => {
	const [isMobileView, setIsMobileView] = useState(false);
	const [isExpanded, setIsExpanded] = useState(true);

	const isActive = activeMainTab === tabName;
	const hasSubItems = subItems && subItems.length > 0;
	// const { isCollapsedAdmin } = useTheme();

	// useEffect(() => {
	// 	if (isCollapsedAdmin) {
	// 		setIsMobileView(true);
	// 	} else {
	// 		setIsMobileView(false);
	// 	}
	// }, [isCollapsedAdmin]);
	const handleClick = () => {
		setActiveMainTab(tabName);
		if (hasSubItems) {
			setIsExpanded(!isExpanded);
			setActiveSubTab(subItems[0].name);
		} else {
			setActiveSubTab('');
		}
		onCheckClick();
	};

	return (
		<div className={`${'w-28'}`}>
			<li
				className={`flex cursor-pointer items-center gap-3 rounded-lg ${
					// isActive ? 'text-second bg-[#e250502b]' : 'hover:text-orange hover:opacity-80'
					isActive ? 'text-primary' : 'hover:text-primary hover:opacity-80'
				} `}
			>
				{hasSubItems ? (
					<div
						onClick={handleClick}
						className={`relative flex w-full items-center gap-2 p-3 text-sm ${isMobileView && 'justify-center'}`}
					>
						{Icon && <>{Icon}</>}
						{!isIcon && <span>{title}</span>}
						{!isIcon && (
							<span className='ml-auto'>
								{isExpanded ? (
									<p>Down</p>
								) : (
									// <ChevronDown height={16} width={16} />
									<p>Up</p>
									// <ChevronUp height={16} width={16} />
								)}
							</span>
						)}
					</div>
				) : (
					<Link
						to={`/${tabName}`}
						onClick={handleClick}
						className={`flex w-full items-center gap-2 p-3 text-sm ${isIcon && 'justify-center'}`}
					>
						<div className={`${isActive ? 'bg-[#fff9f473]' : ''} rounded-md px-4 py-4`}>
							{Icon && <>{Icon}</>}
							{!isIcon && <span>{title}</span>}
						</div>
					</Link>
				)}
			</li>
			{isActive && isExpanded && hasSubItems && (
				<>
					{!isIcon ? (
						<ul className='mt-2 ml-10 space-y-2'>
							{subItems.map((subItem) => (
								<li
									key={subItem.name}
									className={`cursor-pointer ${
										activeSubTab === subItem.name
											? 'text-primary'
											: 'hover:text-primary text-gray-700'
									}`}
								>
									<Link
										to={`/${tabName}/${subItem.name}`}
										onClick={() => setActiveSubTab(subItem.name)}
										className='flex items-center gap-2 px-2 py-1 text-sm'
									>
										{subItem.icon}
										{!isIcon && subItem.label}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<div className='absolute top-[16.5%] left-[64%]'>
							<ul className='mt-2 ml-10 space-y-2 rounded-lg bg-white py-2 shadow-md'>
								{subItems.map((subItem) => (
									<li
										key={subItem.name}
										className={`cursor-pointer ${
											activeSubTab === subItem.name
												? 'text-primary'
												: 'hover:text-primary text-gray-700'
										}`}
									>
										<Link
											to={`/${tabName}/${subItem.name}`}
											onClick={() => setActiveSubTab(subItem.name)}
											className='flex items-center gap-2 px-2 py-2 text-sm'
										>
											{subItem.icon}
											{!isIcon && subItem.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default TabItem;
