'use client'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/styles/app.module.css'
import { Button, Table } from 'react-bootstrap'
import { useEffect } from 'react'
import useSWR from 'swr'
import AppTable from '@/components/app.table'
import { IBlog } from '@/types/backend'

export default function Blogs() {
  const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
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
      {data && <AppTable blogs={data?.sort((a: IBlog, b: IBlog) => b.id - a.id)}/>}
  </>
  )
}
