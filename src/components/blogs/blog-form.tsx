import axiosInstance from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Disclosure } from "@/hooks/use-disclosure";
import { useQueryClient } from "@tanstack/react-query";
import { Blog } from "@/types";
import handleError from "@/lib/error-handler";

type Props = {
    modal: Disclosure;
    defaultValues?: Blog;
};

const FormSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    content: z.string().min(10, {
        message: "Content must be at least 10 characters.",
    }),
});

function BlogForm({ modal, defaultValues }: Props) {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: defaultValues?.title || "",
            content: defaultValues?.content || "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            if (!defaultValues) {
                // create new blog
                const res = await axiosInstance.post("/blogs", data, {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                });
                if (res.data.success) {
                    queryClient.invalidateQueries({ queryKey: ["blogs"] });
                    form.reset();
                    modal.opOpenChange(false);
                } else {
                    toast.error("Error posting blog");
                }
            } else {
                // update blog
                const res = await axiosInstance.put(
                    `/blogs/${defaultValues._id}`,
                    {
                        id: defaultValues._id,
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
                        queryKey: ["blog", { id: defaultValues._id }],
                    });

                    queryClient.invalidateQueries({
                        queryKey: ["blogs"],
                    });

                    modal.opOpenChange(false);
                } else {
                    toast.error("Error updating blog");
                }
            }
        } catch (error) {
            const msg = handleError(error);
            toast.error(msg);
        }
    }
    return (
        <Dialog onOpenChange={modal.opOpenChange} open={modal.open}>
            <DialogContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 "
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoFocus />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={11} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={form.formState.isSubmitting}
                            type="submit"
                        >
                            Post
                            {form.formState.isSubmitting && (
                                <Loader2 className="animate-spin" />
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default BlogForm;
