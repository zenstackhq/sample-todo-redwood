import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String3255720',
        updatedAt: '2023-12-05T02:40:21.844Z',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        email: 'String7024707',
        updatedAt: '2023-12-05T02:40:21.844Z',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
