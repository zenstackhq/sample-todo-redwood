import { useQuery } from '@redwoodjs/web'

import BreadCrumb from 'src/components/BreadCrumb/BreadCrumb'
import ListsCell from 'src/components/ListsCell'

const SpaceHomePage = ({ slug }: { slug: string }) => {
  const SPACE_QUERY = gql`
    query SpaceQuery($slug: String!) {
      spaceBySlug(slug: $slug) {
        id
        name
        slug
      }
    }
  `

  const { data } = useQuery(SPACE_QUERY, {
    variables: { slug },
  })

  return (
    <>
      <BreadCrumb space={data?.spaceBySlug} />
      <ListsCell slug={slug} />
    </>
  )
}

export default SpaceHomePage
