
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
  
  type SimpleModalProps = {
    trigger: JSX.Element
    children: React.ReactNode
    title?: string
    description?: string
    type?: "Integration"
    logo?: string
  }
  
  export const SimpleModal = ({
    trigger,
    children,
    type,
    title,
    logo,
    description,
  }: SimpleModalProps) => {
    switch (type) {
      case "Integration":
        return (
          <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="bg-themeBlack border-themeDarkGray">
              <div className="flex justify-center gap-3 ">
                <div className="w-12 h-12 relative">
                  <Image
                    src={`https://ucarecdn.com/
ef7edf92-62ba-43ac-bf2c-b10cb203e62c/
-/preview/200x200/`}
                    fill
                    alt="Corinna"
                  />
                </div>
                <div className="text-gray-400">
                  <ArrowLeft size={20} />
                  <ArrowRight size={20} />
                </div>
                <div className="w-12 h-12 relative">
                  <Image
                    src={`https://ucarecdn.com/${logo}/`}
                    fill
                    alt="Stripe"
                  />
                </div>
              </div>
              <DialogHeader className="flex items-center">
                <DialogTitle className="text-xl">{title}</DialogTitle>
                <DialogDescription className=" text-center">
                  {description}
                </DialogDescription>
              </DialogHeader>
              {children}
            </DialogContent>
          </Dialog>
        )
      default:
        return (
          <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="bg-[#1C1C1E] !max-w-2xl border-themeGray">
              {children}
            </DialogContent>
          </Dialog>
        )
    }
  }
  