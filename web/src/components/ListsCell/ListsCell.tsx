import { LockClosedIcon, TrashIcon } from '@heroicons/react/24/outline'
import { customAlphabet } from 'nanoid'
import type { ListsQuery } from 'types/graphql'

import {
  CheckboxField,
  FieldError,
  Form,
  Label,
  Submit,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import {
  useMutation,
  type CellFailureProps,
  type CellSuccessProps,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useCurrentUser } from 'src/auth'

import Avatar from '../Avatar'
import TimeInfo from '../TimeInfo'

export const QUERY = gql`
  query ListsQuery($slug: String!) {
    lists(slug: $slug) {
      id
      title
      private
      owner {
        id
        email
      }
      space {
        slug
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-red-600">Error: {error?.message}</div>
)

export const Success = ({
  lists,
  slug,
  queryResult: { refetch },
}: CellSuccessProps<ListsQuery> & { slug: string }) => {
  return (
    <div className="p-8">
      <div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <button
          className="btn btn-primary btn-wide"
          onClick={() =>
            document.getElementById('create-list-modal').showModal()
          }
        >
          Create a list
        </button>
      </div>

      <CreateDialog slug={slug} refetch={refetch} />

      <ul className="flex flex-wrap gap-6">
        {lists.map((item) => {
          return (
            <li key={item.id}>
              <List value={item} refetch={refetch}></List>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const CreateDialog = ({ slug, refetch }) => {
  const CREATE_LIST_MUTATION = gql`
    mutation createList($input: CreateListInput!) {
      createList(input: $input) {
        id
        title
        private
      }
    }
  `

  const [createList] = useMutation(CREATE_LIST_MUTATION, {
    onError: (error) => {
      toast.error('Error creating list: ' + error.message)
    },
    onCompleted: () => {
      formMethods.reset()
      close()
      refetch()
    },
  })

  const formMethods = useForm()
  const user = useCurrentUser()

  const close = () => {
    document.getElementById('create-list-modal').close()
  }

  const onSubmit = (data) => {
    createList({
      variables: {
        input: {
          ...data,
          ownerId: user.id,
          spaceSlug: slug,
        },
      },
    })
  }

  return (
    <dialog id="create-list-modal" className="modal">
      <div className="modal-box">
        <h2 className="font-bold text-xl mb-8">Create a list</h2>

        <Form
          formMethods={formMethods}
          onSubmit={onSubmit}
          className="flex-col w-full flex max-w-md"
        >
          <Label
            name="List title"
            className="label text-lg"
            errorClassName="label error"
          />
          <TextField
            name="title"
            className="input input-bordered w-full"
            placeholder="E.g.: My Personal List"
            validation={{ required: true }}
          />
          <FieldError name="name" className="text-red-600 block mt-2" />

          <Label
            name="Private"
            className="label text-lg mt-4"
            errorClassName="label error"
          />
          <CheckboxField name="private" className="checkbox" />

          <div className="flex mt-6 gap-2">
            <Submit className="btn btn-primary">Create</Submit>
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault()
                close()
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </dialog>
  )
}

const List = ({ value, refetch }) => {
  const DELETE_LIST_MUTATION = gql`
    mutation deleteList($id: String!) {
      deleteList(id: $id) {
        id
      }
    }
  `

  const [deleteList] = useMutation(DELETE_LIST_MUTATION, {
    onCompleted: refetch,
  })

  const onDelete = () => {
    if (confirm('Are you sure to delete this list?')) {
      deleteList({ variables: { id: value.id } })
    }
  }

  return (
    <div className="card w-80 bg-white shadow-xl cursor-pointer hover:bg-gray-50">
      <Link to={routes.list({ slug: value.space.slug, id: value.id })}>
        <figure>
          <img
            src={`https://picsum.photos/300/200?r=${customAlphabet(
              '0123456789'
            )(4)}`}
            className="rounded-t-2xl"
            width={320}
            height={200}
            alt="Cover"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={routes.list({ slug: value.space.slug, id: value.id })}>
          <h2 className="card-title line-clamp-1">
            {value.title || 'Missing Title'}
          </h2>
        </Link>
        <div className="card-actions flex w-full justify-between">
          <div>
            <TimeInfo value={value} />
          </div>
          <div className="flex space-x-2 items-center">
            <Avatar user={value.owner} size="small" />
            {value.private && (
              <div className="tooltip" data-tip="Private">
                <LockClosedIcon className="w-4 h-4 text-gray-500" />
              </div>
            )}
            <TrashIcon
              className="w-4 h-4 text-gray-500 cursor-pointer"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
