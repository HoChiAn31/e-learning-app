import { UserCircle } from '../components/icon';

const Header = () => {
	return (
		<div className='mt-2 mr-6 flex justify-end'>
			<div className='relative flex h-10 items-center justify-start gap-2'>
				<div className='flex items-center gap-2'>
					<UserCircle color='#FF7506' />
					<div className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
						Admin
					</div>
					<div className='h-9 w-px bg-[#823b00]' />
				</div>
				<p className="font-['Source Sans Pro'] cursor-pointer text-base leading-tight font-normal text-[#ff7506]">
					Đăng xuất
				</p>
			</div>
		</div>
	);
};

export default Header;
