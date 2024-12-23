import AuthLayout from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux";
import axiosInstance from "@/lib/axios";
import handleError from "@/lib/error-handler";
import { setUser } from "@/redux/auth-reducer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
    }),
});

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const res = await axiosInstance.post("/auth/sign-in", data);
            if (res.data.success) {
                const token = res.data.accessToken;
                localStorage.setItem("token", token);
                // get profile details
                const userDataRes = await axiosInstance.get("/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (userDataRes.data.success) {
                    dispatch(setUser({ user: userDataRes.data.user }));
                    navigate("/blogs");
                } else {
                    toast.error("Error loading user");
                    return;
                }
            } else {
                toast.error(res.data.msg);
            }
        } catch (error) {
            const msg = handleError(error);
            toast.error(msg);
        }
    }

    return (
        <AuthLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 "
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="example@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={form.formState.isSubmitting}
                                className="w-full"
                                type="submit"
                            >
                                Log In
                                {form.formState.isSubmitting && (
                                    <Loader2
                                        className="ml-2 animate-spin"
                                        size={20}
                                    />
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <p>Do not have an account?</p>
                    <Button variant="link" asChild>
                        <Link to="/register">Register here</Link>
                    </Button>
                </CardFooter>
            </Card>
        </AuthLayout>
    );
}

export default LoginPage;
