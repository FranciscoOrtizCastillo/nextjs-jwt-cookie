import { createServer, GraphQLYogaError } from '@graphql-yoga/node'
import { useGraphQLMiddleware } from '@envelop/graphql-middleware'
import { jwtVerify } from "jose";
import { csrf } from '../../src/csrf/csrf';
import { typeDefs } from '../../src/graphql/schema'
import resolvers from '../../src/graphql/resolvers'

// Middleware - Permissions

const getCookiesAsCollection = function (rawCookie) {
  const cookies = {};
  rawCookie && rawCookie.split(';').forEach(function (cookie) {
      const parts = cookie.match(/(.*?)=(.*)$/);
      if (parts && parts.length) {
          cookies[parts[1].trim()] = (parts[2] || '').trim();
      }
  });
  return cookies;
};

const isLoggedIn = async (resolve, root, args, context, info) => {

  const cookies = getCookiesAsCollection(context.request.headers.get('cookie'));
  const jwt = cookies.accessToken;

  if (!jwt) throw new GraphQLYogaError(`Not authorised!`)

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.SECRET)
    );
    //console.log({ payload });
    //console.log('authenticate OK !!!')
    return await resolve(root, args, context, info)
  } catch (error) {
    console.log(error);
    throw new GraphQLYogaError(`Not authorised!`)
  }
}

const permissions = {
  Query: {
    secured: isLoggedIn,
  },
  User: isLoggedIn,
}

const logInput = async (resolve, root, args, context, info) => {
  //console.log(`logInput: ${JSON.stringify(args)}`)
  const result = await resolve(root, args, context, info)
  //console.log(`logInput`)
  return result
}

const logResult = async (resolve, root, args, context, info) => {
  //console.log(`logResult`)
  const result = await resolve(root, args, context, info)
  //console.log(`logResult: ${JSON.stringify(result)}`)
  return result
}

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: '/api/graphql',
  graphiql: false, // uncomment to disable GraphiQL
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //plugins: [useGraphQLMiddleware([logInput, isLoggedIn, logResult])],
  // eslint-disable-next-line react-hooks/rules-of-hooks
  plugins: [useGraphQLMiddleware([isLoggedIn])],
})

export default csrf(server)