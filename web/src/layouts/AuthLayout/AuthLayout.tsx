import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="h-screen flex flex-col">
        <div className="flex flex-col items-center justify-center px-6 pt-4 lg:pt-8 w-full h-screen bg-cover bg-[url('/auth-bg.jpg')]">
          <Link to={routes.home()}>
            <div className="flex space-x-4 items-center mb-6 lg:mb-10">
              <img src="/logo.png" width={42} height={42} alt="logo" />
              <h1 className="text-4xl text-white">Welcome to Todo</h1>
            </div>
          </Link>
          <div className="items-center justify-center w-full bg-white rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-md xl:p-0">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
