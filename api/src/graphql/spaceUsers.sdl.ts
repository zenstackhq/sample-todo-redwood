export const schema = gql`
  type SpaceUser {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    space: Space!
    spaceId: String!
    # user: User!
    userId: String!
    role: SpaceUserRole!
  }

  extend type Space {
    members: [SpaceUser]!
  }

  extend type User {
    spaces: [SpaceUser]!
  }

  enum SpaceUserRole {
    USER
    ADMIN
  }

  type Query {
    spaceUsers: [SpaceUser!]! @requireAuth
    spaceUser(id: String!): SpaceUser @requireAuth
  }

  input CreateSpaceUserInput {
    spaceId: String!
    userId: String!
    role: SpaceUserRole!
  }

  input UpdateSpaceUserInput {
    spaceId: String
    userId: String
    role: SpaceUserRole
  }

  type Mutation {
    createSpaceUser(input: CreateSpaceUserInput!): SpaceUser! @requireAuth
    updateSpaceUser(id: String!, input: UpdateSpaceUserInput!): SpaceUser!
      @requireAuth
    deleteSpaceUser(id: String!): SpaceUser! @requireAuth
  }
`
