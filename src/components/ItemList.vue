<template>
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

</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
</script>

<style scoped lang="less">
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
</style>