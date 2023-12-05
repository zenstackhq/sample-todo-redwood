import type {
  QueryResolvers,
  MutationResolvers,
  SpaceUserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const spaceUsers: QueryResolvers['spaceUsers'] = () => {
  return db.spaceUser.findMany()
}

export const spaceUser: QueryResolvers['spaceUser'] = ({ id }) => {
  return db.spaceUser.findUnique({
    where: { id },
  })
}

export const createSpaceUser: MutationResolvers['createSpaceUser'] = ({
  input,
}) => {
  return db.spaceUser.create({
    data: input,
  })
}

export const updateSpaceUser: MutationResolvers['updateSpaceUser'] = ({
  id,
  input,
}) => {
  return db.spaceUser.update({
    data: input,
    where: { id },
  })
}

export const deleteSpaceUser: MutationResolvers['deleteSpaceUser'] = ({
  id,
}) => {
  return db.spaceUser.delete({
    where: { id },
  })
}

export const SpaceUser: SpaceUserRelationResolvers = {
  space: (_obj, { root }) => {
    return db.spaceUser.findUnique({ where: { id: root?.id } }).space()
  },
  user: (_obj, { root }) => {
    return db.spaceUser.findUnique({ where: { id: root?.id } }).user()
  },
}
