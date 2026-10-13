"use client";

import * as React from "react";
import { createContext, useContext, useState } from "react";
import type { z } from "zod";

export type FormError = {
    name: string;
    message: string;
};

type FormContextValue = {
    errors: FormError[];
    clearError: (name: string) => void;
};

const FormContext = createContext<FormContextValue | null>(null);

/** Pesan error untuk field `name` dari `<Form>` terdekat (undefined kalau tidak ada error / di luar Form). */
export function useFieldError(name: string | undefined) {
    const context = useContext(FormContext);
    return {
        error: name ? context?.errors.find((error) => error.name === name)?.message : undefined,
        clearError: () => name && context?.clearError(name),
    };
}

interface FormProps<T extends z.ZodType> extends Omit<React.ComponentProps<"form">, "onSubmit" | "onError"> {
    /** Schema Zod untuk memvalidasi isi form (berdasarkan atribut `name` tiap input). */
    schema: T;
    /** Dipanggil kalau validasi lolos, dengan data hasil parse schema dan elemen form (mis. untuk `form.reset()`). */
    onSubmit: (data: z.output<T>, form: HTMLFormElement) => void | Promise<void>;
    /** Dipanggil kalau validasi gagal, dengan daftar error `{ name, message }`. */
    onError?: (errors: FormError[]) => void;
}

/** Ubah FormData jadi object. Field dengan nama sama (mis. checkbox) jadi array. */
function formDataToObject(formData: FormData) {
    const values: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
    for (const key of new Set(formData.keys())) {
        const all = formData.getAll(key);
        values[key] = all.length > 1 ? all : all[0];
    }
    return values;
}

export function Form<T extends z.ZodType>({ schema, onSubmit, onError, className = "", children, ...props }: FormProps<T>) {
    const [errors, setErrors] = useState<FormError[]>([]);

    function clearError(name: string) {
        setErrors((current) => (current.some((error) => error.name === name) ? current.filter((error) => error.name !== name) : current));
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        // Simpan elemen form sebelum await: setelah itu event.currentTarget sudah null.
        const form = event.currentTarget;
        const result = await schema.safeParseAsync(formDataToObject(new FormData(form)));

        if (!result.success) {
            const newErrors = result.error.issues.map((issue) => ({ name: issue.path.join("."), message: issue.message }));
            setErrors(newErrors);
            onError?.(newErrors);
            return;
        }

        setErrors([]);
        onError?.([]);
        await onSubmit(result.data, form);
    }

    return (
        <FormContext.Provider value={{ errors, clearError }}>
            <form className={`${className}`} noValidate onSubmit={handleSubmit} {...props}>
                {children}
            </form>
        </FormContext.Provider>
    );
}
