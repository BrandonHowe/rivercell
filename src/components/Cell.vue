<template>
    <div
        :class="{
            cellInputting: inputting,
            cell: !inputting,
            selected: selected
        }"
        @click="enableInputting"
    >
        <input
            v-if="inputting"
            class="cellInput"
            ref="cellInput"
            v-model="currValue"
            @input="updateCellValue()"
        />
        <div v-else class="nonInputtingLabel">
            <label>{{ currValue }}</label>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { CellPosition } from "@/store";

    @Component({
        computed: {
            inputting () {
                return this.$store.state.selected.row === this.cellLocation.row && this.$store.state.selected.column === this.cellLocation.column;
            },
            selected () {
                return this.$store.state.otherSelected.some(element => this.matchingPositions(this.cellLocation, element));
            },
        },
    })
    export default class Cell extends Vue {
        $refs!: {
            cellInput: HTMLInputElement;
        };

        @Prop() private cellValue: string;
        @Prop() private cellLocation: CellPosition;

        currValue = this.cellValue;

        enableInputting (e) {
            if (e.shiftKey) {
                this.$store.commit("areaSelect", this.cellLocation);
            } else if (e.ctrlKey) {
                this.$store.commit("addSelectionArr", [this.cellLocation]);
            } else {
                this.$store.commit("changeSelected", this.cellLocation);
            }
        }

        updateCellValue () {
            this.$store.dispatch("updateCellValue", {position: this.cellLocation, newValue: this.currValue});
        }

        matchingPositions (pos1: CellPosition, pos2: CellPosition) {
            return pos1.column === pos2.column && pos1.row === pos2.row;
        }
    }
</script>

<style scoped lang="scss">
    label {
        margin: 0;
        text-align: left;
        font-size: 13px;
    }

    .nonInputtingLabel {
        text-align: left;
        height: 16px;
        width: 96px;
        user-select: none;
    }

    .cell {
        height: 16px;
        width: 96px;
        border: solid #bbb;
        border-width: 1px 1px 0 0;
        padding: 1px 1px 2px 2px;
    }

    .cellInputting {
        height: 16px;
        width: 96px;
        border: 2px solid #1a73e8;
        padding: 0;
    }

    .cellInput {
        position: relative;
        width: 96px;
        height: 13px;
        border: 0;
        padding: 0;
        outline: none;
        background-color: transparent;
    }

    .selected {
        background-color: rgba(14, 101, 235, 0.1);
    }
</style>
