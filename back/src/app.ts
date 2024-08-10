import express from "express";
import { connectDB, connectRedis } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import {logger} from './logs/logger'

import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";
import mongoose from "mongoose";
import { User } from "./models/user.js";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
const redisURI = process.env.REDIS_URI || "";
export const redisTTL = process.env.REDIS_TTL || 60 * 60 * 4;

connectDB(mongoURI);
export const redis = connectRedis(redisURI);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const stripe = new Stripe(stripeKey);

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.CLIENT_URL!],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});



app.post('/api/register', async (req, res) => {
  try {
    const { name, email, gender, dob, photo } = req.body;

    const newUser = new User({
      _id: new mongoose.Types.ObjectId().toString(), 
      name,
      email,
      photo,
      gender, 
      role: 'user', 
      dob,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: 'Registration failed' });
  }
});



app.post('/api/login', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    //const isMatch = await bcrypt.compare(password, user.password);




    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

   // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id:user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        gender: user.gender,
        dob: user.dob,
        role: user.role
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});
