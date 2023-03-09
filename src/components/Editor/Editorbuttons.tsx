import {
    Link,
    List,
    ListChecks,
    ListOrdered,
    Quote,
    Bold,
    Heading4,
    Heading3,
    Heading2,
    Heading1,
    Italic,
    Strikethrough,
} from "lucide-react";
import { createContext, type ReactNode, useContext } from "react";
import { type CommandController } from "react-mde";

export type Commands =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "bold"
    | "italic"
    | "code"
    | "link"
    | "quote"
    | "orderedList"
    | "checkedList"
    | "unorderedList"
    | "strikeThrough";

const CommentButtonsContext = createContext<CommandController<Commands> | null>(
    null
);

const EditorButton = ({
    children,
    command,
}: {
    children: ReactNode;
    command: Commands;
}) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const commandController = useContext(CommentButtonsContext)!;
    return (
        <button
            type="button"
            className="rounded p-2 transition-all hover:bg-slate-400/30 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
                await commandController.executeCommand(command);
                return;
            }}
        >
            {children}
        </button>
    );
};

export type EditorButtonProps = {
    commandController: CommandController<Commands>;
};

export function EditorButtons({ commandController }: EditorButtonProps) {
    return (
        <CommentButtonsContext.Provider value={commandController}>
            <div className="flex gap-1 overflow-x-scroll rounded-t border border-b-0 border-slate-300 p-1 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 sm:overflow-x-auto">
                <EditorButton command="h1">
                    <Heading1 size={20} />
                </EditorButton>
                <EditorButton command="h2">
                    <Heading2 size={20} />
                </EditorButton>
                <EditorButton command="h3">
                    <Heading3 size={20} />
                </EditorButton>
                <EditorButton command="h4">
                    <Heading4 size={20} />
                </EditorButton>
                <EditorButton command="bold">
                    <Bold size={20} />
                </EditorButton>
                <EditorButton command="italic">
                    <Italic size={20} />
                </EditorButton>
                <EditorButton command="strikeThrough">
                    <Strikethrough size={20} />
                </EditorButton>
                <EditorButton command="link">
                    <Link size={20} />
                </EditorButton>
                <EditorButton command="quote">
                    <Quote size={20} />
                </EditorButton>
                <EditorButton command="orderedList">
                    <ListOrdered size={20} />
                </EditorButton>
                <EditorButton command="unorderedList">
                    <List size={20} />
                </EditorButton>
                <EditorButton command="checkedList">
                    <ListChecks size={20} />
                </EditorButton>
            </div>
        </CommentButtonsContext.Provider>
    );
}
