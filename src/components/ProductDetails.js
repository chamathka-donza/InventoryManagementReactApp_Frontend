import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Card, CardContent, Typography, Grid, Box, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [brands, setBrands] = useState([]);
    const [locations, setLocations] = useState([]);
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://ranasinghemotors-backend.onrender.com/api/products/${id}`);
                setProduct(response.data);
                setUpdatedProduct({
                    ...response.data,
                    is_rack: Boolean(response.data.is_rack),
                });
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        const fetchDropdowns = async () => {
            try {
                const brandRes = await axios.get("https://ranasinghemotors-backend.onrender.com/api/brands");
                const locationRes = await axios.get("https://ranasinghemotors-backend.onrender.com/api/locations");
                const vendorRes = await axios.get("https://ranasinghemotors-backend.onrender.com/api/vendors");

                setBrands(brandRes.data);
                setLocations(locationRes.data);
                setVendors(vendorRes.data);
            } catch (error) {
                console.error("Error fetching dropdown data:", error);
            }
        };

        fetchProduct();
        fetchDropdowns();
    }, [id]);

    const handleEdit = () => setEditMode(true);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdatedProduct({
            ...updatedProduct,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                ...updatedProduct,
                brand_code: updatedProduct.brand_code?.brand_code || updatedProduct.brand_code,
                loc_code: updatedProduct.loc_code?.loc_code || updatedProduct.loc_code,
                vendor_code: updatedProduct.vendor_code?.vendor_code || updatedProduct.vendor_code,
            };
    
            await axios.put(`https://ranasinghemotors-backend.onrender.com/api/products/${id}`, payload);
            setProduct(updatedProduct);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating product:", error.response?.data || error.message);
        }
    };
    

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this Product?")) {
        try {
            await axios.delete(`https://ranasinghemotors-backend.onrender.com/api/products/${id}`);
            navigate("/"); // Redirect to inventory list after deletion
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="md">
            <Card sx={{ mt: 4, p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
                        Product Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Model No" name="model_no" value={updatedProduct.model_no || ""} disabled fullWidth />
                        </Grid>

                        {/* Brand Field */}
                        <Grid item xs={12} sm={6}>
                        <TextField
                                label="Brand Name"
                                value={updatedProduct.brand_code?.brand_name || "Unknown"}
                                disabled
                                fullWidth
                            />

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField label="Manufacturing Country" name="manuf_country" value={updatedProduct.manuf_country || ""} disabled fullWidth />
                        </Grid>

                        {/* Location Field */}
                        <Grid item xs={12} sm={6}>
                            {editMode ? (
                                <FormControl fullWidth>
                                    <InputLabel>Location</InputLabel>
                                    <Select
                                        name="loc_code"
                                        value={updatedProduct.loc_code?.loc_code || ""}
                                        onChange={(e) => {
                                            const selectedLocation = locations.find((l) => l.loc_code === e.target.value);
                                            setUpdatedProduct({ ...updatedProduct, loc_code: selectedLocation || null });
                                        }}
                                    >
                                        {locations.map((l) => (
                                            <MenuItem key={l._id} value={l.loc_code}>
                                                {l.loc_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    label="Location Name"
                                    value={updatedProduct.loc_code ? updatedProduct.loc_code.loc_name : "Unknown"}
                                    disabled
                                    fullWidth
                                />
                            )}
                        </Grid>

                        {/* Vendor Field */}
                        <Grid item xs={12} sm={6}>
                            {editMode ? (
                                <FormControl fullWidth>
                                    <InputLabel>Vendor</InputLabel>
                                    <Select
                                        name="vendor_code"
                                        value={updatedProduct.vendor_code?.vendor_code || ""}
                                        onChange={(e) => {
                                            const selectedVendor = vendors.find((v) => v.vendor_code === e.target.value);
                                            setUpdatedProduct({ ...updatedProduct, vendor_code: selectedVendor || null });
                                        }}
                                    >
                                        {vendors.map((v) => (
                                            <MenuItem key={v._id} value={v.vendor_code}>
                                                {v.vendor_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    label="Vendor Name"
                                    value={updatedProduct.vendor_code ? updatedProduct.vendor_code.vendor_name : "Unknown"}
                                    disabled
                                    fullWidth
                                />
                            )}
                        </Grid>


                        {/* Teeth Quantity - Numeric Field */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Teeth Quantity"
                                name="teeth_qty"
                                type="number"
                                value={updatedProduct.teeth_qty || ""}
                                onChange={handleChange}
                                disabled={!editMode}
                                fullWidth
                            />
                        </Grid>

                        {/* Quantity - Numeric Field */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Quantity"
                                name="qty"
                                type="number"
                                value={updatedProduct.qty || ""}
                                onChange={handleChange}
                                disabled={!editMode}
                                fullWidth
                            />
                        </Grid>

                        {/* Other Text Fields */}
                        <Grid item xs={12}>
                            <TextField label="Description" name="proc_description" value={updatedProduct.proc_description || ""} onChange={handleChange} disabled={!editMode} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Size" name="size" value={updatedProduct.size || ""} onChange={handleChange} disabled={!editMode} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Engine Model" name="engine_model" value={updatedProduct.engine_model || ""} onChange={handleChange} disabled={!editMode} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Vehicle" name="vehicle" value={updatedProduct.vehicle || ""} onChange={handleChange} disabled={!editMode} fullWidth />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField label="Buying Price" name="buy_price" value={updatedProduct.buy_price || ""} onChange={handleChange} disabled={!editMode} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Selling Price" name="sell_price" value={updatedProduct.sell_price || ""} onChange={handleChange} disabled={!editMode} fullWidth />
                        </Grid>

                        {/* Is Rack - Checkbox */}
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox checked={updatedProduct.is_rack || false} onChange={handleChange} name="is_rack" disabled={!editMode} />} label="Is Rack Option" />
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box mt={3} display="flex" justifyContent="space-between">
                        {editMode ? (
                            <Button variant="contained" color="primary" onClick={handleUpdate}>
                                Update
                            </Button>
                        ) : (
                            <Button variant="contained" color="secondary" onClick={handleEdit}>
                                Edit
                            </Button>
                        )}
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetails;
