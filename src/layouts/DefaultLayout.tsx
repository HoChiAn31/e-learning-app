import { FC, useEffect } from 'react';
// import Header from './Header';
import { useLocation } from 'react-router-dom';

import SidebarAdmin from './SidebarAdmin';
import Header from './header';
import SideBarDataDeclaration from './SideBarDataDeclaration';
import { ConfigProvider } from 'antd';
import { useUser } from '../context/UserContext';
// import Footer from './Footer';
// import { Messenger, Phone } from '../components/icon';

interface DefaultLayoutProps {
	children: React.ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
	const location = useLocation();
	const { role } = useUser();
	const name = location.pathname;
	// console.log('name', name);
	// console.log('role', role);

	if (name === '/') {
		return <div className={`relative flex min-h-screen flex-col`}>{children}</div>;
	}
	if (role === 'teacher') {
		return (
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#FF7506',
					},
				}}
			>
				<div
					className={`relative flex min-h-screen`}
					style={{
						backgroundImage: "url('https://i.imgur.com/cycXAQ7.png')",
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						width: '100vw',
						height: '100vh',
					}}
				>
					<SidebarAdmin />
					<div className='ml-[112px] w-full'>
						<Header />
						<div className='px-16'>
							<div className='pt-5'>{children}</div>
						</div>
					</div>
				</div>
			</ConfigProvider>
		);
	}

	if (name.startsWith('/dataDeclaration')) {
		return (
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#F7506',
					},
				}}
			>
				<div className={`relative flex min-h-screen`}>
					<SidebarAdmin />
					<div className='ml-[112px] w-full'>
						<Header />
						<div className='px-16'>
							<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
								Khai báo dữ liệu
							</div>
							<div className='pt-5'>
								<SideBarDataDeclaration />
								<div className='pl-[278px]'>
									<div className='px-6'>{children}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ConfigProvider>
		);
	}
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: 'FF7506',
				},
			}}
		>
			<div
				className={`relative flex min-h-screen`}
				style={{
					backgroundImage: "url('https://i.imgur.com/cycXAQ7.png')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					width: '100vw',
					height: '100vh',
				}}
			>
				<SidebarAdmin />
				<div className='ml-[112px] w-full'>
					<Header />
					<div className='px-16'>{children}</div>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default DefaultLayout;
