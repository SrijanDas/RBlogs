import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Link } from "react-router";

function Navbar() {
    const user: User = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") ?? "")
        : null;

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };
    return (
        <div className="flex items-center justify-between w-full p-4 bg-primary">
            <Link to="/blogs">
                <h6 className="text-xl font-semibold text-white">RBlogs</h6>
            </Link>
            <Popover>
                <PopoverTrigger>
                    <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <h4 className="font-medium leading-none">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">
                        {user.email}
                    </p>
                    <Button className="mt-2" size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default Navbar;
