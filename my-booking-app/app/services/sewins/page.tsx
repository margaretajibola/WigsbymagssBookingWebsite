// app/services/installations/page.tsx

'use client'

import { useState } from "react";
import { Box, Grid, Card, CardActionArea, CardContent, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Service } from "@/types/service";

const sewinServices : Service[] =[
    {id: 'tradsewin', name: 'Traditional Leave-Out Sew-In', price: 130, extraNotes: 'Includes braid down and styling'},
    {id: 'closuresewin', name: 'Closure Sew-In', price: 140, extraNotes: 'Includes braid down, customization, and styling'},
    {id: 'frontalsewin', name: 'Frontal Sew-In', price: 160, extraNotes: 'Includes braid down, customization, and styling'},
];

export default function Sewins() {
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [notes, setNotes] = useState("");

    const router = useRouter();

    const handleNext = () => {
        if (!selectedService) {
        alert("Please select a service before continuing.");
        return;
        }

        // Example: Save selection to local storage or send to backend
        localStorage.setItem("bookingService", selectedService);
        localStorage.setItem("bookingNotes", notes);

        // Navigate to next booking step
        router.push("/calendar");
    };

    return(
        <Box sx={{p:4}}>
            <Typography sx={{color: 'black'}}>
                SELECT SERVICE - SEWINS
            </Typography>

            {/* Services Grid */}
            <Grid container spacing={3} sx={{p:2}}>
                {sewinServices.map((service) => (
                <Grid size={12} key={service.id}>
                    <Card
                    sx={{
                        border: selectedService === service.id ? "2px solid #673ab7" : "1px solid #ccc", width:500, height:100
                    }}>
                        <CardActionArea 
                            onClick={() => setSelectedService(service.id)}
                            sx={{
                            height: "100%",
                            "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                            }}>
                            <CardContent>
                                <Typography variant="body1"> Service Type: {service.name}</Typography>
                                <Typography variant="body1"> Price: {service.price} CAD</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {service.extraNotes}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                ))}
            </Grid>

            {/* Notes Field */}
            <Box sx={{ mt: 4, p: 2}}>
                <TextField
                sx={{width:700}}
                multiline
                rows={4}
                label="Additional Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                />
            </Box>

            {/* Next Button */}
            <Box sx={{ mt: 4, textAlign: "right" }}>
                <Button
                sx={{backgroundColor:'black'}}
                variant="contained"
                size="large"
                onClick={handleNext}
                >
                Next
                </Button>
            </Box>

        </Box>

        
    );

}
