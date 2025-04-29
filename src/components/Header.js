import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, IconButton, Menu, MenuItem, Badge, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WarningIcon from "@mui/icons-material/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar }) {
    const navigate = useNavigate(); 

    // User Menu State
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Low Stock Items State
    const [lowStockItems, setLowStockItems] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    // Fetch low stock items
    useEffect(() => {
        const fetchLowStockItems = async () => {
            try {
                const response = await axios.get("https://ranasinghemotors-backend.onrender.com/api/products/low-stock");
                setLowStockItems(response.data);
            } catch (error) {
                console.error("Error fetching low stock items", error);
            }
        };
        fetchLowStockItems();
    }, []);

    // Open User Menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close User Menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handle Logout (Example Function)
    const handleLogout = () => {
        alert("Logged out!");
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#1E1E2F", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
                <Toolbar>
                    {/* Sidebar Toggle Button */}
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar} sx={{ marginRight: 2 }}>
                        <MenuIcon sx={{ fontSize: 28 }} />
                    </IconButton>

                    {/* Clickable Title */}
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            transition: "color 0.3s ease-in-out",
                            "&:hover": { color: "#FFD700" },
                        }}
                        onClick={() => navigate("/")}
                    >
                        RANASINGHE MOTORS
                    </Typography>

                    {/* Low Stock Items Icon */}
                    <IconButton color="inherit" onClick={() => setOpenModal(true)}>
                        <Badge badgeContent={lowStockItems.length} color="error">
                            <WarningIcon sx={{ fontSize: 28 }} />
                        </Badge>
                    </IconButton>

                    {/* User Account Icon */}
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <AccountCircleIcon sx={{ fontSize: 28 }} />
                    </IconButton>

                    {/* User Menu Dropdown */}
                    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMenuClose}>Account Details</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Low Stock Items Modal */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="md">
            <DialogTitle>Low Stock Items</DialogTitle>
            <DialogContent>
                {lowStockItems.length === 0 ? (
                    <Typography>No low stock items.</Typography>
                ) : (
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell><strong>Model</strong></TableCell>
                                    <TableCell><strong>Brand</strong></TableCell>
                                    <TableCell><strong>Country</strong></TableCell>
                                    <TableCell><strong>Vendor</strong></TableCell>
                                    <TableCell><strong>Quantity</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lowStockItems.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.model_no}</TableCell>
                                        <TableCell>{item.brand_code.brand_name}</TableCell>
                                        <TableCell>{item.manuf_country}</TableCell>
                                        <TableCell>{item.vendor_code.vendor_name}</TableCell>
                                        <TableCell sx={{ color: item.qty < 5 ? "red" : "inherit" }}>
                                            {item.qty}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
        </Dialog>
        </Box>
    );
}
