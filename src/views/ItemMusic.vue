<template>
    <div>
        <ItemMusicTop :playList="state.playList" />
        <ItemMusicList :playList="state.playList" />
    </div>
</template>

<script lang='ts' setup>
import { defineComponent, reactive, onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from "vue-router";
import API from "@/api"
import ItemMusicTop from "../components/ItemMusic/ItemMusicTop.vue"
import ItemMusicList from "../components/ItemMusic/ItemMusicList.vue"


const route = useRoute();
const id = ref(0);
const state = reactive({
    playList: {}
})

onBeforeMount(async () => {
    id.value = route.query.id as any;
    let result = await API.item.getPlayList(id.value)
    if (result.code == 200) {
        state.playList = result.playlist;
    }
    //防止页面刷新丢失数据
    sessionStorage.setItem("itemDetail", JSON.stringify(state))
})

</script>

<style scoped>
</style>