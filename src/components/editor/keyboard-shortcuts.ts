import { KeyBinding } from '@codemirror/view';
import Editor from './editor';
import store from './store';
import { FirstKeyOfShortcuts, FontStyle, Shortcuts } from './utils';

const shortcutsKey = (
    key: Shortcuts,
    firstKey?: FirstKeyOfShortcuts
): string => {
    if (firstKey === undefined) {
        firstKey = Editor.isWindows
            ? FirstKeyOfShortcuts.CTRL
            : FirstKeyOfShortcuts.CMD;
    }
    return `${firstKey}-${key}`;
};

const keyboardShortcuts = (editor: Editor): KeyBinding[] => {
    return [
        {
            key: 'Tab',
            run: editor.betterTab,
        },
        {
            key: shortcutsKey(Shortcuts.B),
            run: (): boolean => {
                return editor.setFontStyle(FontStyle.BOLD);
            },
        },
        {
            key: shortcutsKey(Shortcuts.I),
            run: (): boolean => {
                return editor.setFontStyle(FontStyle.ITALIC);
            },
        },
        {
            key: shortcutsKey(Shortcuts.C, FirstKeyOfShortcuts.ALT),
            run: (): boolean => {
                return editor.setFontStyle(FontStyle.CODE);
            },
        },
        {
            key: shortcutsKey(Shortcuts.C, FirstKeyOfShortcuts.CTRL_ALT),
            run: (): boolean => {
                return editor.setFontStyle(FontStyle.CODE);
            },
        },
        {
            key: shortcutsKey(Shortcuts.F),
            run: (): boolean => {
                store.dispatch('switchSearchBar');
                return true;
            },
        },
        {
            key: shortcutsKey(Shortcuts.H1),
            run: (): boolean => {
                return editor.setFontStyle(FontStyle.H1);
            },
        },
        {
            key: shortcutsKey(Shortcuts.H2),
            run: (): boolean => {
                return editor.setFontStyle(FontStyle.H2);
            },
        },
        {
            key: shortcutsKey(Shortcuts.H3),
            run: (): boolean => {
                return editor.setFontStyle(FontStyle.H3);
            },
        },
        {
            key: shortcutsKey(Shortcuts.H4),
            run: (): boolean => {
                return editor.setFontStyle(FontStyle.H4);
            },
        },
        {
            key: shortcutsKey(Shortcuts.H5),
            run: (): boolean => {
                return editor.setFontStyle(FontStyle.H5);
            },
        },
        {
            key: shortcutsKey(Shortcuts.H6),
            run: (): boolean => {
                return editor.setFontStyle(FontStyle.H6);
            },
        },
        {
            key: shortcutsKey(Shortcuts.T, FirstKeyOfShortcuts.ALT),
            run: (): boolean => {
                store.dispatch('switchTableDialog');
                return true;
            },
        },
        {
            key: shortcutsKey(Shortcuts.L),
            run: (): boolean => {
                store.dispatch('switchLinkDialog');
                return true;
            },
        },
    ];
};

export default keyboardShortcuts;
