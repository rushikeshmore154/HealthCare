import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import {
  Container,
  Typography,
  Card,
  Grid,
  CircularProgress,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import UserLayout from "@/components/userLayout";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/user/profile", {
          headers: { authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Failed to load user profile.
        </Typography>
      </Container>
    );
  }

  return (
    <UserLayout>
      <Box
        sx={{
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          minHeight: "100vh",
          py: 5,
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 6,
              backgroundColor: "#ffffffdd",
              backdropFilter: "blur(5px)",
              padding: 3,
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: "auto",
                  bgcolor: "#1976d2",
                  fontSize: 32,
                }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {user.name}
              </Typography>
              <Typography color="text.secondary">{user.email}</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" color="primary">
                  Contact No.:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{user.contactNumber || "N/A"}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" color="primary">
                  Total Requests:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{user.requests?.length || 0}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" color="primary">
                  Appointments:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{user.appointments?.length || 0}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    </UserLayout>
  );
};

export default ProfilePage;
