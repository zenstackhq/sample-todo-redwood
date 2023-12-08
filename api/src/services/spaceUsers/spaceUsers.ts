import type {
  MutationResolvers,
  QueryResolvers,
  SpaceUserRelationResolvers,
} from 'types/graphql'

import { RedwoodGraphQLError } from '@redwoodjs/graphql-server'

export const spaceUsers: QueryResolvers['spaceUsers'] = ({ slug }) => {
  return context.db.spaceUser.findMany({
    where: { space: { slug } },
    include: { space: true, user: true },
  })
}

export const spaceUser: QueryResolvers['spaceUser'] = ({ id }) => {
  return context.db.spaceUser.findUnique({
    where: { id },
    include: { space: true, user: true },
  })
}

export class MemberAlreadyExistError extends RedwoodGraphQLError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, extensions)
  }
}

export class UserNotFoundError extends RedwoodGraphQLError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, extensions)
  }
}

export const createSpaceUser: MutationResolvers['createSpaceUser'] = async ({
  input,
}) => {
  try {
    return await context.db.spaceUser.create({
      data: {
        role: input.role,
        space: { connect: { slug: input.spaceSlug } },
        user: { connect: { email: input.email } },
      },
    })
  } catch (err) {
    if (err.code === 'P2002') {
      throw new MemberAlreadyExistError('User is already a member of the space')
    } else if (err.code === 'P2025') {
      throw new UserNotFoundError('User not found')
    } else {
      throw err
    }
  }
}

export const updateSpaceUser: MutationResolvers['updateSpaceUser'] = ({
  id,
  input,
}) => {
  return context.db.spaceUser.update({
    data: {
      role: input.role,
      space: input.spaceSlug
        ? { connect: { slug: input.spaceSlug } }
        : undefined,
      user: input.userId ? { connect: { id: input.userId } } : undefined,
    },
    where: { id },
  })
}

export const deleteSpaceUser: MutationResolvers['deleteSpaceUser'] = ({
  id,
}) => {
  return context.db.spaceUser.delete({
    where: { id },
  })
}

export const SpaceUser: SpaceUserRelationResolvers = {
  space: (_obj, { root }) => {
    return context.db.spaceUser.findUnique({ where: { id: root?.id } }).space()
  },
  user: (_obj, { root }) => {
    return context.db.spaceUser.findUnique({ where: { id: root?.id } }).user()
  },
}
