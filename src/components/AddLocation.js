import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import axios from "axios";

export default function AddLocation() {
    const [location, setLocation] = useState({
        loc_code: "",
        loc_name: "",
        loc_address: "",
    });

    const handleChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...location,
                loc_address: location.loc_address.trim() === "" ? "-" : location.loc_address,
            };
            await axios.post("https://ranasinghemotors-backend.onrender.com/api/locations", payload);
            alert("Location added successfully!");
            setLocation({ loc_code: "", loc_name: "", loc_address: "" });
        } catch (error) {
            console.error("Error adding location", error);
        }
    };

    return (
        <Paper sx={{ padding: 4, maxWidth: 500, margin: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>Add New Location</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField 
                    label="Location Name" 
                    name="loc_name" 
                    value={location.loc_name} 
                    onChange={handleChange} 
                    fullWidth 
                    required 
                    sx={{ mb: 2 }} 
                />
                <TextField 
                    label="Location Description" 
                    name="loc_address" 
                    value={location.loc_address} 
                    onChange={handleChange} 
                    fullWidth 
                    multiline 
                    rows={3}  
                    sx={{ mb: 2 }} 
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Add Location</Button>
            </Box>
        </Paper>
    );
}
