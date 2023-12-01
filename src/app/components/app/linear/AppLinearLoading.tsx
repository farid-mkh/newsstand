"use client";
import React from "react";

interface Props {
    className?: string;
}

const AppLinearLoading: React.FC<Props> = ({ className = "" }) => {
    return (
        <div className={`linear-activity ${className}`}>
            <div className="indeterminate"></div>
        </div>
    );
};

export default AppLinearLoading;
