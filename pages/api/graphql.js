import { createServer } from '@graphql-yoga/node'
import { useGraphQLMiddleware } from '@envelop/graphql-middleware'

const typeDefs = /* GraphQL */ `
  type Query {
    users: [User!]!
    secured: String!
  }
  type User {
    name: String
  }
`

const resolvers = {
  Query: {
    users() {
      return [{ name: 'Admin' }, { name: 'User' }]
    },
  },
}

// Middleware - Permissions
const code = 'supersecret'
const isLoggedIn = async (resolve, parent, args, ctx, info) => {

  console.log('Yoga authenticate')

  // Include your agent code as Authorization: <token> header.
  const permit = ctx.request.get('Authorization') === code

  if (!permit) {
    throw new Error(`Not authorised!`)
  }

  return resolve()
}

const permissions = {
  Query: {
    secured: isLoggedIn,
  },
  User: isLoggedIn,
}

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: '/api/graphql',
  graphiql: false, // uncomment to disable GraphiQL
  plugins: [useGraphQLMiddleware([permissions])],
})

export default server