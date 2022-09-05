<template>
    <!-- vue3页面 -->
    <div>
        <div class="top">
            <img v-lazy="playList?.coverImgUrl" class="bgImg">
            <div class="top-left">
                <svg class="icon" aria-hidden="true" @click="goBack">
                    <use xlink:href="#icon-jiantou_xiangzuo"></use>
                </svg>
                <span>歌单</span>
            </div>
            <div class="top-right">
                <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao"></use>
                </svg>
            </div>
        </div>
        <div class="middle">
            <div class="middle-left">
                <img v-lazy="playList?.coverImgUrl" alt="" class="coverImg">
                <div class="playCount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                    <span>{{ changeCount(playList.playCount) }}</span>
                </div>
            </div>
            <div class="middle-content">
                <div class="title">{{ playList?.name }}</div>
                <div class="author">
                    <img v-lazy="playList.creator?.avatarUrl" class="author-img">
                    <span>{{ playList.creator?.nickname }}&nbsp;&gt;</span>
                </div>
                <div class="signature">{{ playList.creator?.signature }}</div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                </svg>
                <span>{{ playList.commentCount }}</span>
            </div>

            <div class="bottom-item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <span>{{ playList.shareCount }}</span>
            </div>
            <div class="bottom-item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
                </svg>
                <span>下载</span>
            </div>
            <div class="bottom-item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-show_duoxuan"></use>
                </svg>
                <span>多选</span>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, onMounted, toRef } from 'vue'
import { useRouter } from "vue-router"
const $router = useRouter();
type Props = {
    playList: any
}

const { playList } = defineProps<Props>()
if (!playList.value) {
    playList.value = JSON.parse(sessionStorage.getItem("itemDetail") as string)
    // console.log(playList);
}
//更换播放量的显示内容
const changeCount = (num: number) => {
    if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿"
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万"
    }
}
const goBack = () => {
    $router.back()
}
</script>

<style scoped lang="less">
.top {
    display: flex;
    width: 100%;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    // padding: .2rem;
    position: relative;


    .bgImg {
        width: 100%;
        height: 8rem;
        position: fixed;
        z-index: -1;
        filter: blur(0.4rem);
    }

    &-left,
    &-right {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 .2rem;

        span {
            font-size: .4rem;
            color: #fff;
        }

        .icon {
            fill: #fff;
            mix-blend-mode: difference;
            width: .4rem;
            height: .4rem;
        }
    }
}

.middle {
    width: 100%;
    display: flex;

    &-left {
        position: relative;

        .coverImg {
            width: 2rem;
            height: 2rem;
            border-radius: .2rem;
            margin: .2rem;
        }

        .playCount {
            position: absolute;
            margin-right: .25rem;
            right: 0;
            top: .2rem;
            display: flex;
            align-items: center;
            color: white;
            font-size: .2rem;
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
        color: rgb(244, 228, 228);
        font-size: .28rem;
        margin-left: .2rem;

        .author {
            display: flex;
            align-items: center;

            .author-img {
                width: .4rem;
                height: .4rem;
                border-radius: 50%;

            }

            span {
                margin-left: .1rem;
                font-size: .24rem;
            }
        }

        .signature {
            font-size: .2rem;
        }

        div {
            margin: .2rem 0;
        }

        .title {
            width: 100%;
            color: white;

        }
    }
}

.bottom {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 1rem;
    align-items: center;

    &-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
            fill: white;
            color: #fff;
            width: .45rem;
            height: .45rem;
        }

        span {
            font-size: .28rem;
            margin-top: .1rem;
            color: #fff;
        }
    }
}
</style>