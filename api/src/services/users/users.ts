import type { QueryResolvers, UserRelationResolvers } from 'types/graphql'

export const users: QueryResolvers['users'] = () => {
  return context.db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return context.db.user.findUnique({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  spaces: (_obj, { root }) => {
    return context.db.user.findUnique({ where: { id: root?.id } }).spaces()
  },
  lists: (_obj, { root }) => {
    return context.db.user.findUnique({ where: { id: root?.id } }).lists()
  },
  todos: (_obj, { root }) => {
    return context.db.user.findUnique({ where: { id: root?.id } }).todos()
  },
}
