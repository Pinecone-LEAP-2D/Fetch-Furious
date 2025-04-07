import DashboardHeader from "@/components/DashBoardHeader"
import Navigation from "@/components/Navigation"
import { ReactNode } from "react"

const DashboardLayout = ({children}:{children:ReactNode}) => {
    return (
        <div className="w-full flex flex-col relative h-screen">
            <DashboardHeader />
            <div className="flex flex-1 overflow-hidden gap-[300px]">
                <Navigation />
                <div className="flex-1 overflow-y-scroll px-6 py-10 max-w-[1440px] w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default DashboardLayout
