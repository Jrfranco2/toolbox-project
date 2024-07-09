import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFiles = createAsyncThunk(
  'files/fetchFiles',
  async (fileName, { rejectWithValue }) => {
    try {
      const url = fileName
        ? `http://localhost:3002/files/data?fileName=${fileName}`
        : 'http://localhost:3002/files/data';
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      let errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    loading: false,
    files: [],
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
        state.error = '';
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.files = [];
        state.error = action.payload;
      });
  },
});

export default fileSlice.reducer;
