import { BrowserRouter, Route, Routes } from "react-router";
import { BlogPage, BlogsPage, Home, Login, Register } from "./pages";
import RootProvider from "./providers";

function App() {
    return (
        <BrowserRouter>
            <RootProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/blog/:blogId" element={<BlogPage />} />
                </Routes>
            </RootProvider>
        </BrowserRouter>
    );
}

export default App;
