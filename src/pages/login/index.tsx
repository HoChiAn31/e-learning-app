import { Button, ConfigProvider, Input, message } from 'antd';
import { Password, UserCircle } from '../../components/icon';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { fetchUsers } from '../../firebase/fetchUser';
import { User } from '../../types';

const LoginPage = () => {
	const nav = useNavigate();
	const { setRole, setUser } = useUser();

	const [form, setForm] = useState({
		username: '',
		password: '',
	});

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && form.username && form.password) {
			handleLogin();
		}
	};
	const handleLogin = async () => {
		try {
			const users = await fetchUsers();
			const user = users.find(
				(u: User) => u.username === form.username && u.password === form.password,
			);
			console.log(user);
			if (user) {
				setRole(user.role);
				localStorage.setItem('userToken', JSON.stringify(user));
				setUser(user);

				if (user.role === 'teacher') {
					nav('/teacher/dashboard');
				} else if (user.role === 'student') {
					nav('/student/dashboard');
				} else {
					nav('/home');
				}
			} else {
				message.error('Sai tên tài khoản hoặc mật khẩu');
			}
		} catch (error) {
			console.error(error);
			message.error('Đã xảy ra lỗi, vui lòng thử lại!');
		}
	};

	return (
		<div
			style={{
				backgroundImage: 'url("https://i.imgur.com/5Xmc4g0.jpeg")',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
			className='relative flex h-[100vh] w-full items-center justify-end'
		>
			<div className='absolute right-16 top-6'>
				<img src='https://i.imgur.com/cpna06J.png' alt='' />
			</div>

			<div className='-mt-[8%] mr-[14%] max-w-[400px] space-y-4 2xl:mr-[16%] 2xl:max-w-[430px]'>
				<div className="mb-12 text-center font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
					Đăng nhập
				</div>
				<div>
					<p className="font-['Mulish'] text-lg font-semibold tracking-tight text-[#373839]">
						Tên đăng nhập
					</p>
					<Input
						name='username'
						size='large'
						placeholder='Nhập tên'
						prefix={<UserCircle />}
						className={`h-[52px] w-[430px] ${form.username !== '' ? '' : 'bg-[#f2f2f2]'}`}
						onChange={handleChangeInput}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div>
					<p className="font-['Mulish'] text-lg font-semibold tracking-tight text-[#373839]">
						Mật khẩu
					</p>
					<Input.Password
						name='password'
						placeholder='Nhập mật khẩu'
						prefix={<Password />}
						className={`h-[52px] w-[430px] ${form.password !== '' ? '' : 'bg-[#f2f2f2]'}`}
						onChange={handleChangeInput}
						onKeyDown={handleKeyDown}
					/>
				</div>

				<div>
					<div className="font-['Source Sans Pro'] cursor-pointer text-right text-base font-normal leading-tight text-[#ff7506]">
						Quên mật khẩu?
					</div>
				</div>

				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#ff5400',
							borderRadius: 8,
						},
					}}
				>
					<Button
						type='primary'
						size='large'
						className="h-[52px] w-[430px] rounded-lg bg-gradient-to-l from-[#ff5400] to-[#f17f21] font-['Mulish'] text-lg font-extrabold tracking-tight text-white"
						onClick={handleLogin}
						disabled={!form.username || !form.password}
					>
						Đăng nhập
					</Button>
				</ConfigProvider>
			</div>
		</div>
	);
};

export default LoginPage;
