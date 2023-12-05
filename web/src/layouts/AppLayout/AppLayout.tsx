import { Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import NavBar from 'src/components/NavBar/NavBar'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { currentUser } = useAuth()
  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="h-screen flex flex-col">
        <NavBar user={currentUser} space={undefined} />
        {children}
      </div>
    </>
  )
}

export default AppLayout
