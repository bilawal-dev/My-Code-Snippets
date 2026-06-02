"use client"

import { useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";

export default function Buttons() {
    const { isLoaded, userId } = useAuth();
    console.log('userId', userId);

    const { signOut } = useClerk()

    return (
        <>
            {isLoaded ? (
                <div className='flex gap-2 max-sm:flex-col max-sm:w-[60%] max-sm:mt-8'>
                    {userId ? (
                        <>
                            <Link href={'/my-snippets'} className="max-sm:w-full bg-[#8338ec] p-[8px] px-6 text-sm text-white">Access To The App</Link>
                            <button onClick={() => signOut({ redirectUrl: '/' })} className='max-sm:w-full text-[#8338ec] hover:text-white p-[8px] px-6 text-sm bg-white hover:bg-[#8338ec] border border-[#8338ec]'>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link href={'/sign-in'} className='max-sm:w-full bg-[#8338ec] p-[8px] px-6 text-sm text-white'>Sign In</Link>
                            <Link href={'/sign-up'} className='max-sm:w-full text-[#8338ec] hover:text-white p-[8px] px-6 text-sm bg-white hover:bg-[#8338ec] border border-[#8338ec]'>Sign Up</Link>
                        </>
                    )}
                </div>
            ) : (
                <div className="border-t-[#8338ec] w-10 h-10 max-sm:mt-5 border-4 border-solid rounded-full animate-spin"></div>
            )}
        </>
    )
};