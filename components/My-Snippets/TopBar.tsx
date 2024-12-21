'use client';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import CreateSnippetModel from './CreateSnippetModel';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { favouriteSnippets, searchSnippets } from '@/redux/snippetsSlice';

export default function TopBar({ session, status }: { session: Session | null, status: string }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState('');

    const dispatch: AppDispatch = useDispatch();

    const isShowFavourite = useSelector((state: RootState) => state.snippets.isShowFavourite);

    const [isCreateModelOpen, setCreateModelOpen] = useState(false);

    useEffect(() => {
        if(isShowFavourite){
            dispatch(favouriteSnippets(search));
        }else{
            dispatch(searchSnippets(search));
        }
    }, [search])

    const handleImageClick = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='bg-white rounded-lg'>
            <div className='w-full py-4 px-5 max-sm:px-0 max-sm:ps-10 flex justify-between max-sm:justify-end items-center'>
                {/* SEARCH BAR AT TOP */}
                <div className='relative flex items-center w-full max-w-md max-sm:max-w-sm'>
                    <input
                        type='text'
                        placeholder='Search A Snippet'
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        className='w-full px-4 py-2 pl-10 text-sm text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-[#8338ec]'
                    />
                    <IoSearch className='absolute left-3 top-[50%] translate-y-[-50%] w-4 h-4 text-[#8338ec] font-bold' />

                    <button onClick={() => { setCreateModelOpen(true) }} className="absolute right-2 top-[50%] translate-y-[-50%] bg-[#9656f0] min-w-20 max-sm:min-w-8 p-1 rounded-3xl max-sm:rounded-full text-sm text-white">
                        <span>+</span>
                        <span className='ml-1 max-sm:hidden'>Snippet</span>
                    </button>
                </div>

                {/* SIGNED-IN  */}
                {(session || status === 'loading') && (
                    <div className='relative flex items-center gap-5 max-sm:ps-3'>
                        <div className='flex flex-col max-lg:hidden'>
                            {status === 'loading' ? (
                                <>
                                    <div className='bg-slate-200 py-2 px-16'></div>
                                    <div className='mt-2 bg-slate-200 py-2 px-16'></div>
                                </>
                            ) : (
                                <>
                                    <h1 className='font-medium text-[15px]'>{session?.user?.name}</h1>
                                    <p className='text-sm text-slate-500'>{session?.user?.email}</p>
                                </>
                            )}
                        </div>
                        {status === 'loading' ? (
                            <div className='flex justify-center items-center h-10 w-10 rounded-full text-white bg-slate-200'></div>
                        ) : (
                            <div onClick={handleImageClick} className='cursor-pointer'>
                                {session?.user?.image ? (
                                    <Image src={session.user.image} alt="User Image" height={40} width={40} className='h-10 w-10 rounded-full' />
                                ) : (
                                    <span className='flex justify-center items-center h-10 w-10 rounded-full text-white bg-[#9248fa]'>
                                        {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0)}
                                    </span>
                                )}
                            </div>
                        )}
                        {isDropdownOpen && (
                            <ul className='absolute z-20 top-10 right-0 overflow-x-auto mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg'>
                                <li className='lg:hidden max-lg:text-sm block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                                    <div className='text-base'>{session?.user?.name}</div>
                                    <div className='text-xs text-slate-500'>{session?.user?.email}</div>
                                </li>
                                <li onClick={() => signOut()} className='block text-base px-4 py-2 text-gray-800 hover:bg-gray-100'>
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {isCreateModelOpen && (
                <CreateSnippetModel setCreateModelOpen={setCreateModelOpen} />
            )}
        </div >
    );
}