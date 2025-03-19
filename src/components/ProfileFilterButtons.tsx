import { Button, ConfigProvider } from 'antd';

interface ProfileFilterButtonsProps {
	setIsActive: (value: string) => void;
	active: string;
}

const ProfileFilterButtons: React.FC<ProfileFilterButtonsProps> = ({ setIsActive, active }) => {
	const buttons = [
		{ key: 'all', label: 'Tất cả hồ sơ' },
		{ key: 'reward', label: 'Khen thưởng' },
		{ key: 'discipline', label: 'Kỷ luật' },
	];

	return (
		<div className='flex items-center gap-2'>
			{buttons.map(({ key, label }) =>
				active === key ? (
					<ConfigProvider
						key={key}
						theme={{
							token: {
								colorPrimary: '#000000',
							},
						}}
					>
						<Button
							type='primary'
							size='middle'
							onClick={() => setIsActive(key)}
							className='bg-black'
						>
							<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-white">
								{label}
							</div>
						</Button>
					</ConfigProvider>
				) : (
					<Button
						key={key}
						size='middle'
						onClick={() => setIsActive(key)}
						className='border border-black'
					>
						<div className="font-['Mulish'] text-lg font-extrabold tracking-tight text-black">
							{label}
						</div>
					</Button>
				),
			)}
		</div>
	);
};

export default ProfileFilterButtons;
