import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface VuexState {
    title: string,
    sheetDims: {
        rows: number,
        columns: number
    },
    selected: CellPosition,
    sheet: string[][]
}

interface CellPosition {
    row: number,
    column: number
}

export default new Vuex.Store({
    state: <VuexState>{
        title: "Unnamed Project",
        sheetDims: {
            rows: 0,
            columns: 0,
        },
        selected: <CellPosition>{
            row: null,
            column: null
        },
        sheet: [],
    },
    mutations: {
        saveState (state: VuexState) {
            localStorage.setItem("state", JSON.stringify(state));
        },
        loadState (state: VuexState) {
            const storageState = JSON.parse(localStorage.getItem("state"));
            for (const i in state) {
                state[i] = storageState[i];
                console.table(storageState[i]);
            }
        },
        changeTitle (state: VuexState, newTitle: string) {
            state.title = newTitle;
            console.log(`New: ${state.title}`);
        },
        initializeSheet (state: VuexState, payload: { rows: number, columns: number }) {
            const sheet = [];
            for (let i = 0; i < payload.rows; i++) {
                const row = [];
                for (let j = 0; j < payload.columns; j++) {
                    row.push(null);
                }
                sheet.push(row);
            }
            state.sheetDims = payload;
            state.sheet = sheet;
        },
        updateCellValue (state: VuexState, payload: { position: CellPosition, newValue: string }) {
            console.log(`We received: ${payload.newValue}`);
            state.sheet[payload.position.row][payload.position.column] = payload.newValue;
        },
        changeSelected (state: VuexState, newPos: CellPosition) {
            state.selected = newPos;
        }
    },
    actions: {
        changeTitle ({ commit }, newTitle: string) {
            commit("changeTitle", newTitle);
            commit("saveState");
        },
        initializeSheet ({ commit }, payload) {
            if (!localStorage.getItem("state")) {
                commit("initializeSheet", payload);
            } else {
                commit("loadState");
            }
        },
        updateCellValue ({commit}, payload) {
            commit("updateCellValue", payload);
            commit("saveState");
        }
    },
    modules: {},
});

export { CellPosition };
