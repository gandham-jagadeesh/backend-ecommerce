const express = require("express");
const app = express();
const db = require("./db/db");
app.use(express.json());

app.use("/api/v1/auth",require("./routes/authRoute"));

app.listen(5000,()=>{
    console.log("listening at port 5000");
});