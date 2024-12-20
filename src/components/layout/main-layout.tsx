import React from "react";
import Navbar from "../shared/navbar";

function MainLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="w-full min-h-screen">
            <Navbar />
            {children}
        </div>
    );
}

export default MainLayout;
