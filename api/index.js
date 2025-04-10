const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connect to database successfully");
    })
    .catch(() => {
        console.log("Failed to connect to database");
    })

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(8800, () => {
    console.log("Listening on port 8800");
})