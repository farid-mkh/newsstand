"use client";
import React, { useCallback, useState } from "react";
import _ from "lodash";
import { useAppDispatch } from "@/lib/hook";
import { fetchNewsAsync } from "@/lib/features/news/action";
import AppLinearLoading from "@/app/components/app/linear/AppLinearLoading";

interface Props {}

const LayoutSearch: React.FC<Props> = (props) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    function handleSearch(value: string) {
        setLoading(true);
        dispatch(fetchNewsAsync({ q: value })).finally(() => {
            setLoading(false);
        });
    }
    const debouncedHandleSearch = useCallback(
        _.debounce(handleSearch, 500),
        []
    );
    return (
        <>
            {loading ? (
                <AppLinearLoading className="fixed top-0 left-0 right-0" />
            ) : (
                ""
            )}
            <input
                className="input min-w-[300px] rounded-lg dark:bg-zinc-800/70 dark:border-gray-300"
                placeholder="search ..."
                onChange={(e) => debouncedHandleSearch(e.target.value)}
            />
        </>
    );
};

export default LayoutSearch;
