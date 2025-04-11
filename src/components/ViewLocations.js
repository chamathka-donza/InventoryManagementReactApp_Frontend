import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from "@mui/icons-material";
import axios from "axios";

export default function ViewLocations() {
    const [locations, setLocations] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/locations");
            setLocations(response.data);
        } catch (error) {
            console.error("Error fetching locations", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            try {
                await axios.delete(`http://localhost:5001/api/locations/${id}`);
                setLocations(locations.filter((location) => location._id !== id));
            } catch (error) {
                console.error("Error deleting location", error);
            }
        }
    };

    const handleEdit = (location) => {
        setEditingId(location._id);
        setEditData({ loc_name: location.loc_name, loc_address: location.loc_address });
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:5001/api/locations/${id}`, editData);
            setLocations(locations.map(loc => loc._id === id ? { ...loc, ...editData } : loc));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating location", error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 3, maxWidth: "80%", margin: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Location Code</b></TableCell>
                        <TableCell><b>Location Name</b></TableCell>
                        <TableCell><b>Location Address</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {locations.map((location) => (
                        <TableRow key={location._id}>
                            <TableCell>{location.loc_code}</TableCell>
                            <TableCell>
                                {editingId === location._id ? (
                                    <TextField 
                                        value={editData.loc_name} 
                                        onChange={(e) => setEditData({ ...editData, loc_name: e.target.value })} 
                                    />
                                ) : (
                                    location.loc_name
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === location._id ? (
                                    <TextField 
                                        value={editData.loc_address} 
                                        onChange={(e) => setEditData({ ...editData, loc_address: e.target.value })} 
                                    />
                                ) : (
                                    location.loc_address
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === location._id ? (
                                    <IconButton color="success" onClick={() => handleSave(location._id)}>
                                        <SaveIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton color="primary" onClick={() => handleEdit(location)}>
                                        <EditIcon />
                                    </IconButton>
                                )}
                                <IconButton color="error" onClick={() => handleDelete(location._id)}>
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
