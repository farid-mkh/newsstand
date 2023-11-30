import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNYTHome, fetchNewsorgHome, fetchGuardianHome } from "./api";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
interface RequestQueries {
    q?: string;
}
export const fetchNewsAsync = createAsyncThunk(
    "news/fetchNews",
    async (params: RequestQueries = {}) => {
        try {
            const [data1, data2, data3] = await Promise.all([
                fetchNYTHome(params),
                fetchNewsorgHome(
                    params ? { country: "us", ...params } : { country: "us" }
                ),
                fetchGuardianHome(params),
            ]);
            // The value we return becomes the `fulfilled` action payload
            return [data1, data2, data3]
                .flat()
                .sort(
                    (a, b) =>
                        new Date(b.published_at).getTime() -
                        new Date(a.published_at).getTime()
                );
        } catch (e) {
            throw e;
        }
    }
);
