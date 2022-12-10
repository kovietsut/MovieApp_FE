import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Item from "../common/Item";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import { movieApi } from "../../service/movie-api";

const Movie = () => {
  const username = localStorage.getItem("username");
  const [listMovie, setListMovie] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await movieApi.getList();
      if (response.data) {
        setListMovie(response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ backgroundColor: "#095394" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>Welcome {username}</Item>
          </Grid>
        </Grid>
      </Box>
      {listMovie.map((item, key) => {
        return (
          <Box key={key} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ m: 1 }}>
                  <Box sx={{ p: 1 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      height="680"
                      image={item.imageContent}
                      alt="green iguana"
                    />
                    <CardActions sx={{ justifyContent: "space-between" }}>
                      <Typography>{item.likes} likes</Typography>
                      <IconButton aria-label="like">
                        <ThumbUpIcon />
                      </IconButton>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </>
  );
};

export default Movie;
