import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  creatingPage: false,
  createPageError: null,
  pageId: null,
  fetchingPage: false,
  fetchedPageData: null,
  fetchPageError: null,
};

// Async thunk for creating a page
export const createPage = createAsyncThunk('page/createPage',
  async (values, { rejectWithValue }) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const { page_name, page_title } = values;
      const response = await axios.post('http://localhost:8080/page/addPage', {
        page_name: page_name,
        page_file_name: `${page_name}.html`,
        page_title: page_title,
        parent_page_id: null,
        created_by: "admin",
        creation_date: currentDate,
        last_updated_by: "admin",
        last_update_date: currentDate,
      });
      console.log("ID in Slice",response.data);
      return response.data; // Return data from successful API call

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);

// Async thunk for fetching page details by pageId
export const fetchPageById = createAsyncThunk('page/fetchPageById',
  async (pageId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/getPageById/${pageId}`);
      return response.data; // Return data from successful API call

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);

export const createAttribute = createAsyncThunk('',
  async (values, { rejectWithValue }) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const { page_id, attribute_name, attribute_type } = values;
      const response = await axios.post('http://localhost:8080/page/addPageProperties', {
        page_id: 1030 ,
        attribute_name:"submitbtn",
        attribute_type:"button",
        created_by:"Praveen",
        creation_date:"2024-07-14T12:30:45.678Z",
        last_updated_by:"Praveen",
        last_update_date:"2024-07-14T12:30:45.678Z"
          });
      console.log("ID in Slice",response.data);
      return response.data; // Return data from successful API call

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
)

// Create slice for handling page state
const PageDataSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPage.pending, (state) => {
        state.creatingPage = true;
        state.createPageError = null;
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.creatingPage = false;
        state.pageId = action.payload.pageId; // Update state with received pageId
      })
      .addCase(createPage.rejected, (state, action) => {
        state.creatingPage = false;
        state.createPageError = action.payload;
      })
      .addCase(fetchPageById.pending, (state) => {
        state.fetchingPage = true;
        state.fetchedPageData = null;
        state.fetchPageError = null;
      })
      .addCase(fetchPageById.fulfilled, (state, action) => {
        state.fetchingPage = false;
        state.fetchedPageData = action.payload;
      })
      .addCase(fetchPageById.rejected, (state, action) => {
        state.fetchingPage = false;
        state.fetchPageError = action.payload;
      });
  },
});

export default PageDataSlice.reducer;