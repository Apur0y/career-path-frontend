import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1, // You can have an ID for each search configuration
    searchTerm: "",
    searchFilters: [],
    page: 1,
    limit: 10,
  },
];

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Set search term for a specific search configuration by id
    setSearchTerm: (state, action) => {
      const { id, searchTerm } = action.payload;
      const searchConfig = state.find((config) => config.id === id);
      if (searchConfig) {
        searchConfig.searchTerm = searchTerm;
      }
    },

    // Set searchFilters for a specific search configuration by id
    setFilters: (state, action) => {
      const { id, searchFilters } = action.payload;
      const searchConfig = state.find((config) => config.id === id);
      if (searchConfig) {
        searchConfig.searchFilters = searchFilters;
      }
    },

    // Reset search configuration by id
    resetSearch: (state, action) => {
      const { id } = action.payload;
      const searchConfig = state.find((config) => config.id === id);
      if (searchConfig) {
        searchConfig.searchTerm = "";
        searchConfig.searchFilters = [];
        searchConfig.page = 1;
        searchConfig.limit = 10;
      }
    },

    // Set page for a specific search configuration by id
    setPage: (state, action) => {
      const { id, page } = action.payload;
      const searchConfig = state.find((config) => config.id === id);
      if (searchConfig) {
        searchConfig.page = page;
      }
    },
      resetStore: () => {
      return initialState;
    },
  },
});

export const { setSearchTerm, setFilters, resetSearch, setPage,resetStore } = searchSlice.actions;

export default searchSlice.reducer;
