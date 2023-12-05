import type { List, Space } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

type Props = {
  space?: Space
  list?: List
}

export default function BreadCrumb({ space, list }: Props) {
  const items: Array<JSX.Element> = []

  items.push(<Link to={routes.home()}>Home</Link>)

  if (space) {
    items.push(
      <Link to={routes.spaceHome({ slug: space.slug })}>{space.name}</Link>
    )
  }

  if (list) {
    items.push(
      <Link to={routes.list({ slug: space.slug, id: list.id })}>
        {list.title}
      </Link>
    )
  }

  return (
    <div className="text-sm text-gray-600 breadcrumbs px-8 py-2">
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
