'use client';
// import { Image } from '@nextui-org/react';
// import {
// 	ChartBarStacked,
// 	CirclePercent,
// 	Clapperboard,
// 	House,
// 	MessageCircleMore,
// 	NotebookTabs,
// 	NotepadText,
// 	Phone,
// 	Popcorn,
// 	Store,
// 	UserRound,
// } from 'lucide-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabItem from '../components/TabItem';
import { Bag, BookOpen, ChartLine, Eye, Setting, User } from '../components/icon';
import { Image } from 'antd';
// import { useRouter } from 'next/navigation';
// import { useLocale } from 'next-intl';
// import { useTranslations } from 'next-intl';
// import TabItem from '../components/TabItem';
// import { useTheme } from '../context/ThemeContext';
const SidebarAdmin: FC = () => {
	const [activeMainTab, setActiveMainTab] = useState<string>('');
	const [activeSubTab, setActiveSubTab] = useState<string>('');
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	// const { isCollapsedAdmin, isDarkMode } = useTheme();
	const nav = useNavigate();
	const divWidth = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	const storedMainTab = localStorage.getItem('activeMainTab');
	// 	const storedSubTab = localStorage.getItem('activeSubTab');
	// 	if (storedMainTab) {
	// 		setActiveMainTab(storedMainTab);
	// 		if (storedSubTab) {
	// 			setActiveSubTab(storedSubTab);
	// 			nav(`/admin/${storedMainTab}/${storedSubTab}`);
	// 		} else {
	// 			nav(`/admin/${storedMainTab}`);
	// 		}
	// 	}
	// 	setIsLoaded(true);
	// }, []);

	// useEffect(() => {
	// 	if (isLoaded) {
	// 		localStorage.setItem('activeMainTab', activeMainTab);
	// 		localStorage.setItem('activeSubTab', activeSubTab);
	// 	}
	// }, [activeMainTab, activeSubTab, isLoaded]);

	// useEffect(() => {
	// 	if (isLoaded) {
	// 		// Use a timeout to ensure the states are fully updated before storing in localStorage
	// 		const timeoutId = setTimeout(() => {
	// 			localStorage.setItem('activeMainTab', activeMainTab);
	// 			localStorage.setItem('activeSubTab', activeSubTab);
	// 		}); // You can adjust the delay if needed

	// 		return () => clearTimeout(timeoutId); // Clean up the timeout
	// 	}
	// }, [activeMainTab, activeSubTab, isLoaded]);

	// if (!isLoaded) {
	// 	return null;
	// }
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div
			ref={divWidth}
			className={`fixed bottom-0 left-0 top-0 min-h-screen w-[112px] bg-primary shadow`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			// className={`fixed top-0 bottom-0 left-0 min-h-screen shadow transition-all duration-500`}
		>
			<div className=''>
				<div className='my-14 flex items-center justify-center'>
					{/* <Image src='/images/logo1.png' width={80} height={60} alt='Logo' /> */}
					<img width={74} src='https://i.imgur.com/srQH9kX.png' />
				</div>

				<ul className='space-y-2 py-3'>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='home'
						title={'Tổng quan'}
						icon={<Eye color='#ffffff' />}
						isIcon
						onCheckClick={() => setIsHovered(false)}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='dataDeclaration'
						title={'Khai báo dữ liệu'}
						icon={<ChartLine color='white' />}
						isIcon
						onCheckClick={() => setIsHovered(false)}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-order'
						title='Hồ sơ học viên'
						isIcon
						icon={<User color='#ffffff' />}
						onCheckClick={() => setIsHovered(false)}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-order'
						title='Hồ sơ học viên'
						isIcon
						icon={<Bag color='white' />}
						onCheckClick={() => setIsHovered(false)}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-order'
						title='Hồ sơ học viên'
						isIcon
						icon={<img src='https://i.imgur.com/ZABUPOo.png' />}
						onCheckClick={() => setIsHovered(false)}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-order'
						title='Hồ sơ học viên'
						isIcon
						icon={<Setting color='#ffffff' />}
						onCheckClick={() => setIsHovered(false)}
					/>
				</ul>
			</div>
			{isHovered && (
				<div className='absolute -right-[100%] top-0 z-50 flex min-h-screen bg-white shadow'>
					<div>
						<div>hehehe</div>
						<TabItem
							activeMainTab={activeMainTab}
							setActiveMainTab={setActiveMainTab}
							activeSubTab={activeSubTab}
							setActiveSubTab={setActiveSubTab}
							tabName='admin-order'
							title='Hồ sơ học viên'
							icon={<ChartLine color='#ffffff' />}
							onCheckClick={() => setIsHovered(false)}
							subItems={[
								{
									name: 'chat',
									label: 'Tất cả hồ sơ', // Use translation for chat
									icon: <Eye />,
								},
								{
									name: 'tickets',
									label: 'Tiếp nhận chuyển trường', // Use translation for support requests
									icon: <Eye />,
								},
							]}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default SidebarAdmin;
