import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, TextField, Button
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import axios from "axios";

export default function ViewBrands() {
    const [brands, setBrands] = useState([]);
    const [editMode, setEditMode] = useState(null); // Store editing row ID
    const [editedBrand, setEditedBrand] = useState({}); // Store edited brand details

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await axios.get("https://ranasinghemotors-backend.onrender.com/api/brands");
            setBrands(response.data);
        } catch (error) {
            console.error("Error fetching brands", error);
        }
    };

    const handleEdit = (brand) => {
        setEditMode(brand._id);
        setEditedBrand({ ...brand });
    };

    const handleChange = (e) => {
        setEditedBrand({ ...editedBrand, [e.target.name]: e.target.value });
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`https://ranasinghemotors-backend.onrender.com/api/brands/${id}`, {
                brand_name: editedBrand.brand_name,
                brand_description: editedBrand.brand_description,
            });

            setBrands(brands.map((brand) => (brand._id === id ? editedBrand : brand)));
            setEditMode(null);
        } catch (error) {
            console.error("Error updating brand", error);
        }
    };

    const handleCancel = () => {
        setEditMode(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this brand?")) {
            try {
                await axios.delete(`https://ranasinghemotors-backend.onrender.com/api/brands/${id}`);
                setBrands(brands.filter((brand) => brand._id !== id));
            } catch (error) {
                console.error("Error deleting brand", error);
            }
        }
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 3, maxWidth: "80%", margin: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Brand Code</b></TableCell>
                        <TableCell><b>Brand Name</b></TableCell>
                        <TableCell><b>Brand Description</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {brands.map((brand) => (
                        <TableRow key={brand._id}>
                            <TableCell>{brand.brand_code}</TableCell>

                            {/* Edit Mode: Show TextField */}
                            <TableCell>
                                {editMode === brand._id ? (
                                    <TextField
                                        name="brand_name"
                                        value={editedBrand.brand_name}
                                        onChange={handleChange}
                                        size="small"
                                    />
                                ) : (
                                    brand.brand_name
                                )}
                            </TableCell>

                            <TableCell>
                                {editMode === brand._id ? (
                                    <TextField
                                        name="brand_description"
                                        value={editedBrand.brand_description}
                                        onChange={handleChange}
                                        size="small"
                                    />
                                ) : (
                                    brand.brand_description
                                )}
                            </TableCell>

                            <TableCell>
                                {editMode === brand._id ? (
                                    <>
                                        <IconButton color="success" onClick={() => handleSave(brand._id)}>
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={handleCancel}>
                                            <CancelIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <IconButton color="primary" onClick={() => handleEdit(brand)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(brand._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
