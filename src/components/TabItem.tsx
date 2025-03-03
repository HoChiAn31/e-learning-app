'use client';
// import Link from 'next/link';
import React, { ElementType, FC, useEffect, useState } from 'react';

// import { ChevronDown, ChevronUp } from 'lucide-react';

import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface TabItemProps {
	activeMainTab: string;
	setActiveMainTab: (tabName: string) => void;
	activeSubTab: string;
	setActiveSubTab: (subTabName: string) => void;
	tabName: string;
	title: string;
	// icon: React.ReactNode;
	isIcon?: boolean;
	subItems?: { name: string; label: string; icon?: React.ReactNode }[];
	icon?: React.ReactNode;
	onCheckClick: () => void;
	isSidebarSub?: boolean;
	isSubTab?: boolean;
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
	isSidebarSub,
	isSubTab = false,
}) => {
	const [isExpanded, setIsExpanded] = useState(true);
	const isActive = activeMainTab === tabName;
	const hasSubItems = subItems && subItems.length > 0;
	const { role } = useUser();
	// console.log('tabName', tabName);
	// console.log('activeMainTab', activeMainTab);
	// console.log('activeSubTab', activeSubTab);
	// console.log('subItems', subItems);
	const handleClick = () => {
		if (isSubTab) {
			let firstPart, lastPart;
			if (role === 'teacher') {
				console.log(1);
				const parts = tabName.split('/'); // ["", "teacher", "class", "add"]
				firstPart = `/${parts[1]}/${parts[2]}`; // "/teacher/class"
				lastPart = tabName.substring(tabName.lastIndexOf('/') + 1); // "add"
			} else {
				firstPart = tabName.split('/')[1]; // "studentProfileList"
				lastPart = tabName.substring(tabName.lastIndexOf('/') + 1); // "all"
			}

			// console.log('firstPart:', firstPart);
			// console.log('lastPart:', lastPart);
			setActiveMainTab(firstPart);
			setActiveSubTab(lastPart);
		} else {
			setActiveMainTab(tabName);
			if (hasSubItems) {
				setIsExpanded(!isExpanded);
				setActiveSubTab(subItems[0].name);
			} else {
				setActiveSubTab('');
			}
		}
		onCheckClick();
	};

	if (isSidebarSub) {
		return (
			<div>
				<li
					className={`relative flex cursor-pointer ${hasSubItems ? 'flex-col' : ''} items-center gap-3 rounded-lg ${
						// isActive ? 'text-second bg-[#e250502b]' : 'hover:text-orange hover:opacity-80'
						isActive ? 'text-primary' : 'hover:text-primary hover:opacity-80'
					} `}
				>
					{hasSubItems ? (
						<>
							<div
								onClick={handleClick}
								className={`relative flex w-full items-center gap-2 px-10 pt-4 text-sm`}
							>
								{Icon && <>{Icon}</>}
								<p
									className={`font-['Mulish'] text-lg font-extrabold tracking-tight ${isActive ? 'text-primary' : 'text-[#373839] opacity-70'}`}
								>
									{title}
								</p>

								{isActive && (
									<span className='absolute right-0 top-0 h-11 w-2 rounded-[11px] bg-primary'></span>
								)}
							</div>
							<div className=''>
								<ul className='flex flex-col space-y-2 rounded-lg'>
									{subItems.map((subItem) => (
										<li
											key={subItem.name}
											className={`cursor-pointer ${
												activeSubTab === subItem.name
													? 'text-primary'
													: 'text-gray-700 hover:text-primary'
											}`}
										>
											<Link
												to={`${tabName}/${subItem.name}`}
												onClick={() => {
													console.log('hehe');
													// console.log('tabName', tabName);
													// console.log('subItem', subItem.name);
													if (role === 'teacher') {
														localStorage.setItem('activeMainTab', tabName);
														localStorage.setItem('activeSubTab', subItem.name);
													}
													setActiveMainTab(tabName);
													setActiveSubTab(subItem.name);
												}}
												className='flex items-center gap-2 px-2 py-2 text-sm'
											>
												{subItem.icon}
												{!isIcon && subItem.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</>
					) : (
						<div>
							<Link
								to={`${tabName}`}
								onClick={handleClick}
								className={`flex w-full items-center gap-2 px-10 py-4 text-sm`}
							>
								<div className={`flex items-center gap-2 rounded-md`}>
									{Icon && <>{Icon}</>}
									<p
										className={`font-['Mulish'] text-lg font-extrabold tracking-tight ${isActive ? 'text-primary' : 'text-[#373839] opacity-70'}`}
									>
										{title}
									</p>
								</div>
								{isActive && (
									<span className='absolute right-0 top-0 h-11 w-2 rounded-[11px] bg-primary'></span>
								)}
							</Link>
						</div>
					)}
				</li>
			</div>
		);
	}
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
						className={`relative flex w-full items-center gap-2 p-3 text-sm`}
					>
						{Icon && <>{Icon}</>}
						{!isIcon && <span>{title}</span>}
					</div>
				) : (
					<Link
						to={`${tabName}`}
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
			{/* {isActive && isExpanded && hasSubItems && (
				<>
					{!isIcon ? (
						<ul className='ml-10 mt-2 space-y-2'>
							{subItems.map((subItem) => (
								<li
									key={subItem.name}
									className={`cursor-pointer ${
										activeSubTab === subItem.name
											? 'text-primary'
											: 'text-gray-700 hover:text-primary'
									}`}
								>
									<Link
										to={`${tabName}/${subItem.name}`}
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
						<div className='absolute left-[64%] top-[16.5%]'>
							<ul className='ml-10 mt-2 space-y-2 rounded-lg py-2 shadow-md'>
								{subItems.map((subItem) => (
									<li
										key={subItem.name}
										className={`cursor-pointer ${
											activeSubTab === subItem.name
												? 'text-primary'
												: 'text-gray-700 hover:text-primary'
										}`}
									>
										<Link
											to={`${tabName}/${subItem.name}`}
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
			)} */}
		</div>
	);
};

export default TabItem;
