import { NextFunction, Response } from "express";
import { ExtendedRequest } from "types/extended-request";
import { Role } from "types/role.type";

const privilegeAccess = (...allowedRoles: Role[]) => {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user) {
      res.status(401).json({ error: "Usuário não autenticado" });
      return;
    }

    if (!allowedRoles.includes(user.role as Role)) {
      res.status(403).json({ error: "Acesso negado" });
      return;
    }

    next();
  };
};

export { privilegeAccess };
