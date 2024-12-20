import { Loader2Icon } from "lucide-react";

function FallBackLoader() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <Loader2Icon size={24} className="animate-spin" />
        </div>
    );
}

export default FallBackLoader;
