import { Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Service } from "@/types/service";

interface ServiceCardProps {
  services: Service[];
  selectedService: number | null;
  setSelectedService: (id: number) => void;
}

export default function ServiceCard({ services, selectedService, setSelectedService }: ServiceCardProps) {
  return (
    <Grid container spacing={3} sx={{p:2}}>
      {services.map((service) => (
        <Grid size={12} key={service.id}>
          <Card
            sx={{
              borderRadius: "16px",
              background: selectedService === service.id ? "#E1BEE7" : "#F3E5F5", 
              width: 500, 
              height: 100
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
  );
}