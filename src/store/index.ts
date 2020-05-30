import Vue from 'vue';
import Vuex from 'vuex';
import parser from "../parser/lexer";
import { ProgramEvaluator } from "@/parser/parser";
import { Expression, Program } from "@/parser/helpers/expression";

Vue.use(Vuex);

interface VuexState {
    title: string,
    sheetDims: {
        rows: number,
        columns: number
    },
    selected: CellPosition,
    otherSelected: CellPosition[]
    sheet: CellData[],
    defaults: VuexState
}

interface CellPosition {
    row: number,
    column: number
}

interface CellData {
    position: CellPosition,
    value: string,
    displayValue: string,
    evaluated: boolean
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
        sheet: <CellData[]>[],
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
            sheet: <CellData[]>[],
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
        clearSave (_: VuexState) {
            localStorage.removeItem("state");
        },
        changeTitle (state: VuexState, newTitle: string) {
            state.title = newTitle;
        },
        initializeSheet (state: VuexState, payload: { rows: number, columns: number }) {
            state.sheetDims = payload;
            state.sheet = [];
        },
        updateCellValue (state: VuexState, payload: CellData) {
            const sheetCell = state.sheet.find(l => l.position.row === payload.position.row && l.position.column === payload.position.column);
            if (sheetCell) {
                sheetCell.evaluated = payload.displayValue.charAt(0) === "=";
                const exprVal = (() => {
                    if (payload.displayValue.charAt(0) === "=") {
                        return parser.parse(payload.displayValue.slice(1)).body[0];
                    } else {
                        if (Number(payload.displayValue).toString() === payload.displayValue) {
                            return ProgramEvaluator.NumberBuilder(payload.displayValue);
                        } else {
                            return ProgramEvaluator.StringBuilder(payload.displayValue);
                        }
                    }
                })();
                sheetCell.value = payload.displayValue;
                sheetCell.displayValue = new ProgramEvaluator(<Program>{type: "Program", body: [exprVal]}, null, {}, {}).programResult.value.toString();
                console.log(state.sheet.find(l => l.position.row === payload.position.row && l.position.column === payload.position.column));
            } else {
                state.sheet.push({value: payload.displayValue, ...payload});
            }
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
        sheetToArr: state => {
            const newState = [];
            for (let i = 0; i < state.sheetDims.rows; i++) {
                const row = [];
                for (let j = 0; j < state.sheetDims.columns; j++) {
                    const sheetCell = state.sheet.find(l => l.position.row === i && l.position.column === j);
                    console.log(sheetCell ? {value: sheetCell.displayValue, raw: sheetCell.value} : {value: null, raw: null});
                    row.push(sheetCell ? {value: sheetCell.displayValue, raw: sheetCell.value} : {value: null, raw: null});
                }
                newState.push(row);
            }
            return newState;
        },
        sheetRow: state => rowNum => {
            const newState = [];
            for (let i = 0; i < state.sheetDims.columns; i++) {
                const sheetCell = state.sheet.find(l => l.position.row === rowNum && l.position.column === i);
                newState.push(sheetCell ? sheetCell.value : null);
            }
            return newState;
        },
        sheetCol: state => colNum => {
            const newState = [];
            for (let i = 0; i < state.sheetDims.rows; i++) {
                const sheetCell = state.sheet.find(l => l.position.row === i && l.position.column === colNum);
                newState.push(sheetCell ? sheetCell.value : null);
            }
            return newState;
        },
        sheetToCoords: state => {
            return state.sheet.map(l => l.position);
        }
    }
});

export { CellPosition };
