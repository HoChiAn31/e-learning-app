import { useNavigate } from 'react-router-dom';
import { UserCircle } from '../components/icon';
import { useUser } from '../context/UserContext';

const Header = () => {
	const nav = useNavigate();
	const { user } = useUser();
	const handleLogout = () => {
		localStorage.removeItem('activeMainTab');
		localStorage.removeItem('activeSubTab');
		localStorage.removeItem('userToken');

		nav('/');
	};
	return (
		<div className='mr-6 mt-2 flex justify-end'>
			<div className='relative flex h-10 items-center justify-start gap-2'>
				<div className='flex items-center gap-2'>
					<UserCircle color='#FF7506' />
					<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
						{user?.username}
					</div>
					<div className='h-9 w-px bg-[#823b00]' />
				</div>
				<div>
					<p
						className="font-['Source Sans Pro'] cursor-pointer text-base font-normal leading-tight text-[#ff7506]"
						onClick={handleLogout}
					>
						Đăng xuất
					</p>
				</div>
			</div>
		</div>
	);
};

export default Header;
