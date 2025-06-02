import { mainRoutes } from "@/routes/main.route";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = process.env.PORT;

const server = express();

const corsOptions = {
  origin: "*", // Permite requisições de qualquer origem
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], // Métodos permitidos
};

server.use(cors(corsOptions));
server.use(express.urlencoded({ limit: "50000mb", extended: true }));
server.use(express.json());

server.get("/ping", (_req, res) => {
  res.status(200).json({ pong: true });
});

server.use(mainRoutes);

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port || 3002}`);
});
