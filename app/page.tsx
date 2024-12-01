import Navbar from '@/components/Navbar'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <>
      <Navbar />

      <div className='flex flex-col items-center gap-6 pb-10 px-16 max-sm:px-10 pt-[120px] max-sm:pt-[50px]'>

        <h2 className='font-bold text-4xl text-center'>
          Organize Your Code Snippets
          <span className='text-[#8338ec]'> Efficiently</span>
        </h2>

        <p className='text-center text-slate-700 tracking-wider text-md w-1/2 max-sm:w-full'>
          With our advanced tagging and search features, you can quickly find the snippet you need,
          right when you need it. Spend less time searching for code and more time writing it.
        </p>

        <Link href={'/my-snippets'} className='block px-9 py-3 text-sm font-medium bg-[#8338ec] text-white transition focus:outline-none'>Let's Get Started</Link>
      </div>
    </>
  )
}