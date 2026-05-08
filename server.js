import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import products from "./data/products.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "public/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    category: String,
    discount: Number
  })
);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    wishlist: { type: Array, default: [] }
  })
);

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    userId: String,
    name: String,
    phone: String,
    address: String,
    products: Array,
    totalAmount: Number,
    paymentId: String,
    orderId: String,
    status: { type: String, default: "pending" }
  })
);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey"
    );

    req.userId = decoded.id;
    next();

  } catch {
    res.status(401).json({
      message: "Invalid token"
    });
  }
};

app.get("/seed", async (req, res) => {
  await Product.deleteMany({});

  const inserted = await Product.insertMany(products);

  res.json({
    message: "Seed Success",
    total: inserted.length
  });
});

app.get("/products", async (req, res) => {
  const { category, search } = req.query;

  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i"
    };
  }

  const data = await Product.find(filter);

  res.json(data);
});

app.get("/products/:id", async (req, res) => {
  const data = await Product.findById(req.params.id);

  res.json(data);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);

  await product.save();

  res.json(product);
});

app.post("/register", async (req, res) => {
  const exist = await User.findOne({
    email: req.body.email
  });

  if (exist) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    10
  );

  const user = new User({
    ...req.body,
    password: hashedPassword
  });

  await user.save();

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "7d" }
  );

  res.json({
    user,
    token
  });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials"
    });
  }

  const isMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "7d" }
  );

  res.json({
    user,
    token
  });
});

app.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.userId);

  res.json(user);
});

app.post("/wishlist/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);

  const item = req.body;

  const exists = user.wishlist.find(
    (p) => p._id === item._id
  );

  if (exists) {
    user.wishlist = user.wishlist.filter(
      (p) => p._id !== item._id
    );
  } else {
    user.wishlist.push(item);
  }

  await user.save();

  res.json(user.wishlist);
});

app.get("/wishlist/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);

  res.json(user?.wishlist || []);
});

app.post("/order", async (req, res) => {
  const order = new Order(req.body);

  await order.save();

  res.json(order);
});

app.get("/orders/:userId", async (req, res) => {
  const orders = await Order.find({
    userId: req.params.userId
  });

  res.json(orders);
});

app.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_" + Date.now()
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log("Server running on " + PORT)
);