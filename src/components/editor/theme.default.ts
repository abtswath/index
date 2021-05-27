import { EditorView } from '@codemirror/view';

const background = '#f5f5f5',
    color = 'rgba(0, 0, 0, .8)',
    cursor = '#000',
    selection = '#1d3557',
    panelBackground = '#f5f5f5',
    highlightBackground = '#d7d4f0',
    stone = '#7d8799';

const theme = EditorView.theme({
    '&': {
        color: color,
        backgroundColor: background,
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    '.cm-scroller': {
        lineHeight: 1.575,
    },
    '.cm-scroller::-webkit-scrollbar': {
        width: '6px',
    },
    '.cm-scroller::-webkit-scrollbar-thumb': {
        borderRadius: '3px',
        background: '#bcd',
    },
    '.cm-content': {
        fontFamily:
            'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
        caretColor: cursor,
        boxSizing: 'border-box !important',
        padding: '16px',
    },
    '.cm-line': {
        padding: 0,
    },
    '&.cm-focused': {
        outline: 'none',
        border: 'none',
    },
    '&.cm-focused .cm-cursor': { borderLeftColor: cursor },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection':
        { backgroundColor: selection },
    '.cm-panels': { backgroundColor: panelBackground, color: color },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
    '.cm-searchMatch': {
        backgroundColor: highlightBackground,
        border: `1px solid ${highlightBackground}`,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: '#d7d4f066',
        border: `1px solid ${highlightBackground}`,
    },
    '.cm-activeLine': { backgroundColor: highlightBackground },
    '.cm-selectionMatch': { backgroundColor: '#aafe661a' },
    '.cm-matchingBracket, .cm-nonmatchingBracket': {
        backgroundColor: '#bad0f847',
        outline: '1px solid #515a6b',
    },
    '.cm-gutters': {
        backgroundColor: background,
        color: stone,
        border: 'none',
    },
    '.cm-activeLineGutter': {
        backgroundColor: highlightBackground,
    },
    '.cm-foldPlaceholder': {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ddd',
    },
    '.cm-tooltip': {
        border: '1px solid #181a1f',
        backgroundColor: panelBackground,
    },
    '.cm-tooltip-autocomplete': {
        '& > ul > li[aria-selected]': {
            backgroundColor: highlightBackground,
            color: color,
        },
    },
});

export default theme;
