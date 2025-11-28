import { Outlet } from "react-router-dom";
import { Navbar, Wrapper } from "../shared";
import "./AuthLayout.css"


export default function AuthLayout() {
    return (
        <div className="auth-container">
            <Navbar/>
            <Outlet/>
        </div>
    )
}