import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
  },
  state: {
    schoolId: Number(localStorage.getItem('schoolId'))
  },
  mutations: {
    changeSchoolId(state, schoolId) {
      state.schoolId = schoolId;
      localStorage.setItem('schoolId', schoolId)
    }
  }
});

export default store;