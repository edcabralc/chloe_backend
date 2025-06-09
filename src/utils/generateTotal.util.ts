import { Prisma } from "@prisma/client";

type ServiceType = {
  id: string;
  description: string;
  price: Prisma.Decimal;
}[];

const generateTotal = (roomPrice: number, existingServices: ServiceType) => {
  const serviceTotal = existingServices.reduce((acc, service) => acc + Number(service.price), 0);

  const totalPrice = roomPrice + serviceTotal;

  return totalPrice;
};

export { generateTotal };
