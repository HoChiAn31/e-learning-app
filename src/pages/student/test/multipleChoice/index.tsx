import React, { useState } from 'react';
import { Row, Col, Card, Radio, Button } from 'antd';
import BreadcrumbLink from '../../../../components/BreadcrumbLinkProps';
import { PaperClip } from '../../../../components/icon';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Timer from '../../../../components/Timer';

const StudentTestMultipleChoicePage: React.FC = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

	// Danh sách các câu hỏi
	const questions = [
		{
			content:
				'Câu 1: Câu nào dưới đây Liên hợp với cụm từ "thành phố" để bạn có thể thấy sự khác biệt rõ ràng nhất?',
			options: [
				{ value: 'A', label: 'A. Bận rộn' },
				{ value: 'B', label: ' Nhộn nhịp' },
				{ value: 'C', label: ' Lịch sử' },
				{ value: 'D', label: ' Đồi núi' },
			],
		},
		{
			content: 'Câu 2: Từ nào dưới đây không phải là đặc điểm của "rừng" ?',
			options: [
				{ value: 'A', label: 'A. Xanh mướt' },
				{ value: 'B', label: 'Tĩnh lặng' },
				{ value: 'C', label: ' Bê tông' },
				{ value: 'D', label: ' Mát mẻ' },
			],
		},
		{
			content: 'Câu 3: Cụm từ nào phù hợp với "biển" nhất?',
			options: [
				{ value: 'A', label: 'A. Ồn ào' },
				{ value: 'B', label: ' Dào dạt' },
				{ value: 'C', label: ' Cao ngất' },
				{ value: 'D', label: ' Hẹp dài' },
			],
		},
		// Thêm các câu hỏi khác nếu cần
	];

	// Tạo danh sách câu hỏi cho sidebar (từ Câu 1 đến Câu 16)
	const totalQuestions = Array.from({ length: 16 }, (_, index) => `Câu ${index + 1}`);

	// Dữ liệu mẫu từ ảnh
	const testInfo = {
		subject: 'Toán',
		class: '10A1',
		date: 'Thứ 5 - Ngày 10 Tháng 8, 2020',
		duration: '45 phút',
		paper: 'Đề A',
		attachment: 'DSTT_KT45P_12A1.doc',
	};

	// Xử lý chọn câu trả lời
	const handleAnswerChange = (e: any) => {
		setSelectedAnswers((prev) => ({
			...prev,
			[currentQuestionIndex]: e.target.value,
		}));
	};

	// Chuyển đến câu hỏi trước
	const goToPreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	// Chuyển đến câu hỏi tiếp theo
	const goToNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	// Chuyển đến câu hỏi khi nhấp vào sidebar
	const goToQuestion = (index: number) => {
		if (index < questions.length) {
			// Chỉ cho phép nhấp vào các câu hỏi có nội dung
			setCurrentQuestionIndex(index);
		}
	};

	// Lấy câu hỏi hiện tại
	const currentQuestion = questions[currentQuestionIndex];

	return (
		<div>
			<BreadcrumbLink
				to='/teacher/class/list'
				parentPage='Bài kiểm tra'
				currentPage='10A1'
				middleTitle='Làm bài'
			/>
			<div className='flex items-center justify-center p-4'>
				<Card className='w-full rounded-lg shadow-lg'>
					{/* Header */}
					<div className='flex items-center justify-between border-b pb-4'>
						<div className='flex w-2/3 items-center gap-10'>
							<div className='space-y-2 border-r pr-10'>
								<div className='flex items-center gap-2'>
									<p className="font-['Source Sans Pro'] w-20 text-base font-bold tracking-tight text-[#373839]">
										Môn học:
									</p>
									<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
										{testInfo.subject}
									</p>
								</div>
								<div className='flex items-center gap-2'>
									<p className="font-['Source Sans Pro'] w-20 text-base font-bold tracking-tight text-[#373839]">
										Lớp:
									</p>
									<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
										{testInfo.class}
									</p>
								</div>
							</div>
							<div className='space-y-2 border-r pr-10'>
								<div className='flex items-center gap-2'>
									<p className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Ngày kiểm tra:
									</p>
									<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
										{testInfo.date}
									</p>
								</div>
								<div className='flex items-center gap-2'>
									<p className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Thời lượng:
									</p>
									<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
										{testInfo.duration}
									</p>
								</div>
							</div>
							<div className='space-y-2'>
								<div className='flex items-center gap-2'>
									<p className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Đề bài:
									</p>
									<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
										{testInfo.paper}
									</p>
								</div>
								<div className='flex items-center gap-2'>
									<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
										Tệp đính kèm:
									</p>
									<div className='flex items-center rounded bg-[#efefef] px-4 py-2'>
										<div className='border-r border-[#c8c4c0] px-1'>
											<PaperClip />
										</div>
										<p className="font-['Source_Sans_Pro'] text-base font-normal leading-tight text-[#373839]">
											{testInfo.attachment}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div>
							<Timer duration={36} />
						</div>
					</div>

					{/* Main Content */}
					<div className='mb-6'>
						<h2 className='mb-4 text-xl font-semibold text-gray-800'>Phần trả lời</h2>
						<Row gutter={16}>
							{/* Sidebar */}
							<Col span={6}>
								<div className='p-4'>
									<h3 className='mb-4 text-lg font-semibold text-gray-800'>Phần câu hỏi:</h3>
									<div className='space-y-2'>
										{totalQuestions.map((questionLabel, index) => (
											<div
												key={index}
												onClick={() => goToQuestion(index)}
												className={`cursor-pointer rounded-md p-2 text-center ${
													currentQuestionIndex === index
														? 'bg-orange-500 text-white'
														: 'bg-gray-100 text-gray-800'
												} ${index >= questions.length ? 'cursor-not-allowed opacity-50' : ''}`}
											>
												{questionLabel}
											</div>
										))}
									</div>
								</div>
							</Col>

							{/* Nội dung câu hỏi */}
							<Col span={18}>
								<div className='p-4'>
									<p className='mb-4 text-lg'>{currentQuestion.content}</p>
									<Radio.Group
										onChange={handleAnswerChange}
										value={selectedAnswers[currentQuestionIndex]}
									>
										{currentQuestion.options.map((option) => (
											<Radio key={option.value} value={option.value} className='mb-2'>
												{option.label}
											</Radio>
										))}
									</Radio.Group>

									{/* Điều hướng câu hỏi */}
									<div className='mt-6 flex justify-between'>
										<Button
											icon={<LeftOutlined />}
											onClick={goToPreviousQuestion}
											disabled={currentQuestionIndex === 0}
											className='rounded-md px-4 py-2'
										>
											Câu trước
										</Button>
										<span className='text-lg font-semibold'>
											Câu {currentQuestionIndex + 1} / {questions.length}
										</span>
										<Button
											icon={<RightOutlined />}
											onClick={goToNextQuestion}
											disabled={currentQuestionIndex === questions.length - 1}
											className='rounded-md px-4 py-2'
										>
											Câu tiếp
										</Button>
									</div>
								</div>
							</Col>
						</Row>
					</div>

					{/* Footer */}
					<div className='text-center'>
						<Button
							className='mr-4 rounded-md bg-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-400'
							onClick={() => alert('Bài đã được lưu!')}
						>
							Lưu bài
						</Button>
						<Button
							type='primary'
							className='rounded-md bg-orange-500 px-6 py-2 text-white hover:bg-orange-600'
							onClick={() => alert('Đã nộp bài!')}
						>
							Nộp bài
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default StudentTestMultipleChoicePage;
