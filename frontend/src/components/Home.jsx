import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  
  const fetchBlogs = () => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete a blog by id
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/${id}`)
      .then(() => {
        alert("Blog Deleted Successfully");
        fetchBlogs();
      })
      .catch((err) => console.log(err));
  };

  // Navigate to the add 
  const updateBlog = (blog) => {
    navigate("/add", { state: { blog } });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={1}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card
             sx={{
                maxWidth: 370, 
                width: "100%",
                
              }}>
              {blog.img_url && (
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.img_url}
                  alt={blog.title}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxHeight: 110,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {blog.content}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "flex-start", px: 2, pb: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "purple",
                    "&:hover": {
                      backgroundColor: "#8a2be2", 
                    },
                  }}
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "purple",
                    ml: 1,
                    "&:hover": {
                      backgroundColor: "#8a2be2",
                    },
                  }}
                  onClick={() => updateBlog(blog)}
                >
                  Update
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;