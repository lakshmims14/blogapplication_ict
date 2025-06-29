import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  
  useEffect(() => {
    if (location.state && location.state.blog) {
      setInputs({
        title: location.state.blog.title || "",
        content: location.state.blog.content || "",
        img_url: location.state.blog.img_url || "",
      });
    }
  }, [location.state]);
//inputs with default values
  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    
    if (location.state && location.state.blog) {
      axios
        .put(`http://localhost:3001/${location.state.blog._id}`, inputs)
        .then((res) => {
          alert(res.data.message || "Blog Updated Successfully");
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      // for adding a new blog
      axios
        .post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert(res.data.message || "Blog Added Successfully");
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "600px" }}
      >
        <TextField
          variant="outlined"
          placeholder="Title"
          onChange={inputHandler}
          name="title"
          value={inputs.title}
          fullWidth
        />
        <TextField
          variant="outlined"
          placeholder="Content"
          onChange={inputHandler}
          name="content"
          value={inputs.content}
          multiline
          rows={4}
          fullWidth
        />
        <TextField
          variant="outlined"
          placeholder="Image URL"
          onChange={inputHandler}
          name="img_url"
          value={inputs.img_url}
          fullWidth
        />

        <Button variant="contained" color="secondary" onClick={submitHandler}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Add;
