'use client';
import { Metadata } from "next"
import { useRouter } from "next/navigation"
import { Button } from "react-bootstrap"

export const metadata: Metadata = {
    title: 'Dashboard Page'
}

export default function Dashboard(){
    const router = useRouter()
    function handleClick() {
        router.push('/')
    }

    return (
        <>
            <h1>Dashboard Page</h1>
            <Button onClick={handleClick}>Go away</Button>
        </>
    )
}