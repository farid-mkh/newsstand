"use client";
import React from "react";

interface Props {
    children: React.ReactNode;
    value: boolean;
    onChange: (e: boolean) => void;
    className?: string;
}

const AppModal: React.FC<Props> = ({
    children,
    value,
    onChange,
    className = "",
}) => {
    if (!value) return;
    return (
        <div
            className={`w-full h-full fixed top-0 left-0 z-[70] overflow-x-hidden overflow-y-auto ${className}`}
        >
            <div
                onClick={() => onChange(false)}
                className="bg-slate-800/40 w-full h-full fixed z-[60]"
            ></div>
            <div className="h-screen mt-0 px-2 mx-auto w-max ease-out transition-all m-3 min-h-[calc(100%-3.5rem)] flex items-center relative z-[60]">
                {children}
            </div>
        </div>
    );
};

export default AppModal;
