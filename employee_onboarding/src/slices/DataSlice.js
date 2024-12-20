import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch data
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch("http://localhost:3010/users/getall_onb");
  const data = await response.json();
  return data.us; // Assuming 'us' is an array of user objects
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [], // Stores the entire response array
    loading: false,
    error: null,
    doc_uploaded_users: [], // Stores the filtered users
    form_filled_users: [],  // Stores users with status_id 1
    completed_users: [],    // Stores users with status_id 5
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        console.log("Fetching data...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log("Fetch successful:", action.payload); // Logs the fetched data

        // Ensure action.payload is an array before proceeding with filter
        if (Array.isArray(action.payload)) {
          state.loading = false;
          state.data = action.payload; // Store the full array

          // Filter the array based on different status_ids
          state.completed_users = action.payload.filter(
            (user) => user.status_id === 5
          );
          state.form_filled_users = action.payload.filter(
            (user) => user.status_id === 1
          );
          state.doc_uploaded_users = action.payload.filter(
            (user) => user.status_id === 2
          );

          console.log("Filtered doc_uploaded_users:", state.doc_uploaded_users);
        } else {
          console.error("API response is not an array:", action.payload);
          state.loading = false;
          state.error = "Unexpected API response structure";
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.error("Fetch failed:", action.error.message); // Logs the error
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
