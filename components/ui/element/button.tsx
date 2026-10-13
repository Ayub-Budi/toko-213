"use client";

import * as React from "react";
import { useId } from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
    label: string;
    variant?: "outline" | "solid";
    size?: "small" | "medium" | "large";
}

export function Button({ label, variant = "solid", size = "medium", className = "", id, ...props }: ButtonProps) {
    const generatedId = useId();
    const buttonId = id ?? generatedId;

    const variantClasses = () => {
        const styles = {
            solid: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300",
            outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-4 focus:ring-blue-300",
        };
        const disabledStyles = {
            solid: "bg-gray-600 text-white",
            outline: "border border-gray-600 text-gray-600",
        };
        return props.disabled ? disabledStyles[variant] : styles[variant];
    }

    const sizeClasses = () => {
        const styles = {
            small: "px-3 py-1 text-sm",
            medium: "px-4 py-2 text-base",
            large: "px-5 py-2.5 text-lg",
        };
        return styles[size];
    }

    return (
        <button
            type="button"
            id={buttonId}
            className={`${variantClasses()} ${sizeClasses()} inline-flex items-center justify-center rounded-lg ${className}`}
            {...props}
        >
            {label} {}
        </button>
    );
}