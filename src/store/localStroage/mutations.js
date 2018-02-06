export default {
  showComplete(state, completeStatus) {
    state.completeStatus = completeStatus
  },
  showWifiIcon(state, wifiIconStatus) {
   state.wifiIconStatus = wifiIconStatus
  },

  showLight(state, isLight) {
    state.isLight = isLight
  }
}
