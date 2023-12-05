import { useEffect, useRef } from 'react'

import { Form, Label, PasswordField, TextField } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <div className="w-full p-6 space-y-8 sm:p-8 lg:p-16">
      <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
        Sign in to your account
      </h2>

      <Form className="mt-8" action="#" onSubmit={onSubmit}>
        <div className="mb-6">
          <Label
            name="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </Label>
          <TextField
            name="email"
            ref={emailRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            placeholder="Email address"
            required
          />
        </div>
        <div className="mb-6">
          <Label
            name="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </Label>
          <PasswordField
            name="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mt-4">
          <button className="btn btn-primary w-full lg:w-fit" type="submit">
            Login to your account
          </button>
        </div>

        <div className="mt-4 text-sm font-medium text-gray-500">
          Not registered?{' '}
          <Link to={routes.signup()} className="text-primary">
            Create account
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default LoginPage
