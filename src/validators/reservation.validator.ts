import z from "zod";

const reservationSchema = z.object({
  peoples: z.number().min(1, "Número de pessoas deve ser pelo menos 1"),
  checkIn: z.string().min(1, "Data de check-in é obrigatória"),
  checkOut: z.string().min(1, "Data de check-out é obrigatória"),
  user: z.string().uuid(),
  room: z.string().uuid(),
  services: z.array(z.string().uuid()).optional(),
});

const reservationValidator = {
  create: (data: unknown) => reservationSchema.safeParse(data),
};

export { reservationValidator };
