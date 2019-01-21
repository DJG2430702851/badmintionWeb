// import {
// 	getUser,
// } from '../service/getData'
import {
	set_qaEdit,
	set_isLogin,
	set_isFillPersonalInformation,
	set_province,
	set_city,
	set_district,
} from './mutation-types.js'

export default {

	async getUserInfo({
		commit,
		state,
	}, hcy) {
	  console.log(commit, state, hcy)
		let res = await getUser();
		commit(GET_USERINFO, res)
	},
	async qaEdit({
		commit,
		state,
	}, info) {
		commit(set_qaEdit, info)
	},
	async login({
		commit,
		state,
	}, info) {
		commit(set_isLogin, info)
	},
	async fillPersonalInformation({
		commit,
		state,
	}, info) {
		commit(set_isFillPersonalInformation, info)
	},
	async setProvince({
		commit,
		state,
	}, info) {
		commit(set_province, info)
	},
	async setCity({
		commit,
		state,
	}, info) {
		commit(set_city, info)
	},
	async setDistrict({
		commit,
		state,
	}, info) {
		commit(set_district, info)
	}
}
