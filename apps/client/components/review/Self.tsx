import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function SelfReview({ user }) {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-8 gap-4 border-b p-2 items-center">
        <p className="font-semibold col-span-2">{user.title}</p>
        <p className="col-span-2">{user.fullName}</p>
        <p className="col-span-2">{user.teamName}</p>

        <Link
          href={`/employee/${user._id}/new-review`}
          className={`${buttonVariants({
            variant: 'outline',
          })} bg-green-500 text-white`}
        >
          Write a self review
        </Link>
      </div>
    </div>
  )

}