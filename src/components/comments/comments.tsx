import axiosInstance from "@/lib/axios";
import { Comment } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import CommentCard from "./comment-card";

type Props = {
    blogId: string;
};

function Comments({ blogId }: Props) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["comments", { blogId }],
        queryFn: async () => {
            const res = await axiosInstance.get(`/comments/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                return res.data.comments as Comment[];
            } else {
                return [];
            }
        },
    });
    return (
        <div className="my-6 space-y-6">
            {error ? (
                <div>Error loading comments</div>
            ) : isLoading ? (
                <Loader2 className=" animate-spin" size={20} />
            ) : (
                data?.map((comment: Comment) => (
                    <CommentCard key={comment._id} comment={comment} />
                ))
            )}
        </div>
    );
}

export default Comments;
