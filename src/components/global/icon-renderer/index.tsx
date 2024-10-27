import {
  About,
  Bell,
  BriefCaseDuoToneBlack,
  BriefCaseDuoToneWhite,
  Compass,
  FileDuoToneBlack,
  FileDuoToneWhite,
  GlobeDuoToneBlack,
  Home,
  HomeDuoToneWhite,
  MegaPhoneDuoToneBlack,
  MegaPhoneDuoToneWhite,
  SocialMedia,
  ZapDouToneBlack,
} from "@/icons"

type IconRendererProps = {
    mode: "LIGHT" | "DARK"
    icon: string
}

export const IconRenderer = ({ mode, icon }: IconRendererProps) => {
    switch (icon) {
        case "general":
            return mode === "DARK" ? <Home /> : <HomeDuoToneWhite />
        case "announcement":
            return mode === "DARK" ? (
                <MegaPhoneDuoToneBlack />
            ) : (
                <MegaPhoneDuoToneWhite />
            )
        case "doc":
            return mode === "DARK" ? <FileDuoToneBlack /> : <FileDuoToneWhite />
        case "about":
            return mode === "DARK" ? <About /> : <About />
        case "bell":
            return mode === "DARK" ? <Bell /> : <Bell />
        case "case":
            return mode === "DARK" ? <BriefCaseDuoToneBlack /> : <BriefCaseDuoToneWhite />
        case "compass":
            return mode === "DARK" ? <Compass /> : <Compass />
        case "media":
            return mode === "DARK" ? <SocialMedia /> : <SocialMedia />
        case "zap":
            return mode === "DARK" ? <ZapDouToneBlack /> : <ZapDouToneBlack />
        case "mega":
            return mode === "DARK" ? <MegaPhoneDuoToneBlack /> : <MegaPhoneDuoToneWhite />
        case "global":
            return mode === "DARK" ? <GlobeDuoToneBlack /> : <GlobeDuoToneBlack />
        default:
            return <></>
    }
}
