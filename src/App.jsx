import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./conponents/layout/UserLayout";
import Home from "./conponents/pages/Home";




export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<UserLayout/>}>
            <Route path="/" element={<Home/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}