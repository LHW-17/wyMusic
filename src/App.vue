<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import Home from "./views/Home.vue";
import FooterMusic from "./components/ItemMusic/FooterMusic.vue";
import { useStore } from "vuex";
import { onBeforeMount } from "vue";

const store = useStore()
</script>

<template>

  <router-view>
  </router-view>
  <FooterMusic v-show="store.state.showFooter" />

</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: .4rem;
  height: .4rem;
}
</style>
