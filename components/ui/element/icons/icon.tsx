import * as React from "react";
import { icons, type IconName } from "./icons.generated";

const escapeHtml = (text: string) =>
    text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[c]!);

interface IconProps extends Omit<React.ComponentProps<"svg">, "name"> {
    name: IconName;
    /** Teks untuk screen reader. Kosongkan kalau icon hanya dekorasi. */
    title?: string;
}

/**
 * Ukuran mengikuti `font-size` (1em) dan warna mengikuti `color` (currentColor),
 * jadi cukup diatur lewat class teks, misalnya `text-2xl text-blue-700`.
 */
export function Icon({ name, title, className = "", ...props }: IconProps) {
    const icon = icons[name];

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            {...icon.attrs}
            className={`inline-block shrink-0 ${className}`}
            role={title ? "img" : undefined}
            aria-label={title}
            aria-hidden={title ? undefined : true}
            {...props}
            dangerouslySetInnerHTML={{ __html: (title ? `<title>${escapeHtml(title)}</title>` : "") + icon.body }}
        />
    );
}
