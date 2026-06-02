"use client";

import { ISnippet } from '@/app/my-snippets/page';
import React, { useState } from 'react';
import { GoTrash } from 'react-icons/go';
import { IoHeart, IoHeartOutline, IoOpenOutline } from 'react-icons/io5';
import { SiC, SiCplusplus, SiJavascript, SiPython, SiReact } from 'react-icons/si';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ViewSnippetModel from './ViewSnippetModel';
import { RiJavaLine } from 'react-icons/ri';
import DeleteSnippetModel from './DeleteSnippetModel';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchUserSnippets } from '@/redux/snippetsSlice';
import { useDispatch } from 'react-redux';

export default function Snippet({ snippet }: { snippet: ISnippet }) {

    const [openViewSnippetModel, setOpenViewSnippetModel] = useState(false);
    const [openDeleteSnippetModel, setOpenDeleteSnippetModel] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    async function handleFavouriteClick() {
        const id = snippet._id;
        try {
            const response = await fetch('/api/favourite-snippet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
            const data = await response.json();
            dispatch(fetchUserSnippets());
        } catch (error) {
            console.log(error);
        }
    }

    //FUNCTION TO RETURN REACT FUNCIONAL COMPONENTS(ICONS)
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
        <div className='bg-white py-2 rounded-lg shadow-sm'>
            <div className='px-5 flex justify-between items-baseline'>
                <div className='flex flex-col'>
                    <h1 className='text-lg font-semibold capitalize'>{snippet.title}</h1>
                    <span className='text-xs text-slate-400'>Created At: {snippet.createdAt.slice(0, 10)}</span>
                </div>
                <div className='flex gap-2'>
                    <IoOpenOutline onClick={() => { setOpenViewSnippetModel(true) }} className='text-lg text-slate-500 cursor-pointer hover:text-blue-500' />
                    {snippet.isFavourite ? (
                        <IoHeart onClick={handleFavouriteClick} className='text-lg text-slate-500 cursor-pointer hover:text-red-500' />
                    ) : (
                        <IoHeartOutline onClick={handleFavouriteClick} className='text-lg text-slate-500 cursor-pointer hover:text-red-500' />
                    )}
                </div>
            </div>
            <div className='px-5 flex flex-wrap py-5 gap-2'>
                {snippet.tags?.map((tag) => (
                    <Tag key={tag} tagName={tag} />
                ))}
            </div>
            <p className='px-5 text-sm text-slate-500 capitalize'>{snippet.description}</p>
            <div className='px-1 bg-slate-50 text-xs py-1 my-2'>
                <CodeBlock code={snippet.code} />
            </div>
            <div className='px-5 pt-2 flex justify-between text-sm'>
                <div className='flex gap-1 items-center text-slate-500 capitalize'>
                    {getLanguageIcon(snippet.language)}
                    <p>{snippet.language}</p>
                </div>
                <GoTrash onClick={() => { setOpenDeleteSnippetModel(true) }} className="cursor-pointer hover:text-red-500" />
            </div>

            {/* OPEN SNIPPET MODEL TO VIEW SNIPPET */}
            {openViewSnippetModel && (
                <ViewSnippetModel snippet={snippet} setOpenViewSnippetModel={setOpenViewSnippetModel} />
            )}

            {/* OPEN DELETE SNIPPET MODEL TO DELETE SNIPPET */}
            {openDeleteSnippetModel && (
                <DeleteSnippetModel id={snippet._id} setOpenDeleteSnippetModel={setOpenDeleteSnippetModel} />
            )}
        </div>
    );
}

function Tag({ tagName }: { tagName: string }) {
    return (
        <div className='bg-[#dec7fe58] text-[#a569f9] font-medium text-xs rounded-md py-1 px-2'>
            {tagName}
        </div>
    );
}

function CodeBlock({ code }: { code: string }) {
    return (
        <SyntaxHighlighter className="h-48" style={darcula}>
            {code}
        </SyntaxHighlighter>
    );
}
