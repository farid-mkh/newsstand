"use client";
import { NewsModel } from "@/types";
import React from "react";
import AppModal from "@/app/components/app/modal/AppModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
    selected: NewsModel;
    show: boolean;
    setShow: (val: boolean) => void;
}

const NewsDetail: React.FC<Props> = ({ show, setShow, selected }) => {
    if (!selected) return;
    return (
        <AppModal value={show} onChange={setShow} className="overflow-y-hidden">
            <div className="max-w-[400px] w-full bg-gray-900 rounded-lg">
                {selected.img ? (
                    <div
                        className="h-36 overflow-y-hidden bg-center bg-cover w-full rounded mb-4"
                        style={{ backgroundImage: `url(${selected.img})` }}
                    ></div>
                ) : (
                    ""
                )}
                <h3 className="font-bold text-lg p-3">{selected.title}</h3>
                <p className="text-sm leading-7 mt-3 overflow-y-auto max-h-[8.75rem] p-3">
                    {selected.description}
                </p>
                <p className="text-xs opacity-50 capitalize mb-3 p-3">
                    {selected.source} -{" "}
                    {dayjs(selected.published_at).fromNow(true)}
                </p>
            </div>
        </AppModal>
    );
};

export default NewsDetail;
