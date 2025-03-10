import { FC, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabItem from '../components/TabItem';
import {
	Bag,
	BookOpen,
	BookOpens,
	Calendar,
	ChartLine,
	Edit,
	Edits,
	Eye,
	Eyes,
	Setting,
	User,
} from '../components/icon';
import { useUser } from '../context/UserContext';

const SidebarAdmin: FC = () => {
	const { role } = useUser();
	const [activeMainTab, setActiveMainTab] = useState<string>('');
	const [activeSubTab, setActiveSubTab] = useState<string>('');
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const nav = useNavigate();
	const divWidth = useRef<HTMLDivElement>(null);
	const location = useLocation();
	const name = location.pathname;
	const [isHovered, setIsHovered] = useState(false);

	// Thiết lập activeMainTab mặc định dựa trên role
	useEffect(() => {
		if (!isLoaded) {
			// Khi component mount lần đầu
			if (role === 'teacher') {
				setActiveMainTab(name);
				nav(name);
			} else if (name) {
				setActiveMainTab(name);
			}
			setIsLoaded(true);
		}
	}, [role, name, nav, isLoaded]);

	// Load từ localStorage
	useEffect(() => {
		console.log(1_34);

		if (role !== 'teacher' && !activeMainTab.startsWith('/teacher/class')) {
			const storedMainTab = localStorage.getItem('activeMainTab');
			const storedSubTab = localStorage.getItem('activeSubTab');

			if (storedMainTab) {
				// Nếu là teacher thì ưu tiên /teacher, nếu không thì dùng stored value
				if (role === 'teacher' && !storedMainTab.startsWith(name)) {
					setActiveMainTab(name);
					nav(name);
				} else {
					setActiveMainTab(storedMainTab);
					if (storedSubTab) {
						setActiveSubTab(storedSubTab);
						nav(`${storedMainTab}/${storedSubTab}`);
					} else {
						nav(storedMainTab);
					}
				}
			}
		}
		setIsLoaded(true);
	}, [nav, role]);

	// Lưu vào localStorage khi active tab thay đổi
	useEffect(() => {
		console.log(1);
		if (role !== 'teacher' && !activeMainTab.startsWith('/teacher/class')) {
			if (isLoaded) {
				localStorage.setItem('activeMainTab', activeMainTab);
				localStorage.setItem('activeSubTab', activeSubTab);
			}
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
					{role === 'teacher' && (
						<>
							<TabItem
								activeMainTab={activeMainTab}
								setActiveMainTab={setActiveMainTab}
								activeSubTab={activeSubTab}
								setActiveSubTab={setActiveSubTab}
								tabName={'/teacher/dashboard'}
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
								tabName='/teacher/class/list'
								title={'Quản lý lớp học'}
								icon={<BookOpens color='white' />}
								isIcon
								onCheckClick={() => setIsHovered(false)}
							/>
							<TabItem
								activeMainTab={activeMainTab}
								setActiveMainTab={setActiveMainTab}
								activeSubTab={activeSubTab}
								setActiveSubTab={setActiveSubTab}
								tabName='/teacher/listTest/all'
								title={'Bài kiểm tra'}
								icon={<Edits color='white' />}
								isIcon
								onCheckClick={() => setIsHovered(false)}
							/>
							<TabItem
								activeMainTab={activeMainTab}
								setActiveMainTab={setActiveMainTab}
								activeSubTab={activeSubTab}
								setActiveSubTab={setActiveSubTab}
								tabName='/teacher/examSchedule'
								title={'Lịch thi'}
								icon={<Calendar color='#ffffff' />}
								isIcon
								onCheckClick={() => setIsHovered(false)}
							/>
						</>
					)}

					{role !== 'teacher' && (
						<>
							<TabItem
								activeMainTab={activeMainTab}
								setActiveMainTab={setActiveMainTab}
								activeSubTab={activeSubTab}
								setActiveSubTab={setActiveSubTab}
								tabName={'/home'}
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
							/>
							<TabItem
								activeMainTab={activeMainTab}
								setActiveMainTab={setActiveMainTab}
								activeSubTab={activeSubTab}
								setActiveSubTab={setActiveSubTab}
								tabName='/instructorProfileList/all'
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
								tabName='/systemSettings'
								title={'Cài đặt hệ thống'}
								isIcon
								icon={<Setting color='#ffffff' />}
								onCheckClick={() => setIsHovered(false)}
							/>
						</>
					)}
				</ul>
			</div>
			{isHovered && (
				<div
					className={`absolute -right-[286px] top-0 flex min-h-screen w-[286px] bg-white py-[19vh] shadow 2xl:py-[18vh]`}
				>
					<div className='flex w-full flex-col'>
						{role === 'teacher' && (
							<>
								<TabItem
									activeMainTab={activeMainTab}
									setActiveMainTab={setActiveMainTab}
									activeSubTab={activeSubTab}
									setActiveSubTab={setActiveSubTab}
									tabName={'/teacher/dashboard'}
									title={'Tổng quan'}
									icon={
										<Eyes
											height={24}
											width={24}
											color={`${name === '/teacher/dashboard' ? '#ff7506' : '#373839'}`}
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
									tabName={'/teacher/class'}
									title={'Quản lý lớp học'}
									icon={
										<BookOpens
											// height={24}
											// width={24}
											color={`${name === '/teacher/class' ? '#ff7506' : '#373839'}`}
										/>
									}
									subItems={[
										{ name: 'list', label: 'Danh sách lớp học' },
										{ name: 'add', label: 'Thêm buổi học mới' },
										{ name: 'meeting', label: 'Tham gia vào lớp học' },
									]}
									onCheckClick={() => setIsHovered(false)}
									isSidebarSub
								/>
								<TabItem
									activeMainTab={activeMainTab}
									setActiveMainTab={setActiveMainTab}
									activeSubTab={activeSubTab}
									setActiveSubTab={setActiveSubTab}
									tabName={'/teacher/listTest'}
									title={'Bài kiểm tra'}
									icon={<Edits color={`${name === '/teacher/listTest' ? '#ff7506' : '#373839'}`} />}
									isIcon
									onCheckClick={() => setIsHovered(false)}
									isSidebarSub
									subItems={[
										{ name: 'all', label: 'Danh sách bài kiểm tra' },
										{ name: 'add', label: 'Thêm bài kiểm tra mới' },
										{ name: 'meeting', label: 'Nhập điểm' },
										{ name: 'meeting', label: 'Bảng điểm' },
									]}
								/>
							</>
						)}

						{role !== 'teacher' && (
							<>
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
										{ name: 'all', label: 'Tất cả hồ sơ' },
										{ name: 'transfer', label: 'Tiếp nhận chuyển trường' },
										{ name: 'reserve', label: 'Bảo lưu' },
									]}
								/>

								<TabItem
									activeMainTab={activeMainTab}
									setActiveMainTab={setActiveMainTab}
									activeSubTab={activeSubTab}
									setActiveSubTab={setActiveSubTab}
									tabName='/instructorProfileList'
									title='Hồ sơ giảng viên'
									icon={
										<Bag
											height={24}
											width={24}
											color={`${activeMainTab === '/instructorProfileList' ? '#ff7506' : '#373839'}`}
										/>
									}
									onCheckClick={() => setIsHovered(false)}
									isSidebarSub
									subItems={[
										{ name: 'all', label: 'Tất cả hồ sơ' },
										{ name: 'assignment', label: 'Phân công giảng dạy' },
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
									tabName='/systemSettings'
									title={'Cài đặt hệ thống'}
									icon={
										<Setting
											height={24}
											width={24}
											color={`${name === '/systemSettings' ? '#ff7506' : '#373839'}`}
										/>
									}
									isIcon
									onCheckClick={() => setIsHovered(false)}
									isSidebarSub
								/>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SidebarAdmin;
