
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Blog Detail' //cần học thêm về dynamic metadata
}



export default function Layout(
    {children}: {children: React.ReactNode}
    ) {
    return (
        <>
            {children}
        </>
    )
}