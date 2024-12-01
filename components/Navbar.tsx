import React from 'react'
import NavbarButtons from './NavbarButtons'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className='my-5 mx-8 max-sm:mt-9 flex items-center justify-between max-sm:flex-col'>
            <Logo />
            <NavbarButtons />
        </nav>
    )
}

function Logo() {
    return (
        <Link href={'/'} className='flex items-center gap-2'>
            <div className='bg-[#8338ec] text-white p-[6px] font-semibold rounded-md'>{'{ / }'}</div>
            <div className='flex items-center gap-1 text-[20px]'>
                <span className='font-semibold text-[#8338ec]'>My</span>
                <span className='text-slate-500'>Code Snippets</span>
            </div>
        </Link>
    )
}