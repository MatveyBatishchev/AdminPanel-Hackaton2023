import EditorJS from '@editorjs/editorjs';

export const EDITOR_TOOLS = {
    header: Header,
    paragraph: Paragraph
};

const editor = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    holder: 'editorjs',
    tools: {
        header: {
            class: Header,
            inlineToolbar: ['link']
        },
        list: {
            class: List,
            inlineToolbar: true
        }
    },
});