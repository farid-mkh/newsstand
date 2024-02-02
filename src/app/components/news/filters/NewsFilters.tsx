"use client";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import AppLinearLoading from "@/app/components/app/linear/AppLinearLoading";
import { useAppDispatch } from "@/lib/hook";
import { fetchNewsAsync } from "@/lib/features/news/action";

const CategoryList = [
    "all",
    "health",
    "science",
    "sports",
    "technology",
    "business",
] as const;
const SourceTypes = ["all", "NYT", "newsapi.org", "guardian"];

interface Props {
    source: string;
    onChange: (e: any) => void;
}

const NewsFilters: React.FC<Props> = ({ source, onChange }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] =
        useState<(typeof CategoryList)[number]>("all");
    const [from, setFrom] = useState<string>();
    function handleUpdateNews(params: {
        from?: typeof from;
        category?: typeof category;
    }) {
        setLoading(true);
        dispatch(fetchNewsAsync(params as any)).then(() => {
            setLoading(false);
        });
    }
    function handleDatePicker(val: string) {
        setFrom(val);
        handleUpdateNews({
            from: val,
            category: category === "all" ? undefined : category,
        });
    }
    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        const val = e.target.value as (typeof CategoryList)[number];
        setCategory(val);
        handleUpdateNews({
            from,
            category: val === "all" ? undefined : val,
        });
    }
    return (
        <div className="mb-5 mt-5 grid md:grid-cols-3 gap-4">
            {loading ? (
                <AppLinearLoading className="fixed top-0 left-0 right-0 z-50" />
            ) : (
                ""
            )}
            <select
                value={source}
                onChange={onChange}
                placeholder="select source"
                className="input rounded-lg dark:bg-gray-800 dark:border-gray-300 px-3 w-full"
            >
                {SourceTypes.map((i, id) => (
                    <option value={i} key={id}>
                        {i}
                    </option>
                ))}
            </select>
            <Datepicker
                containerClassName="dark:bg-gray-800 dark:border-gray-300 rounded-lg relative"
                placeholder={"From YYYY-MM-DD"}
                useRange={false}
                asSingle={true}
                showShortcuts={true}
                showFooter={true}
                configs={{
                    footer: {
                        cancel: "Cancel",
                        apply: "Filter",
                    },
                }}
                value={from as any}
                onChange={handleDatePicker as any}
            />
            <select
                value={category}
                onChange={handleCategory}
                placeholder="select source"
                className="input rounded-lg dark:bg-gray-800 dark:border-gray-300 px-3 w-full"
            >
                {CategoryList.map((i, id) => (
                    <option value={i} key={id}>
                        {i}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default NewsFilters;
