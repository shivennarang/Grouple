"use client"
import { Message } from "@/icons"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Notification } from "./notification"
import { UserAvatar } from "./user"

type UserWidgetProps = {
  image: string
  groupid?: any
  userid?: string
}

export const UserWidget = ({ image, groupid, userid }: UserWidgetProps) => {
  const params = useParams();  
  const group = params.groupid; 
  console.log("hi")
  console.log(group);
  return (
    <div className="gap-5 items-center hidden md:flex">
      <Notification />
      <Link href={`/group/${group}/messages`}>
        <Message />
      </Link>
      <UserAvatar userid={userid} image={image} groupid={group} />
    </div>
  )
}
