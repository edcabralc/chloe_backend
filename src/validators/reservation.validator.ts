import z from "zod";

const reservationSchemaByGuest = z.object({
  peoples: z.number().min(1, "Número de pessoas deve ser pelo menos 1"),
  checkIn: z.string().min(1, "Data de check-in é obrigatória"),
  checkOut: z.string().min(1, "Data de check-out é obrigatória"),
  services: z.array(z.string().uuid()).optional(),
  room: z.string().uuid(),
});

const reservationUpdateSchema = reservationSchemaByGuest.partial().extend({
  id: z.string().uuid(),
});

const reservationSchemaByAdmin = reservationSchemaByGuest.extend({
  user: z.string().uuid(),
});

const reservationUpdateGetByUserSchema = z.object({
  peoples: z.number().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  services: z.array(z.string().uuid()).optional(),
});

const reservationValidator = {
  create: (data: unknown) => reservationSchemaByAdmin.safeParse(data),
  update: (data: unknown) => reservationUpdateSchema.safeParse(data),
  updateByUser: (data: unknown) => reservationUpdateGetByUserSchema.safeParse(data),
  createByUser: (data: unknown) => reservationSchemaByGuest.safeParse(data),
};

export { reservationValidator };
