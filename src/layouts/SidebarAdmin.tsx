'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabItem from '../components/TabItem';
import { Bag, BookOpen, BookOpens, ChartLine, Eye, Eyes, Setting, User } from '../components/icon';
import { Image } from 'antd';
const SidebarAdmin: FC = () => {
	const [activeMainTab, setActiveMainTab] = useState<string>('');
	const [activeSubTab, setActiveSubTab] = useState<string>('');
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const nav = useNavigate();
	const divWidth = useRef<HTMLDivElement>(null);
	const location = useLocation();
	const name = location.pathname;
	const [isHovered, setIsHovered] = useState(false);
	useEffect(() => {
		if (name) {
			setActiveMainTab(name);
		}
	}, []);
	console.log(activeMainTab);
	useEffect(() => {
		const storedMainTab = localStorage.getItem('activeMainTab');
		const storedSubTab = localStorage.getItem('activeSubTab');
		if (storedMainTab) {
			setActiveMainTab(storedMainTab);
			if (storedSubTab) {
				setActiveSubTab(storedSubTab);
				nav(`${storedMainTab}/${storedSubTab}`);
			} else {
				nav(`${storedMainTab}`);
			}
		}
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem('activeMainTab', activeMainTab);
			localStorage.setItem('activeSubTab', activeSubTab);
		}
	}, [activeMainTab, activeSubTab, isLoaded]);
	console.log('activeMainTab:', activeMainTab);
	console.log('activeSubTab:', activeSubTab);
	useEffect(() => {
		if (isLoaded) {
			const timeoutId = setTimeout(() => {
				localStorage.setItem('activeMainTab', activeMainTab);
				localStorage.setItem('activeSubTab', activeSubTab);
			});

			return () => clearTimeout(timeoutId);
		}
	}, [activeMainTab, activeSubTab, isLoaded]);

	return (
		<div
			ref={divWidth}
			className={`fixed bottom-0 left-0 top-0 z-[999999] min-h-screen w-[112px] bg-primary shadow`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className=''>
				<div className='my-10 flex items-center justify-center 2xl:my-14'>
					<img width={74} src='https://i.imgur.com/srQH9kX.png' />
				</div>

				<ul className='space-y-2 py-3'>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='/home'
						title={'Tổng quan'}
						icon={<Eye />}
						isIcon
						onCheckClick={() => setIsHovered(false)}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='/dataDeclaration'
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
						tabName='/studentProfileList/all'
						title='Hồ sơ học viên'
						isIcon
						icon={<User color='#ffffff' />}
						onCheckClick={() => setIsHovered(false)}
						// isSubTab
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='/teacherProfileLists'
						title='Hồ sơ giảng viên'
						isIcon
						icon={<Bag color='white' />}
						onCheckClick={() => setIsHovered(false)}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='/exam'
						title='Thi cử'
						isIcon
						icon={<img src='https://i.imgur.com/ZABUPOo.png' />}
						onCheckClick={() => setIsHovered(false)}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='/setting'
						title={'Cài đặt hệ thống'}
						isIcon
						icon={<Setting color='#ffffff' />}
						onCheckClick={() => setIsHovered(false)}
					/>
				</ul>
			</div>
			{isHovered && (
				<div className='absolute -right-[286px] top-0 flex min-h-screen w-[286px] bg-white py-[19vh] shadow 2xl:py-[18vh]'>
					<div className='flex w-full flex-col'>
						<TabItem
							activeMainTab={activeMainTab}
							setActiveMainTab={setActiveMainTab}
							activeSubTab={activeSubTab}
							setActiveSubTab={setActiveSubTab}
							tabName='/home'
							title={'Tổng quan'}
							icon={
								<Eyes
									height={24}
									width={24}
									color={`${name === '/home' ? '#ff7506' : '#373839'}`}
								/>
							}
							isIcon
							onCheckClick={() => setIsHovered(false)}
							isSidebarSub
						/>
						<TabItem
							activeMainTab={activeMainTab}
							setActiveMainTab={setActiveMainTab}
							activeSubTab={activeSubTab}
							setActiveSubTab={setActiveSubTab}
							tabName='/dataDeclaration'
							title={'Khai báo dữ liệu'}
							icon={
								<ChartLine
									height={24}
									width={24}
									color={`${name === '/dataDeclaration' ? '#ff7506' : '#373839'}`}
								/>
							}
							isIcon
							onCheckClick={() => setIsHovered(false)}
							isSidebarSub
						/>

						<TabItem
							activeMainTab={activeMainTab}
							setActiveMainTab={setActiveMainTab}
							activeSubTab={activeSubTab}
							setActiveSubTab={setActiveSubTab}
							tabName='/studentProfileList'
							title='Hồ sơ học viên'
							icon={
								<User
									height={24}
									width={24}
									color={`${activeMainTab === '/studentProfileList' ? '#ff7506' : '#373839'}`}
								/>
							}
							onCheckClick={() => setIsHovered(false)}
							isSidebarSub
							subItems={[
								{
									name: 'all',
									label: 'Tất cả hồ sơ', // Use translation for chat
									// icon: <Eye />,
								},
								{
									name: 'tickets',
									label: 'Tiếp nhận chuyển trường', // Use translation for support requests
									// icon: <Eye />,
								},
								{
									name: 'tickets',
									label: 'Bảo lưu', // Use translation for support requests
									// icon: <Eye />,
								},
							]}
						/>

						<TabItem
							activeMainTab={activeMainTab}
							setActiveMainTab={setActiveMainTab}
							activeSubTab={activeSubTab}
							setActiveSubTab={setActiveSubTab}
							tabName='/teacherProfileLists'
							title='Hồ sơ giảng viên'
							icon={
								<Bag
									height={24}
									width={24}
									color={`${activeMainTab === '/teacherProfileList' ? '#ff7506' : '#373839'}`}
								/>
							}
							onCheckClick={() => setIsHovered(false)}
							isSidebarSub
							subItems={[
								{
									name: 'alls',
									label: 'Tất cả hồ sơ', // Use translation for chat
									// icon: <Eye />,
								},
								{
									name: 'tickets',
									label: 'Phân công giảng dạy', // Use translation for support requests
									// icon: <Eye />,
								},
							]}
						/>
						<TabItem
							activeMainTab={activeMainTab}
							setActiveMainTab={setActiveMainTab}
							activeSubTab={activeSubTab}
							setActiveSubTab={setActiveSubTab}
							tabName='/exam'
							title={'Thi cử'}
							icon={<BookOpens color={`${name === '/exam' ? '#ff7506' : '#373839'}`} />}
							isIcon
							onCheckClick={() => setIsHovered(false)}
							isSidebarSub
						/>
						<TabItem
							activeMainTab={activeMainTab}
							setActiveMainTab={setActiveMainTab}
							activeSubTab={activeSubTab}
							setActiveSubTab={setActiveSubTab}
							tabName='/setting'
							title={'Cài đặt hệ thống'}
							icon={
								<Setting
									height={24}
									width={24}
									color={`${name === '/setting' ? '#ff7506' : '#373839'}`}
								/>
							}
							isIcon
							onCheckClick={() => setIsHovered(false)}
							isSidebarSub
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default SidebarAdmin;
