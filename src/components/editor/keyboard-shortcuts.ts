import CodeMirror from 'codemirror';
import { openSearchBar } from './dialog/search-bar/index';

const isWindows = /windows|win32/i.test(navigator.userAgent);

const keyboardShortcuts = (cm: CodeMirror.Editor) => {
    const keyCtrl = isWindows ? 'Ctrl' : 'Cmd';
    return {
        [`${keyCtrl}-B`]: () => {
            handleKeyEvent;
        },
        [`${keyCtrl}-F`]: openSearchBar,
    };
};

const handleKeyEvent = () => {};

export default keyboardShortcuts;
