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
    showFooter: true,
    cookies: "",
    token: localStorage.getItem("token") || "",
    userInfo: {},
    uid: sessionStorage.getItem("uid") || "",
    userMusicList: [0],
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
    pushPlayList(state, value) {
      state.playList.push(value);
    },
    updateShowFooter(state, value) {
      state.showFooter = value;
    },
    updateCookies(state, value) {
      state.cookies = value;
      localStorage.setItem("cookies", value);
    },
    updateToken(state, value) {
      state.token = value;
      localStorage.setItem("token", value);
    },
    updateUserInfo(state, value) {
      state.userInfo = value;
    },
    updateUserId(state, value) {
      state.uid = value;
      sessionStorage.setItem("uid", value);
    },
    updateUserMusicList(state, value) {
      state.userMusicList = value;
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
    async reqLogin(context, value) {
      let res = await API.user.reqLogin(value);
      // console.log(res);

      if (res.code == 200) {
        context.commit("updateCookies", res.cookie);
      }
      return res;
    },
    async reqUserInfo(context) {
      let res = await API.user.reqUserInfo(context.state.uid);
      if (res.code == 200) {
        context.commit("updateUserInfo", res);
      }
    },
    async reqUserMusicList(context, value) {
      let res = await API.user.reqUserMusicList(value || context.state.uid);
      if (res.code == 200) {
        context.commit("updateUserMusicList", res.playlist);
        return res.playlist;
      }
    },
    //获取歌单详情以更新播放列表
    async getUserMusicListDetail(context, value) {
      let res = await API.user.reqUserMusicListDetail(value);
      console.log(res);
      if (res.code == 200) {
        context.commit("updatePlayList", res.playlist.tracks);
        context.commit("updatePlayListIndex", 0);
      }
    },
  },
  getters: {
    isLogin(state) {
      return !(state.uid == "");
    },
  },
  modules: {},
});
