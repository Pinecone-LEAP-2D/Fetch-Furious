"use client";
import { FaCreativeCommonsShare } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SelectGroup } from "@radix-ui/react-select";

export default function Home() {

    return (
        <div className="max-w-[800px] rounded-xl">
            <div className="flex flex-col  max-w-[800px] border p-4 m-2 rounded-sm">
                <div className="flex justify-between">
                    <div className="flex items-center ">
                        <p>Avatar</p>
                        <div className="flex flex-col px-2">
                            <p>Name</p>
                            <p>Mail</p>
                        </div>
                    </div>
                    <div className="flex bg-black text-white rounded w-50 justify-center items-center">
                        <FaCreativeCommonsShare />
                        <p className="px-1">Share page link</p>
                    </div>

                </div>
                <hr className="mt-2 " />
                <div className="flex py-4 items-center ">
                    <p className="font-bold text-xl px-3">Earnings</p>
                    <Select>
                        <SelectTrigger className="w-[180px] ">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Days</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <p className="text-3xl mx-2 p-2 font-bold">$450</p>
            </div>

            <div className="flex justify-between items-center p-2 m-2">
                <p className="font-bold">Recent transactions</p>
                <div className="flex items-center px-2 border w-30  h-8 rounded-sm justify-center">
                    <IoIosArrowDown />
                    <button className="px-1 py-2">Amount</button>
                </div>
            </div>

            <div className=" border p-5 max-w-[800px] rounded-sm">
                <div className="flex items-center  justify-between">
                    <div className="flex items-center">
                        <p className="rounded-full w-10 h-10 px-4 bg-gray-200 text-center flex items-center justify-center" >CN</p>
                        <div className=" px-2">
                            <p>Guest</p>
                            <p>instagramm.com/welesley</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">+ <span>$1</span></p>
                        <p>10 hours ago</p>
                    </div>
                </div>
                <p className="p-2">something that you say or write that expresses your opinion:</p>

            </div>

        </div>

    )
}