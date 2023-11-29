import {
    ActionReducerMapBuilder,
    AsyncThunk,
    CaseReducer,
    PayloadAction,
    createAsyncThunk,
} from "@reduxjs/toolkit";

export const createCustomAsyncThunk = <T>(
    url: string,
    promise: (payload: any) => Promise<T>
) => {
    return createAsyncThunk(url, async (payload, { rejectWithValue }) => {
        try {
            return await promise(payload);
        } catch (e) {
            return rejectWithValue(e);
        }
    });
};

export const buildHandler = <T, Q>(
    build: ActionReducerMapBuilder<T>,
    action: AsyncThunk<any, any, any>,
    callback: (state: any, action: PayloadAction<Q>) => void
) => {
    return build
        .addCase(action.fulfilled, callback)
        .addCase(action.rejected, (_, action: PayloadAction<any>) => {
            throw action.payload ?? { data: "error", status: 404 };
        });
};
