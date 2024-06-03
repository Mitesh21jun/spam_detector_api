import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import contactRoutes from "./routes/contacts";

const app = express();

app.use(bodyParser.json());
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server online");
});
app.use("/api/", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
