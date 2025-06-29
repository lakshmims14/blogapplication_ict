const mongoose = require("mongoose");
//Write missing code here
mongoose
  .connect("mongodb+srv://usernamee:password@cluster0.zzl6qou.mongodb.net/ict?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
