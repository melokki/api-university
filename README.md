# API University

## Technologies

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [TypeScript](https://www.typescriptlang.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL](https://graphql.org/)

## How to run

Clone the repository, make sure you rename the `.env.example` file to `.env` and fill the variables with your own values.

after that, run the following command:

```bash
docker compose up -d
```

This command will build and pull the missing the images and run the containers.

The application will run at: `http://localhost:4000/api`

You can see the available graphql queries and mutations in the playground at `https://studio.apollographql.com/sandbox/explorer`

### Available queries and mutations

#### Queries

- users - get a list with all the users
- session
  - get - get the basic information about the session, like the id and the expiration date
  - getInfo - get the basic information about the session and the user together with its roles

#### Mutations

- roles
  - create - create a new role
  - update - update a role
  - delete - delete a role
- users
  - create - create a new user
  - update - update a user
- sessions
  - create - create a new session

## Add more queries and mutations

The project is using GraphQL and Apollo Server. The GraphQL schema is located at `src/graphql/schema.gql`. Here you will find an empty `Query` and `Mutation` type.
The actual `GraphQL` types are located at `src/graphql/types`. Here you'll find one directory for each type and inside each directory you'll find the `.gql` file with the type definition. Each type extends either the `Query` or `Mutation` type in order to add its specific queries and mutations.

The resolvers are located at `src/graphql/resolvers`. Here you'll find one directory for each type and inside each directory you'll find the `index.ts` file with the resolvers for the type. Each resolver is a function that receives the parent, the arguments and the context and returns the result of the resolver.
