export type CommentType = {
	comment_ID: string;
	comment_post_ID: string;
	comment_author: string;
	comment_content: string;
};

export type PhotoType = {
	id: number;
	author: string;
	title: string;
	date: string;
	src: string;
	peso: string;
	idade: number;
	acessos: string;
};

export type PhotoPostType = {
	photo: PhotoType;
	comments: CommentType[];
};

export type PhotoStats = {
	id: number;
	title: string;
	acessos: string;
};

export type CommentPostType = {
	id: string;
	comment: string;
};

export type PhotoPostedType = {
	post_author: string;
	post_type: string;
	post_status: string;
	post_title: string;
	post_content: string;
	files: [
		{
			filename: string;
			contentType: string;
			size: number;
			savedPath: string;
		},
	];
	meta_input: { peso: string; idade: string; acessos: number };
};
