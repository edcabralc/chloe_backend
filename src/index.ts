import { mainRoutes } from "@/routes/main.routes";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = process.env.PORT;

const server = express();

server.use(cors());
server.use(express.urlencoded({ limit: "50000mb", extended: true }));
server.use(express.json());

server.use(mainRoutes);

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port || 3002}`);
});
