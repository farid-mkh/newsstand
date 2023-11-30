"use client";
import React from "react";
import LayoutSearch from "./search/LayoutSearch";

interface Props {}

const LayoutNav: React.FC<Props> = (props) => {
    return (
        <div className="z-10 w-full px-10 py-2 fixed lg:bg-zinc-700/30 backdrop-blur-xl">
            <div className="font-bold text-lg block w-full mb-4 text-center pt-3">
                Newsstand
            </div>
            <p className="text-center w-full  px-5 pb-3">
                <LayoutSearch />
            </p>
        </div>
    );
};

export default LayoutNav;
