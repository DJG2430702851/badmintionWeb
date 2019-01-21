// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '../static/quilleditor/font.css';
import App from './App'
import router from './router'
import store from './store/'
import $ from 'jquery'
import axios from "axios"
import promise from 'es6-promise'
import vstore from './store'
import animated from 'animate.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import '../static/css/common.css'
import '../static/css/colorStyle.css'
import '../static/css/style.css'
import '../static/css/mobileStyle.css'
import '../static/icon/iconba.css'
Vue.use(animated)
Vue.use(ElementUI);
Vue.use(VueQuillEditor)
promise.polyfill();

Vue.config.productionTip = false
Vue.prototype.$axios=axios
global.API_ROOT = process.env.API_ROOT
global.pageSize = 10;
// global.imgHeadersToken = {
//     'X-Authorization': 'Bearer '+localStorage.getItem('token')
// };
global.imgActionUrl = process.env.API_ROOT+'/api/organization/qualificationApply/saveImage'
global.imgActionUrl2= process.env.API_ROOT+'/api/web/register/saveImage'
// window.onresize(function(){
//   console.log(11)
// })
// 'https://jsonplaceholder.typicode.com/posts/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate () {
    Vue.prototype.course = this;
    Vue.prototype.displayname = this;
    Vue.prototype.areaSelect = this;
    Vue.prototype.changeAreaSearch = this;
    Vue.prototype.imgUpload = this;
  }
  // ,
  // beforeDestroy () {
  //   Vue.prototype.course.$off('SUBMITSEARCH_PEOPLE')
  // }
});
// Vue.prototype.course = new Vue();
router.afterEach((to, from) => {
  goLogin(to, from)
  window.scrollTo(0, 0);
});

// var routeList = [];
router.beforeEach((to, from, next) => {
    
    // var index = -1;
    // for(var i = 0; i < routeList.length; i++) {
    //   if(routeList[i].name == to.name) {
    //     index = i;
    //     break;
    //   }
    // }
    // if (index !== -1) {
    // //如果存在路由列表，则把之后的路由都删掉
    //   routeList.splice(index + 1, routeList.length - index - 1);
    // } else if(to.name != '登录'){
    //   routeList.push({"name":to.name,"path":to.fullPath});
    // }
    // to.meta.routeList = routeList;
    goLogin(to, from, next)
    // next()
});

function goLogin(to, from, next){
  if(to.meta.requireLogin){//是否需要登录
        if(localStorage.getItem('token')){//已登录
            if(to.meta.userType===0 || to.meta.userType===1){
              if(to.meta.userType == localStorage.getItem('webUserType')){
                if(to.meta.requireFillInformation){//是否需要填写好个人信息
                  if(to.meta.requireFillInformation == localStorage.getItem('webUserState')){
                      if(!!next){
                        next()
                      }
                  }else{
                    Vue.prototype.$message({
                      message: '请先完善资料信息',
                      type: 'error'
                    });
                    if(localStorage.getItem('webUserType')==0){
                        router.push('/pi');
                    }else{
                        router.push('/mi');
                    }
                  }
                }else{
                  if(!!next){
                    next()
                  }
                }
              }else{
                router.go(-1);
              }
            }else{
              if(!!next){
                next()
              }
            }
        }else{//未登录则前往登录页
          router.push('/login');
        }
  }else{//跳转
    if(!!next){
      next()
    }
  }
}
