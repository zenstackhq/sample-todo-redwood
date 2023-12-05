import type { QueryResolvers, UserRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  spaces: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).spaces()
  },
  lists: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).lists()
  },
  todos: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).todos()
  },
}
