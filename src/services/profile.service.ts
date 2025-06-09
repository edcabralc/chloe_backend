import { prisma } from "@libs/prisma";
import { Prisma } from "@prisma/client";

const profileService = {
  getAddressByUser: async (userId: string) => {
    return await prisma.address.findFirst({
      where: { userId },
    });
  },

  createAddress: async (
    userId: string,
    { cep, logradouro, numero, complemento, bairro, cidade, estado, pais }: Prisma.AddressCreateInput
  ) => {
    return await prisma.address.create({
      data: {
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        pais,
        user: { connect: { id: userId } },
      },
      select: {
        cep: true,
        logradouro: true,
        numero: true,
        complemento: true,
        bairro: true,
        cidade: true,
        estado: true,
        pais: true,
      },
    });
  },

  updateAddress: async (
    addressId: string,
    { cep, logradouro, numero, complemento, bairro, cidade, estado, pais }: Prisma.AddressUpdateInput
  ) => {
    return await prisma.address.update({
      where: { id: addressId },
      data: { cep, logradouro, numero, complemento, bairro, cidade, estado, pais },
    });
  },
};

export { profileService };
