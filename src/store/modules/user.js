import { sStorage } from "@/utils/index";

const user = {
  state: {
    token: sStorage.get("token") || "",
    userInfo: sStorage.get("userInfo") || "",
    userId: 1,
    clientId: 1,
    schoolId: 1
  },

  mutations: {
    logIn(state, loginInfo) {
      state.token = loginInfo.token;
      state.userInfo = loginInfo.userInfo;
      sStorage.set("token", loginInfo.token);
      sStorage.set("userInfo", loginInfo.userInfo);
    },
    logOut(state) {
      state.token = "";
      state.userInfo = "";
      sStorage.del("token");
      sStorage.del("userInfo");
    }
  }
}

export default user;