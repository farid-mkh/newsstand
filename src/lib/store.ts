import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import newsSlice from "./features/news/newsSlice";
export const makeStore = () => {
    return configureStore({
        reducer: {
            news: newsSlice,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
