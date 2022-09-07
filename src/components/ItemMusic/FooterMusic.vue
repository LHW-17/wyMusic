<template>
    <div class="footerMusic">
        <div class="footerLeft">
            <img v-lazy="playList[playListIndex]?.al.picUrl" @click="updateShow">
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑切换上下首哦</span>
            </div>
        </div>
        <div class="footRight">
            <svg class="icon" aria-hidden="true" @click="play" v-show="!playing">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="pause" v-show="playing">
                <use xlink:href="#icon-zanting3"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-playlistMusic3"></use>
            </svg>
        </div>
        <audio ref="audio" :autoplay="playing" @timeupdate="updateTime" @durationchange="updateMaxTime"
            @error="errorHandler" @ended="next"
            :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"></audio>
        <van-popup v-model:show="show" position="left" :style="{
            height: '100%', width: '100%'
        }">
            <MusicDetail :musicList="playList[playListIndex]" :play="play" :pause="pause" />
        </van-popup>
    </div>
</template>

<script lang='ts' setup>
import { computed, reactive, ref, watch, onUpdated, onMounted } from 'vue'
import { useStore } from 'vuex';
import MusicDetail from "../MusicDetail/index.vue"

const store = useStore();
//获取播放audio元素
const audio = ref()
// onMounted(() => {
//     console.log(audio);
// })
const playList = computed(() => store?.state?.playList)
const playListIndex = computed(() => store.state.playListIndex);
const playing = computed(() => {
    //点击对应歌曲继续播放
    if (store.state.playing) {
        audio.value.play()
    }
    return store.state.playing
})
const show = computed(() => store.state.detailShow)
const changeTime = computed(() => store.state.changeTime)
const isDraging = computed(() => store.state.isDraging)

//播放和暂停歌曲
const play = () => {
    audio.value.play();
    store.commit("playOrPause", true);
}
const pause = () => {
    audio.value.pause();
    store.commit("playOrPause", false);
}
//切换歌曲播放页面
const updateShow = () => {
    store.commit("updateDetailShow")
}
//更新当前播放时刻
const updateTime = () => {
    if (!isDraging.value) {
        store.commit("updateCurrentTime", audio.value.currentTime);
    }
}
//获取最大时长
const updateMaxTime = () => {
    store.commit("updateMaxTime", audio.value.duration)
}
const errorHandler = () => {
    if (playListIndex.value === playList.value.length - 1) {
        store.commit("updatePlayListIndex", 0)
    } else {
        store.commit("updatePlayListIndex", playListIndex.value + 1)
    }
}
const next = () => {
    if (playListIndex.value == playList.value.length - 1) {
        store.commit("updatePlayListIndex", 0);
    }
    else {
        store.commit("updatePlayListIndex", playListIndex.value + 1);
    }
}
//监听index，发生变化时播放歌曲
watch(playListIndex, () => {
    store.commit("playOrPause", true);
})
watch(playList, () => {
    store.commit("playOrPause", true);
})
watch(changeTime, () => {
    audio.value.currentTime = changeTime.value;
})
//更改时获取歌词
onMounted(() => {
    store.dispatch("getLyric", playList.value[playListIndex.value].id);
})
onUpdated(() => {
    store.dispatch("getLyric", playList.value[playListIndex.value].id)
})
</script>

<style scoped lang="less">
.footerMusic {
    width: 100%;
    height: 1.4rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    border-top: .02rem solid #ccc;
    display: flex;
    justify-content: space-between;

    .footerLeft {
        height: 100%;
        width: 6rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background-color: #ccc;
            margin: 0 .2rem;
        }

        div {
            font-size: .3rem;
            font-weight: bold;

            p {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: start;
            }

            span {
                font-size: .24rem;
                font-weight: normal;
                color: #ccc;
            }
        }
    }

    .footRight {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon {
            width: .6rem;
            height: .6rem;
            margin-right: .2rem;
        }
    }
}
</style>