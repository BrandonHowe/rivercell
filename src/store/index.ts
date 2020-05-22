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
    otherSelected: CellPosition[]
    sheet: string[][],
    defaults: VuexState
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
        otherSelected: <CellPosition[]>[],
        sheet: [],
        defaults: {
            title: "Unnamed Project",
            sheetDims: {
                rows: 0,
                columns: 0,
            },
            selected: <CellPosition>{
                row: null,
                column: null
            },
            otherSelected: <CellPosition[]>[],
            sheet: [],
        }
    },
    mutations: {
        saveState (state: VuexState) {
            localStorage.setItem("state", JSON.stringify(state));
        },
        loadState (state: VuexState) {
            const storageState = JSON.parse(localStorage.getItem("state"));
            for (const i in state) {
                if (i === "default") {
                    continue;
                }
                if (storageState[i]) {
                    state[i] = storageState[i];
                } else {
                    state[i] = state.defaults[i];
                }
            }
        },
        clearSave (state: VuexState) {
            localStorage.removeItem("state");
        },
        changeTitle (state: VuexState, newTitle: string) {
            state.title = newTitle;
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
            state.sheet[payload.position.row][payload.position.column] = payload.newValue;
        },
        changeSelected (state: VuexState, newPos: CellPosition) {
            state.selected = newPos;
            state.otherSelected = [];
        },
        addSelectionArr (state: VuexState, newPos: CellPosition[]) {
            state.otherSelected.push(...newPos);
        },
        areaSelect (state: VuexState, cornerPos: CellPosition) {
            state.otherSelected = [];
            const selectedCorner = state.selected;
            const topCorner = selectedCorner.row > cornerPos.row ? cornerPos : selectedCorner;
            const bottomCorner = selectedCorner.row < cornerPos.row ? cornerPos : selectedCorner;
            const leftCorner = selectedCorner.column > cornerPos.column ? cornerPos : selectedCorner;
            const rightCorner = selectedCorner.column < cornerPos.column ? cornerPos : selectedCorner;
            for (let i = topCorner.row; i <= bottomCorner.row; i++) {
                for (let j = leftCorner.column; j <= rightCorner.column; j++) {
                    state.otherSelected.push({row: i, column: j});
                }
            }
        }
    },
    actions: {
        changeTitle ({ commit }, newTitle: string) {
            commit("changeTitle", newTitle);
            commit("saveState");
        },
        initializeSheet ({ commit }, payload) {
            if (localStorage.getItem("state")) {
                commit("loadState");
            } else {
                commit("initializeSheet", payload);
            }
        },
        updateCellValue ({commit}, payload) {
            commit("updateCellValue", payload);
            commit("saveState");
        }
    },
    modules: {},
    getters: {
        rowColsWithSelections: state => {
            const rows = [];
            const cols = [];
            if (state.selected.row !== null) {
                rows.push(state.selected.row);
                cols.push(state.selected.column);
            }
            for (const selection of state.otherSelected) {
                if (!rows.includes(selection.row)) {
                    rows.push(selection.row);
                }
                if (!cols.includes(selection.column)) {
                    cols.push(selection.column);
                }
            }
            return {rows, cols};
        },
        sheetToCoords: state => {
            return state.sheet.flatMap((l, idx) => l.map((_, index) => ({row: idx, column: index})));
        }
    }
});

export { CellPosition };
