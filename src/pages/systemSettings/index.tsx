import { CardItem } from '../../components/CardItem';
const cardItems = [
	{
		title: 'Cấu hình',
		description: 'Theme, các thông tin khác về cấu hình',
		to: '/systemSettings/config',
	},
	{
		title: 'Thông tin trường',
		description: 'Thông tin chung của trường, các cơ sở',
		to: '/systemSettings/inforSchool',
	},
	{
		title: 'Người dùng hệ thống',
		description: 'Phần nhóm người dùng, quản lý thông tin người dùng và phân quyền sử dụng',
		to: '/systemSettings/users',
	},
	{
		title: 'Thiết lập lớp học',
		description: 'Loại lớp cơ bản, nâng cao',
		to: '/systemSettings/class',
	},
	{
		title: 'Thiết lập môn học',
		description: 'Thông tin các hệ đào tạo của trường',
		to: '/systemSettings/subject',
	},
	{
		title: 'Quản lý trình độ đào tạo',
		description: 'Thông tin các hệ đào tạo của trường',
		to: '/systemSettings/tranning',
	},
];
function SystemSettingsPage() {
	return (
		<div>
			<div className="font-['Mulish'] text-5xl font-extrabold tracking-wide text-[#373839]">
				Cài đặt hệ thống
			</div>
			<div className='grid grid-cols-3'>
				{cardItems.map((item, index) => (
					<CardItem key={index} {...item} bgType={index > 2 ? 'blue' : undefined} />
				))}
			</div>
		</div>
	);
}

export default SystemSettingsPage;
