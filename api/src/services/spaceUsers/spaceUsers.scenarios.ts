import type { Prisma, SpaceUser } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SpaceUserCreateArgs>({
  spaceUser: {
    one: {
      data: {
        updatedAt: '2023-12-05T02:34:45.835Z',
        role: 'USER',
        space: {
          create: {
            updatedAt: '2023-12-05T02:34:45.835Z',
            name: 'String',
            slug: 'String2895242',
          },
        },
        user: {
          create: {
            email: 'String172907',
            updatedAt: '2023-12-05T02:34:45.835Z',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-12-05T02:34:45.835Z',
        role: 'USER',
        space: {
          create: {
            updatedAt: '2023-12-05T02:34:45.835Z',
            name: 'String',
            slug: 'String4239702',
          },
        },
        user: {
          create: {
            email: 'String4092928',
            updatedAt: '2023-12-05T02:34:45.835Z',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<SpaceUser, 'spaceUser'>
