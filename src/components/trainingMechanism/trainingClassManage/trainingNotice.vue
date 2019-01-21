<template>
	<div>
      <el-form ref="tnnform" :rules="rules" label-width="60px" label-position="top" class="x-form" :model="tnnform">
          <div class="grid-content" style="padding:10px 0;">
            <el-form-item label="标题" prop="noticeTitle">
              <el-input v-model="tnnform.noticeTitle"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="noticeContent">
              <quill-editor v-model="tnnform.noticeContent" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
              </quill-editor>
            </el-form-item>
          </div>
      </el-form>
        <div class="text-right" style="margin:10px 20px;">
            <el-button size="small" type="primary" @click="formSubmit('tnnform')">保存</el-button>
        </div>
  	</div>
</template>
<script>
import * as Quill from 'quill'
var fonts = ['Microsoft-YaHei','SimSun', 'SimHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];  
var Font = Quill.import('formats/font');
Font.whitelist = fonts; //将字体加入到白名单 
Quill.register(Font, true);
import {addNoticeManagement,editNoticeManagement,classDetailAll} from '../../../service/getData'
export default {
  	name: 'tice',
    props:['rdata'],
  	data () {
    	return {
	        content:'',
          tnnform:{
            tcId:this.$route.params.id,
            noticeTitle:'',
            noticeContent:''
          },
          rdata2:{},
	        editorOption:{
  	        modules: {
                  syntax: {
                      highlight: text => hljs.highlightAuto(text).value
                  },
                  toolbar: [
                      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                      ['blockquote', 'code-block'],
                      [{'header': 1}, {'header': 2}],               // custom button values
                      [{'list': 'ordered'}, {'list': 'bullet'}],
                      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                      [{'direction': 'rtl'}],                         // text direction
                      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                      [{'header': [1, 2, 3, 4, 5, 6, false]}],
                      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                      [{'font': fonts }],
                      [{'align': []}],
                      ['link', 'formula']//去除video即可
                  ]
              },
              placeholder: '编辑内容...'
          },
          rules: {
            noticeTitle: [
                { required: true, message: '请输入培训通知标题', trigger: 'blur' }
            ],
            noticeContent: [
                { required: true, message: '请输入培训通知内容', trigger: 'blur' }
            ]
          }
	    }
	},
	methods: {
      onEditorBlur(){

      },
      onEditorFocus(){

      },
      onEditorChange(){

      },
      formSubmit(formName){
        this.$refs[formName].validate((valid) => {
            if(valid){
                if(this.tnnform.tnId){
                    this.tnnform.applyStartTime = this.$route.query.applyStartTime
                    this.editSubmit();
                }else{
                    this.addSubmit();
                }
            }
        })
      },
      addSubmit(){
        addNoticeManagement(this.tnnform).then((data) => {
          classDetailAll(this.tnnform.tcId).then((data) => {
            this.rdata2 = data.data.tnDto;
            delete this.rdata2.tcId;
            this.tnnform = Object.assign(this.tnnform,this.rdata2);
            this.$message.success('保存成功');
          })
        })
      },
      editSubmit(){
        editNoticeManagement(this.tnnform).then((data) => {
          if(data.data.code==500){
            this.$message.error(data.data.message);
          }else{
            this.$message.success('保存成功');
          }
          
        })
      }
    },
	mounted(){
    delete this.rdata.tcId;
    this.tnnform = Object.assign(this.tnnform,this.rdata);

	},
	watch: {
	   
	}
}
</script>
<style>
	
</style>
<style lang="less">
	.quill-editor {
	 	height: 450px;
    line-height: normal;
	  	.ql-container {
	    	height: 350px;
	  	}
	}
</style>