<template>
    <div
        :class="{
            selectorCell: true,
            selected: isSelected
        }"
        :style="{
            'width': `${width - 4}px`,
            'height': `${height - 4}px`
        }"
        @click="selectAll"
    >
        {{ cellValue }}
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { CellPosition } from "@/store";

    @Component({
        computed: {
            isSelected () {
                if (this.$store.state.selected.row !== null) {
                    if (this.posInSelections(this.$store.state.selected)) {
                        return true;
                    }
                    for (const pos of this.$store.state.otherSelected) {
                        if (this.posInSelections(pos)) {
                            return true;
                        }
                    }
                }
                return false;
            }
        }
    })
    export default class SelectorCell extends Vue {
        @Prop() private cellsToSelect: CellPosition[];
        @Prop() private cellValue: string;
        @Prop({default: 100}) private width: number;
        @Prop({default: 20}) private height: number;

        posInSelections (pos: CellPosition) {
            for (const cell of this.cellsToSelect) {
                if (cell.column === pos.column && cell.row === pos.row) {
                    return true;
                }
            }
            return false;
        }

        selectAll () {
            this.$store.commit("changeSelected", this.cellsToSelect[0]);
            this.$store.commit("addSelectionArr", this.cellsToSelect);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .selectorCell {
        background-color: #eee;
        border: solid #bbb;
        border-width: 1px 1px 0 0;
        padding: 1px 1px 2px 2px;
        font-size: 10px;
        line-height: 20px;
    }
    .selected {
        background-color: #ddd;
    }
</style>
