import FallBackLoader from "../components/shared/fallback-loader";
import { useNavigate } from "react-router";
import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/hooks/redux";
import { useEffect, useState } from "react";
import handleError from "@/lib/error-handler";
import { toast } from "sonner";
import { User } from "@/types";
import { setUser } from "@/redux/auth-reducer";

function AuthProvider({ children }: React.PropsWithChildren) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function verifyAuth() {
            try {
                setIsLoading(true);
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found");

                const res = await axiosInstance.post("/auth/verify-token", {
                    token,
                });

                if (!res.data.success) {
                    throw new Error("Invalid token");
                }

                const user = res.data.user as User;
                dispatch(setUser({ user }));
            } catch (error) {
                const msg = handleError(error);
                toast.error(msg);
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        }

        verifyAuth();

        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <FallBackLoader />;
    }

    return <>{children}</>;
}

export default AuthProvider;
