import type { SpaceUser } from '@prisma/client'

import {
  spaceUsers,
  spaceUser,
  createSpaceUser,
  updateSpaceUser,
  deleteSpaceUser,
} from './spaceUsers'
import type { StandardScenario } from './spaceUsers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('spaceUsers', () => {
  scenario('returns all spaceUsers', async (scenario: StandardScenario) => {
    const result = await spaceUsers()

    expect(result.length).toEqual(Object.keys(scenario.spaceUser).length)
  })

  scenario('returns a single spaceUser', async (scenario: StandardScenario) => {
    const result = await spaceUser({ id: scenario.spaceUser.one.id })

    expect(result).toEqual(scenario.spaceUser.one)
  })

  scenario('creates a spaceUser', async (scenario: StandardScenario) => {
    const result = await createSpaceUser({
      input: {
        updatedAt: '2023-12-05T02:34:45.820Z',
        spaceId: scenario.spaceUser.two.spaceId,
        userId: scenario.spaceUser.two.userId,
        role: 'USER',
      },
    })

    expect(result.updatedAt).toEqual(new Date('2023-12-05T02:34:45.820Z'))
    expect(result.spaceId).toEqual(scenario.spaceUser.two.spaceId)
    expect(result.userId).toEqual(scenario.spaceUser.two.userId)
    expect(result.role).toEqual('USER')
  })

  scenario('updates a spaceUser', async (scenario: StandardScenario) => {
    const original = (await spaceUser({
      id: scenario.spaceUser.one.id,
    })) as SpaceUser
    const result = await updateSpaceUser({
      id: original.id,
      input: { updatedAt: '2023-12-06T02:34:45.820Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2023-12-06T02:34:45.820Z'))
  })

  scenario('deletes a spaceUser', async (scenario: StandardScenario) => {
    const original = (await deleteSpaceUser({
      id: scenario.spaceUser.one.id,
    })) as SpaceUser
    const result = await spaceUser({ id: original.id })

    expect(result).toEqual(null)
  })
})
