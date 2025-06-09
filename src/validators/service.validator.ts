import z from "zod";

const serviceSchema = z.object({
  description: z.string().min(1, "Descrição do serviço é obrigatória"),
  price: z.number().min(0, "Preço do serviço deve ser um número positivo"),
});

const serviceSchemaUpdate = z.object({
  description: z.string().optional(),
  price: z
    .number()
    .min(0, "Preço do serviço deve ser um número positivo")
    .optional(),
});

const serviceValidator = {
  create: (data: unknown) => serviceSchema.safeParse(data),
  update: (data: unknown) => serviceSchemaUpdate.safeParse(data),
};

export { serviceValidator };
