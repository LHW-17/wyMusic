import request from "@/utils/request";

export const getPlayList = (id: number) => {
  return request({
    url: `/playList/detail?id=${id}`,
    method: "get",
  });
};
//获取歌词数据 /lyric?id=33894312
export const getLyric = (id: number) =>
  request({
    url: `/lyric?id=${id}`,
    method: "get",
  });
