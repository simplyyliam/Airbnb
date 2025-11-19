import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./conponents/layout/UserLayout";
import Home from "./conponents/pages/Home";
import Listings from "./conponents/pages/Listings"; 
import ListingDetails from "./conponents/pages/ListingDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>

          <Route path="/" element={<Home />} />

          {/* LISTINGS PAGE */}
          <Route path="/listings" element={<Listings />} />

          {/* SINGLE LISTING DETAILS */}
          <Route path="/listings/:id" element={<ListingDetails />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
