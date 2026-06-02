"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Buttons() {
    const [isLoading, setIsLoading] = useState(true);

    const { data: session, status } = useSession();

    useEffect(() => {
        if(status !== 'loading'){
            setIsLoading(false);
        }
    }, [status]);

    console.log(session);

    return (
        <>
            {!isLoading ? (
                <div className='flex gap-2 max-sm:flex-col max-sm:w-[60%] max-sm:mt-8'>
                    {status === 'authenticated' ? (
                        <>
                            <Link href={'/my-snippets'} className="max-sm:w-full bg-[#8338ec] p-[8px] px-6 text-sm text-white">Access To The App</Link>
                            <button onClick={() => signOut()} className='max-sm:w-full text-[#8338ec] hover:text-white p-[8px] px-6 text-sm bg-white hover:bg-[#8338ec] border border-[#8338ec]'>Sign Out</button>
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