import { Button as AntButton, ConfigProvider, ButtonProps as AntButtonProps } from 'antd';
import { FC } from 'react';

interface ButtonProps extends AntButtonProps {
	children: React.ReactNode;
	variant?: 'link' | 'text' | 'outlined' | 'dashed' | 'solid' | 'filled' | undefined;
	typecus?: 'outline' | undefined;
}

const Button: FC<ButtonProps> = ({ variant, typecus, children, ...props }) => {
	if (typecus === 'outline') {
		return (
			<ConfigProvider
				theme={{
					token: {
						colorPrimaryHover: '#c75d1596', // Đổi màu hover của tất cả button
					},
					components: {
						Button: {
							defaultHoverColor: '#c75d1596',
						},
					},
				}}
			>
				<AntButton
					variant={variant}
					{...props}
					className='text-primary border-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
				>
					{children}
				</AntButton>
			</ConfigProvider>
		);
	}
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimaryHover: '#ff5400',
					colorPrimary: '#ff5400',
				},
				components: {
					Button: {
						defaultHoverBg: '#c75d1596',
						defaultHoverColor: '#ffffff',
					},
				},
			}}
		>
			<AntButton
				variant={variant}
				{...props}
				className='bg-primary border-transparent text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
			>
				{children}
			</AntButton>
		</ConfigProvider>
	);
};

export default Button;
