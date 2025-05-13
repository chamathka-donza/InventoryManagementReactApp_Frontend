import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#1E1E2F",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", // Match Header Color
                color: "white",
                textAlign: "center",
                py: 2,
                mt: "auto",
            }}
        >
            <Container>
                <Typography variant="body1">
                    &copy; {new Date().getFullYear()} Ranasinghe Motors. All Rights Reserved.
                </Typography>
                <Typography variant="body2">
                    Address: No.174, Panchikawatta Road, Colombo 10, Sri Lanka
                </Typography>
                <Typography variant="body2">Phone: +94714100525 | Email: ravinduperera@gmail.com</Typography>
            </Container>
        </Box>
    );
};

export default Footer;
