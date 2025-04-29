import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from "@mui/icons-material";
import axios from "axios";

export default function ViewVendors() {
    const [vendors, setVendors] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await axios.get("https://ranasinghemotors-backend.onrender.com/api/vendors");
            setVendors(response.data);
        } catch (error) {
            console.error("Error fetching vendors", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this vendor?")) {
            try {
                await axios.delete(`https://ranasinghemotors-backend.onrender.com/api/vendors/${id}`);
                setVendors(vendors.filter((vendor) => vendor._id !== id));
            } catch (error) {
                console.error("Error deleting vendor", error);
            }
        }
    };

    const handleEdit = (vendor) => {
        setEditingId(vendor._id);
        setEditData({ vendor_name: vendor.vendor_name, contact_no: vendor.contact_no });
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`https://ranasinghemotors-backend.onrender.com/api/vendors/${id}`, editData);
            setVendors(vendors.map(vendor => vendor._id === id ? { ...vendor, ...editData } : vendor));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating vendor", error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 3, maxWidth: "80%", margin: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Vendor Code</b></TableCell>
                        <TableCell><b>Vendor Name</b></TableCell>
                        <TableCell><b>Vendor Contact No</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vendors.map((vendor) => (
                        <TableRow key={vendor._id}>
                            <TableCell>{vendor.vendor_code}</TableCell>
                            <TableCell>
                                {editingId === vendor._id ? (
                                    <TextField 
                                        value={editData.vendor_name} 
                                        onChange={(e) => setEditData({ ...editData, vendor_name: e.target.value })} 
                                    />
                                ) : (
                                    vendor.vendor_name
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === vendor._id ? (
                                    <TextField 
                                        value={editData.contact_no} 
                                        onChange={(e) => setEditData({ ...editData, contact_no: e.target.value })} 
                                    />
                                ) : (
                                    vendor.contact_no
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === vendor._id ? (
                                    <IconButton color="success" onClick={() => handleSave(vendor._id)}>
                                        <SaveIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton color="primary" onClick={() => handleEdit(vendor)}>
                                        <EditIcon />
                                    </IconButton>
                                )}
                                <IconButton color="error" onClick={() => handleDelete(vendor._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
