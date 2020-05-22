<template>
    <div
        class="sheet"
        :style="{
                'grid-template-rows': `repeat(${$store.state.sheetDims.rows}, 20px)`,
                'width': `${($store.state.sheetDims.columns + 1) * 100}px`,
                'height': `${($store.state.sheetDims.rows + 1) * 20}px`
            }"
    >
        <div
            class="topRow"
            :style="{
                'grid-template-columns': `repeat(${$store.state.sheetDims.columns + 1}, 100px)`,
                'width': `${$store.state.sheetDims.columns * 100}px`,
                'height': `20px`
            }"
        >
            <SelectorCell
                class="topCell"
                style="grid-column: 1"
                :cells-to-select="$store.getters.sheetToCoords"
            ></SelectorCell>
            <SelectorCell
                class="topCell"
                v-for="num in Array.from(Array($store.state.sheetDims.columns).keys())"
                :style="{'grid-column': num + 2}"
                :key="`top${num}`"
                :cell-value="colName(num)"
                :cells-to-select="$store.state.sheet.map((_, idx) => ({row: idx, column: num}))"
            ></SelectorCell>
        </div>
        <div
            class="row"
            :style="{'grid-template-columns': `repeat(${$store.state.sheetDims.columns + 1}, 100px)`}"
            v-for="(row, rowIndex) in $store.state.sheet"
            :key="rowIndex"
        >
            <SelectorCell
                class="leftCell"
                style="grid-column: 1"
                :key="`left${rowIndex}`"
                :cell-value="rowIndex + 1"
                :cells-to-select="$store.state.sheet[rowIndex].map((_, idx) => ({row: rowIndex, column: idx}))"
            ></SelectorCell>
            <Cell
                class="cell"
                v-for="(cell, cellIndex) in row"
                :key="cellIndex"
                :style="{'grid-column': cellIndex + 2}"
                :cell-location="{row: rowIndex, column: cellIndex}"
                :cell-value="cell"
            ></Cell>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Cell from "@/components/Cell.vue";
    import SelectorCell from "@/components/SelectorCell.vue";

    @Component({
        components: {
            SelectorCell,
            Cell
        },
        mounted () {
            this.$store.dispatch("initializeSheet", {rows: 10, columns: 10});
        },
    })
    export default class Sheet extends Vue {
        colName = (n) => {
            const ordA = 'a'.charCodeAt(0);
            const len = 26;
            let s = "";
            while(n >= 0) {
                s = String.fromCharCode(n % len + ordA) + s;
                n = Math.floor(n / len) - 1;
            }
            return s;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .sheet {
        display: grid;
        width: 100%;
        border-left: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
    }

    .row {
        display: grid;
    }

    .topRow {
        display: grid;
    }
</style>
