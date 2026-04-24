import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5004;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); //CORS 
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);
connectDB().then(() => {
  app.listen(PORT, () => {
  console.log("Server satrted on PORT:", PORT);
  });
});


