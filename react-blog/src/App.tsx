import { ToastContainer } from "react-toastify";
import AuthPage from "./AuthPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import './App.css'
import GetStarted from "./GetStarted";
import CreateBlog from "./ui/CreateBlog";
import BlogPostDisplay from "./ui/BlogPost";
import EditBlog from "./EditBlog";

function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/authpage" element={<AuthPage />}></Route>
          <Route path = "/homepage" element={<HomePage/>}></Route>
          <Route path = "/" element={<GetStarted/>}></Route>
          <Route path = "/create-blog" element={<CreateBlog/>}></Route>
          <Route path="/blog/:id" element={<BlogPostDisplay />}></Route>
          <Route path="/editblog/:id" element={<EditBlog />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;