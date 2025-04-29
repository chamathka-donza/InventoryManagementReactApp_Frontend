import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBrand() {
    const [brand, setBrand] = useState({ brand_code: "", brand_name: "", brand_description: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBrand({ ...brand, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://ranasinghemotors-backend.onrender.com/api/brands", brand);
            navigate("/view-brands");
        } catch (error) {
            console.error("Error adding brand", error);
        }
    };

    return (
        <Container component={Paper} elevation={3} sx={{ p: 3, mt: 5, width: "50%" }}>
            <Typography variant="h5" gutterBottom>
                Add New Brand
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth margin="normal" label="Brand Name" name="brand_name" onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Brand Description" name="brand_description" onChange={handleChange} required />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Add Brand
                </Button>
            </form>
        </Container>
    );
}
