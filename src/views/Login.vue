<template>
    <div class="content">
        <div class="login">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-vynil"></use>
            </svg>
            <div class="input">
                <input type="text" placeholder="请输入手机号" v-model="phone">
                <input type="password" placeholder="请输入密码" v-model="password">
            </div>
            <van-button @click="login" class="button" round type="primary" size="large">登录</van-button>
            <van-button @click="$router.go(-1)" class="button" round type="default" size="large">返回</van-button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { defineComponent, reactive,ref } from 'vue';
import API from "@/api"
import { store } from '@/store';
import {useRouter} from "vue-router"

const router = useRouter()
const phone = ref("")
const password = ref("")
const login = async()=>{
    let data = {phone:phone.value, password:password.value}
    let res = await store.dispatch("reqLogin", data);
    if(res.code==200){
        store.commit("updateToken", res.token)
        store.commit("updateCookies", res.cookies)
        store.commit("updateUserId", res.account.id)
        router.push("/userinfo")
    }else{
        alert("信息错误");
        password.value = "";
    }
    
}   
</script>

<style scoped lang="less">
.content {
    width: 100%;
    height: 13.35rem;
    background-color: #c20c0c;

    .login {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 15%;

        .icon {
            width: 3rem;
            height: 3rem;
            margin-bottom: 1rem;

        }

        .input {
            width: 100%;
            height: 4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;


            input {
                width: 75%;
                height: 1rem;
                border: none;
                border-radius: 1rem;
                padding: 0 .2rem;
                font-size: .32rem;
            }
        }

        .button {
            width: 50%;
            margin-top: .3rem;
        }
    }

}
</style>