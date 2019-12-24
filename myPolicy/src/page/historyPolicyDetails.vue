<template>
	<div class="historyPolicyDetails_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="historyPolicy">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">我的保单</div>
		</div>
		<!--正文-->
		<div class="historyPolicyDetails_content">
			<ul class="firstList">
				<li class="fix" v-for="item in palte1">
					<router-link class="top_con fix" :to='{path: "policy2", query: {subPolicyNo: item.subPolicyNo,riskCode: item.riskCode}}'>
						<div class="firstLidiv fl fix">
							<div class="fldtitle fl">{{item.riskName}}</div>
							<div class="fldtime fl" v-if="item.endDate.length > 0">保障期限：{{item.startDate}}至{{item.endDate.substring(0,10)}}</div>
						</div>
						<img class="firstLiimg fr" src="static/image/07.png">
						<p>已过期</p>
					</router-link>
				</li>
				<li class="fix" v-for="item in palte2">
					<router-link class="top_con fix" :to='{path: "policy2", query: {subPolicyNo: item.subPolicyNo,riskCode: item.riskCode}}'>
						<div class="firstLidiv fl fix">
							<div class="fldtitle fl">{{item.riskName}}</div>
							<div class="fldtime fl">保障期限：{{item.startDate}}至{{item.endDate}}</div>
						</div>
						<img class="firstLiimg fr" src="static/image/08.png" v-if="riskCode == '1116'">
						<img class="firstLiimg fr" src="static/image/09.png" v-if="riskCode !== '1116'">
						<p>已过期</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
			riskCode: '',
			rreturn: '',
			palte1: '',
			palte2: '',
		}
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	created(){
		this.riskCode = this.$route.query.riskCode;
	},
	methods:{
		getData:function(){
			let _this = this;
			// 初始接口，获取历史保单详情
			this.$http.post(Util.ajaxPath.devProductUrl+'historyDetails',{riskCode: this.riskCode},{emulateJSON : true}).then(function (res){
				_this.rreturn = res.body;
				if(_this.rreturn.succ == true){
					if(this.riskCode !== '0801' && this.riskCode !== '0802'){
						this.palte2 = _this.rreturn.data.noCarPolicy.policyMap;
					}else{
						this.palte1 = _this.rreturn.data.hisPolicy;
					}
				};
			});
		},
	}
}
</script>
<style lang="scss">
.historyPolicyDetails_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.historyPolicyDetails_content{
		padding-top: 1rem;
		.firstList{
			padding: 0.2rem;
			li{ width: 100%; height: 1.6rem; border: 1px solid #cbcbcb; position: relative; }
			li+li{ margin-top: 0.2rem; }
			.firstLidiv{ padding-left: 0.3rem; width: 5rem; }
			.fldtitle{ padding-top: 0.2rem; width: 5rem; height: 0.26rem; line-height: 0.26rem; font-size: 0.26rem; font-weight: bold; color: #000; }
			.fldtime{ padding-top: 0.2rem; width: 5rem; height: 0.22rem; line-height: 0.22rem; font-size: 0.2rem; color: #797979; }
			.firstLiimg{ width: 1.6rem; height: 1.6rem; background: #585858; }
			p{ width: 1.6rem; height: 1.6rem; line-height: 1.6rem; text-align: center; font-size: 0.28rem; font-weight: bold; color: #fff; position: absolute; right: 0; top: 0; }
		}
	}
}
</style>