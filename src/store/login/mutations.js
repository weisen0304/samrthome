export default {
  isLogin(state, user){
   state.user = user
  },
  //更新用户信息
  updateUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo;
  },

  undataFamilyInfo(state, newFamilyInfo) {
    state.familyInfo = newFamilyInfo;
  }
}
