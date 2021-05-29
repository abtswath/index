import { EditorView, keymap, DOMEventHandlers } from '@codemirror/view';
import {
    EditorState,
    Extension,
    StateField,
    Transaction,
} from '@codemirror/state';
import { indentMore } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { history } from '@codemirror/history';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { searchKeymap } from '@codemirror/search';
import { closeBracketsKeymap, closeBrackets } from '@codemirror/closebrackets';
import { indentUnit } from '@codemirror/language';
import defaultTheme from './theme.default';
import keyboardShortcuts from './keyboard-shortcuts';
import { FontStyle } from './utils';

class Editor {
    private cm: EditorView;

    static isWindows = /windows|win32/i.test(navigator.userAgent);

    private _wrapper = Editor.isWindows ? '\r\n' : '\n';

    private defaultIndent = '    ';

    protected _onChange: (value: string) => void = () => {};

    protected _onScroll: (view: EditorView) => void = () => {};

    public set onChange(fn: (value: string) => void) {
        this._onChange = fn;
    }

    public set onScroll(fn: (view: EditorView) => void) {
        this._onScroll = fn;
    }

    constructor(el: HTMLTextAreaElement, content: string) {
        this.cm = new EditorView({
            parent: el,
            state: EditorState.create({
                doc: content,
                extensions: [
                    keymap.of([
                        ...searchKeymap,
                        ...closeBracketsKeymap,
                        ...keyboardShortcuts(this),
                    ]),
                    indentUnit.of(this.defaultIndent),
                    EditorState.tabSize.of(4),
                    markdown(),
                    history(),
                    closeBrackets(),
                    defaultHighlightStyle,
                    defaultTheme,
                    EditorView.lineWrapping,
                    this.eventHandlers(),
                    this.handleDocChanged(),
                ],
            }),
        });
    }

    public set wrapper(wrapper: string) {
        this._wrapper = wrapper;
    }

    public get wrapper(): string {
        return this._wrapper;
    }

    getCm(): EditorView {
        return this.cm;
    }

    protected eventHandlers(): Extension {
        const eventHandlers: DOMEventHandlers<Editor> = {
            scroll: (event, view) => this.handleScrolled(event, view),
        };

        return EditorView.domEventHandlers(eventHandlers);
    }

    public scrollTo(pos: number): void {
        this.cm.scrollDOM.scrollTo(0, this.cm.contentHeight * pos);
    }

    protected handleScrolled(event: Event, view: EditorView): void {
        this._onScroll(view);
    }

    protected handleDocChanged(): Extension {
        return StateField.define({
            create: () => null,
            update: (value, transaction) => {
                if (transaction.docChanged) {
                    this._onChange(transaction.newDoc.toString());
                }
                return null;
            },
        });
    }

    public betterTab({ state, dispatch }: EditorView) {
        const indent = this.defaultIndent;
        if (state.selection.ranges.some((r) => !r.empty))
            return indentMore({ state, dispatch });
        dispatch(
            state.update(state.replaceSelection(indent), {
                scrollIntoView: true,
                annotations: Transaction.userEvent.of('input'),
            })
        );
        return true;
    }

    getSelection(): string {
        return this.cm.state.sliceDoc(
            this.cm.state.selection.main.from,
            this.cm.state.selection.main.to
        );
    }

    setFontStyle(type: FontStyle): boolean {
        const selection = this.getSelection();
        switch (type) {
            case FontStyle.BOLD:
                this.replaceSelection(`**${selection}**`, -2);
                break;
            case FontStyle.ITALIC:
                this.replaceSelection(`*${selection}*`, -1);
                break;
            case FontStyle.CODE:
                this.replaceSelection(
                    `${this._wrapper}\`\`\`${this._wrapper}${selection}${this._wrapper}\`\`\`${this._wrapper}`,
                    -5
                );
                break;
            case FontStyle.INLINE_CODE:
                this.replaceSelection(`\`${selection}\``, -1);
                break;
            case FontStyle.H1:
            case FontStyle.H2:
            case FontStyle.H3:
            case FontStyle.H4:
            case FontStyle.H5:
            case FontStyle.H6:
                this.replaceSelection(
                    `${this._wrapper}${'#'.repeat(type)} ${selection}`
                );
                break;
            default:
                break;
        }
        return true;
    }

    replaceSelection(replaceValue: string, pos?: number, head?: number) {
        this.cm.dispatch(this.cm.state.replaceSelection(replaceValue));
        if (pos === undefined) {
            return;
        }
        let cursor = this.cm.state.selection.main.head;
        this.cm.dispatch({ selection: { anchor: (cursor += pos), head } });
    }

    focus(): void {
        this.cm.focus();
    }
}

export default Editor;
