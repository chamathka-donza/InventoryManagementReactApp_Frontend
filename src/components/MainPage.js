import * as React from 'react';
import { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import InventoryTable from "./InventoryTable";

const MainPage = () => {
    const [rows, setRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // ✅ Search state

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleFetchData = async () => {
        const response = await fetch('http://localhost:5001/api/products');
        const data = await response.json();
        const dataWithUniqueIds = data.map((item) => ({ ...item, id: item._id }));
        setRows(dataWithUniqueIds);
    };



    // ✅ Filter rows based on searchQuery
    const filteredRows = rows.filter((product) =>
        product.model_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand_code?.brand_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.engine_model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.proc_description || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
        (product.vehicle || "").toLowerCase().includes(searchQuery.toLowerCase())       
    );
    
    

    return (
        <>
            {/* ✅ Search Bar */}
            <Box sx={{ padding: "20px", display: "flex", justifyContent: "center" }}>
                <TextField
                    label="Search by Model, Brand, or Engine"
                    variant="outlined"
                    sx={{ width: "50%" }} // ✅ Limit width to 50% of the container
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>

            {/* ✅ Pass filteredRows to InventoryTable */}
            <div style={{ padding: '20px' }}>
            <InventoryTable rows={filteredRows} setRows={setRows} />
            </div>
        </>
    );
}

export default MainPage;
