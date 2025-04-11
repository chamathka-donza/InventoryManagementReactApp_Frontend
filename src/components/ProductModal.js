import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ProductModal({ open, setOpen, editProductId }) {
    const handleClose = () => setOpen(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: '',
        price: '',
        description: '',
    });
    const [editing, setEditing] = useState(false);

    React.useEffect(() => {
        if(editProductId) {
            async function fetchProducts() {
            const response = await fetch(`http://localhost:5001/api/products/${editProductId}`);
            const data = await response.json();
            setFormData(data);
            setOpen(true);
            setEditing(true);
            }
            fetchProducts();
        }
    }, [editProductId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, category, quantity, price } = formData;

        if(!name || !category || !quantity || !price) {
            alert('Please fill all fields');
            return;
        }

        if(editing) {

            const response = await fetch(`http://localhost:5001/api/products/${editProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if(response.ok) {
                alert('Product updated successfully');
                window.location.reload();
                setOpen(false);
            } else {
                alert('Something went wrong');
            }

        } else {
            const response = await fetch('http://localhost:5001/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if(response.ok) {
                alert('Product added successfully');
                window.location.reload();
                setOpen(false);
            } else {
                alert('Something went wrong');
            }
        } 
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Add new Product
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}