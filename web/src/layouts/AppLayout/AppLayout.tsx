import { useAuth } from 'src/auth'
import NavBar from 'src/components/NavBar/NavBar'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { currentUser } = useAuth()
  return (
    <div className="h-screen flex flex-col">
      <NavBar user={currentUser} space={undefined} />
      {children}
    </div>
  )
}

export default AppLayout
