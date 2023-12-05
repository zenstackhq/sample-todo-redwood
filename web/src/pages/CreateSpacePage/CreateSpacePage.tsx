import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

const CreateSpacePage = () => {
  const CREATE_SPACE_MUTATION = gql`
    mutation CreateSpaceMutation($input: CreateSpaceInput!) {
      createSpace(input: $input) {
        id
      }
    }
  `

  const [createSpace] = useMutation(CREATE_SPACE_MUTATION, {
    onCompleted: () => {
      toast.success('Space created')
      navigate(routes.home())
    },

    onError: (error) => {
      toast.error('Error creating space: ' + error.message)
    },
  })

  const onSubmit = (data) => {
    createSpace({ variables: { input: data } })
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <MetaTags title="Create Space" />

      <h1 className="text-3xl mb-8">Create a space</h1>

      <Form onSubmit={onSubmit} className="flex-col w-full flex max-w-md">
        <Label
          name="Space name"
          className="label text-lg"
          errorClassName="label error"
        />
        <TextField
          name="name"
          className="input input-bordered w-full"
          placeholder="E.g.: My Work Space"
          validation={{ required: true }}
        />
        <FieldError name="name" className="text-red-600 block mt-2" />

        <Label
          name="Space slug"
          className="label text-lg mt-4"
          errorClassName="label error"
        />
        <TextField
          name="slug"
          className="input input-bordered w-full"
          placeholder="E.g.: my-work"
          validation={{
            required: true,
            pattern: {
              value: /^[0-9a-zA-Z\-_]{4,16}$/,
              message:
                'must be in between 4-16 characters with digit|letter|-|_',
            },
          }}
        />
        <FieldError name="slug" className="text-red-600 block mt-2" />

        <div className="flex mt-6 gap-2">
          <Submit className="btn btn-primary">Create</Submit>
          <button className="btn" onClick={() => navigate(routes.home())}>
            Cancel
          </button>
        </div>
      </Form>
    </div>
  )
}

export default CreateSpacePage
