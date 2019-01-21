import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

// import cart from './modules/cart'
// import products from './modules/products'
// import userinfo from './modules/userinfo'

Vue.use(Vuex);
const state = {
	qaEdit: false, //资格申请编辑状态
  isLogin: false, //用户登录状态
  province:'',
  city:'',
  district:''
}
export default new Vuex.Store({
  // modules: {
  //   cart,
  //   products,
  //   userinfo
  // },
  	state,
	getters,
	actions,
	mutations
})