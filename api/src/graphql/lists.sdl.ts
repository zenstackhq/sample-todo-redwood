export const schema = gql`
  type List {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    space: Space!
    spaceId: String!
    owner: User!
    ownerId: String!
    title: String!
    private: Boolean!
  }

  extend type User {
    lists: [List]!
  }

  extend type Space {
    lists: [List]!
  }

  type Query {
    lists(slug: String!): [List!]! @requireAuth
    list(id: String!): List @requireAuth
  }

  input CreateListInput {
    spaceSlug: String!
    ownerId: String!
    title: String!
    private: Boolean!
  }

  input UpdateListInput {
    spaceId: String
    ownerId: String
    title: String
    private: Boolean
  }

  type Mutation {
    createList(input: CreateListInput!): List! @requireAuth
    updateList(id: String!, input: UpdateListInput!): List! @requireAuth
    deleteList(id: String!): List! @requireAuth
  }
`
