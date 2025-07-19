'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SignIn } from '@clerk/nextjs'
import Disposicion from '../../Disposicion'

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [])

    return <Disposicion> <SignIn /> </Disposicion>
}
