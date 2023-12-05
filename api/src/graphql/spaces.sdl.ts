export const schema = gql`
  type Space {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    slug: String!
  }

  type Query {
    spaces: [Space!]! @requireAuth
    space(id: String!): Space @requireAuth
    spaceBySlug(slug: String!): Space @requireAuth
  }

  input CreateSpaceInput {
    name: String!
    slug: String!
  }

  input UpdateSpaceInput {
    name: String
    slug: String
  }

  type Mutation {
    createSpace(input: CreateSpaceInput!): Space! @requireAuth
    updateSpace(id: String!, input: UpdateSpaceInput!): Space! @requireAuth
    deleteSpace(id: String!): Space! @requireAuth
  }
`
