import { Router } from "express";

const bookRouter = Router();

bookRouter.get("");
bookRouter.get("/:id");
bookRouter.post("");
bookRouter.patch("/:id");
bookRouter.delete("/:id");
