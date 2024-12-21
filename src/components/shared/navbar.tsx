import { Avatar, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/redux/auth-reducer";

function Navbar() {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
        localStorage.clear();
        dispatch(logout());
    };
    return (
        <div className="w-full p-4 bg-primary">
            <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
                <Link to="/blogs">
                    <h6 className="text-xl font-semibold text-white">RBlogs</h6>
                </Link>
                <Popover>
                    <PopoverTrigger>
                        <Avatar>
                            <AvatarFallback>
                                {user?.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent>
                        <h4 className="font-medium leading-none">
                            {user?.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {user?.email}
                        </p>
                        <Button
                            className="mt-2"
                            size="sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

export default Navbar;
