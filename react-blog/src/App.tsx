import { ToastContainer } from "react-toastify";
import AuthPage from "./AuthPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/authpage" element={<AuthPage />}></Route>
          <Route path = "/" element={<HomePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;