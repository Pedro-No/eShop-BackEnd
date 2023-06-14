require("dotenv").config();
require("./db");

const express = require("express");

const app = express();

// Basic App setup
require("./config")(app);

// Endpoint Setup

// Test
const indexRoutes = require("./routes/index.routes");
app.use("/test", indexRoutes);

// Authentication
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// Illustration
const illustrationRoutes = require("./routes/illustration.routes");
app.use("/api", illustrationRoutes);

// User
const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);

// Payment
const paymentRoutes = require("./routes/payment.routes");
app.use("/api", paymentRoutes);

// Error
require("./error")(app);

module.exports = app;
