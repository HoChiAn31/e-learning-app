import React, { useState } from 'react';
import { Row, Col, Card, Progress } from 'antd';
import Instructions from '../../../../components/Instructions';
import Editor from '../../../../components/Editor';
import BreadcrumbLink from '../../../../components/BreadcrumbLinkProps';
import { PaperClip } from '../../../../components/icon';
import Timer from '../../../../components/Timer';

const StudentTestEssayPage: React.FC = () => {
	const [editorContent, setEditorContent] = useState('');

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
					<div className='flex items-center justify-between border-b'>
						<div className='mb-6 flex w-2/3 items-center gap-10 pb-4'>
							<div className='space-y-2 border-r pr-10'>
								<div className='flex items-center gap-2'>
									<p className="font-['Source Sans Pro'] w-20 text-base font-bold tracking-tight text-[#373839]">
										Môn học:
									</p>
									<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
										Toán
									</p>
								</div>
								<div className='flex items-center gap-2'>
									<p className="font-['Source Sans Pro'] w-20 text-base font-bold tracking-tight text-[#373839]">
										Lớp:
									</p>
									<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
										10A1
									</p>
								</div>
							</div>
							<div className='space-y-2 border-r pr-10'>
								<div className='flex items-center gap-2'>
									<p className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Ngày kiểm tra:
									</p>
									<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
										Thứ 5 - Ngày 10 Tháng 8, 2020
									</p>
								</div>
								<div className='flex items-center gap-2'>
									<p className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Thời lượng:
									</p>
									<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
										45 phút
									</p>
								</div>
							</div>
							<div className='space-y-2'>
								<div className='flex items-center'>
									<p className="font-['Source Sans Pro'] w-32 text-base font-bold tracking-tight text-[#373839]">
										Đề bài:
									</p>
									<p className="font-['Source Sans Pro'] text-base font-normal leading-tight text-[#373839]">
										Đề A
									</p>
								</div>
								<div className='flex items-center'>
									<p className="font-['Source Sans Pro'] text-base font-bold tracking-tight text-[#373839]">
										Tệp đính kèm:
									</p>
									<div className='flex items-center rounded bg-[#efefef] px-4 py-2'>
										<div className='border-r border-[#c8c4c0] px-1'>
											<PaperClip />
										</div>

										<div className="w-[156px] justify-start text-right font-['Source_Sans_Pro'] text-base font-normal leading-tight text-[#373839]">
											DSTT_KT45P_12A1.doc
										</div>
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
						<h2 className='mb-4 text-xl font-semibold text-gray-800'>Phần trả lời của học sinh</h2>
						<Row gutter={16}>
							<Col span={8}>
								<Instructions />
							</Col>
							<Col span={16}>
								<Editor value={editorContent} onChange={setEditorContent} />
							</Col>
						</Row>
					</div>

					{/* Footer */}
					<div className='text-center'>
						<button className='rounded-md bg-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-400'>
							Lưu bài
						</button>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default StudentTestEssayPage;
