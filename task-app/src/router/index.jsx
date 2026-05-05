import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

//🔥 加一个“路由首位”
//children = 我要保护的页面(Dashboard),有token->放行;没有token->去登录页
const ProtectedRoute = ({children})=>{
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to="/login" />;
    }

    return children;

};
//

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 默认跳转 */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 🔥 受保护 */}
        <Route 
            path="/dashboard" 
            element={
                <ProtectedRoute>
                <Dashboard/>
                </ProtectedRoute>
            } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;