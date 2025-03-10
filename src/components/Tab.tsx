type TabProps = {
	active: boolean;
	label: string;
	onClick: () => void;
};
export const Tab: React.FC<TabProps> = ({ active, label, onClick }) => {
	return (
		<div
			className={`inline-flex h-[72px] w-[207px] cursor-pointer items-center justify-center overflow-hidden rounded-tl-lg rounded-tr-lg pb-[29px] pl-4 pr-[17px] pt-5 shadow-[-1px_5px_18px_-4px_rgba(0,0,0,0.25)] ${active ? 'bg-gradient-to-l from-[#ff5400] to-[#f17f21] text-[#f2f2f2]' : 'border border-[#ff5400] text-[#373839]'}`}
			onClick={onClick}
		>
			<div className="w-[174px] text-center font-['Mulish'] text-lg font-extrabold tracking-tight">
				{label}
			</div>
		</div>
	);
};
