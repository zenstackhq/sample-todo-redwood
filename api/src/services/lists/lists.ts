import type {
  ListRelationResolvers,
  MutationResolvers,
  QueryResolvers,
} from 'types/graphql'

export const lists: QueryResolvers['lists'] = ({ slug }) => {
  return context.db.list.findMany({
    where: { space: { slug } },
    orderBy: { createdAt: 'desc' },
  })
}

export const list: QueryResolvers['list'] = ({ id }) => {
  return context.db.list.findUnique({
    where: { id },
  })
}

export const createList: MutationResolvers['createList'] = ({ input }) => {
  const { ownerId, spaceSlug, ...rest } = input
  return context.db.list.create({
    data: {
      ...rest,
      owner: { connect: { id: ownerId } },
      space: { connect: { slug: spaceSlug } },
    },
  })
}

export const updateList: MutationResolvers['updateList'] = ({ id, input }) => {
  return context.db.list.update({
    data: input,
    where: { id },
  })
}

export const deleteList: MutationResolvers['deleteList'] = ({ id }) => {
  return context.db.list.delete({
    where: { id },
  })
}

export const List: ListRelationResolvers = {
  space: (_obj, { root }) => {
    return context.db.list.findUnique({ where: { id: root?.id } }).space()
  },
  owner: (_obj, { root }) => {
    return context.db.list.findUnique({ where: { id: root?.id } }).owner()
  },
  todos: (_obj, { root }) => {
    return context.db.list.findUnique({ where: { id: root?.id } }).todos()
  },
}
