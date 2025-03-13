import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
	value: string;
	onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
	const modules = {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'],
			['blockquote', 'code-block'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image'],
			['clean'],
		],
	};

	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'code-block',
		'list',
		'bullet',
		'link',
		'image',
	];

	return (
		<div className='flex-2 overflow-hidden rounded-lg border border-gray-300'>
			<ReactQuill
				value={value}
				onChange={onChange}
				modules={modules}
				formats={formats}
				placeholder='Học viên nhập câu trả lời ở đây...'
				className='h-72'
			/>
		</div>
	);
};

export default Editor;
