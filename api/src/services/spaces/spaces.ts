import type {
  QueryResolvers,
  MutationResolvers,
  SpaceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const spaces: QueryResolvers['spaces'] = () => {
  return db.space.findMany()
}

export const space: QueryResolvers['space'] = ({ id }) => {
  return db.space.findUnique({
    where: { id },
  })
}

export const spaceBySlug: QueryResolvers['spaceBySlug'] = ({ slug }) => {
  return db.space.findUnique({
    where: { slug },
  })
}

export const createSpace: MutationResolvers['createSpace'] = ({ input }) => {
  return db.space.create({
    data: input,
  })
}

export const updateSpace: MutationResolvers['updateSpace'] = ({
  id,
  input,
}) => {
  return db.space.update({
    data: input,
    where: { id },
  })
}

export const deleteSpace: MutationResolvers['deleteSpace'] = ({ id }) => {
  return db.space.delete({
    where: { id },
  })
}

export const Space: SpaceRelationResolvers = {
  members: (_obj, { root }) => {
    return db.space.findUnique({ where: { id: root?.id } }).members()
  },
}
