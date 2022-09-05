<template>
    <div class="card" :style="{height:height}">
        <slot></slot>
    </div>

</template>

<script lang='ts' setup>
import { defineComponent, reactive,ref } from 'vue'
const props = defineProps(["height"])
</script>

<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
}

.card {
    width: 90%;
    border-radius: .2rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>