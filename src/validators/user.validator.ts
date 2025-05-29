import z from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const userValidator = {
  create: (data: unknown) => userSchema.safeParse(data),
};

export { userValidator };
