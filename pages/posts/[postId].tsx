import { useRouter } from "next/router"

export interface DetailPostPageProps {

}

export default function DetailPostPage(props: DetailPostPageProps) {
    const router = useRouter()
    return (
        <section>
            <h1>Detail Post Page</h1>
            <p>Query: {JSON.stringify(router.query)}</p>
        </section>
    )
}