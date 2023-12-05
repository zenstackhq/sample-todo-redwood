/* eslint-disable jsx-a11y/anchor-is-valid */
import type { Space } from '@prisma/client'

import { AuthUser, useAuth } from 'src/auth'

import Avatar from '../Avatar'

type Props = {
  space: Space | undefined
  user: AuthUser | undefined
}

export default function NavBar({ user, space }: Props) {
  const { logOut } = useAuth()

  return (
    <div className="navbar bg-base-100 px-8 py-2 border-b">
      <div className="flex-1">
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <div className="text-xl font-semibold ml-2 text-slate-700 hidden md:inline-block">
            {space?.name || 'Welcome Todo App'}
          </div>
          <p className="text-xs ml-2 text-gray-500 self-end">
            Powered by ZenStack
          </p>
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user && <Avatar user={user} />}
          </div>
          <ul className="mt-3 z-[1] shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li className="border-b border-gray-200 py-1">
              {user && <div>{user.email}</div>}
            </li>
            <li className="py-1">
              <button onClick={logOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
