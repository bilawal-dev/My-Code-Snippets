"use client"

import React, { useEffect } from 'react'
import Snippet from './Snippet'
import { ISnippet } from '@/app/my-snippets/page';
import SnippetSkeleton from './SnippetSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { favouriteSnippets, fetchUserSnippets } from '@/redux/snippetsSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { FaCodepen } from 'react-icons/fa';

const Snippets = () => {
    const dispatch: AppDispatch = useDispatch();

    // const snippets = useSelector((state: RootState) => state.snippets.snippets);
    const filteredSnippets = useSelector((state: RootState) => state.snippets.filteredSnippets);
    const status = useSelector((state: RootState) => state.snippets.status);
    // const error = useSelector((state: RootState) => state.snippets.error);
    const isShowFavourite = useSelector((state: RootState) => state.snippets.isShowFavourite);

    useEffect(() => {
        if(isShowFavourite){
            dispatch(favouriteSnippets('')); //INITIALLY PASSING EMPTY STRING AS PAYLOAD HERE 
        }else{
            dispatch(fetchUserSnippets());
        }
    }, [isShowFavourite]);

    //RETURNING SKELETONS IF SNIPPETS ARE STILL NOT FETCHED:
    if (status === 'pending') {
        return (
            <div className='mt-2 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                <SnippetSkeleton />
                <SnippetSkeleton />
            </div>
        )
    }

    if (filteredSnippets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <FaCodepen className="text-6xl text-slate-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Snippets Found</h2>
                <p className="text-gray-500 text-center max-w-md">
                    You haven't created any snippets yet. Start coding and save your first snippet!
                </p>
            </div>
        )
    }

    return (
        <div className='mt-2 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>

            {filteredSnippets.length === 0 ? (
                <h1>No Snippets To Show 📪</h1>
            ) : (
                filteredSnippets.map((snippet: ISnippet) => (
                    <Snippet key={snippet._id} snippet={snippet} />
                ))
            )}
        </div>
    )
}

export default Snippets