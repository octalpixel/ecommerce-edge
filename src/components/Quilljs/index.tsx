import dynamic from "next/dynamic";
import { useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

export function QuillEditor() {
    const [value, setValue] = useState("");

    return (
        <div className="relative z-[999] h-48 w-full rounded border bg-white shadow-md">
            <span className="absolute top-2 left-2 text-sm text-slate-700 ">
                Descrição
            </span>
            <ReactQuill
                theme="bubble"
                className="h-full"
                value={value}
                onChange={setValue}
            />
        </div>
    );
}
