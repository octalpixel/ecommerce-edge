/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useState } from "react";
import type {
    UseFormSetValue,
    UseFormRegister,
    FieldValues,
    UseFormGetValues,
} from "react-hook-form";
import { type Product } from "~/schemas/products";
import { Textarea } from "~/components/UI/Textarea";

type EditorProps<T extends FieldValues> = {
    setValue: UseFormSetValue<T>;
    register: UseFormRegister<T>;
    name: keyof T;
};
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/UI/Tabs";
import Markdown from "markdown-to-jsx";
import { EditorButtons } from "./Editorbuttons";
import { useEditor } from "./useEditor";

export function Editor({ name, register, setValue }: EditorProps<Product>) {
    const [MDERef, commandController] = useEditor();
    const [value, _setValue] = useState("");

    useEffect(() => {
        register(name);
    }, [name, register]);

    return (
        <Tabs defaultValue="editor" className="w-full">
            <TabsList>
                <TabsTrigger value="editor">Escrever</TabsTrigger>
                <TabsTrigger value="preview">Visualizar</TabsTrigger>
            </TabsList>
            <TabsContent value="editor">
                <EditorButtons commandController={commandController} />
                <Textarea
                    className="h-full resize-none rounded-t-none"
                    placeholder="Descrição"
                    rows={10}
                    value={value}
                    onChange={(e) => {
                        _setValue(e.target.value);
                        setValue(name, e.target.value);
                    }}
                    ref={MDERef}
                />
            </TabsContent>
            <TabsContent value="preview">
                <div className="prose min-h-[263px] max-w-none">
                    <Markdown>{value}</Markdown>
                </div>
            </TabsContent>
        </Tabs>
    );
}
