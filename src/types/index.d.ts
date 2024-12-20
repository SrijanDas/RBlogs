export type User = {
    userId: string;
    email: string;
    name: string;
};

export type Blog = {
    _id: string;
    title: string;
    content: string;
    createdBy: User;
    comments: number;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
};

export type Comment = {
    _id: string;
    blogId: string;
    content: string;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
};
