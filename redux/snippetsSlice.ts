import { ISnippet } from '@/app/my-snippets/page';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state of the slice
const initialState = {
  snippets: [],
  filteredSnippets: [], // To store the search result
  tags: [],
  isShowFavourite: false,
  status: 'pending', // 'pending' | 'fulfilled' | 'rejected'
  error: null as string | null,
};

// Define the async thunk for fetching user snippets
const fetchUserSnippets = createAsyncThunk('userSnippet', async function () {
  const response = await fetch(`/api/get-snippet`);
  const data = await response.json();
  return data.userSnippets;
});

// Create the slice
const snippetsSlice = createSlice({
  name: 'userSnippets',
  initialState,
  reducers: {
    searchSnippets: (state, action) => {
      const searchQuery: string = action.payload.toLowerCase(); // Assuming the search query is a string
      state.filteredSnippets = state.snippets.filter((snippet: ISnippet) => (
        snippet.title.toLowerCase().includes(searchQuery) || snippet.title.toLowerCase().includes(searchQuery) // Change `title` and `description` to match your snippet structure
      ));
    },

    showFavourite: (state) => {
      state.isShowFavourite = true;
    },

    showAll: (state) => {
      state.isShowFavourite = false;
    },

    favouriteSnippets: (state, action) => {
      const favouriteSnippets = state.snippets.filter((snippet: ISnippet) => snippet.isFavourite);
      const searchQuery: string = action.payload.toLowerCase(); // Assuming the search query is a string
      state.filteredSnippets = favouriteSnippets.filter((snippet: ISnippet) =>
        snippet.title.toLowerCase().includes(searchQuery) || snippet.description.toLowerCase().includes(searchQuery)
      );
    },

    tagsAll: (state) => {
      state.filteredSnippets = state.snippets;
    },

    tagsFilter: (state, action) => {
      const tag: string = action.payload;
      state.filteredSnippets = state.snippets.filter((snippet: ISnippet) => (
        snippet.tags.includes(tag)
      ))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSnippets.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUserSnippets.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        // Add user snippets to the state array
        state.tags = action.payload.tags || [];
        state.snippets = action.payload.snippets || [];
        state.filteredSnippets = action.payload.snippets || [];
      })
      .addCase(fetchUserSnippets.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? 'Something went wrong'; // Assign the error message
      });
  },
});

// Export the async thunk and the reducer
export const { searchSnippets, showFavourite, showAll, favouriteSnippets, tagsFilter, tagsAll } = snippetsSlice.actions;
export { fetchUserSnippets };
export default snippetsSlice.reducer;