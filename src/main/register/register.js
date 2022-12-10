import { Box, Card, Container, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RegisterForm from "./register-form";

const Register = () => {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          py: {
            xs: "60px",
            md: "120px",
          },
        }}
      >
        <Card elevation={16} sx={{ p: 4 }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" align="center" sx={{ ml: 2.5 }}>
              Welcome to Big Star
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              mt: 3,
            }}
          >
            <RegisterForm />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Grid>
            <Link color="textSecondary" variant="body2" to="/">
              Click here to login screen
            </Link>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
