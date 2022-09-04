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
        <div class="itemList">
            <div class="item" v-for="(item, index) in playList.tracks" :key="item.id">
                <div class="itemLeft" @click="playMusic(index)">
                    <span class="leftSpan">{{ index + 1 }}</span>
                    <div>
                        <p>{{ item.name }}</p>
                        <div>
                            <span v-for="(item2) in item.ar" :key="item2.id">
                                {{ item2.name }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon" aria-hidden="true" v-if="item.mv">
                        <use xlink:href="#icon-24gl-playSquare"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-24gl-playlistMusic3"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex';
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
    // console.log(store.state.playing);

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

    .itemList {
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        .item {
            width: 100%;
            height: 1.5rem;
            display: flex;
            justify-content: space-between;

            .itemLeft {
                display: flex;
                align-items: center;
                width: 50%;
                height: 100%;
                justify-content: start;

                .leftSpan {
                    width: .5rem;
                    margin: 0 .4rem;
                }

                div {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 4rem;

                    p {
                        width: 4rem;
                        font-size: .3rem;
                        font-weight: bold;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    div {
                        display: flex;
                        flex-direction: row;
                        justify-content: start;
                        font-size: .24rem;
                        margin-top: .1rem;
                        color: rgb(160, 154, 154);

                        span {
                            margin-right: .1rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }

            .itemRight {
                width: 30%;
                display: flex;
                justify-content: end;
                align-items: center;

                .icon {
                    width: .5rem;
                    height: .5rem;
                    margin-right: .3rem;
                }
            }
        }

        .item:nth-last-child(1) {
            margin-bottom: 1.2rem;
        }

    }
}
</style>