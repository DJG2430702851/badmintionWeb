<template>
	<div class="areaSelect">
    <el-form ref="pform" :rules="rules" :label-width="labelWidth" label-position="right" :model="pform">
      <el-row class="areaWrap" :gutter="10">
          <el-form-item required :label="label">
            <div :style="{'width':formWidth}">
              <el-col :span="span">
                <el-form-item prop="province">
                    <el-select :size="selectSize" @change="provinceChange()" v-model="pform.province" placeholder="请选择省">
                      <el-option
                        v-for="(item,index) in provinceArr"
                        :value="item.name"
                        :key="index">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="span">
                <el-form-item prop="city">
                    <el-select :size="selectSize" @change="cityChange()" v-model="pform.city" placeholder="请选择市">
                      <el-option
                        v-for="(item,index) in cityArr"
                        :value="item.name"
                        :key="index">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="span">
                <el-form-item prop="district">
                    <el-select :size="selectSize" @change="districtChange()" v-model="pform.district" placeholder="请选择区">
                      <el-option
                        v-for="(item,index) in districtArr"
                        :value="item.name"
                        :key="index">
                      </el-option>
                    </el-select>
                </el-form-item>
            </el-col><slot name="epl"></slot>
          </div><slot name="tcl"></slot>
        </el-form-item>
      </el-row>
    </el-form>
	</div>
</template>

<script>
import {getAreaList} from '@/service/commonData'
import { mapActions } from 'vuex'
export default {
  name: 'as',
  props:{
    label: {
      default: ''
    },
    labelWidth: {
      default: '200px'
    },
    formWidth: {
      default: '70%'
    },
    selectSize: {
      default: ''
    },
    rules: {
      default: () => {
          return {
            province:[
                { required: true,pattern:/^(?!请选择$)/, message: '请选择省', trigger: 'change' }
            ],
            city:[
                { required: true,pattern:/^(?!请选择$)/, message: '请选择市', trigger: 'change' }
            ],
            district:[
                { required: true,pattern:/^(?!请选择$)/, message: '请选择区', trigger: 'change' }
            ]
          }
      }
    },
    span: {
      default: 8
    }
  },
  data () {
    return {
      pform:{
        province:'',
        city:'',
        district:''
      },
      provinceArr:[],
      cityArr:[],
      districtArr:[],
      searchflag:false
    }
  },
  mounted(){
    this.getProvinceList();
  },
  components: {

  },
  computed: {
    provinceActive(){
      return this.provinceArr.filter((item,index,arr)=>{
          return item.name == this.pform.province;
      })[0] 
    },
    cityActive(){
      return this.cityArr.filter((item,index,arr)=>{
        return item.name == this.pform.city;
      })[0];
    }
  },
  methods:{
    ...mapActions([
      'setProvince','setCity','setDistrict'
    ]),
    areaValidate(){
      let returnValue = false;
      this.$refs['pform'].validate((valid) => {
        returnValue = valid;
      })
      return returnValue;
    },
    getProvinceList(){
      getAreaList(-1).then((data)=>{
        if(data.code==0){
          this.provinceArr = data.data;
        }
      })
    },
    getCityList(){
        getAreaList(this.provinceActive.areaId).then((data)=>{
          if(data.code==0){
            this.cityArr = data.data;
          }
        })
    },
    getDistrictList(){
        getAreaList(this.cityActive.areaId).then((data)=>{
          if(data.code==0){
            this.districtArr = data.data;
          }
        })
    },
    provinceChange(){
      this.pform.city = '';
      this.pform.district = '';
      this.districtArr = [];
      this.areaSearch();
    },
    cityChange(){
      this.pform.district = '';
      this.areaSearch();
    },
    districtChange(){
      this.areaSearch();
    },
    areaSearch(arg){
      if(this.searchflag){
        this.areaSelect.$emit('changeAreaSearch',this.pform);
        if(arg=='clear'){
            this.cityArr = [];
            this.districtArr = [];
        }
      }
    }
  },
  watch: {
    'pform.province':function(newVal,oldVal){
        this.areaSelect.$emit('changeArea',this.pform);
    },
    'pform.city':function(newVal,oldVal){
        this.areaSelect.$emit('changeArea',this.pform);
    },
    'pform.district':function(newVal,oldVal){
        this.areaSelect.$emit('changeArea',this.pform);
    },
    'provinceActive':function(newVal,oldVal){
        if(newVal){
          this.getCityList();
        }
    },
    'cityActive':function(newVal,oldVal){
      if(newVal){
        this.getDistrictList();
      }
    }
  }
}
</script>

<style lang="less">
.areaSelect{

}  
</style>