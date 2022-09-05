<template>
    <!-- vue3页面 -->
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <span>
                    播放全部<span>(共{{ playList.trackIds?.length }}首)</span>
                </span>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>
                    收藏({{ changeCount(playList.subscribedCount) }})
                </span>
            </div>
        </div>
        <ItemList :list="playList.tracks" :playMusic="playMusic"></ItemList>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex';
import ItemList from '../ItemList.vue';
const props = defineProps(["playList"])
//console.log(props);
const store = useStore()
const changeCount = (num: number) => {
    if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿"
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万"
    }
}
const playMusic = (index: number) => {
    store.commit("updatePlayList", props.playList.tracks)
    store.commit("updatePlayListIndex", index)
    store.commit("playOrPause", true)
}
</script>

<style scoped lang="less">
.itemMusicList {
    width: 100%;
    height: 30rem;
    background-color: #fff;
    margin-top: .2rem;
    border-radius: .4rem .4rem 0 0;

    .itemListTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .listLeft {
            width: 3rem;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;

            span {
                font-size: .24rem;
                font-weight: bold;

                span {
                    font-size: .2rem;
                    color: rgb(189, 188, 188);
                    font-weight: 100;
                }
            }
        }

        .listRight {
            background-color: red;
            width: 1.8rem;
            height: 70%;
            border-radius: .3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: .2rem;

            .icon {
                width: .3rem;
                height: .3rem;
            }

            span {
                color: white;
                font-size: .2rem;
            }


        }
    }


}
</style>