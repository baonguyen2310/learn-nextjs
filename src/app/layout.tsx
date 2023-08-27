'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/header'
import { Container } from 'react-bootstrap'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Container>
          <Header />
          {children}
        </Container>
        <ToastContainer position="bottom-center" autoClose={1000}/>
      </body>
    </html>
  )
}
