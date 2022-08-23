
export const typeDefs = /* GraphQL */ `
    type Query {
        ping: String!
        users: [User!]!
    }

    type Mutation {
        saveUser(user:InputUser) : User
    }

    input InputUser {
        firstname: String!
        lastname: String
    }

    type User {
        id: String!
        firstname: String!
        lastname: String
    }
`