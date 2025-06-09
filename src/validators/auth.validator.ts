import z from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string(),
});

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string(),
});

const authValidador = {
  register: (data: unknown) => registerSchema.safeParse(data),
  login: (data: unknown) => loginSchema.safeParse(data),
};

export { authValidador };
