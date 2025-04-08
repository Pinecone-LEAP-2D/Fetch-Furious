import { Input } from "@/components/ui/input"

const Explore = () => {
    return(
        <div className="flex p-24 flex-col gap-[32px] w-full h-fit">
            <div className="flex-col gap-[24px] h-[1336px]">
                <div className="flex-col gap-[24px] flex">
                    <div className="flex items-center gap-[16px]">
                        <p className="font-semibold text-xl">Explore creators</p>
                    </div>
                    <Input className="flex w-[243px] h-fit px-0  items-center gap-[10px] border rounded-xl"/>
                </div>
            </div>
        </div>
    )
}
export default Explore