import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useCurrentUser } from 'src/auth'
import SpacesCell from 'src/components/SpacesCell'

const HomePage = () => {
  const user = useCurrentUser()

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="mt-8 text-center flex flex-col items-center w-full">
        <h1 className="text-2xl text-gray-800">Welcome {user?.email}!</h1>

        <div className="w-full p-8">
          <h2 className="text-lg md:text-xl text-left mb-8 text-gray-700">
            Choose a space to start, or{' '}
            <Link to={routes.createSpace()} className="link link-primary">
              create a new one.
            </Link>
          </h2>
          <SpacesCell />
        </div>
      </div>
    </>
  )
}

export default HomePage
