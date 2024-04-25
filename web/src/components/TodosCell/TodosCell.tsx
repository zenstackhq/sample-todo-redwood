import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { TodosQuery } from 'types/graphql'

import { Form, Submit, TextField, useForm } from '@redwoodjs/forms'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'

import { useCurrentUser } from 'src/auth'

import Avatar from '../Avatar'
import TimeInfo from '../TimeInfo'

export const QUERY = gql`
  query TodosQuery($listId: String!) {
    list(id: $listId) {
      id
      title
    }
    todos(listId: $listId) {
      id
      title
      completedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-red-600">Error: {error?.message}</div>
)

export const Success = ({
  list,
  todos,
  queryResult: { refetch },
}: CellSuccessProps<TodosQuery>) => {
  const CREATE_TODO_MUTATION = gql`
    mutation CreateTodoMutation($input: CreateTodoInput!) {
      createTodo(input: $input) {
        id
      }
    }
  `

  const [createTodo] = useMutation(CREATE_TODO_MUTATION, {
    onCompleted: refetch,
  })

  const onCreate = ({ title }) => {
    createTodo({
      variables: {
        input: {
          title,
          listId: list.id,
        },
      },
    })
    formMethods.reset()
  }

  const formMethods = useForm()

  return (
    <div className="container mx-auto flex w-full flex-col items-center py-12">
      <h1 className="mb-4 text-2xl font-semibold">{list.title}</h1>

      <div className="flex space-x-2">
        <Form
          formMethods={formMethods}
          onSubmit={onCreate}
          className="flex space-x-2"
        >
          <TextField
            name="title"
            placeholder="Type a title and press enter"
            className="input input-bordered mt-2 w-72 max-w-xs"
          />
          <Submit>
            <PlusIcon className="h-6 w-6 text-gray-500" />
          </Submit>
        </Form>
      </div>

      <ul className="flex w-11/12 flex-col space-y-4 py-8 md:w-auto">
        {todos.map((item) => {
          return (
            <li key={item.id}>
              <Todo value={item} refetch={refetch} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const Todo = ({ value, refetch }) => {
  const UPDATE_TODO_MUTATION = gql`
    mutation UpdateTodoMutation($id: String!, $input: UpdateTodoInput!) {
      updateTodo(id: $id, input: $input) {
        id
      }
    }
  `

  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION, {
    onCompleted: refetch,
  })

  const onToggleCompleted = (completed: boolean) => {
    updateTodo({
      variables: {
        id: value.id,
        input: { completedAt: completed ? new Date() : null },
      },
    })
  }

  const DELETE_TODO_MUTATION = gql`
    mutation DeleteTodoMutation($id: String!) {
      deleteTodo: deleteTodo(id: $id) {
        id
      }
    }
  `

  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
    onCompleted: refetch,
  })

  const onDelete = () => {
    deleteTodo({ variables: { id: value.id } })
  }

  return (
    <div className="flex w-full flex-col items-center rounded-lg border px-8 py-4 shadow-lg lg:w-[480px]">
      <div className="mb-4 flex w-full justify-between">
        <h3
          className={`line-clamp-1 text-xl ${
            value.completedAt
              ? 'italic text-gray-400 line-through'
              : 'text-gray-700'
          }`}
        >
          {value.title}
        </h3>
        <div className="flex">
          <input
            type="checkbox"
            className="checkbox mr-2"
            checked={!!value.completedAt}
            onChange={(e) => onToggleCompleted(e.currentTarget.checked)}
          />
          <TrashIcon
            className="h-6 w-6 cursor-pointer text-gray-600"
            onClick={() => onDelete()}
          />
        </div>
      </div>
      <div className="flex w-full justify-end space-x-2">
        <TimeInfo value={value} />
        <Avatar user={value.owner} size="small" />
      </div>
    </div>
  )
}
