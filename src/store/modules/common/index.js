import {SystemConfigIndex} from "../../../api/sys.common";

export default {
  namespaced: true,
  state: {
    config: {},
    loading: true
  },
  mutations: {
    init (state,config) {
      console.log(config)
      state.config = config
      state.loading = false
    },
  },
  actions: {
    init(context){
      SystemConfigIndex().then(
          res => {
            context.commit('init',res)
          }
      )
    }
  },

}
