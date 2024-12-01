import connectToDB from '@/db/connectToDB'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default async function MySnippets() {
    await connectToDB();

    return (
        <div className='w-full shadow-xl p-5 flex justify-between items-center'>
            My-Snippets
            <UserButton showName />
        </div>
    )
}