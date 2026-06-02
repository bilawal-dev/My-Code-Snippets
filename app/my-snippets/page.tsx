import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function MySnippets() {
    return (
        <div className='w-full shadow-xl p-5 flex justify-between items-center'>
            My-Snippets
            <UserButton showName />
        </div>
    )
}