const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const contactRoute = require("./routes/contactRoutes");
const userRoute = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

connectDB();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", contactRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
});