import { ActionContext, createStore } from 'vuex';

interface EditorState {
    searchBarStatus: boolean;
    tableDialogStatus: boolean;
    linkDialogStatus: boolean;
}

const store = createStore({
    state: {
        searchBarStatus: false,
        tableDialogStatus: false,
        linkDialogStatus: false,
    },
    getters: {
        searchBarStatus(state) {
            return state.searchBarStatus;
        },
        tableDialogStatus(state) {
            return state.tableDialogStatus;
        },
        linkDialogStatus(state) {
            return state.linkDialogStatus;
        },
    },
    mutations: {
        searchBarStatus(state, status: boolean) {
            state.searchBarStatus = status;
        },
        tableDialogStatus(state, status: boolean) {
            state.tableDialogStatus = status;
        },
        linkDialogStatus(state, status: boolean) {
            state.linkDialogStatus = status;
        },
    },
    actions: {
        switchSearchBar({
            commit,
            state,
        }: ActionContext<EditorState, EditorState>) {
            commit('searchBarStatus', !state.searchBarStatus);
        },
        switchTableDialog({
            commit,
            state,
        }: ActionContext<EditorState, EditorState>) {
            commit('tableDialogStatus', !state.tableDialogStatus);
        },
        switchLinkDialog({
            commit,
            state,
        }: ActionContext<EditorState, EditorState>) {
            commit('linkDialogStatus', !state.linkDialogStatus);
        },
        closeDialog({ commit }: ActionContext<EditorState, EditorState>) {
            commit('searchBarStatus', false);
            commit('tableDialogStatus', false);
            commit('linkDialogStatus', false);
        },
    },
});

export default store;
