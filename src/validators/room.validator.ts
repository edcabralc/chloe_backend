import z from "zod";

const roomSchemaCreate = z.object({
  name: z.string().min(1, "Nome do quarto é obrigatório"),
  type: z.string().min(1, "Tipo de quarto é obrigatório"),
  description: z.string().min(1, "Descrição do quarto é obrigatória"),
  price: z.number().min(0, "Preço do quarto deve ser um número positivo"),
});

const roomSchemaUpdate = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  status: z
    .enum([
      "AVAILABLE",
      "OCCUPIED",
      "MAINTENANCE",
      "CLEANING",
      "OUT_OF_SERVICE",
    ])
    .optional(),
});

const roomValidator = {
  create: (data: unknown) => roomSchemaCreate.safeParse(data),
  update: (data: unknown) => roomSchemaUpdate.safeParse(data),
};

export { roomValidator };
