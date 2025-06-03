import { prisma } from "@libs/prisma";
import { Prisma } from "@prisma/client";

const serviceService = {
  get: async () => await prisma.service.findMany(),

  getById: async (id: string) =>
    await prisma.service.findFirst({ where: { id } }),

  create: async ({ description, price }: Prisma.ServiceCreateInput) =>
    await prisma.service.create({
      data: { description, price },
      select: {
        id: true,
        description: true,
        price: true,
      },
    }),

  update: async (
    id: string,
    { description, price }: Prisma.ServiceUpdateInput
  ) =>
    await prisma.service.update({
      where: { id },
      data: { description, price },
      select: {
        id: true,
        description: true,
        price: true,
      },
    }),

  delete: async (id: string) => await prisma.service.delete({ where: { id } }),
};

export { serviceService };
