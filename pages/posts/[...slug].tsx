import { useRouter } from "next/router";

export interface SlugPageProps {

}

export default function SlugPage(props: SlugPageProps) {
    const router = useRouter()
    return (
        <section>
            <h1>Slug Page</h1>
            <p>Query: {JSON.stringify(router.query)}</p>
        </section>
    )
}