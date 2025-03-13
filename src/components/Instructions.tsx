import React from 'react';

const Instructions: React.FC = () => {
	return (
		<div className='flex-1 rounded-lg bg-blue-50 p-6'>
			<h3 className='mb-4 text-lg font-semibold text-gray-800'>Tệp định kèm kiểm tra học sinh:</h3>
			<p className='mb-4 text-sm leading-relaxed text-gray-600'>
				- Quý định nộp bài: <br />
				Mỗi học viên chỉ được nộp 1 bài 1 word/docx, không chấp nhận các định dạng khác như JPG,
				JPEG, PNG, định dạng khác không được tính điểm. File nộp phải được đặt tên đúng chuẩn. Khi
				nộp bài nếu sai định dạng hoặc sai tên bài, hệ thống sẽ không chấp nhận.
			</p>
			<p className='mb-4 text-sm leading-relaxed text-gray-600'>
				- Học viên có thể tải lại bài nộp lại. Khi nộp lại bài, bài nộp trước đó sẽ bị hủy bỏ. Học
				viên lưu ý, kết quả bài nộp được tính theo bài nộp cuối cùng.
			</p>
			<button className='rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600'>
				Chèn File
			</button>
		</div>
	);
};

export default Instructions;
