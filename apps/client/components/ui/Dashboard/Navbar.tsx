import Photo from '@/components/ui/photo'
import Link from 'next/link'
import logo from '../../../../assets_to_test/logo.svg'
import {
  LogOutIcon,
  Home,
  UserCircle2,
  Trash,
  FolderKanban,
} from 'lucide-react'

import handleLogout from '@/components/Logout'

async function Navbar() {
  return (
    <div className="pt-5 fixed left-0 top-0 w-[80px] h-screen bg-white shadow-slate-400 shadow-xl  border-black items-center  flex flex-col justify-between">
      <div>
        <Photo photo={logo} alt="photo of the user" />
      </div>
      <div className="flex flex-col gap-6 items-center">
        <Link href="/managerpanel">
          <FolderKanban size={30} />
        </Link>
        <Link href="/testpage">
          <Trash size={30} />
        </Link>
        <Link href="/">
          <Home size={30} />
        </Link>
        <UserCircle2 size={30} />
        <div className="bg-turquoise rounded-t-md w-[60px] h-[60px] flex items-center justify-center">
          <Link href="/">
            <button onClick={handleLogout}>
              <LogOutIcon size={30} stroke="white" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
