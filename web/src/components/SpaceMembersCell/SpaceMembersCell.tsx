/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { SpaceUserRole } from '@prisma/client'
import type { SpaceMembersQuery } from 'types/graphql'

import {
  Form,
  FormError,
  SelectField,
  Submit,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'

import { useCurrentUser } from 'src/auth'

import Avatar from '../Avatar'

export const QUERY = gql`
  query SpaceMembersQuery($slug: String!) {
    spaceBySlug(slug: $slug) {
      id
      name
      slug
    }
    spaceUsers(slug: $slug) {
      id
      user {
        id
        email
      }
      role
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-red-600">Error: {error?.message}</div>
)

export const Success = ({
  spaceBySlug,
  spaceUsers,
  queryResult: { refetch },
}: CellSuccessProps<SpaceMembersQuery>) => {
  return (
    <div className="flex items-center">
      <ul
        className="mr-1 cursor-pointer"
        onClick={() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (document.getElementById('manage-members-modal') as any)?.showModal()
        }
      >
        {spaceUsers?.map((member) => (
          <Avatar key={member.id} user={member.user} size="small" />
        ))}
      </ul>
      <ManageMembersDialog
        members={spaceUsers}
        space={spaceBySlug}
        refetch={refetch}
      />
    </div>
  )
}

const ManageMembersDialog = ({ members, space, refetch }) => {
  const ADD_MEMBER_MUTATION = gql`
    mutation AddMemberMutation($input: CreateSpaceUserInput!) {
      createSpaceUser(input: $input) {
        id
      }
    }
  `

  const DELETE_MEMBER_MUTATION = gql`
    mutation DeleteMemberMutation($id: String!) {
      deleteSpaceUser(id: $id) {
        id
      }
    }
  `

  const formMethods = useForm()
  const user = useCurrentUser()
  const [addMember, { error }] = useMutation(ADD_MEMBER_MUTATION)
  const [deleteMember] = useMutation(DELETE_MEMBER_MUTATION)

  const onAddMember = async (data) => {
    await addMember({
      variables: {
        input: {
          ...data,
          spaceSlug: space.slug,
        },
      },
    })
    refetch()
    formMethods.reset()
  }

  const onDeleteMember = async (id) => {
    await deleteMember({ variables: { id } })
    refetch()
  }

  return (
    <dialog id="manage-members-modal" className="modal">
      <div className="modal-box">
        <h2 className="font-bold text-xl mb-8">Manage Space Members</h2>

        <Form
          formMethods={formMethods}
          onSubmit={onAddMember}
          className="flex-col w-full items-center max-w-md"
        >
          <FormError error={error} wrapperClassName="text-red-600 mb-2" />
          <div className="flex">
            <TextField
              name="email"
              placeholder="Type user email and enter to invite"
              className="input input-bordered flex-grow mr-2"
              required
            />
            <SelectField name="role" className="select mr-2">
              <option value={SpaceUserRole.USER}>USER</option>
              <option value={SpaceUserRole.ADMIN}>ADMIN</option>
            </SelectField>

            <Submit>
              <PlusIcon className="w-6 h-6 text-gray-500" />
            </Submit>
          </div>
        </Form>

        <ul className="space-y-2 mt-4">
          {members?.map((member) => (
            <li
              key={member.id}
              className="flex flex-wrap w-full justify-between"
            >
              <div className="flex items-center">
                <div className="hidden md:block mr-2">
                  <Avatar user={member.user} size="regular" />
                </div>
                <p className="w-36 md:w-48 line-clamp-1 mr-2">
                  {member.user.email}
                </p>
                <p>{member.role}</p>
              </div>
              {user?.id !== member.user.id && (
                <button
                  className="flex items-center"
                  onClick={() => onDeleteMember(member.id)}
                >
                  <TrashIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
