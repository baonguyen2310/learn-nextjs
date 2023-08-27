export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <nav>Navbar</nav>
            {children}
        </section>
    )
}