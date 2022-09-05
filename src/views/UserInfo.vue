<template>
    <div class="page">
        <div class="top">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-jiantou_xiangzuo"></use>
            </svg>
        </div>
        <div class="userInfoTop">
            <Card height="2rem">
                <img v-lazy="userInfo?.profile?.avatarUrl" alt="" class="profileimg">
                <div class="name">
                    {{userInfo?.profile?.nickname}}
                </div>
                <div class="description">
                    <span>16&nbsp;关注</span>
                    <span>2&nbsp;粉丝</span>
                    <span>Lv.9</span>
                </div>
            </Card>
        </div>
        <div class="musicInfo">
            <Card>
                <div class="iconList">
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang-copy"></use>
                        </svg>
                        <span>最近播放</span>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yinle"></use>
                        </svg>
                        <span>本地/下载</span>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shangchuanyunpan"></use>
                        </svg>
                        <span>云盘</span>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-ypurchased"></use>
                        </svg>
                        <span>已购</span>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-haoyou"></use>
                        </svg>
                        <span>我的好友</span>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shoucang"></use>
                        </svg>
                        <span>收藏和赞</span>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-WIFI"></use>
                        </svg>
                        <span>我的播客</span>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanzi"></use>
                        </svg>
                        <span>音乐罐子</span>
                    </div>

                </div>
                <span class="plus">
                    <span>+</span>&nbsp;<span>音乐应用</span>
                </span>
            </Card>
        </div>
        <div class="likeMusic">
            <Card class="card" height="1.5rem" @click="playMusicList(userMusicList[0].id)">
                <div class="left">
                    <img v-lazy="userMusicList[0]?.coverImgUrl" alt="">
                    <div>
                        <p>我喜欢的音乐</p>
                        <span>{{userMusicList[0]?.trackCount}}首</span>
                    </div>
                </div>
                <div class="right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xin"></use>
                    </svg>
                    <span>心动模式</span>
                </div>
            </Card>
        </div>
        <div class="musicList">
            <Card class="card" height="100%">
                <div class="left" v-for="item in userMusicList.slice(1)" @click="playMusicList(item.id)">
                    <img v-lazy="item.coverImgUrl" alt="">
                    <div>
                        <p>{{item.name}}</p>
                        <span>{{item.trackCount}}首</span>
                    </div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-24gl-playlistMusic3"></use>
                    </svg>
                </div>
            </Card>
        </div>
    </div>

</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Card from '@/components/Card.vue';

const store = useStore()

const uid = computed(()=>store.state.uid)
const userInfo = computed(()=>store.state.userInfo);
const userMusicList = computed(()=>store.state.userMusicList)

store.dispatch("reqUserInfo")
store.dispatch("reqUserMusicList", uid.value)

const playMusicList=(id:number)=>{
    store.dispatch("getUserMusicListDetail", id)
}
</script>

<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
}

.page {
    width: 100%;
    height: 13.35rem;
    overflow: scroll;
    background-color: #e2e2e2;

    .top {
        width: 100%;
        height: 1rem;
        display: flex;
        margin-left: .5rem;
        align-items: center;

        .icon {
            width: .5rem;
            height: .5rem;
        }
    }

    .userInfoTop {
        width: 100%;
        height: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: .4rem;
        position: relative;

        .profileimg {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            transform: translateY(-65%);
            position: absolute;
        }

        .name {
            font-weight: 700;
            font-size: .5rem;
            align-self: center;
            margin-top: .6rem;
        }

        .description {
            font-size: .2rem;
            color: gray;

            span {
                padding: 0 .1rem;
                border-right: .02rem solid gray;
            }

            span:last-child {
                border: none;
            }
        }
    }

    .musicInfo {
        margin-top: .2rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .iconList {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-wrap: wrap;
            margin-bottom: .1rem;

            div {
                margin-top: .4rem;
                width: 25%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .icon {
                    width: .6rem;
                    height: .6rem;
                }

                span {
                    font-size: .2rem;
                    color: #6d6d6d;
                }
            }
        }

        .plus {
            width: 100%;
            height: .8rem;
            border-top: .02rem solid #e2e2e2;
            font-size: .2rem;
            text-align: center;
            line-height: .8rem;
            color: gray;
            display: flex;
            align-items: center;
            justify-content: center;

            span:nth-child(1) {
                font-size: .4rem;
                line-height: .7rem;
            }
        }
    }

    .likeMusic {
        width: 100%;
        margin-top: .2rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .card {
            flex-direction: row;
            justify-content: space-between;

            .left {
                height: 100%;
                display: flex;
                justify-content: start;
                align-items: center;

                img {
                    margin: .2rem;
                    width: 1rem;
                    height: 1rem;
                    border-radius: .2rem;
                }

                div {
                    p {
                        font-size: .28rem;
                        font-weight: 700;
                    }

                    span {
                        font-size: .24rem;
                        color: gray;
                    }
                }
            }

            .right {
                display: flex;
                justify-content: center;
                align-items: center;
                border: .02rem solid #e2e2e2;
                border-radius: .4rem;
                padding: .1rem .1rem;
                margin-right: .2rem;

                span {
                    font-size: .24rem;
                }
            }

        }

    }

    .musicList {
        width: 100%;
        margin-top: .2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: scroll;

        .card {
            justify-content: space-between;
            align-items: flex-start;
            height: 100%;

            position: relative;

            .left {
                height: 100%;
                display: flex;
                justify-content: start;
                align-items: center;


                .icon {
                    position: absolute;
                    right: 0;
                    margin-right: .4rem;
                }

                img {
                    margin: .2rem;
                    width: 1rem;
                    height: 1rem;
                    border-radius: .2rem;
                }

                div {
                    p {
                        font-size: .28rem;
                        font-weight: 700;
                    }

                    span {
                        font-size: .24rem;
                        color: gray;
                    }
                }
            }

            .right {
                display: flex;
                justify-content: center;
                align-items: center;
                border: .02rem solid #e2e2e2;
                border-radius: .4rem;
                padding: .1rem .1rem;
                margin-right: .2rem;

                span {
                    font-size: .24rem;
                }
            }

        }
    }
}
</style>