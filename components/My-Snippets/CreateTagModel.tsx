"use client";

import { fetchUserSnippets } from '@/redux/snippetsSlice';
import { AppDispatch } from '@/redux/store';
import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux';

const CreateTagModel = ({ setTagModelOpen }: { setTagModelOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [tag, setTag] = useState('');

    const dispatch: AppDispatch = useDispatch();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            const response = await fetch('/api/create-tag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tag })
            })

            const data = await response.json();

            dispatch(fetchUserSnippets());

        } catch (error) {
            console.log(error);
        }

        // Close the modal after submission
        setTagModelOpen(false);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-sm:w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg">
                <div className="flex items-center justify-between p-6 pb-0 border-gray-200">
                    <h2 className="text-xl">Create New Tag</h2>
                    <button onClick={() => setTagModelOpen(false)} className="text-gray-500 hover:text-gray-600 transition-colors">
                        <IoCloseOutline className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <input
                            type="text"
                            id="title"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8338ec] focus:border-[#8338ec]"
                            placeholder="Enter snippet title"
                            required
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-[#8338ec] focus:ring-offset-2 transition-colors">
                            Add Tag
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTagModel