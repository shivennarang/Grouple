import MediaGalleryForm from "@/components/forms/media-gallery"
import { GlassModal } from "@/components/global/glass-model"
import { Card, CardContent } from "@/components/ui/card"
import { BadgePlus } from "@/icons"
import { validateURLString } from "@/lib/utils"

type Props = {
    gallery: string[]
    groupid: string
    onActive(media: { url: string | undefined; type: string }): void
    onDelete(mediaUrl: string): void // Add the onDelete property
    userid: string
    groupUserid: string
}

const MediaGallery = ({
    gallery,
    groupUserid,
    onActive,
    onDelete, // Destructure the onDelete function
    groupid,
    userid,
}: Props) => {
    return (
        <div className="flex justify-start gap-3 flex-wrap">
            {gallery.length > 0 &&
                gallery.map((gal, key) => {
                    const mediaType = validateURLString(gal).type
                    return (
                        <div className="relative w-36 aspect-video" key={key}>
                            {mediaType === "IMAGE" ? (
                                <img
                                    onClick={() =>
                                        onActive({
                                            url: gal,
                                            type: "IMAGE",
                                        })
                                    }
                                    src={`https://ucarecdn.com/${gal}/`}
                                    alt="gallery-img"
                                    className="w-full h-full rounded-xl cursor-pointer opacity-70"
                                />
                            ) : (
                                <>
                                    {/* Clickable overlay for activation */}
                                    <div
                                        className="w-full h-full absolute top-0 left-0 z-50 cursor-pointer"
                                        onClick={() =>
                                            onActive({
                                                url: gal,
                                                type: mediaType,
                                            })
                                        }
                                    />
                                    <iframe
                                        src={gal}
                                        className="absolute outline-none border-0 top-0 left-0 w-full h-full rounded-xl"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </>
                            )}
                            {/* Cross button overlay for deletion */}
                            <button
                                onClick={() => onDelete(gal)}
                                className="absolute top-1 right-1 text-white bg-black bg-opacity-60 rounded-full p-1 z-50"
                                aria-label="Delete media"
                            >
                                &#10005; {/* Cross symbol */}
                            </button>
                        </div>
                    )
                })}
            {userid === groupUserid ? (
                <GlassModal
                    title="Add media to VSL"
                    description="Paste a link to a youtube or a loom video."
                    trigger={
                        <Card className="border-dashed border-themeGray hover:bg-themeBlack bg-transparent cursor-pointer">
                            <CardContent className="flex justify-center items-center py-10 px-16">
                                <BadgePlus />
                            </CardContent>
                        </Card>
                    }
                >
                    <MediaGalleryForm groupid={groupid} />
                </GlassModal>
            ) : (
                <></>
            )}
        </div>
    )
}

export default MediaGallery
