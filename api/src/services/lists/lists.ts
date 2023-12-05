import type {
  QueryResolvers,
  MutationResolvers,
  ListRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const lists: QueryResolvers['lists'] = ({ slug }) => {
  return db.list.findMany({
    where: { space: { slug } },
    include: { owner: true, space: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const list: QueryResolvers['list'] = ({ id }) => {
  return db.list.findUnique({
    where: { id },
  })
}

export const createList: MutationResolvers['createList'] = ({ input }) => {
  const { ownerId, spaceSlug, ...rest } = input
  return db.list.create({
    data: {
      ...rest,
      owner: { connect: { id: ownerId } },
      space: { connect: { slug: spaceSlug } },
    },
  })
}

export const updateList: MutationResolvers['updateList'] = ({ id, input }) => {
  return db.list.update({
    data: input,
    where: { id },
  })
}

export const deleteList: MutationResolvers['deleteList'] = ({ id }) => {
  return db.list.delete({
    where: { id },
  })
}

export const List: ListRelationResolvers = {
  space: (_obj, { root }) => {
    return db.list.findUnique({ where: { id: root?.id } }).space()
  },
  owner: (_obj, { root }) => {
    return db.list.findUnique({ where: { id: root?.id } }).owner()
  },
  todos: (_obj, { root }) => {
    return db.list.findUnique({ where: { id: root?.id } }).todos()
  },
}
