// app/services/installations/page.tsx

'use client'

import { useState } from "react";
import { Box, Grid, Card, CardActionArea, CardContent, Typography, TextField } from "@mui/material";
import { ArrowRight } from "lucide-react"; // ✅ import arrow icons
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
        <Box sx={{p:6}}>
            <Typography sx={{color: 'black', textTransform:'uppercase'}}>
                SELECT SERVICE - SEWINS
            </Typography>

            {/* Services Grid */}
            <Grid container spacing={3} sx={{p:2}}>
                {sewinServices.map((service) => (
                <Grid size={12} key={service.id}>
                    <Card
                     sx={{
                        borderRadius: "16px",
                        background: selectedService === service.id ? "#E1BEE7" : "#F3E5F5", width:500, height:100
                    }}>
                        <CardActionArea 
                            onClick={() => setSelectedService(service.id)}
                            sx={{
                            height: "100%",
                            "&:hover": {
                            backgroundColor: "#EDE7F6",
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
                sx={{width:350}}
                multiline
                rows={4}
                label="Additional Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                />
            </Box>

            {/* Next Button */}
            <Box sx={{ mt: 4, textAlign: "right" }}>
                <button
                    disabled={!selectedService}
                    className={`p-3 rounded-full shadow-sm transition ${
                        selectedService
                        ? "bg-purple-300 hover:bg-purple-300 text-white"
                        : "bg-gray-100 cursor-not-allowed text-gray-400"
                    }`}
                    aria-label="Next"
                    onClick={handleNext}
                    >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </Box>

        </Box>

        
    );

}
