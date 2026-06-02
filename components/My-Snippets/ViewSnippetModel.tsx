"use client"

import { ISnippet } from "@/app/my-snippets/page"
import { fetchUserSnippets } from "@/redux/snippetsSlice"
import { AppDispatch } from "@/redux/store"
import { IoCloseOutline, IoHeart, IoHeartOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"
import SyntaxHighlighter from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs"

export default function ViewSnippetModel({ snippet, setOpenViewSnippetModel }: { snippet: ISnippet, setOpenViewSnippetModel: React.Dispatch<React.SetStateAction<boolean>> }) {

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

  return (
    <div className='fixed left-0 top-0 z-50 flex items-center justify-center max-sm:px-2 h-screen w-screen bg-black/50'>
      <div className='w-2/3 max-sm:w-full max-h-[90%] overflow-auto bg-white py-2 rounded-lg shadow-sm'>
        <div className='px-5 flex justify-between items-baseline'>
          <div className='flex flex-col'>
            <h1 className='text-lg font-semibold capitalize'>{snippet.title}</h1>
            <span className='text-xs text-slate-400'>{snippet.createdAt.slice(0, 10)}</span>
          </div>
          <div className='flex items-center gap-2'>
            <IoCloseOutline onClick={() => { setOpenViewSnippetModel(false) }} className='text-2xl text-slate-500 cursor-pointer hover:text-blue-500' />
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
          <div className='flex gap-1 items-center capitalize'>
            <p>{snippet.language}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Tag({ tagName }: { tagName: string }) {
  return (
    <div className='bg-[#dec7fe58] text-[#a569f9] font-medium text-xs rounded-md py-1 px-2'>
      {tagName}
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <SyntaxHighlighter style={darcula}>
      {code}
    </SyntaxHighlighter>
  )
}