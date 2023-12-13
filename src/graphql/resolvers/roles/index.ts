import { prisma } from "../../../prisma/client";

export const resolvers = {
  Mutation: {
    roles: () => ({}),
  },
  RoleMutations: {
    create: async (_: string, args: { name: string }) => {
      const { name } = args;
      return await prisma.role.create({
        data: {
          name,
        },
      });
    },
    update: async (_: string, args: { id: string; name: string }) => {
      const { id, name } = args;
      return await prisma.role.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    },
    delete: async (_: string, args: { id: string }) => {
      const { id } = args;
      return await prisma.role.delete({
        where: {
          id,
        },
      });
    },
  },
};
