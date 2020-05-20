<template>
    <div :class="inputting ? 'cellSelected' : 'cell'">
        <input
            v-if="inputting"
            class="cellInput"
            v-model="currValue"
            @input="updateCellValue()"
            @blur="inputting = false"
        />
        <div v-else class="nonInputtingLabel" @click="inputting = true">
            <label>{{ currValue }}</label>
        </div>
    </div>

</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { CellPosition } from "@/store";

    @Component
    export default class Cell extends Vue {
        @Prop() private cellValue: string;
        @Prop() private cellLocation: CellPosition;

        inputting = false;
        currValue = this.cellValue;

        updateCellValue () {
            console.log(`Updating: ${this.currValue}`);
            this.$store.dispatch("updateCellValue", {position: this.cellLocation, newValue: this.currValue});
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
    .cellSelected {
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
    }
</style>
