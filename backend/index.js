import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectToMongoDB } from "./src/configs/db/connectToMongoDB.js";
import authRoutes from "./src/routes/auth/authRoutes.js";
import mailRoutes from "./src/routes/mail/mailRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/mail", mailRoutes);

//Test Routes
app.get("/", (req, res) => {
  res.send("Server up and running");
});

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(`MongoDB Connection Failed!! ${error}`));
