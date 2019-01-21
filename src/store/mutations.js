import {
	set_qaEdit,
	set_isLogin,
	set_isFillPersonalInformation,
	set_province,
	set_city,
	set_district
} from './mutation-types.js'
// import ls from '../utils/LStorage'

export default {
	//资格申请编辑状态
	[set_qaEdit](state, value) {
		state.qaEdit = value;
	},
	[set_isLogin](state, value) {//是否登录状态
		state.isLogin = value;
	},
	[set_isFillPersonalInformation](state, value) {//是否完善个人信息
		state.isFillPersonalInformation = value;
	},
	[set_province](state, value) {//是否完善个人信息
		state.province = value;
	},
	[set_city](state, value) {//是否完善个人信息
		state.city = value;
	},
	[set_district](state, value) {//是否完善个人信息
		state.district = value;
	}

}
