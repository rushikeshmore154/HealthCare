import React from "react";
import { Button, Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignupSelectionPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" className="mt-5 text-center">
      <Typography variant="h4" gutterBottom>
        Choose Signup Type
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Please select whether you're a User or a Hospital
      </Typography>
      <Grid container spacing={3} justifyContent="center" className="mt-4">
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/signup/user")}
          >
            User Signup
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate("/signup/hospital")}
          >
            Hospital Signup
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
