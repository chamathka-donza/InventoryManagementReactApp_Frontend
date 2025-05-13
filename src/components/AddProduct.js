import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl, FormControlLabel, Checkbox, Grid, Typography, Paper, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const [modelNo, setModelNo] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [manufCountry, setManufCountry] = useState('');
    const [teethqty, setTeethqty] = useState(0);
    const [location, setLocation] = useState('');
    const [vendor, setVendor] = useState('');
    const [qty, setQty] = useState(0);
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [size, setSize] = useState('');
    const [engineModel, setEngineModel] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [isRack, setIsRack] = useState(false); // Checkbox state

    const [brands, setBrands] = useState([]);
    const [locations, setLocations] = useState([]);
    const [vendors, setVendors] = useState([]);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const brandRes = await axios.get('https://ranasinghemotors-backend.onrender.com/api/brands');
                const locationRes = await axios.get('https://ranasinghemotors-backend.onrender.com/api/locations');
                const vendorRes = await axios.get('https://ranasinghemotors-backend.onrender.com/api/vendors');
                
                setBrands(brandRes.data);
                setLocations(locationRes.data);
                setVendors(vendorRes.data);
            } catch (error) {
                console.error("Error fetching dropdown data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            model_no: modelNo,
            brand_code: brand,
            proc_description: description,
            manuf_country: manufCountry,
            teeth_qty: teethqty,
            loc_code: location,
            vendor_code: vendor,
            qty: qty,
            buy_price: buyPrice,
            sell_price: sellPrice,
            size: size,
            engine_model: engineModel,
            vehicle: vehicle,
            is_rack: isRack, // Send checkbox value
        };

        try {
            await axios.post('https://ranasinghemotors-backend.onrender.com/api/products', newProduct);
            setSnackbarMessage('Product added successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setOpenDialog(true); // Open confirmation dialog
        } catch (error) {
            setSnackbarMessage('Failed to add product. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleDialogClose = (choice) => {
        setOpenDialog(false);
        if (choice === "addAnother") {
            // Reset form fields
            setModelNo('');
            setBrand('');
            setDescription('');
            setManufCountry('');
            setTeethqty(0);
            setLocation('');
            setVendor('');
            setQty(0);
            setBuyPrice('');
            setSellPrice('');
            setSize('');
            setEngineModel('');
            setVehicle('');
            setIsRack(false);
        } else {
            navigate('/'); // Redirect to main page
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Add New Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField label="Model Number" fullWidth variant="outlined" value={modelNo} onChange={(e) => setModelNo(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Brand</InputLabel>
                                <Select value={brand} onChange={(e) => setBrand(e.target.value)} required>
                                    {brands.map((b) => <MenuItem key={b._id} value={b.brand_code}>{b.brand_name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" fullWidth variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Manufacture Country" fullWidth variant="outlined" value={manufCountry} onChange={(e) => setManufCountry(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Teeth Quantity" fullWidth type="number" variant="outlined" value={teethqty} onChange={(e) => setTeethqty(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Size" fullWidth variant="outlined" value={size} onChange={(e) => setSize(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Engine Model" fullWidth variant="outlined" value={engineModel} onChange={(e) => setEngineModel(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Vehicle" fullWidth variant="outlined" value={vehicle} onChange={(e) => setVehicle(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Location</InputLabel>
                                <Select value={location} onChange={(e) => setLocation(e.target.value)} required>
                                    {locations.map((l) => <MenuItem key={l._id} value={l.loc_code}>{l.loc_name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Vendor</InputLabel>
                                <Select value={vendor} onChange={(e) => setVendor(e.target.value)} required>
                                    {vendors.map((v) => <MenuItem key={v._id} value={v.vendor_code}>{v.vendor_name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Selling Price" fullWidth variant="outlined" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Buying Price" fullWidth variant="outlined" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Quantity" fullWidth type="number" variant="outlined" value={qty} onChange={(e) => setQty(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox checked={isRack} onChange={(e) => setIsRack(e.target.checked)} />} label="Is Rack?" />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                        Add Product
                    </Button>
                </form>
            </Paper>

            {/* Success Snackbar */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Product Added Successfully</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to add another product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose("addAnother")} color="primary">
                        Yes, Add Another
                    </Button>
                    <Button onClick={() => handleDialogClose("goHome")} color="secondary">
                        No, Go to Main Page
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default AddProduct;
