import React from "react";
import Navbar from "../shared/navbar";

function MainLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="w-full min-h-screen">
            <Navbar />
            <div className="max-w-3xl mx-auto">{children}</div>
        </div>
    );
}

export default MainLayout;
