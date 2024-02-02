"use client";
import { NewsModel } from "@/types";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
    item: NewsModel;
    setSelectedNews: () => void;
}

const NewsCard: React.FC<Props> = ({ item, setSelectedNews }) => {
    return (
        <div
            onClick={() => setSelectedNews()}
            className="news-card cursor-pointer"
        >
            {item.img ? (
                <div
                    className="h-36 overflow-y-hidden bg-center bg-cover w-full rounded mb-4"
                    style={{ backgroundImage: `url(${item.img})` }}
                ></div>
            ) : (
                ""
            )}
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm leading-7 max-h-[7rem] text-full-ellipsis mt-3">
                {item.description}
            </p>
            <p className="text-xs opacity-50 capitalize mb-3">
                {item.source} - {dayjs(item.published_at).fromNow(true)}
            </p>
        </div>
    );
};

export default NewsCard;
