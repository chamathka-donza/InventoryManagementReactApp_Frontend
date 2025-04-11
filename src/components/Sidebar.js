import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  Inventory2 as ProductsIcon,
  Storefront as BrandsIcon,
  LocationOn as LocationsIcon,
  People as UsersIcon,
  Business as VendorsIcon,
  ExpandLess,
  ExpandMore,
  Add as AddIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar({ open, toggleSidebar }) {
  const [openSections, setOpenSections] = useState({});

  // Toggle submenu state
  const handleToggle = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleSidebar}
      sx={{
        "& .MuiDrawer-paper": {
          width: 260,
          backgroundColor: "#1E1E2F",
          color: "#FFFFFF",
        },
      }}
    >
      <List>
        {/* Manage Products */}
        <ListItem button onClick={() => handleToggle("products")}>
          <ListItemIcon sx={{ color: "#FFFFFF" }}>
            <ProductsIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Products" />
          {openSections.products ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.products} timeout="auto" unmountOnExit>
          <List sx={{ paddingLeft: 4 }}>
            <ListItem button component={Link} to="/add-product" onClick={toggleSidebar}>
              <ListItemIcon>
                <AddIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </ListItem>
            <ListItem button onClick={toggleSidebar}>
              <ListItemIcon>
                <DeleteIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="Delete Product" />
            </ListItem>
          </List>
        </Collapse>

        {/* Manage Brands */}
        <ListItem button onClick={() => handleToggle("brands")}>
          <ListItemIcon sx={{ color: "#FFFFFF" }}>
            <BrandsIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Brands" />
          {openSections.brands ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.brands} timeout="auto" unmountOnExit>
          <List sx={{ paddingLeft: 4 }}>
            <ListItem button component={Link} to="/add-brand" onClick={toggleSidebar}>
                <ListItemIcon>
                    <AddIcon sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="Add Brand" />
            </ListItem>

            <ListItem button component={Link} to="/view-brands" onClick={toggleSidebar}>
                <ListItemIcon>
                    <ViewIcon sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="View Brands" />
            </ListItem>
          </List>
        </Collapse>

        {/* Manage Locations */}
        <ListItem button onClick={() => handleToggle("locations")}>
          <ListItemIcon sx={{ color: "#FFFFFF" }}>
            <LocationsIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Locations" />
          {openSections.locations ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.locations} timeout="auto" unmountOnExit>
          <List sx={{ paddingLeft: 4 }}>
            <ListItem button component={Link} to="/add-location" onClick={toggleSidebar}>
                <ListItemIcon>
                    <AddIcon sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="Add Location" />
            </ListItem>
            <ListItem button component={Link} to="/view-locations" onClick={toggleSidebar}>
                <ListItemIcon>
                    <ViewIcon sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="View Locations" />
            </ListItem>
          </List>
        </Collapse>

        {/* Manage Vendors */}
        <ListItem button onClick={() => handleToggle("vendors")}>
          <ListItemIcon sx={{ color: "#FFFFFF" }}>
            <VendorsIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Vendors" />
          {openSections.vendors ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.vendors} timeout="auto" unmountOnExit>
          <List sx={{ paddingLeft: 4 }}>
          <ListItem button component={Link} to="/add-vendor" onClick={toggleSidebar}>
                <ListItemIcon>
                    <AddIcon sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="Add Vendor" />
            </ListItem>
            <ListItem button component={Link} to="/view-vendors" onClick={toggleSidebar}>
                <ListItemIcon>
                    <ViewIcon sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="View Vendors" />
            </ListItem>
          </List>
        </Collapse>

        {/* Manage Users */}
        <ListItem button onClick={() => handleToggle("users")}>
          <ListItemIcon sx={{ color: "#FFFFFF" }}>
            <UsersIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Users" />
          {openSections.users ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.users} timeout="auto" unmountOnExit>
          <List sx={{ paddingLeft: 4 }}>
            <ListItem button onClick={toggleSidebar}>
              <ListItemIcon>
                <AddIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="Add User" />
            </ListItem>
            <ListItem button onClick={toggleSidebar}>
              <ListItemIcon>
                <ViewIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary="View Users" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}
