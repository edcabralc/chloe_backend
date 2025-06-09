import { privateRoute } from "@middlewares/auth.middleware";
import { Router } from "express";

import { privilegeAccess } from "@middlewares/admin.middleware";
import { adminRoutes } from "@routes/admin.route";
import { authRoutes } from "@routes/auth.route";
import { guestRoutes } from "@routes/guest.route";

import { employeeRoutes } from "@routes/employee.route";
import { Role } from "types/role.type";

const mainRoutes = Router();

mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/me", privateRoute, privilegeAccess(Role.GUEST), guestRoutes);
mainRoutes.use("/employee", privateRoute, privilegeAccess(Role.ADMIN, Role.EMPLOYEE), employeeRoutes);
mainRoutes.use("/admin", privateRoute, privilegeAccess(Role.ADMIN), adminRoutes);

export { mainRoutes };
