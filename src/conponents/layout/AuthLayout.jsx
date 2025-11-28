import { Outlet } from "react-router-dom";
import { Wrapper } from "../shared";


export default function AuthLayout() {
    return (
        <Wrapper>
            <Outlet/>
        </Wrapper>
    )
}