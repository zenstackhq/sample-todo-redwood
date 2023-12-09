import type { PrismaClient } from '@prisma/client'

import type { GlobalContext as RWGlobalContext } from '@redwoodjs/graphql-server'

declare module '@redwoodjs/graphql-server' {
  interface GlobalContext extends RWGlobalContext {
    db: PrismaClient
  }
}
