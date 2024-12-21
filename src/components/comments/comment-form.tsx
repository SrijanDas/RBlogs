import { Comment } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IAxiosError } from "@/types/custom";
import axios from "axios";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";

type Props = {
    blogId: string;
    defaultValues?: Comment;
    cb?: () => void;
};

const FormSchema = z.object({
    content: z.string().min(1, {
        message: "comment must be at least 1 characters.",
    }),
});

function CommentForm({ defaultValues, blogId, cb }: Props) {
    const currentUser = useAppSelector((state) => state.auth.user);
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            content: defaultValues?.content || "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            if (!defaultValues) {
                // post a new comment
                const res = await axiosInstance.post(
                    "/comments",
                    { blogId, ...data },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                if (res.data.success) {
                    queryClient.invalidateQueries({
                        queryKey: ["comments", { blogId }],
                    });
                    form.reset();
                    cb?.();
                } else {
                    toast.error("Error posting comment");
                }
            } else {
                // update comment
                const res = await axiosInstance.put(
                    `/comments/${defaultValues._id}`,
                    {
                        id: defaultValues._id,
                        blogId: defaultValues.blogId,
                        ...data,
                    },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                if (res.data.success) {
                    queryClient.invalidateQueries({
                        queryKey: ["comments", { blogId }],
                    });
                    toast.success("Comment updated successfully");
                    cb?.();
                } else {
                    toast.error("Error updating comment");
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as IAxiosError;
                toast.error(
                    err.response?.data?.msg ??
                        "An error occurred. Please try again."
                );
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    }
    return (
        <div className="flex gap-2">
            <Avatar>
                <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-3"
                >
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Write a comment"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={form.formState.isSubmitting}
                        type="submit"
                    >
                        Comment
                        {form.formState.isSubmitting && (
                            <Loader2 className="animate-spin" size={20} />
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default CommentForm;
