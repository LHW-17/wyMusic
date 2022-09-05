<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-jiantou_xiangzuo-copy"></use>
        </svg>
        <input type="text" name="" id="" placeholder="陈奕迅" @keydown.enter="enterKeyword" v-model="keyword">
    </div>
    <div class="searchHistory">
        <span>历史</span>
        <span class="keyword" v-for="item, index in keywordList" :key="index" @click="searchHistory(item, index)">{{
        item
        }}
        </span>
        <svg class="icon" aria-hidden="true" @click="deleteHistory">
            <use xlink:href="#icon-shanchu1"></use>
        </svg>
    </div>
    <ItemList :list="resMusicList" :playMusic="playMusic"></ItemList>
</template>

<script lang='ts' setup>
import { onMounted, reactive, ref, Ref } from 'vue'
import {useStore} from "vuex"
import API from "@/api"
import ItemList from '@/components/ItemList.vue';
//data
const keywordList: Ref<string[]> = ref([])
const keyword = ref("")
const resMusicList = ref({})
const store = useStore()
//method
//搜索框回车事件
const enterKeyword = async () => {
    if (keyword.value != "") {
        let index = keywordList.value.indexOf(keyword.value);
        if (index == -1) {
            keywordList.value.unshift(keyword.value.trim())
            if (keywordList.value.length > 10) {
                keywordList.value.pop();
            }
        } else {
            keywordList.value.unshift(keywordList.value.splice(index, 1)[0])
        }
        localStorage.setItem("keywordHistory", JSON.stringify(keywordList.value))
        //发请求获取歌曲列表
        let res = await API.home.reqSearch(keyword.value)
        // console.log(res);
        if (res.code == 200) {
            resMusicList.value = res.result.songs;
        }
    }
    keyword.value = ""
}
//搜索记录点击事件
const searchHistory = async (item: string, index: number) => {
    //点击span时同步搜索框，并将历史记录提到最前端
    keyword.value = item;
    keywordList.value.splice(index, 1);
    keywordList.value.unshift(item);
    let res = await API.home.reqSearch(keyword.value)
    // console.log(res);
    if (res.code == 200) {
        resMusicList.value = res.result.songs
    }
}
//历史记录删除图标点击事件
const deleteHistory = () => {
    keywordList.value.length = 0;
    localStorage.removeItem("keywordHistory")
}
//传给列表组件的方法
const playMusic = (index:number,item:any)=>{
    // console.log(item);
    item.al = item.album;
    item.al.picUrl = item.album.artist.img1v1Url;
    store.commit("pushPlayList", item)
    store.commit("updatePlayListIndex", store.state.playList.length-1)
    store.commit("playOrPause", true)
}

//生命周期
onMounted(() => {
    keywordList.value = JSON.parse(localStorage.getItem("keywordHistory") as string) || []
})
</script>

<style scoped lang="less">
.searchTop {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;

    .icon {
        width: .5rem;
        height: .5rem;
        margin: 0 .35rem;
    }

    input {
        border: none;
        border-bottom: 1px solid #999;
        width: 90%;
        padding: .1rem;
    }
}

.searchHistory {
    width: 100%;
    height: .8rem;
    padding: 0 .2rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    font-size: .32rem;
    overflow: scroll;

    span:nth-child(1) {
        font-weight: 700;
    }

    .icon {
        position: absolute;
        top: .18rem;
        right: .1rem;
    }

    .keyword {
        background-color: rgb(147, 133, 133);
        padding: .1rem .2rem;
        border-radius: .4rem;
        margin: .1rem .15rem;
    }

}
</style>