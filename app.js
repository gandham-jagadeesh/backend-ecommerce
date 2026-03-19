const express = require("express");
const app = express();
const admin = require("./middleware/admin");
app.use(express.json());

app.use("/api/v1/auth",require("./routes/authRoute"));
app.use("/api/v1/admin",require("./routes/productRoute"));
app.listen(5000,()=>{
    console.log("listening at port 5000");
});