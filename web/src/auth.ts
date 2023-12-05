import { createDbAuthClient, createAuth } from '@redwoodjs/auth-dbauth-web'

const dbAuthClient = createDbAuthClient()

export type AuthUser = { id: string; email: string }

export const useCurrentUser = () => {
  const { currentUser } = useAuth()
  return currentUser ? (currentUser as AuthUser) : undefined
}

export const { AuthProvider, useAuth } = createAuth(dbAuthClient)
