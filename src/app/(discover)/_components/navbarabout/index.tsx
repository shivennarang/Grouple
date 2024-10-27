
import { onAuthenticatedUser } from "@/actions/auth"
import { onGetUserGroups } from "@/actions/groups"

import { UserWidget } from "@/components/global/user-widget"
import { Button } from "@/components/ui/button"
import { BriefCaseDuoToneWhite, CheckBadge, Logout } from "@/icons"
import Link from "next/link"

import { GroupDropDown } from "./group-dropdown"

export const Navbar = async () => {
  const user = await onAuthenticatedUser()
  const groups = await onGetUserGroups(user.id!)

  
  return (
    <div className="flex px-5 py-3 items-center bg-themeBlack border-b-[1px] border-themeDarkGray fixed z-50 w-full bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60">
      <div className="hidden lg:inline">
        {user.status === 200 ? (
          <div>
          <div className="text-sm text-white mb-3">Check Your Group</div>
          <GroupDropDown members={groups.members} groups={groups} />
        </div>) : (
          <p>Grouple.</p>
        )}
      </div>
      <div>
       <span className="lg:hidden flex items-center gap-2 py-2">
       <p className="text-white text-xs">Check Your Groups</p>
       
       <BriefCaseDuoToneWhite/>
            <GroupDropDown members={groups.members} groups={groups}/>
            
          </span>
      </div>
      <div className="flex-1 lg:flex hidden justify-end gap-3">
        <Link href={user.status === 200 ? `/group/create` : "/sign-up"}>
          <Button
            variant="outline"
            className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
          >
            <CheckBadge />
            Create Group
          </Button>
        </Link>
        {user.status === 200 ? (
          <UserWidget image={user.image!} userid={user.id!}  />
        ) : (
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
            >
              <Logout />
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
