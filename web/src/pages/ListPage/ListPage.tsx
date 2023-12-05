import { useQuery } from '@redwoodjs/web'

import BreadCrumb from 'src/components/BreadCrumb'
import TodosCell from 'src/components/TodosCell'

const ListPage = ({ slug, id }) => {
  const SPACE_LIST_QUERY = gql`
    query SpaceQuery($slug: String!, $id: String!) {
      spaceBySlug(slug: $slug) {
        id
        name
        slug
      }
      list(id: $id) {
        id
        title
      }
    }
  `
  const { data } = useQuery(SPACE_LIST_QUERY, {
    variables: { slug, id },
  })

  return (
    <>
      <BreadCrumb space={data?.spaceBySlug} list={data?.list} />
      <TodosCell listId={id} />
    </>
  )
}

export default ListPage
