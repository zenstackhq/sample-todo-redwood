export const schema = gql`
  type Todo {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    owner: User!
    ownerId: String!
    list: List!
    listId: String!
    title: String!
    completedAt: DateTime
  }

  extend type List {
    todos: [Todo]!
  }

  extend type User {
    todos: [Todo]!
  }

  type Query {
    todos(listId: String!): [Todo!]! @requireAuth
    todo(id: String!): Todo @requireAuth
  }

  input CreateTodoInput {
    ownerId: String!
    listId: String!
    title: String!
    completedAt: DateTime
  }

  input UpdateTodoInput {
    ownerId: String
    listId: String
    title: String
    completedAt: DateTime
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo! @requireAuth
    updateTodo(id: String!, input: UpdateTodoInput!): Todo! @requireAuth
    deleteTodo(id: String!): Todo! @requireAuth
  }
`
