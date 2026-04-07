const express = require("express");
const errorMiddleware = require("./middleware/errorMiddleware");
const logginMiddleware = require("./middleware/loggingMiddleware");
const app = express();
app.use(express.json());

app.use(logginMiddleware);

app.use("/api/v1/auth",require("./routes/authRoute"));
app.use("/api/v1/admin/products",require("./routes/productRoute"));
app.use("/api/v1/admin/categories",require("./routes/categoriesRoute"));
app.use("/api/v1/carts",require("./routes/cartRoute"));
app.use("/api/v1/products",require("./routes/publicProductRoute"));
app.use("/api/v1/checkout",require("./routes/checkoutRoute"));
app.use("/api/v1/payments",require("./routes/paymentRoute"));

app.use(errorMiddleware);

app.listen(5000,()=>{
    console.log("listening at port 5000");
});