"use client"

import { fetchUserSnippets } from "@/redux/snippetsSlice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5"
import { useDispatch } from "react-redux";

export default function DeleteSnippetModel({ id, setOpenDeleteSnippetModel }: { id: string, setOpenDeleteSnippetModel: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [isDeleting, setIsDeleting] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    async function handleDeleteSnippet() {
        setIsDeleting(true);

        try {
            const response = await fetch('/api/delete-snippet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            const data = await response.json();
            setOpenDeleteSnippetModel(false);
            dispatch(fetchUserSnippets());
            setIsDeleting(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center max-sm:px-2 overflow-y-auto bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-xl">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none">
                    <IoCloseOutline onClick={() => { setOpenDeleteSnippetModel(false) }} className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Delete Snippet</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this snippet? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                    <button onClick={() => { setOpenDeleteSnippetModel(false) }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">Cancel</button>
                    <button disabled={isDeleting} onClick={handleDeleteSnippet} className={`px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500`}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
                </div>
            </div>
        </div>
    )
}
