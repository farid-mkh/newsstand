"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { fetchNewsAsync } from "@/lib/features/news/action";
import AppSkeleton from "./app/skeleton/AppSkeleton";
import NewsCard from "./news/NewsCard";

interface Props {}

const HomeNews: React.FC<Props> = (props) => {
    const news = useAppSelector((state) => state.news.news);
    const dispatch = useAppDispatch();
    const [source, setSource] = useState();
    const filteredNews = useMemo(() => {
        return source ? news.filter((i) => i.source === source) : news;
    }, [news, source]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(fetchNewsAsync()).then(() => {
            setLoading(false);
        });
    }, []);
    if (loading)
        return (
            <div className="w-full grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array(12)
                    .fill(null)
                    .map((i, id) => (
                        <AppSkeleton key={id} />
                    ))}
            </div>
        );
    return (
        <div className="w-full grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {news.map((i, id) => (
                <NewsCard key={id} item={i} />
            ))}
        </div>
    );
};

export default HomeNews;
