import mongoose from "mongoose";
import express from "express";
import account from "./controllers/account.js";
import user from "./controllers/user.js";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

const config = dotenv.config().parsed;

const SESSION_SECRET = process.env.SESSION_SECRET || "your-secret";
const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(config.MONGO_URL);

  console.log("Connected!");

  const app = express();

  app.set("trust proxy", 1); // Trust the first proxy
  // Session configuration with MongoStore for MongoDB
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
        secure: false,
        httpOnly: true,
      },
    })
  );

  app.use("/photos", express.static("./idPhotos"));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    cors({
      origin: config.DEV_CLIENT_URL,
      credentials: true,
    })
  );

  app.use("/api/account", account);
  app.use("/api/user", user);

  app.listen(config.DEV_PORT);
} catch (e) {
  console.log(e);
  console.log("Tiesiog Bananas");
}
