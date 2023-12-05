export const schema = gql`
  type User {
    id: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Query {
    users: [User!]! @requireAuth
  }

  input CreateUserInput {
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    email: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }
`
