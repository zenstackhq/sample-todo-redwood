import type { SpacesQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query SpacesQuery {
    spaces {
      id
      name
      slug
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <></>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-red-600">Error: {error?.message}</div>
)

export const Success = ({ spaces }: CellSuccessProps<SpacesQuery>) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {spaces?.map((space) => (
        <Link key={space.id} to={routes.spaceHome({ slug: space.slug })}>
          <li className="card w-80 h-32 flex justify-center shadow-xl text-gray-600 cursor-pointer hover:bg-gray-50 border">
            <div className="w-full h-full flex relative justify-center items-center">
              <div className="card-body" title={space.name}>
                <h2 className="card-title line-clamp-1">{space.name}</h2>
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  )
}
