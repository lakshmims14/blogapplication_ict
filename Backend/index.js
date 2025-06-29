const express = require("express");
const cors = require("cors");
const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());

// DB connection & model
require("./connection");
const BlogModel = require("./model");

app.get("/", (req, res) => res.send("hello"));

app.post("/", async (req, res) => {
  try {
    await BlogModel(req.body).save();
    res.send("Data added");
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;
    const newBlog = new BlogModel({ title, content, img_url });
    await newBlog.save();
    res.status(201).send(newBlog);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.get("/get", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send("Blog Updated Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});


app.delete("/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.send("Blog Deleted Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
