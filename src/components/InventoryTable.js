import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Button, Box, Link  } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const paginationModel = { page: 0, pageSize: 10 };

export default function InventoryTable({ rows, setRows }) {
    const navigate = useNavigate();

    const handleIncrement = async (rowId) => {
        // Find the row to increment
        const updatedRows = rows.map((row) => {
            if (row._id === rowId) {
                row.qty += 1; // Increment the quantity
            }
            return row;
        });

        // Update the frontend state
        setRows(updatedRows);

        // Make the API call to update the backend
        try {
            const updatedRow = updatedRows.find(row => row._id === rowId);
            await axios.put(`https://ranasinghemotors-backend.onrender.com/api/products/update-quantity/${rowId}`, {
                qty: updatedRows.find(row => row.id === rowId).qty
            });
            
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleDecrement = async (rowId) => {
        // Find the row to decrement
        const updatedRows = rows.map((row) => {
            if (row._id === rowId && row.qty > 0) {
                row.qty -= 1; // Decrement the quantity
            }
            return row;
        });

        // Update the frontend state
        setRows(updatedRows);

        // Make the API call to update the backend
        try {
            const updatedRow = updatedRows.find(row => row._id === rowId);
            await axios.put(`https://ranasinghemotors-backend.onrender.com/api/products/update-quantity/${rowId}`, {
                qty: updatedRows.find(row => row.id === rowId).qty
            });
            
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const columns = [
        { 
            field: "model_no", 
            headerName: "Model No", 
            flex: 1, 
            headerAlign: "center", 
            align: "center",
            renderCell: (params) => (
                <Link 
                    component="button" 
                    variant="body2"
                    onClick={() => navigate(`/product/${params.row._id}`)} // Corrected route
                sx={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                >
                    {params.value}
                </Link>
            )
        },
        { 
            field: 'brand_code', 
            headerName: 'Brand', 
            flex: 1,
            headerAlign: 'center', 
            align: 'center', 
            renderCell: (params) => {
                return params.row.brand_code ? params.row.brand_code.brand_name : 'N/A'; // Display 'N/A' if no brand_code
            }
        },
        { 
            field: 'proc_description', 
            headerName: 'Description', 
            flex: 1,
            headerAlign: 'center', 
            align: 'center', 
            headerRenderer: (params) => (
                <strong>{params.colDef.headerName}</strong>  // Ensures the header name is bold
            ),
        },
        { 
            field: 'manuf_country', 
            headerName: 'Manufacture', 
            flex: 1,
            headerAlign: 'center', 
            align: 'center', 
            headerRenderer: (params) => (
                <strong>{params.colDef.headerName}</strong>  // Ensures the header name is bold
            ),
        },
        { 
            field: 'teeth_qty', 
            headerName: 'Teeth', 
            type: 'number', 
            flex: 1,
            headerAlign: 'center', 
            align: 'center', 
            headerRenderer: (params) => (
                <strong>{params.colDef.headerName}</strong>  // Ensures the header name is bold
            ),
        },
        { 
            field: 'size', 
            headerName: 'Size', 
            flex: 1,
            headerAlign: 'center', 
            align: 'center', 
            headerRenderer: (params) => (
                <strong>{params.colDef.headerName}</strong>  // Ensures the header name is bold
            ),
        },
        { 
            field: 'engine_model', 
            headerName: 'Engine', 
            flex: 1,
            headerAlign: 'center', 
            align: 'center', 
            headerRenderer: (params) => (
                <strong>{params.colDef.headerName}</strong>  // Ensures the header name is bold
            ),
        },
        { 
            field: 'vehicle', 
            headerName: 'Vehicle', 
            flex: 1,
            headerAlign: 'center', 
            align: 'center', 
            headerRenderer: (params) => (
                <strong>{params.colDef.headerName}</strong>  // Ensures the header name is bold
            ),
        },
        { 
            field: 'loc_code', 
            headerName: 'Location', 
            flex: 1,
            headerAlign: 'center', 
            align: 'center', 
            renderCell: (params) => {
                return params.row.loc_code ? params.row.loc_code.loc_name : 'N/A'; // Display 'N/A' if no loc_code
            }
        },
        { 
            field: 'buy_price', 
            headerName: 'Buying Price', 
            flex: 1,
            headerAlign: 'center', 
            align: 'center', 
            headerRenderer: (params) => (
                <strong>{params.colDef.headerName}</strong>  // Ensures the header name is bold
            ),
        },
        { 
            field: 'sell_price', 
            headerName: 'Selling Price', 
            flex: 1,
            headerAlign: 'center', 
            align: 'center', 
            headerRenderer: (params) => (
                <strong>{params.colDef.headerName}</strong>  // Ensures the header name is bold
            ),
        },
        { 
            field: 'qty', 
            headerName: 'Quantity', 
            flex: 1, 
            headerAlign: 'center', 
            align: 'center', 
            renderCell: (params) => {
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button 
                            variant="contained" 
                            onClick={() => handleDecrement(params.row.id)} 
                            size="small" 
                            sx={{
                                marginRight: 1, 
                                backgroundColor: 'white', 
                                color: 'black',
                                width: 30, // Set width and height to make the button square
                                height: 30, // Set width and height to make the button square
                                padding: 0, // Remove padding to make the button perfectly square
                                minWidth: 0 // Prevents the button from expanding
                            }}
                        >
                            -
                        </Button>
                        {params.value}
                        <Button 
                            variant="contained" 
                            onClick={() => handleIncrement(params.row.id)} 
                            size="small" 
                            sx={{
                                marginLeft: 1, 
                                backgroundColor: 'white', 
                                color: 'black',
                                width: 30, // Set width and height to make the button square
                                height: 30, // Set width and height to make the button square
                                padding: 0, // Remove padding to make the button perfectly square
                                minWidth: 0 // Prevents the button from expanding
                            }}
                        >
                            +
                        </Button>
                    </Box>
                );
            },
            headerRenderer: (params) => (
                <strong>{params.colDef.headerName}</strong>  // Ensures the header name is bold
            ),
            cellClassName: 'sticky-column' // Making 'Quantity' sticky
        }
    ];

    return (
        <Paper sx={{ height: 500, width: '100%', overflow: 'auto' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 20, 30, 50, 100]}
                sx={{
                    '& .MuiDataGrid-cell': {
                        overflow: 'hidden',
                    },
                    '& .sticky-column': {
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        backgroundColor: 'white',
                    },
                    '@media (max-width: 600px)': {
                        // Ensure the header names are visible in mobile view
                        '& .MuiDataGrid-columnHeaders': {
                            display: 'block',
                        },
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#B0B0B0', 
                        color: 'black', 
                        fontWeight: 'bold',
                    },
                    '& .low-stock': {
                        backgroundColor: '#FFDDDD', // Pale red background
                    },
                }}
                getRowId={(row) => row.id}
                disableSelectionOnClick
                getRowClassName={(params) => 
                    params.row.qty <= 10 ? 'low-stock' : ''
                }
                componentsProps={{
                    columnMenu: {
                        display: 'none',
                    }
                }}
            />
        </Paper>
    );
}
