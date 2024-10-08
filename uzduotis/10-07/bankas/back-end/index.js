import mongoose from "mongoose";
import express from "express";
import account from "./controllers/account.js";
import user from "./controllers/user.js";
import cors from "cors";
import dotenv from "dotenv";

const config = dotenv.config().parsed;

try {
  await mongoose.connect(config.MONGO_URL);

  console.log("Connected!");

  const app = express();

  app.use("/photos", express.static("./idPhotos"));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    cors({
      origin: config.DEV_CLIENT_URL,
    })
  );

  app.use("/api/account", account);
  app.use("/api/user", user);

  app.listen(config.DEV_PORT);
} catch (e) {
  console.log(e);
  console.log("Prisijungimas nepavyko");
}
