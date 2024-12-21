import { useAppSelector } from "@/hooks/redux";
import { Navigate } from "react-router";

function HomePage() {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return <Navigate to="/blogs" />;
}

export default HomePage;
