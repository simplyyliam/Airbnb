import { Box, Wrapper } from "../../shared";
import "./AdminListing.css"

export default function AdminListing () {
    return (
        <Box className="admin-listing-container">
            <h1>My hotel listins</h1>
            <hr />
            <div className="listing"></div>
        </Box>
    )
}