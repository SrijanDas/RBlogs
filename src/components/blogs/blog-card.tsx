import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router";
import { Blog } from "@/types";
import { MessageCircleIcon } from "lucide-react";

type Props = {
    blog: Blog;
};

function BlogCard({ blog }: Props) {
    return (
        <Card>
            <Link to={`/blog/${blog._id}`}>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarFallback>
                                {blog.createdBy.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{blog.createdBy.name}</CardTitle>
                            <p className="text-sm text-gray-500 text-secondary-foreground">
                                {new Date(blog.createdAt).toDateString()}
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <h3 className="mb-2 text-xl font-semibold">{blog.title}</h3>
                    <p>
                        {blog.content.length > 100
                            ? blog.content.slice(0, 100) + "..."
                            : blog.content}
                    </p>
                    <div className="flex items-center mt-4">
                        <MessageCircleIcon className="w-5 h-5 mr-1" />
                        <p className="text-sm">{blog.comments} comments</p>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}

export default BlogCard;
