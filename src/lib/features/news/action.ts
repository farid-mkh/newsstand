import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNYCHome, fetchNewsorgHome, fetchGuardianHome } from "./newsAPI";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchNYCAsync = createAsyncThunk(
    "news/fetchNYC",
    async (params: Record<string, any>) => {
        const response = await fetchNYCHome(params);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);
export const fetchNewsorgAsync = createAsyncThunk(
    "news/fetchNewsorg",
    async (params: Record<string, any>) => {
        const response = await fetchNewsorgHome(params);
        return response.data;
    }
);
export const fetchGuardianAsync = createAsyncThunk(
    "news/fetchGuardian",
    async (params: Record<string, any>) => {
        const response = await fetchGuardianHome(params);
        return response.data;
    }
);
