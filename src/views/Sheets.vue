<template>
    <div
        class="sheets"
    >
        <input
            class="titleInput"
            placeholder="Title"
            :value="title"
            @change="handleTitleChange"
        />
        {{ $store.getters.rowColsWithSelections }}
        <button @click="$store.commit('clearSave')">Clear data</button>
        <Sheet></Sheet>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { mapState } from "vuex";
    import Sheet from "@/components/Sheet.vue";

    @Component({
        components: { Sheet },
        computed: mapState([
            "title",
        ]),
    })
    export default class Sheets extends Vue {
        handleTitleChange = (e) => {
            this.$store.dispatch("changeTitle", e.target.value);
        };
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .titleInput {
        border-width: 1px;
        border-style: solid;
        border-color: white white grey white;
        transition: border 0.25s;
        padding: 5px;
        outline: none;
    }

    .titleInput:focus {
        border: 1px solid black;
    }
</style>
