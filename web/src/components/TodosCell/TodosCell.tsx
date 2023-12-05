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

  const user = useCurrentUser()

  const onCreate = ({ title }) => {
    createTodo({
      variables: {
        input: {
          title,
          ownerId: user.id,
          listId: list.id,
        },
      },
    })
    formMethods.reset()
  }

  const formMethods = useForm()

  return (
    <div className="container w-full flex flex-col items-center py-12 mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{list.title}</h1>

      <div className="flex space-x-2">
        <Form
          formMethods={formMethods}
          onSubmit={onCreate}
          className="flex space-x-2"
        >
          <TextField
            name="title"
            placeholder="Type a title and press enter"
            className="input input-bordered w-72 max-w-xs mt-2"
          />
          <Submit>
            <PlusIcon className="w-6 h-6 text-gray-500" />
          </Submit>
        </Form>
      </div>

      <ul className="flex flex-col space-y-4 py-8 w-11/12 md:w-auto">
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
    <div className="border rounded-lg px-8 py-4 shadow-lg flex flex-col items-center w-full lg:w-[480px]">
      <div className="flex justify-between w-full mb-4">
        <h3
          className={`text-xl line-clamp-1 ${
            value.completedAt
              ? 'line-through text-gray-400 italic'
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
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={() => onDelete()}
          />
        </div>
      </div>
      <div className="flex justify-end w-full space-x-2">
        <TimeInfo value={value} />
        <Avatar user={value.owner} size="small" />
      </div>
    </div>
  )
}
