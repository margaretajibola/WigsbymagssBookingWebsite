// app/services/reviews/page.tsx

"use client"

import { Grid, Box, TextField, Button, Typography, Card, CardMedia, CardContent} from "@mui/material";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Review } from "@/types/review";

//mock reviews data
const reviews : Review[] = [
    {id: 1, text: "Love it :)", image: "/img1.png"},
    {id: 2, text: "Great customer service!"},
    {id: 3, text: "In loveeee with my hair"},

]

export default function Reviews() {
    const [review, setReview] = useState("");

    const router = useRouter();

    const handlePost = () => {
        if (!review) {
        alert("Write a review before continuing");
        return;
        }

        // Example: Save selection to local storage or send to backend
        localStorage.setItem("customerReviews", review);

        // Navigate to next booking step
        router.push("/reviews");
    };

    return(
        <Grid container spacing={3} sx={{p:4, ml:25}}>
            <Grid size={6}>
                <Box sx={{p:2}}>
                    {/* Notes Field */}
                    <Typography sx={{color: 'black'}}>
                        LEAVE A REVIEW!
                    </Typography>
                    <Box sx={{ mt: 2}}>
                        <TextField
                        sx={{width:350}}
                        multiline
                        rows={4}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        />
                    </Box>

                    {/* Upload Image */}
                    <ImageUpload />

                    {/* Next Button */}
                    <Box sx={{ mt: 2, ml:33}}>
                        <Button
                        sx={{backgroundColor:'black'}}
                        variant="contained"
                        size="large"
                        onClick={handlePost}
                        >
                        Post
                        </Button>
                    </Box>
                </Box>

            </Grid>

            <Grid size={6}>
                <Box sx={{ p: 2 }}>
                    {/* Reviews */}
                    <Typography sx={{ color: "black" }}>
                    CUSTOMER REVIEWS
                    </Typography>
                    {reviews.map((r) => (
                    <Card sx={{ maxWidth: 300, mt: 2, border: "1px solid #ddd"}} key={r.id}>
                        {r.image && (
                        <CardMedia
                            component="img"
                            height="180"
                            image={r.image}
                            alt="Customer review"
                        />
                        )}
                        <CardContent>
                            <Typography variant="body1">{r.text}</Typography>
                        </CardContent>
                    </Card>
                    ))}
                </Box>
            </Grid>
        </Grid>
        
    );
}