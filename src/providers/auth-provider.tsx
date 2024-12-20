import { useQuery } from "@tanstack/react-query";
import FallBackLoader from "../components/shared/fallback-loader";
import { Navigate } from "react-router";
import axiosInstance from "@/lib/axios";

function AuthProvider({ children }: React.PropsWithChildren) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["token"],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");

            const res = await axiosInstance.post("/auth/verify-token", {
                token,
            });

            return res.data;
        },
    });

    if (isLoading) {
        return <FallBackLoader />;
    }

    if (error || !data || !data.success) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export default AuthProvider;
