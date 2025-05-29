import z from "zod";

const roomSchema = z.object({
  name: z.string().min(1, "Nome do quarto é obrigatório"),
  type: z.string().min(1, "Tipo de quarto é obrigatório"),
  description: z.string().min(1, "Descrição do quarto é obrigatória"),
  price: z.number().min(0, "Preço do quarto deve ser um número positivo"),
});

const roomValidator = {
  create: (data: unknown) => roomSchema.safeParse(data),
};

export { roomValidator };
