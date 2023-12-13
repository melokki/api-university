import { prisma } from "../../../prisma/client";

export const resolvers = {
  Mutation: {
    sessions: () => ({}),
  },
  Query: {
    sessions: () => ({}),
  },
  SessionQueries: {
    get: async (_: string, args: { id: string }) => {
      const { id } = args;
      return await prisma.session.findUnique({
        where: {
          id,
        },
      });
    },
    getInfo: async (_: string, args: { id: string }) => {
      return await prisma.session.findFirst({
        where: {
          id: args.id,
        },
        include: {
          user: {
            include: {
              role: true,
            },
          },
        },
      });
    },
  },
  SessionMutations: {
    create: async (_: string, args: { userId: string }) => {
      const { userId } = args;
      return await prisma.session.create({
        data: {
          userId,
        },
      });
    },
  },
};
