import BlogForm from "@/components/blogs/blog-form";
import MainLayout from "@/components/layout/main-layout";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import FallBackLoader from "@/components/shared/fallback-loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useDisclosure from "@/hooks/use-disclosure";
import axiosInstance from "@/lib/axios";
import { Blog } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

function BlogPage() {
    const { blogId } = useParams();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const navigate = useNavigate();

    const deleteConfirmationModal = useDisclosure();
    const editBlogModal = useDisclosure();

    const { data, error, isLoading } = useQuery({
        queryKey: ["blog", { id: blogId }],
        queryFn: async () => {
            const response = await axiosInstance.get(`/blogs/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                return response.data.blog as Blog;
            }
        },
    });

    async function deleteBlog() {
        try {
            setIsDeleting(true);
            const res = await axiosInstance.delete(`/blogs/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                navigate("/blogs");
                toast.success("Blog deleted successfully");
                deleteConfirmationModal.opOpenChange(false);
            } else {
                toast.error("Failed to delete blog");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleting(false);
        }
    }

    if (error) {
        return <div>Error loading blog</div>;
    }

    return (
        <MainLayout>
            {isLoading ? (
                <FallBackLoader />
            ) : (
                data && (
                    <main className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center w-full gap-2">
                                <Avatar>
                                    <AvatarFallback>
                                        {data.createdBy.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h6 className="font-semibold">
                                        {data.createdBy.name}
                                    </h6>
                                    <p className="text-secondary-foreground">
                                        {new Date(
                                            data.createdAt
                                        ).toDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() =>
                                        editBlogModal.opOpenChange(true)
                                    }
                                    variant="outline"
                                    size="icon"
                                >
                                    <PencilIcon size={16} />
                                </Button>
                                <Button
                                    onClick={() =>
                                        deleteConfirmationModal.opOpenChange(
                                            true
                                        )
                                    }
                                    variant="outline"
                                    size="icon"
                                >
                                    <Trash2Icon size={16} />
                                </Button>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="mb-2 text-xl font-semibold">
                                {data.title}
                            </h3>
                            <p>{data.content}</p>
                        </div>

                        <ConfirmationModal
                            modal={deleteConfirmationModal}
                            loading={isDeleting}
                            onConfirm={deleteBlog}
                            onCancel={() =>
                                deleteConfirmationModal.opOpenChange(false)
                            }
                        />

                        <BlogForm modal={editBlogModal} defaultValues={data} />
                    </main>
                )
            )}
        </MainLayout>
    );
}

export default BlogPage;
