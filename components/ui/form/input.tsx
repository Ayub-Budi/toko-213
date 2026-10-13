"use client";

import * as React from "react";
import { useId } from "react";
import { useFieldError } from "./form";

interface InputProps extends React.ComponentProps<"input"> {
    label?: string;
    /** Pesan error. Kalau kosong dan input ada di dalam `<Form>`, diambil otomatis dari hasil validasi berdasarkan `name`. */
    error?: string;
}

export function Input({ label, error, className = "", id, type = "text", onChange, ...props }: InputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const field = useFieldError(props.name);
    const errorMessage = error ?? field.error;

    return (
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={inputId}>{label}</label>}
            <input
                type={type}
                id={inputId}
                aria-invalid={errorMessage ? true : undefined}
                aria-describedby={errorMessage ? errorId : undefined}
                className={`border bg-slate-50 text-slate-900 text-sm rounded-lg block w-full p-2.5 ${
                    errorMessage
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                } ${className}`}
                onChange={(event) => {
                    field.clearError();
                    onChange?.(event);
                }}
                {...props}
            />
            {errorMessage && (
                <p id={errorId} className="text-sm text-red-600">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
