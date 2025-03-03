export interface DataType {
	key: string;
	courseCode: string; // Mã lớp
	courseName: string; // Môn học
	time: string; // Thời lượng (có thể cập nhật định dạng)
	instructor: string; // Giảng viên
	status: boolean; // Trạng thái (true: Bắt đầu, false: Chưa)
	topic: string; // Chủ đề
	startDate: string; // Ngày bắt đầu
	endDate: string; // Ngày kết thúc
	meetingLink: string; // Liên kết hội thảo
	autoStart: boolean; // Tự động hóa buổi học
	notification: boolean; // Bật thông báo buổi học
	allowEarlyAccess: boolean; // Cho phép xem/vào phòng trước giờ buổi học
}
