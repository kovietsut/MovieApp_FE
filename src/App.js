import { ThemeProvider } from "@mui/styles";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./main/login/login";
import Movie from "./main/movie/Movie";
import Register from "./main/register/register";
import PrivateRoute from "./routes/PrivateRoute";
import theme from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-center" />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact element={<PrivateRoute />}>
          <Route path="/movie" element={<Movie />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
