import request from "@/utils/request";
//获取首页轮播图
export const reqSwipeImg = (type = 2) => {
  return request({
    url: `http://localhost:3000/banner?type=${type}`,
    method: "get",
  });
};
//获取发现好歌单列表
export const getMusicList = (limit: number = 10) =>
  request({
    url: `/personalized?limit=${limit}`,
    method: "GET",
  });
//搜索功能
export const reqSearch = (keyword: string) => {
  return request({
    url: `/search?keywords=${keyword}`,
    method: "get",
  });
};
