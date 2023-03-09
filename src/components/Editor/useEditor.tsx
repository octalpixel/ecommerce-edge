import {
    boldCommand,
    codeCommand,
    italicCommand,
    linkCommand,
    orderedListCommand,
    unorderedListCommand,
    checkedListCommand,
    useTextAreaMarkdownEditor,
    strikethroughCommand,
    headingLevel1Command,
    headingLevel2Command,
    headingLevel3Command,
    headingLevel4Command,
    quoteCommand,
} from "react-mde";

export function useEditor() {
    const { ref, commandController } = useTextAreaMarkdownEditor({
        commandMap: {
            h1: headingLevel1Command,
            h2: headingLevel2Command,
            h3: headingLevel3Command,
            h4: headingLevel4Command,
            bold: boldCommand,
            italic: italicCommand,
            code: codeCommand,
            link: linkCommand,
            quote: quoteCommand,
            orderedList: orderedListCommand,
            checkedList: checkedListCommand,
            unorderedList: unorderedListCommand,
            strikeThrough: strikethroughCommand,
        },
    });
    return [ref, commandController] as const;
}
