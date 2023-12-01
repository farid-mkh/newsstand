"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { fetchNewsAsync } from "@/lib/features/news/action";
import AppSkeleton from "./app/skeleton/AppSkeleton";
import NewsCard from "./news/card/NewsCard";
import NewsFilters from "./news/filters/NewsFilters";
import Newspaper from "@/assets/img/newspaper.svg";
import Image from "next/image";
import NewsDetail from "./news/detail/NewsDetail";
import { NewsModel } from "@/types";

interface Props {}

const HomeNews: React.FC<Props> = (props) => {
    const news = useAppSelector((state) => state.news.news);
    const dispatch = useAppDispatch();
    // filtered news with source: client side filtering
    const [source, setSource] = useState("");
    const filteredNews = useMemo(() => {
        return source ? news.filter((i) => i.source === source) : news;
    }, [news, source]);
    // initial fetch
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(fetchNewsAsync({})).then(() => {
            setLoading(false);
        });
    }, []);
    // news details
    const [show, setShow] = useState(false);
    const [selectedNews, setSelectedNews] = useState<NewsModel>();
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
        <div className="w-full">
            <NewsFilters
                source={source}
                onChange={(e) =>
                    setSource(e.target.value === "all" ? "" : e.target.value)
                }
            />
            {filteredNews.length ? (
                <div className="w-full grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredNews.map((i, id) => (
                        <NewsCard
                            key={id}
                            item={i}
                            setSelectedNews={() => {
                                setShow(true);
                                setSelectedNews(i);
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full flex items-center justify-center mt-20">
                    <div className="text-center">
                        <Image
                            src={Newspaper}
                            alt="empty news"
                            width="100"
                            className="invert mx-auto mb-10"
                        />
                        <p>Nothing Found!</p>
                    </div>
                </div>
            )}
            <NewsDetail show={show} setShow={setShow} selected={selectedNews} />
        </div>
    );
};

export default HomeNews;
