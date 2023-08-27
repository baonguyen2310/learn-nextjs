'use client'
import Link from 'next/link'
import useSWR from 'swr'

export default function DetailBlogPage({ params }: { params: { id: string } }) {
    const fetcher = async (url: string) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
    
    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/blogs/${params.id}`,
        fetcher, 
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )
    // vẫn fetch lại data khi chuyển trang

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <>
            {
                data && (
                    <div>
                        <h1>id: {data.id}</h1>
                        <h3>title: {data.title}</h3>
                        <h4>author: {data.author}</h4>
                        <h5>content: {data.content}</h5>
                    </div>
                )
            }
            <Link href="/blogs" className='btn btn-primary'>Back</Link>
        </>
    )
}