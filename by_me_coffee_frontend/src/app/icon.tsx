
import Logo from "@/components/icons/logo"
import { ImageResponse } from "next/og"


export const size = {
    width: 32,
    height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <Logo/>
        ),
        {
            ...size
        }
    )
}