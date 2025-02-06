import { FC } from 'react';
// import Header from './Header';
import { useLocation } from 'react-router-dom';

import SidebarAdmin from './SidebarAdmin';
import Header from './header';
// import Footer from './Footer';
// import { Messenger, Phone } from '../components/icon';

interface DefaultLayoutProps {
	children: React.ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
	const location = useLocation();

	const name = location.pathname;

	if (name === '/') {
		return <div className={`relative flex min-h-screen flex-col`}>{children}</div>;
	}
	return (
		<div className={`relative flex min-h-screen`}>
			{/* <Header />
			<main className={`flex-grow ${name === '/menu' ? 'pt-[120px]' : ''}`}>{children}</main>
			<Footer />
			<div className='fixed bottom-4 right-2 z-50 flex flex-col gap-2'>
				<div className='cursor-pointer'>
					<Phone />
				</div>
				<div className='cursor-pointer'>
					<Messenger />
				</div>
			</div> */}

			<SidebarAdmin />
			<div className='w-full'>
				<Header />
				{children}
			</div>
		</div>
	);
};

export default DefaultLayout;
