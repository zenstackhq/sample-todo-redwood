export const schema = gql`
  type SpaceUser {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    space: Space!
    spaceId: String!
    user: User!
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
    spaceUsers(slug: String!): [SpaceUser!]! @requireAuth
    spaceUser(id: String!): SpaceUser @requireAuth
  }

  input CreateSpaceUserInput {
    spaceSlug: String!
    email: String!
    role: SpaceUserRole!
  }

  input UpdateSpaceUserInput {
    spaceSlug: String
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
