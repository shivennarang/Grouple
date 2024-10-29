"use client"
import BlockTextEditor from "@/components/global/rich-text-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCreateChannelPost } from "@/hooks/channels"
import { Upload } from "lucide-react"
import { useState } from "react"

type PostContentProps = {
    channelid: string
}

export const PostContent = ({ channelid }: PostContentProps) => {
    const {
        errors,
        register,
        onDescription,
        onJsonDescription,
        onHtmlDescription,
        setOnDescription,
        setOnHtmlDescription,
        setJsonDescription,
        onCreatePost,
    } = useCreateChannelPost(channelid) // State to store error message
    const [contentError, setContentError] = useState("") // Modified onCreatePost function

    const handleCreatePost = (event: React.FormEvent) => {
        event.preventDefault() // Check if content is empty

        if (!onJsonDescription || onJsonDescription.trim() === "") {
            setContentError("Please add content to the editor.")
            return
        } // Clear error if content is not empty
        setContentError("")
        onCreatePost() // Call original function to create post
    }

    return (
        <form
            className="flex flex-col gap-y-5 w-full"
            onSubmit={handleCreatePost}
        >
            <Input
                placeholder="Title"
                className="bg-transparent outline-none border-none text-2xl p-0"
                {...register("title")}
            />
            <BlockTextEditor
                errors={errors}
                name="jsoncontent"
                min={150}
                max={10000}
                inline
                onEdit
                textContent={onDescription}
                content={onJsonDescription}
                setContent={setJsonDescription}
                setTextContent={setOnDescription}
                htmlContent={onHtmlDescription}
                setHtmlContent={setOnHtmlDescription}
            />
            {contentError && <p className="text-red-500">{contentError}</p>}
            <Button className="self-end rounded-2xl bg-themeTextGray flex gap-x-2">
                <Upload />
                Create
            </Button>
        </form>
    )
}
