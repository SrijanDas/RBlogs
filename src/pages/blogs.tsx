import MainLayout from "@/components/layout/main-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Blog, User } from "@/types";
import CreateBlog from "@/components/blogs/blog-form";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import FallBackLoader from "@/components/shared/fallback-loader";
import BlogCard from "@/components/blogs/blog-card";
import useDisclosure from "@/hooks/use-disclosure";

const LIMIT = 20;

function BlogsPage() {
    const modal = useDisclosure();
    const user: User = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") ?? "")
        : null;

    const page = 1;

    const { data, isLoading, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/blogs?limit=${LIMIT}&page=${page}`
            );
            // console.log(res);
            return res.data.blogs;
        },
    });

    if (error) {
        return <div>Error loading blogs</div>;
    }

    return (
        <MainLayout>
            <main className="p-4 space-y-6">
                <Card
                    onClick={() => modal.opOpenChange(true)}
                    className="w-full"
                >
                    <CardHeader className="w-full">
                        <div className="flex items-center w-full gap-4">
                            <Avatar>
                                <AvatarFallback>
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-xl">Write a blog...</p>
                        </div>
                    </CardHeader>
                </Card>
                <CreateBlog modal={modal} />

                {isLoading ? (
                    <FallBackLoader />
                ) : (
                    data &&
                    data.map((blog: Blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))
                )}
            </main>
        </MainLayout>
    );
}

export default BlogsPage;
