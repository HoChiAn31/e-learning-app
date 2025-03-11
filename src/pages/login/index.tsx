import { Button, ConfigProvider, Input } from 'antd';
import { Password, UserCircle } from '../../components/icon';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const LoginPage = () => {
	const nav = useNavigate();
	const { role } = useUser();
	const [url, setUrl] = useState<string>('');
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
	useEffect(() => {
		if (role === 'teacher') {
			setUrl('/teacher/dashboard');
		} else {
			setUrl('/home');
		}
	}, [role]);
	const handleLogin = () => {
		if (role === 'teacher') {
			nav(url);
		} else {
			nav(url);
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
					/>
				</div>
				<div>
					<p className="font-['Mulish'] text-lg font-semibold tracking-tight text-[#373839]">
						Mật khẩu
					</p>
					<Input.Password
						name='password'
						placeholder='Nhập mật khẩu'
						// iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						prefix={<Password />}
						className={`h-[52px] w-[430px] ${form.password !== '' ? '' : 'bg-[#f2f2f2]'}`}
						onChange={handleChangeInput}
					/>
				</div>

				<div>
					<div className="font-['Source Sans Pro'] cursor-pointer text-right text-base font-normal leading-tight text-[#ff7506]">
						Quên mật khẩu?
					</div>
				</div>

				{/* <div className='inline-flex h-[52px] w-[400px] flex-col items-center justify-center gap-2.5 rounded-lg bg-gradient-to-l from-[#ff5400] to-[#f17f21] 2xl:w-[430px]'>
					<div className='inline-flex shrink grow basis-0 items-center justify-center gap-2.5 px-5 py-1.5'>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
							Đăng nhập
						</div>
					</div>
				</div> */}
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
					>
						Đăng nhập
					</Button>
				</ConfigProvider>
			</div>
		</div>
	);
};

export default LoginPage;
