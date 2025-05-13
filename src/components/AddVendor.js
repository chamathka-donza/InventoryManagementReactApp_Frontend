import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import axios from "axios";

export default function AddVendor() {
    const [vendor, setVendor] = useState({
        vendor_code: "",
        vendor_name: "",
        contact_no: "",
    });

    const handleChange = (e) => {
        setVendor({ ...vendor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...vendor,
                contact_no: vendor.contact_no.trim() === "" ? "-" : vendor.contact_no,
            };
            await axios.post("https://ranasinghemotors-backend.onrender.com/api/vendors", payload);
            alert("Vendor added successfully!");
            setVendor({ vendor_code: "", vendor_name: "", contact_no: "" });
        } catch (error) {
            console.error("Error adding vendor", error);
        }
    };

    return (
        <Paper sx={{ padding: 4, maxWidth: 500, margin: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>Add New Vendor</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField 
                    label="Vendor Name" 
                    name="vendor_name" 
                    value={vendor.vendor_name} 
                    onChange={handleChange} 
                    fullWidth 
                    required 
                    sx={{ mb: 2 }} 
                />
                <TextField 
                    label="Vendor Contact No" 
                    name="contact_no" 
                    value={vendor.contact_no} 
                    onChange={handleChange} 
                    fullWidth 
                    sx={{ mb: 2 }} 
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Add Vendor</Button>
            </Box>
        </Paper>
    );
}
