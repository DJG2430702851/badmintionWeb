<script>

export default {}
/*
	个人等级申请状态  
	1为申请 
	2为审批通过 
	3为审批未通过 
	4为已上传证书
*/ 
export const gaStatusList = {
	1:'申请',
	2:'审批通过',
	3:'审批未通过',
	4:'已上传证书'
};
/*
	机构测试申请状态  
	0为申请 
	1为审批通过 
	2为审批未通过 
*/ 
export const taStatusList = {
	0:'申请',
	1:'审批通过',
	2:'审批未通过'
};
/*
	考评员报名状态  
	0待审批 
	1为审批通过 
	2为审批未通过 
*/ 
export const suApplyStatus = {
	0:'待审批',
	1:'审批通过',
	2:'审批未通过'
};
/*
	考评员班级列表报名状态  
	0未报名
	1已报名
*/ 
export const classSignType = {
	0:'未报名',
	1:'已报名'
};
</script>
