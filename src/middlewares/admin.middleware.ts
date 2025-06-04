import { NextFunction, Request, Response } from "express";
import { Role } from "types/role.type";

const adminMiddleware = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    next();
  };
};

export { adminMiddleware };
