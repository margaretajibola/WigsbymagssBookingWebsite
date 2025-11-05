// app/services/installations/page.tsx

'use client'

import { useEffect, useState } from "react";
import { Box, Grid, Card, CardActionArea, CardContent, Typography, TextField } from "@mui/material";
import { ArrowRight } from "lucide-react"; // ✅ import arrow icons
import { useRouter } from "next/navigation";
import { Service } from "@/types/service";


export default function Installations() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [notes, setNotes] = useState("");

    const router = useRouter();

    // Fetch all installation services from API
    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        try{
            const res = await fetch("/api/services");
            const data = await res.json();
            const filteredData = data.filter((service: Service) => service.category === "Installations");
            setServices(filteredData);
        }catch (error) {
            console.error("Failed to fetch reviews:", error);
        }
    }
    

    const handleNext = () => {
        if (!selectedService) {
        alert("Please select a service before continuing.");
        return;
        }

        // Navigate to calendar with serviceId and notes as URL params
        const params = new URLSearchParams({
            serviceId: String(selectedService),
            notes: notes
        });
        router.push(`/calendar?${params.toString()}`);
    };

    return(
        <Box sx={{p:6}}>
            <Typography sx={{color: 'black', textTransform:'uppercase'}}>
                SELECT SERVICE - INSTALLATIONS 
            </Typography>

            {/* Services Grid */}
            <Grid container spacing={3} sx={{p:2}}>
                {services.map((service) => (
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
                        ? "bg-purple-300 text-white hover:bg-purple-600"
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
