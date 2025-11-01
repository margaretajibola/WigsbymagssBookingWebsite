// components/ImageUpload.tsx

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file)); // preview
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "left", mt:2 }}>
      <input
        accept="image/*"
        type="file"
        id="upload-image"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <label htmlFor="upload-image">
        <Button
        variant="contained"
        component="span"
        startIcon={<CloudUploadIcon />}
        sx={{
            backgroundColor: "#6a1b9a", // purple
            "&:hover": { backgroundColor: "#4a148c" }, // darker on hover
            borderRadius: "30px",
            textTransform: "none", // keep normal text
        }}
        >
        </Button>
      </label>
      <Typography sx={{color:"gray", fontSize: "0.75rem"}}>
        UPLOAD IMAGE
      </Typography>

      {image && (
        <Box
          component="img"
          src={image}
          alt="Uploaded Preview"
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%", // makes it round
            objectFit: "cover",
            mt: 2,
          }}
        />
      )}
    </Box>
  );
};

export default ImageUpload;
