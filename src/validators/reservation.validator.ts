import z from "zod";

const reservationSchema = z.object({
  peoples: z.number().min(1, "Número de pessoas deve ser pelo menos 1"),
  checkIn: z.string().min(1, "Data de check-in é obrigatória"),
  checkOut: z.string().min(1, "Data de check-out é obrigatória"),
  totalDiscount: z.number().min(0, "Desconto total não pode ser negativo"),
  total: z.number().min(0, "Total não pode ser negativo"),
  // room: z.object({ id: z.string().min(1, "ID do quarto é obrigatório") }),
  // user: z.object({ id: z.string().min(1, "ID do usuário é obrigatório") }),
  user: z.string().uuid(),
  room: z.string().uuid(),
});

const reservationValidator = {
  create: (data: unknown) => reservationSchema.safeParse(data),
};

export { reservationValidator };
