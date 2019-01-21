<template>
	 <div class="imgUpload">
        <el-upload class="imgupload"
            :class="{hideupload:imgList.length==validateFieldLen}"
            :limit="validateFieldLen"
            :action="imgActionUrl"
            list-type="picture-card"
            name="uploadImage"
            :headers="imgHeadersToken"
            :before-upload="imgBeforeUpload"
            :file-list="imgList"
            :drag="true"
            :on-preview="handlePictureCardPreview"
            :on-remove="(file, fileList) => {imgHandleRemove(file, fileList, field, validateField, delIdField)}"
            :on-success="(response, file, fileList) => {imgHandleSuccess(response, file, fileList, field, validateField)}"
            accept="image/jpeg,image/gif,image/png,image/bmp">
            <i class="el-icon-plus"></i>
            <div class="el-upload__tip" slot="tip">{{tipText}}</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
	  </div>
</template>

<script>
export default {
    name: 'iu',
    props:{
        validateFieldLen:{
            default:1
        },
        field:{
            required:true
        },
        validateField:{
            default:0
        },
        delIdField:{
            default:''
        },
        imgType:{
            default:'single'
        },
        tipText:{
          default:'图片请小于1M'
        }
    },
    data () {
        return {
            imgHeadersToken:{
                'X-Authorization': 'Bearer '+localStorage.getItem('token')
            },
            imgActionUrl:imgActionUrl,
            dialogVisible:false,
            dialogImageUrl:'',
            imgList:[],
            imglen:0
        }
    },
    mounted(){

    },
    components: {

    },
    methods:{
      imgHandleSuccess(response, file, fileList, field, validateField){
          this.imgList = fileList;
          this.imgUpload.$emit('changeImgAdd',{
            field:field,
            validateField:validateField,
            imgType:this.imgType,
            fileList:fileList,
            response:response,
            file:file
          });
      },
      imgHandleRemove(file, fileList, field, validateField, delIdField) {
          this.imgList = fileList;
          this.imgUpload.$emit('changeImgDel',{
            field:field,
            validateField:validateField,
            delIdField:delIdField,
            imgType:this.imgType,
            fileList:fileList,
            file:file
          });
      },
      handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
      },
      imgBeforeUpload(file){
          let isLt1M = file.size / 1024 / 1024 < 1;
          if (!isLt1M) {
              this.$message.error('图片大小不能超过1MB!');
          }
          return isLt1M;
      }
    },
    watch: {
        
    }
}
</script>

<style lang="less">

</style>