<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="list">
            <van-swipe :loop="false" :width="150" class="swiper" :show-indicators="false">
                <van-swipe-item v-for="item in musicList" :key="item.id" @click="goItemMusic(item.id)">
                    <img v-lazy="item.picUrl" alt="">
                    <span class="playCount">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang"></use>
                        </svg>
                        {{ changeCount(item.playCount) }}
                    </span>
                    <span class="name">{{ item.name }}</span>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
import API from "@/api"
import { useRouter, useRoute } from "vue-router"

const router = useRouter();
const route = useRoute();
const goItemMusic = (id: number) => {
    router.push({
        path: "/itemmusic",
        query: {
            id: id
        }
    })
}
const musicList = ref<{
    id: number,
    picUrl: string,
    playCount: number,
    name: string,
}[]>([]);

const changeCount = (num: number) => {
    if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿"
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万"
    }
}
onMounted(async () => {
    let result = await API.home.getMusicList();
    if (result.code == 200) {
        musicList.value = result.result;
    }
    //console.log(musicList);
})
</script>

<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;

    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }

        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }

    .list {
        width: 100%;
        height: 4rem;
        position: relative;

        .swiper {
            height: 100%;

            img {
                width: 90%;
                height: 2.5rem;
                // margin-right: .2rem;
                border-radius: .2rem;

            }

            .playCount {
                position: absolute;
                top: 0;
                left: 30%;
                display: flex;
                color: white;


                .icon {
                    color: white;
                }
            }

            .name {
                display: inline-block;
                font-size: .28rem;
                width: 2.7rem;
                text-align: left;
            }
        }
    }
}
</style>