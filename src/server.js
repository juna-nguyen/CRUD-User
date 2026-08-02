import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerSpec from "./docs/swagger.js";

dotenv.config();
const app = express();

app.use(express.json());
connectDB();

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => res.json(swaggerSpec));

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
