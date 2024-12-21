"use client";

import React, { useState } from 'react';
import CreateTagModel from './CreateTagModel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { tagsAll, tagsFilter } from '@/redux/snippetsSlice';

const TagBar = () => {
  const [isTagModelOpen, setTagModelOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  const tags = useSelector((state: RootState) => state.snippets.tags);

  const dispatch: AppDispatch = useDispatch();

  function handleTagClick(tag: string) {
    setSelectedTag(tag);
    dispatch(tagsFilter(tag));
  }

  function handleAllTagClick() {
    setSelectedTag('');
    dispatch(tagsAll());
  }

  return (
    <div className="relative py-2 px-8 max-sm:px-2 bg-white text-slate-500 rounded-lg">
      <ul className="w-[80%] overflow-x-auto text-sm flex gap-5 max-sm:gap-2 pb-2">
        <li onClick={handleAllTagClick} className={`whitespace-nowrap ${selectedTag === "" && 'bg-[#8338ec] text-white'} px-3 rounded-md cursor-pointer`}>All</li>
        {tags.map((tag) => (
          <li key={tag} onClick={() => {handleTagClick(tag)}} className={`whitespace-nowrap ${selectedTag === tag ? 'bg-[#8338ec] text-white' : 'hover:bg-[#8338ec] hover:text-white'} px-3 rounded-md cursor-pointer`}>
            {tag}
          </li>
        ))}
      </ul>

      <button onClick={() => setTagModelOpen(true)} className="absolute right-2 top-[50%] translate-y-[-50%] bg-[#9656f0] min-w-20 max-sm:min-w-10 max-sm:px-2 p-1 rounded-md text-sm text-white">
        + Tag
      </button>

      {isTagModelOpen && (
        <CreateTagModel setTagModelOpen={setTagModelOpen} />
      )}
    </div>
  );
};

export default TagBar;