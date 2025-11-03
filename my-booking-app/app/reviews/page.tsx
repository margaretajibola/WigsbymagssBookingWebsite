// app/reviews/page.tsx

"use client"

import { Grid, Box, TextField, Button, Typography, Card, CardMedia, CardContent} from "@mui/material";
import ImageUpload from "@/components/reviews/ImageUpload";
import { useEffect, useState } from "react";
import { Review } from "@/types/review";

// //mock reviews data
// const reviews : Review[] = [
//     {id: 1, text: "Love it :)", image: "/img1.png"},
//     {id: 2, text: "Great customer service!"},
//     {id: 3, text: "In loveeee with my hair"},

// ]

export default function Reviews() {
    const [review, setReview] = useState("");
    const [image, setImage] = useState<string | null>(null); 
    const [fileName, setFileName] = useState<string | null>(null); 
    const [reviews, setReviews] = useState<Review[]>([]);
    const [, setLoading] = useState(false);

     // Fetch reviews from API
    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch("/api/reviews");
            const data = await res.json();
            setReviews(data);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        }
    };

    const handlePost = async () => {
        if (!review) {
        alert("Write a review before continuing");
        return;
        }

        setLoading(true);
        try{
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: review, image: image }),
            });
            if (res.ok) {
                setReview(""); // Clear form
                setImage(null); // Clear image
                setFileName(null); // Clear file name
                fetchReviews(); // Refresh reviews list
            } else {
                alert("Failed to post review. Please try again.");
            }
        }catch(error){
            console.error("Error posting review:", error);
            alert("Failed to post review. Please try again.");
        }finally{
            setLoading(false);
        }
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
                    <ImageUpload image={image} setImage={setImage} fileName={fileName} setFileName={setFileName}/>

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