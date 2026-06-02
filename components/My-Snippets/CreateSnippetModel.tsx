import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUserSnippets } from "@/redux/snippetsSlice";

export default function CreateSnippetModal({ setCreateModelOpen }: { setCreateModelOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = useSelector((state: RootState) => state.snippets.tags);

  const dispatch: AppDispatch = useDispatch();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await fetch('/api/create-snippet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, code, language, tags: selectedTags })
      });

      const data = await response.json();

      dispatch(fetchUserSnippets());
    } catch (error) {
      console.log(error);
    }

    // Close the modal after submission
    setCreateModelOpen(false);
  };

  function handleTagChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    setSelectedTags(prevTags => 
      checked ? [...prevTags, value] : prevTags.filter(tag => tag !== value)
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-sm:w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl">Create New Code Snippet</h2>
          <button
            onClick={() => setCreateModelOpen(false)}
            className="text-gray-500 hover:text-gray-600 transition-colors"
          >
            <IoCloseOutline className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-base tracking-wide font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8338ec] focus:border-[#8338ec]"
              placeholder="Enter snippet title"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="block text-base tracking-wide font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8338ec] focus:border-[#8338ec] min-h-[100px]"
              placeholder="Enter snippet description"
            ></textarea>
          </div>
          <div className="space-y-2">
            <label htmlFor="code" className="block text-base tracking-wide font-medium text-gray-700">
              Code
            </label>
            <textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8338ec] focus:border-[#8338ec] min-h-[200px] font-mono"
              placeholder="Paste your code here"
              required
            ></textarea>
          </div>
          {/* Language Selection Dropdown */}
          <div>
            <label htmlFor="language" className="block text-base tracking-wide font-medium text-gray-700">Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8338ec] focus:border-[#8338ec]"
              required
            >
              <option value="">Select Language</option>
              <option value="c">C</option>
              <option value="c++">C++</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
            </select>
          </div>
          {/* Tags Selection with Checkboxes */}
          <div>
            <label htmlFor="tags" className="block text-base tracking-wide font-medium text-gray-700">Tags</label>
            <div className="">
              {tags.map((tag) => (
                <div key={tag} className="mt-1 flex items-center">
                  <input
                    type="checkbox"
                    id={tag}
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={handleTagChange}
                    className="mr-2"
                  />
                  <label htmlFor={tag} className="cursor-pointer text-black">{tag}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-[#8338ec] focus:ring-offset-2 transition-colors"
            >
              Create Snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}