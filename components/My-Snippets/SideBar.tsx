"use client"

import { ISnippet } from '@/app/my-snippets/page'
import { fetchUserSnippets, showAll, showFavourite } from '@/redux/snippetsSlice'
import { AppDispatch, RootState } from '@/redux/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsBorderAll } from 'react-icons/bs'
import { GoTrash } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'
import { IoHeartOutline } from 'react-icons/io5'
import { RiJavaLine } from 'react-icons/ri'
import { RxHamburgerMenu } from 'react-icons/rx'
import { SiC, SiCplusplus, SiJavascript, SiPython, SiReact } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux'

export default function SideBar() {
    const [isHamburgerMenu, setIsHamburgerMenu] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    const status = useSelector((state: RootState) => state.snippets.status);
    const snippets = useSelector((state: RootState) => state.snippets.snippets);
    const error = useSelector((state: RootState) => state.snippets.error);

    if (error) {
        console.log(error);
    }

    useEffect(() => {
        dispatch(fetchUserSnippets());
    }, [])

    return (
        <>
            {/* SIDE BAR FOR DESKTOP DEVICES */}
            <div className='w-[25%] min-h-full max-lg:w-[40%] max-sm:hidden bg-white ps-5 flex flex-col gap-2 pt-7'>
                <DesktopLogo />
                <QuickLinks />
                <Languages snippets={snippets} status={status} />
            </div>

            {/* SIDE BAR FOR MOBILE DEVICES */}
            {isHamburgerMenu && (
                <div className='absolute left-0 z-10 bg-white shadow-2xl ps-5 w-[60%] h-full sm:hidden flex flex-col gap-2 pt-7'>
                    <MobileLogo setIsHamburgerMenu={setIsHamburgerMenu} />
                    <QuickLinks />
                    <Languages snippets={snippets} status={status} />
                </div>
            )}

            <div className='absolute pt-6 pe-3 text-2xl sm:hidden'>
                <RxHamburgerMenu onClick={() => setIsHamburgerMenu(true)} />
            </div>
        </>
    )
}

function DesktopLogo() {
    return (
        <div className='flex gap-2 items-center max-xl:flex-col max-xl:items-start'>
            <div className='bg-[#8338ec] text-white p-[6px] rounded-md'>{'{ / }'}</div>
            <Link href={'/'} className='flex gap-1 text-[19px]'>
                <span className='font-semibold text-[#8338ec]'>My</span>
                <span className='text-slate-500'>Code Snippets</span>
            </Link>
        </div>
    )
}

function MobileLogo({ setIsHamburgerMenu }: { setIsHamburgerMenu: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className='flex'>
            <div className='flex gap-2 items-center max-xl:flex-col max-xl:items-start'>
                <div className='bg-[#8338ec] text-white p-[6px] rounded-md'>{'{ / }'}</div>
                <Link href={'/'} className='flex gap-1 text-[19px]'>
                    <span className='font-semibold text-[#8338ec]'>My</span>
                    <span className='text-slate-500'>Code Snippets</span>
                </Link>
            </div>
            <IoMdClose onClick={() => { setIsHamburgerMenu(false) }} className='text-xl text-slate-500 sm:hidden' />
        </div>
    )
}

function QuickLinks() {
    const dispatch: AppDispatch = useDispatch();

    const isShowFavourite = useSelector((state: RootState) => state.snippets.isShowFavourite);

    return (
        <div className='mt-20 text-sm'>
            <div className='text-lg text-slate-500'>Quick Links</div>
            <ul className='text-slate-500 mt-4 flex flex-col gap-2'>
                <li onClick={() => { dispatch(showAll()) }} className={`flex items-center gap-1 cursor-pointer ${isShowFavourite ? '' : 'bg-[#8338ec] text-white'} p-[7px] px-2 rounded-md w-[60%] max-xl:w-[80%] max-md:w-[90%]`}>
                    <BsBorderAll />
                    All Snippets
                </li>
                <li onClick={() => { dispatch(showFavourite()) }} className={`flex items-center gap-1 cursor-pointer hover:bg-[#8338ec] ${isShowFavourite ? 'bg-[#8338ec] text-white' : ''} hover:text-white text-slate-500 p-[7px] px-2 rounded-md w-[60%] max-xl:w-[80%] max-md:w-[90%]`}>
                    <IoHeartOutline />
                    Favourites
                </li>
            </ul>
        </div>
    )
}

function Languages({ snippets, status }: { snippets: ISnippet[], status: string }) {
    if (status === 'pending') {
        return (
            <div className='mt-10 text-sm'>
                <div className='text-lg text-slate-500'>Languages</div>
                <ul className='mt-4 flex flex-col gap-3'>
                    <li className='bg-slate-100 w-[90%] py-2'></li>
                    <li className='bg-slate-100 w-[50%] py-2'></li>
                    <li className='bg-slate-100 w-[70%] py-2'></li>
                </ul>
            </div>
        )
    }

    //Interface For Object Storing Languages And Their Counts
    interface Ilanguages {
        [language: string]: number,
    }

    const languages: Ilanguages = {};
    snippets.forEach((snippet) => {
        //If Object Has Language, Then Incrementing Its Count, Else Add In Object.
        if (languages.hasOwnProperty(snippet.language)) {
            languages[snippet.language] = languages[snippet.language] + 1;
        }
        else {
            languages[snippet.language] = 1;
        }
    })

    //Making An 2D Array Of Object
    const languagesArr = Object.entries(languages);

    //Bubble-Sort To Sort The 2D Array Of Object
    for (let i = 0; i < languagesArr.length; i++) {
        for (let j = 0; j < languagesArr.length; j++) {
            if (languagesArr[i][1] > languagesArr[j][1]) {
                let temp = languagesArr[i];
                languagesArr[i] = languagesArr[j];
                languagesArr[j] = temp;
            }
        }
    }

    function getLanguageIcon(language: string) {
        if (language === 'javascript') {
            return <SiJavascript />;
        }
        if (language === 'python') {
            return <SiPython />;
        }
        if (language === 'c') {
            return <SiC />;
        }
        if (language === 'c++') {
            return <SiCplusplus />;
        }
        if (language === 'react') {
            return <SiReact />;
        }
        if (language === 'java') {
            return <RiJavaLine />
        }
        return null;
    }

    return (
        <div className='mt-10 text-sm'>
            <div className='text-lg text-slate-500'>Languages</div>
            <ul className='text-slate-400 mt-4 flex flex-col gap-2'>
                {languagesArr?.map(([language, count]) => (
                    <li key={language} className='flex items-center justify-between gap-1 text-slate-500 rounded-md w-[90%]'>
                        <span className='flex items-center gap-1 capitalize'>{getLanguageIcon(language)} {language}</span>
                        <span>{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}