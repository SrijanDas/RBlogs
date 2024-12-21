import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "./auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useLocation } from "react-router";

const queryClient = new QueryClient();

const publicRoute = ["/login", "/register"];

function RootProvider({ children }: React.PropsWithChildren) {
    const location = useLocation();
    const isPublicRoute = publicRoute.includes(location.pathname);
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {isPublicRoute ? (
                    children
                ) : (
                    <AuthProvider>{children}</AuthProvider>
                )}
                <Toaster />
            </Provider>
        </QueryClientProvider>
    );
}

export default RootProvider;
