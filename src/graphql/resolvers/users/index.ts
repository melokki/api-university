import { prisma } from "../../../prisma/client";

export const resolvers = {
  Query: {
    users: async (_: string, _args: string) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    users: () => ({}),
  },
  UserMutations: {
    create: async (
      _: string,
      args: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
      }
    ) => {
      const { firstName, lastName, email, password, role } = args;

      return await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          role: {
            connect: {
              id: role,
            },
          },
        },
      });
    },
    update: async (
      _: string,
      args: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
      }
    ) => {
      const { id, firstName, lastName, email, password } = args;
      return await prisma.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      });
    },
  },
};
