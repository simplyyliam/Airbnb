import { Outlet } from "react-router-dom"
import Navbar from "../ui/Navbar"
import "./UserLayout.css"

export default function  UserLayout() {
    return (
        <div className="container">
            <Navbar />
            <Outlet/>
        </div>
    )
}