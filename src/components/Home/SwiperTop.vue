<template>
    <div class="swiper">
        <van-swipe :autoplay="3000" lazy-render indicator-color="#000">
            <van-swipe-item v-for="image in images" :key="image.targetId">
                <img v-lazy="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import API from "@/api/index"

const images: any = ref([])
onMounted(async () => {
    const res = await API.home.reqSwipeImg()
    if (res.code == 200) {
        images.value = res.banners;
    }
})
</script>
<style lang="less" scoped>
.van-swipe {
    width: 100%;

    .van-swipe-item {
        padding: .1rem;

        img {
            width: 100%;
            height: 3rem;
            border-radius: .2rem;
        }
    }
}
</style>