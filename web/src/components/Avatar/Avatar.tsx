import { AuthUser } from 'src/auth'

type Props = {
  user: AuthUser
  size?: 'regular' | 'small'
}

export default function Avatar({ user, size }: Props) {
  if (!user) {
    return <></>
  }
  return (
    <div
      className={`tooltip ${size === 'small' ? 'w-6 h-6' : 'w-8 h-8'}`}
      data-tip={user.email}
    >
      <img
        src="/avatar.jpg"
        alt="avatar"
        className="rounded-full w-full h-full"
      />
    </div>
  )
}
