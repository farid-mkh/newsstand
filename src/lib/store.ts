import {
    Action,
    ThunkAction,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import newsSlice from "./features/news/newsSlice";
// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    news: newsSlice,
});
export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
