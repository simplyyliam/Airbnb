import { Outlet } from "react-router-dom"
import Navbar from "../ui/Navbar"
import "./UserLayout.css"
import Searchbar from "../ui/Searchbar"

export default function  UserLayout() {
    return (
        <div className="container">
            <Navbar />
            <Searchbar/>
            <Outlet/>
        </div>
    )
}