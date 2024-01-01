import type { PrismaClient } from '@prisma/client'

declare module '@redwoodjs/graphql-server' {
  interface GlobalContext {
    db: PrismaClient
    currentUser: { id: string; email: string }
  }
}
