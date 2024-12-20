export type User = {
    userId: string;
    email: string;
    name: string;
};

export type Blog = {
    _id: Types.ObjectId;
    title: string;
    content: string;
    createdBy: User;
    comments: number;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
};
