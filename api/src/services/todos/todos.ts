import type {
  QueryResolvers,
  MutationResolvers,
  TodoRelationResolvers,
} from 'types/graphql'

export const todos: QueryResolvers['todos'] = ({ listId }) => {
  return context.db.todo.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      listId,
    },
  })
}

export const todo: QueryResolvers['todo'] = ({ id }) => {
  return context.db.todo.findUnique({
    where: { id },
  })
}

export const createTodo: MutationResolvers['createTodo'] = ({ input }) => {
  return context.db.todo.create({
    data: input,
  })
}

export const updateTodo: MutationResolvers['updateTodo'] = ({ id, input }) => {
  return context.db.todo.update({
    data: input,
    where: { id },
  })
}

export const deleteTodo: MutationResolvers['deleteTodo'] = ({ id }) => {
  return context.db.todo.delete({
    where: { id },
  })
}

export const Todo: TodoRelationResolvers = {
  owner: (_obj, { root }) => {
    return context.db.todo.findUnique({ where: { id: root?.id } }).owner()
  },
  list: (_obj, { root }) => {
    return context.db.todo.findUnique({ where: { id: root?.id } }).list()
  },
}
