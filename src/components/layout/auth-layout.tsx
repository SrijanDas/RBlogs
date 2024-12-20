import React from "react";

function AuthLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <div className="w-full max-w-lg mx-auto">{children}</div>
        </div>
    );
}

export default AuthLayout;
