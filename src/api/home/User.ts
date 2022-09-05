import request from "@/utils/request";

//登录功能
export const reqLogin = (data: { phone: string; password: string }) => {
  return request({
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
    method: "get",
    withCredentials: true,
  });
};
//获取用户详情
export const reqUserInfo = (id: string) => {
  return request({
    url: `/user/detail?uid=${id}`,
    method: "get",
  });
};

//登录后获取用户信息
export const reqInfo = () =>
  request({
    url: "/user/subcount",
    method: "get",
  });
//获取用户歌单
export const reqUserMusicList = (id: string) =>
  request({
    url: `/user/playlist?uid=${id}`,
    method: "get",
  });
//获取歌单详情 (歌单id)
export const reqUserMusicListDetail = (id: number) =>
  request({
    url: `/playlist/detail?id=${id}`,
  });
