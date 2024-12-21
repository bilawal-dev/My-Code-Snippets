"use client"

import { ReduxProviders } from '@/redux/provider';
import SideBar from '@/components/My-Snippets/SideBar';
import TopBar from '@/components/My-Snippets/TopBar';
import TagBar from '@/components/My-Snippets/TagBar';
import Snippets from '@/components/My-Snippets/Snippets';
import { useSession } from 'next-auth/react';

export interface ISnippet {
    title: string;
    description: string;
    code: string;
    language: string;
    tags: string[];
    isFavourite: boolean;
    createdAt: string;
    _id: string;
}

export default function MySnippets() {
    const { data: session, status } = useSession();

    return (
        <ReduxProviders>
            <main className='overflow-hidden min-h-screen h-full relative flex max-sm:px-2 bg-slate-100'>
                <SideBar />

                <section className='flex w-full flex-col gap-3 sm:px-5 sm:pt-1'>
                    <TopBar session={session} status={status} />

                    <TagBar />

                    <Snippets />
                </section>
            </main>
        </ReduxProviders>
    )
}