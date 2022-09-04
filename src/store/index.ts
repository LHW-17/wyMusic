import { createStore } from "vuex";
import API from "@/api";
export const store = createStore({
  state: {
    playList: [
      {
        al: {
          id: 0,
          name: "未播放歌曲",
          pic: 0,
          picUrl: "https://iph.href.lu/50x50?fg=666666&bg=cccccc",
          pic_str: "",
        },
        id: 30953221,
      },
    ],
    playListIndex: 0, //默认为0
    playing: false,
    detailShow: false, //控制歌曲详情页弹出层
    lyric: "",
    currentTime: 0,
    maxTime: 0,
    changeTime: 0,
    //为解决拖拽过程中timeupdate触发更新导致的跳动
    isDraging: false,
  },
  mutations: {
    playOrPause(state, value) {
      state.playing = value;
    },
    updatePlayList(state, value) {
      state.playList = value;
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateLyric(state, value) {
      state.lyric = value;
    },
    updateCurrentTime(state, value) {
      state.currentTime = value;
      // console.log(state.currentTime);
    },
    updateMaxTime(state, value) {
      state.maxTime = value;
      // console.log(state.maxTime);
    },
    updateChangeTime(state, value) {
      state.changeTime = value;
    },
    updateIsDraging(state, value) {
      state.isDraging = value;
    },
  },
  actions: {
    async getLyric(context, value) {
      let res = await API.item.getLyric(value);
      //console.log(res);
      if (res.code == 200) {
        context.commit("updateLyric", res.lrc.lyric);
      }
    },
  },
  modules: {},
});
