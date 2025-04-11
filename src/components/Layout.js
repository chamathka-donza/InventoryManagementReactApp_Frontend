import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer"; // Import Footer component
import { Box, Toolbar, Container } from "@mui/material";

const drawerWidth = 240; // Sidebar width

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            {/* Header */}
            <Header toggleSidebar={toggleSidebar} />

            {/* Sidebar */}
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            
        </Box>
    );
};

export default Layout;
