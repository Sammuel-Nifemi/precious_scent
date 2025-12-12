const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));   // <-- ADD THIS LINE

// ROUTES
const authRoute = require("./routes/auth");
const ordersRoute = require("./routes/orders");
const productsRoute = require("./routes/products");
const settingsRoute = require("./routes/settings");
const dashboardRoute = require("./routes/dashboard");

// Mount routes
app.use("/auth", authRoute);
app.use("/orders", ordersRoute);
app.use("/products", productsRoute);
app.use("/settings", settingsRoute);
app.use("/dashboard", dashboardRoute);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



