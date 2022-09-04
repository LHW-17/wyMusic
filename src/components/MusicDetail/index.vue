<template>
    <img :src="musicList.al.picUrl" class="bgImg">
    <div class="detail-top">
        <div class="detail-top-left">
            <svg class="icon" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou_xiangzuo"></use>
            </svg>
            <div>
                <Vue3Marquee style="color: #fff;"> {{ musicList.name }}</Vue3Marquee>
                <div>
                    <span v-for="item in musicList.ar" :key="item.id">
                        {{ item.name }}&nbsp;&gt;
                    </span>
                </div>
            </div>
        </div>
        <div class="detail-top-right">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <div class="detail-content" v-show="!showLyric">
        <img src="@/assets/needle-ab.png" class="img-needle" :class="{ img_needle_active: playing }">
        <img src="@/assets/disc-plus.png" class="img-disc">
        <img :src="musicList.al.picUrl" class="picImg" :class="{ picImg_pause: !playing, picImg_active: playing }"
            @click="showLyric = true">
    </div>
    <div class="lyric" ref="musicLyric" v-show="showLyric" @click="showLyric = false">
        <p v-for="item, index in lyricList" :key="index"
            :class="{ active: (currentTime * 1000 >= item.time && currentTime * 1000 < item.pre) }">{{ item.lrc }}</p>
    </div>
    <div class="detail-foot">
        <div class="footer-top">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-changpian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-12"></use>
            </svg>
        </div>
        <div class="footer-content">
            <input type="range" class="range" min="0" :max="maxTime" step="0.05" :value="currentTime"
                @change="changeTime" @touchstart="draging" @touchend="draged">
        </div>
        <div class="footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan-08"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="changeMusic(-1)">
                <use xlink:href="#icon-shangyiqu101"></use>
            </svg>
            <svg class="icon player" aria-hidden="true" @click="play" v-show="!playing">
                <use xlink:href="#icon-bofang3"></use>
            </svg>
            <svg class="icon player" aria-hidden="true" @click="pause" v-show="playing">
                <use xlink:href="#icon-bofang2"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="changeMusic(1)">
                <use xlink:href="#icon-xiayiqu101"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan"></use>
            </svg>
        </div>
    </div>

</template>

<script lang='ts' setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { useStore } from "vuex"
import { Vue3Marquee } from "vue3-marquee"
import "vue3-marquee/dist/style.css"

//data
const store = useStore()
const showLyric = ref(false);
const musicLyric = ref()

const { musicList, play, pause } = defineProps(["musicList", "play", "pause"])

//从store获取数据
const playing = computed(() => store.state.playing)
const lyricList = computed(() => {
    let string = store.state.lyric;
    let arr: Array<{ time: number, pre: number, lrc: string }>;
    if (string) {
        arr = string.split(/[(\r\n)\r\n]+/).map((item: string, index: number) => {
            let min = parseInt(item.slice(1, 3));
            let sec = parseInt(item.slice(4, 6));
            let mill = parseInt(item.slice(7, 10));
            let lrc = item.split(']')[1]?.trim();
            return { min, sec, mill, time: min * 60 * 1000 + sec * 1000 + mill, lrc }
        })
        arr = arr.filter((item) => item.lrc != undefined)
        arr.forEach((item: { pre: number }, index: number) => {
            if (index == arr.length - 1 || isNaN(arr[index + 1].time)) {
                item.pre = 100000;
            } else {
                item.pre = arr[index + 1].time;
            }
        })
        // console.log(arr);
        return arr;
    }
})

//获取当前音乐时刻
const currentTime = computed(() => store.state.currentTime)
//获取音乐总时长
const maxTime = computed(() => store.state.maxTime)

//监听currentTime以滚动歌词
watch(currentTime, () => {
    if (showLyric.value) {
        let p: HTMLElement = document.querySelector("p.active") as HTMLElement;
        //299
        if (p?.offsetTop > 299) {
            musicLyric.value.scrollTop = p.offsetTop - 300;
        }
    }
})

//method
//为解决拖拽过程中timeupdate触发更新导致的跳动
const draging = () => {
    store.commit("updateIsDraging", true);
}
const draged = () => {
    store.commit("updateIsDraging", false);
}
const changeTime = (e: any) => {
    store.commit("updateChangeTime", e.target.value);
}
const back = () => {
    showLyric.value = false;
    store.commit("updateDetailShow")
}
const changeMusic = (value: number) => {
    if (store.state.playListIndex == 0 && value < 0) {
        store.commit("updatePlayListIndex", 0);
    } else if (store.state.playListIndex == store.state.playList.length - 1 && value > 0) {
        store.commit("updatePlayListIndex", 0);
    }
    else {
        store.commit("updatePlayListIndex", store.state.playListIndex + value);
    }
}

</script>

<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
}

.bgImg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(1rem);
}

.detail-top {
    width: 100%;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-left {
        width: 5rem;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .icon {
            width: .6rem;
            height: .6rem;
            margin: 0 .4rem;
        }

        div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;


            p {
                color: #fff;
                font-size: .28rem;
            }

            div {
                display: flex;
                flex-direction: row;
                justify-content: start;

                span {
                    width: 1rem;
                    box-sizing: border-box;
                    overflow: hidden;
                    white-space: nowrap;
                    color: #999;
                    margin-right: .2rem;
                    font-size: .24rem;
                }

            }
        }
    }

    &-right {
        margin-right: .2rem;

        .icon {
            width: .6rem;
            height: .6rem;
        }
    }
}

.detail-content {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img-needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-13deg);
        transition: all 2s;
    }

    .img_needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
    }

    .img-disc {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }

    @keyframes rotate_img {
        0% {
            transform: rotateZ(0deg)
        }

        100% {
            transform: rotateZ(360deg)
        }
    }

    .picImg {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_img 10s linear infinite;
    }

    .picImg_active {
        animation-play-state: running;
    }

    .picImg_pause {
        animation-play-state: paused;
    }
}

.lyric {
    display: flex;
    width: 100%;
    height: 8rem;
    flex-direction: column;
    overflow: scroll;
    align-items: center;
    scroll-behavior: smooth;

    p {
        color: #ccc;
        font-size: .32rem;
        margin-top: .4rem;
        width: 100%;
        text-align: center;
        transition: all .5s linear;
    }

    .active {
        color: #fff;
        font-size: .4rem;
    }
}

.detail-foot {
    width: 100%;
    position: absolute;
    bottom: .3rem;

    .footer-top {
        display: flex;
        justify-content: space-around;
        align-items: center;
        fill: #999;

        .icon {
            width: .5rem;
            height: .5rem;
        }
    }

    .footer-content {
        width: 100%;
        height: 1.1rem;
        display: flex;
        align-items: center;

        .range {
            width: 100%;
            height: .06rem;
        }
    }

    .footer {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            width: .5rem;
            height: .5rem;
            fill: #999;
        }

        .player {
            width: 1rem;
            height: 1rem;
        }
    }
}
</style>