import { Avatar, AvatarFallback } from "../ui/avatar";
import { Comment } from "@/types";
import { Button } from "../ui/button";
import useDisclosure from "@/hooks/use-disclosure";
import { Dialog, DialogContent } from "../ui/dialog";
import CommentForm from "./comment-form";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import ConfirmationModal from "../shared/confirmation-modal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/redux";

type Props = {
    comment: Comment;
};

function CommentCard({ comment }: Props) {
    const queryClient = useQueryClient();
    const currentUser = useAppSelector((state) => state.auth.user);
    const updateCommentModal = useDisclosure();
    const deleteModal = useDisclosure();

    const [deletingComment, setDeletingComment] = useState<boolean>(false);

    async function deleteComment() {
        try {
            setDeletingComment(true);
            const res = await axiosInstance.delete(`/comments/${comment._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.data.success) {
                toast.success("Comment deleted successfully");
                deleteModal.opOpenChange(false);
                queryClient.invalidateQueries({
                    queryKey: ["comments", { blogId: comment.blogId }],
                });
            } else {
                toast.error("Failed to delete comment");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete comment");
        } finally {
            setDeletingComment(false);
        }
    }
    return (
        <div className="flex gap-2">
            <Avatar>
                <AvatarFallback>
                    {comment.createdBy.name.charAt(0)}{" "}
                </AvatarFallback>
            </Avatar>
            <div>
                <h6 className="font-semibold">{comment.createdBy.name}</h6>
                <p className="text-secondary-foreground">{comment.content}</p>
                {currentUser?.userId === comment.createdBy.userId && (
                    <div className="flex items-center gap-2 mt-2">
                        <Button
                            onClick={() =>
                                updateCommentModal.opOpenChange(true)
                            }
                            variant="ghost"
                            size="sm"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => deleteModal.opOpenChange(true)}
                            variant="ghost"
                            size="sm"
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <Dialog
                open={updateCommentModal.open}
                onOpenChange={updateCommentModal.opOpenChange}
            >
                <DialogContent className="pt-10">
                    <CommentForm
                        blogId={comment.blogId}
                        defaultValues={comment}
                        cb={() => updateCommentModal.opOpenChange(false)}
                    />
                </DialogContent>
            </Dialog>
            <ConfirmationModal
                itemName="comment"
                modal={deleteModal}
                onCancel={() => deleteModal.opOpenChange(false)}
                onConfirm={deleteComment}
                loading={deletingComment}
            />
        </div>
    );
}

export default CommentCard;
