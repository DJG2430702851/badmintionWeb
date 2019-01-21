<template>
	<div id="header" class="header">
    <div class="htop">
        <div class="mid">
          <span class="welcome">欢迎来到羽毛球信息服务平台</span>
          <div class="log">
              <div v-if="$store.state.isLogin">
                  <el-dropdown style="line-height:normal;">
                    <span class="el-dropdown-link" style="font-size:12px;">
                      欢迎您,<span>{{displayName}}</span><i class="el-icon-arrow-down"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="xdropdown">
                      <el-dropdown-item @click.native="goInformation">基本信息</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/myta')" v-if="userType==1" >测试申请</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/mysul')" v-if="userType==0" >我的报名</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/myga')" v-if="userType==0"  >等级申请</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/myma')" v-if="userType==0"  >赛事申请</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/myce')" v-if="userType==0"  >我的证书</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/cp')">修改密码</el-dropdown-item>
                      <el-dropdown-item @click.native="logOut" divided>退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
              </div>
              <div v-else>
                  <span v-if="$route.name == 'login' && $route.name == 'register' && $route.name == 'forgetPassword'">
                    
                  </span>
                  <span v-else>
                    <router-link class="textBtn" to="/login">登录</router-link>&nbsp;|&nbsp;<router-link class="textBtn" to="/register">注册</router-link>
                  </span>
                    
              </div>
          </div>
        </div>
    </div>
    <!-- <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse"
                data-target="#example-navbar-collapse">
                    <span class="sr-only">切换导航</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link class="navbar-brand" to='/'><img class="logo" src="/static/images/logo.png" alt=""></router-link>
            </div>
            <div class="collapse navbar-collapse" >
              <ul class="nav navbar-nav topmenu">
                    <li :class="{active:$route.path=='/'}"><router-link to="/">首页</router-link></li>
                    <li :class="{active:activeMenu=='新闻公告'}"><router-link to="/nel">新闻公告</router-link></li>
                    <li v-for="(item, index) in navs" v-if="item.navshow && item.meta.userType==userType" :class="{active:activeMenu==item.meta.title}"><router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link></li>
                </ul>
          </div>
        </div>
    </nav> -->
    <nav class="navbar">
        <div>
            <div class="navbar-header">
                <router-link class="navbar-brand" to='/'><img class="logo" src="/static/images/logo.png" alt=""></router-link>
            </div>
            <div>
              <ul class="topmenu">
                    <li :class="{active:$route.path=='/'}"><router-link to="/">首页</router-link></li>
                    <li :class="{active:activeMenu=='新闻公告'}">
                        <router-link to="/nel">新闻公告</router-link>
                        <ul class="level2-ul">
                          <li :class="{active:activeMenu2=='协会新闻'}"><router-link to="/nel">协会新闻</router-link></li>
                          <li :class="{active:activeMenu2=='协会公告'}"><router-link to="/nol">协会公告</router-link></li>
                        </ul>
                    </li>
                    <li v-for="(item, index) in navs" v-if="item.navshow && item.meta.userType==userType" :class="{active:activeMenu==item.meta.title}">
                        <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
                        <ul class="level2-ul">
                            <li v-for="(child,index) in item.children" :key="index" v-if="child.meta.level2" :class="{active:activeMenu2==child.meta.title}">
                                <router-link :to="child.redirect||child.path">{{child.meta.title}}</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
          </div>
        </div>
    </nav>
	</div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {
  name: 'top',
  data () {
    return {
      userIsLogin:false,
      displayName:localStorage.getItem('displayName'),
      userType:localStorage.getItem('webUserType'),
      activeIndex: '2',
      activeMenu:'',
      activeMenu2:'',
      navs:[]
    }
  },
  mounted(){
    this.navs = this.$router.options.routes;
  	// this.setActive();
    this.login(!!localStorage.getItem('username'));
    let vthis = this;
    this.displayname.$off('changeDisplayName');
    this.displayname.$on('changeDisplayName', function (name) {
        vthis.displayName = name;
    })

    this.getMenuActive();
    // this.getMenuLevel2Active();
  },
  components: {
    // login,register
  },
  computed: {
    ...mapState([
    'isLogin'
    ])
  },
  methods:{
    ...mapActions([
      'login' 
    ]),
  	handleSelect(key, keyPath) {
	    // console.log(key, keyPath);
	  },
   //  handleDialogClose(done){
   //    done();
   //    this.loginflag = false;
   //    this.registerflag = false;
   //  },
    goLogin(){
      this.dialogTitle='登录';
      this.loginflag=true;
      this.dialogflag=true;
    },
    goRegister(){
      this.dialogTitle='注册';
      this.registerflag=true;
      this.dialogflag=true;
    },
    logOut(){
      this.login(false);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('displayName');
      localStorage.removeItem('webUserType');
      localStorage.removeItem('webUserState');
      this.userType = 2;
      if(this.$route.meta.requireLogin){
        this.$router.push('/')
      }
    },
    goInformation(){
      if(localStorage.getItem('webUserType')==1){
        this.$router.push('/mi')
      }else{
        this.$router.push('/pi')
      }
    },
    getMenuActive(){
        if(this.$route.path == '/'){
          return;
        }
        let menuobj = {
          '/nel/nol/ned/nod':'新闻公告',
          '/qa/ta/sf':'测试机构',
          '/mat/ga/ciq/cv':'运动员入口',
          '/eil/eid/eitn/eibi/eicc/eicsl/eicsd/eisu':'考评员入口',
          '/pi/mi/mysul/myga/myma/myta/myce/cp':'个人中心'
        };
        for(var k in menuobj){
          if(k.includes(this.$route.path.split('/')[1])){
            this.activeMenu = menuobj[k];
            break;
          }
        }
    },
    getMenuLevel2Active(){
        this.activeMenu2 = '';
        if(this.$route.path == '/'){
          return;
        }
        let menulevel2obj = {
          '/nel/ned':'协会新闻',
          '/nol/nod':'协会公告',
          '/qa':'资格申请',
          '/ta':'测试申请',
          '/sf':'成绩反馈',
          '/mat':'赛事申请',
          '/ga':'等级申请',
          '/ciq/cv':'证书查询',
          '/eil/eid/eitn/eibi/eicc/eisu':'考评员报名',
          '/eicsl/eicsd':'查看成绩'
        };
        for(var k in menulevel2obj){
          if(k.includes(this.$route.path.split('/')[1])){
            this.activeMenu2 = menulevel2obj[k];
            break;
          }
        }
    },
  	goUrl (url,index) {
  		this.activeIndex = index;
  		this.$router.push(url)
  	}
  },
  watch: {
  	'$route.path':function(){
  		this.getMenuActive();
      this.getMenuLevel2Active();
  	}
  }
}
</script>

<style lang="less">
    .header{
      background-color:#FFFFFF;
      .htop{
        background-color:#ececed;
        height: .3rem;
        line-height: .3rem;
        font-size: .14rem;
        .mid{
          max-width: 1200px;
          margin: 0 auto;
          .welcome{
            float: left;
            color:#666666;
            font-size: 12px;
          }
          .log{
            float: right;
            color:#e30700;
            padding-right: .1rem;
            a{
              font-size:12px;
              color:#e30700;
            }
          }
        }
      }
      .navbar{
        border:0px;
        height:80px;
        background-color:#FFFFFF;
        font-size: .14rem;
          max-width: 1200px;
          margin: 0 auto;
          .welcome{
            float: left;
            font-size:12px;
            color:#666666;
          }
          .login{
            float: right;
            color:#e30700;
            padding-right: .1rem;
          }
          .navbar-brand{
              padding-top: 0;
              padding-left: 0;
              .logo{
                float: left;
                margin-top: 15px;
              }
          }
          // .navbar-collapse{
          //     padding: 0;
              @media screen and (min-width: 1025px){}
              .topmenu{
                margin-left: 75px;
                >li{
                    // height: 80px;
                    // line-height: 80px;
                    text-align:center;
                    float: left;
                    position:relative;
                    margin-right:80px;
                    margin-top: 25px;
                    font-size:18px;
                    padding:0;
                    &:first-of-type{
                      margin-left: 70px;
                    }
                    // &:hover{
                    //   >.level2-ul{
                    //     display: block;
                    //   }
                    // }
                    >a{
                      height: 40px;
                      padding:0 7px 12px;
                      display: inline-block;
                      color:#474747;
                    }
                    .level2-ul{
                      display: none;
                      position: absolute;
                      z-index: 100;
                      width: 100%;
                      li{
                        text-align: center;
                        font-size:16px;
                        height: 46px;
                        line-height: 46px;
                        background:rgba(225,33,45,.6);
                        a{
                          color:#FFFFFF;
                          width: 100%;
                          display: inline-block;
                        }                                                      
                      }
                      li.active{
                        background:rgba(225,33,45,1);
                      }
                    }
                }
                >.active{
                  >a{
                    color:#e60010 !important;
                    border-bottom: 2px solid #e60010;
                    background-color:transparent;
                  }
                }
              }
          // }
      }
    }
.xdropdown{
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
      color:@colorRed;
  }
}
</style>