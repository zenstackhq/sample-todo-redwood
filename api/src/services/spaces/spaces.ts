import type {
  QueryResolvers,
  MutationResolvers,
  SpaceRelationResolvers,
} from 'types/graphql'

export const spaces: QueryResolvers['spaces'] = () => {
  return context.db.space.findMany()
}

export const space: QueryResolvers['space'] = ({ id }) => {
  return context.db.space.findUnique({
    where: { id },
  })
}

export const spaceBySlug: QueryResolvers['spaceBySlug'] = ({ slug }) => {
  return context.db.space.findUnique({
    where: { slug },
  })
}

export const createSpace: MutationResolvers['createSpace'] = ({ input }) => {
  return context.db.space.create({
    data: {
      ...input,
      members: {
        create: {
          role: 'ADMIN',
          user: { connect: { email: context.currentUser?.email } },
        },
      },
    },
  })
}

export const updateSpace: MutationResolvers['updateSpace'] = ({
  id,
  input,
}) => {
  return context.db.space.update({
    data: input,
    where: { id },
  })
}

export const deleteSpace: MutationResolvers['deleteSpace'] = ({ id }) => {
  return context.db.space.delete({
    where: { id },
  })
}

export const Space: SpaceRelationResolvers = {
  members: (_obj, { root }) => {
    return context.db.space.findUnique({ where: { id: root?.id } }).members()
  },
}
