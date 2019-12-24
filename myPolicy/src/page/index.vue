<template>
	<div class="index_main">
		<!--顶部导航-->
		<div class="top_title">
			<div class="top_word">我的保单</div>
		</div>
		<!--正文-->
		<div class="home_content">
			<div class="hint" v-show="hint">没有保单！</div>
			<ul class="firstList">
				<li class="fix" v-for="item in palte1">
					<router-link :to='{path: "policy", query: {subPolicyNo: item.subPolicyNo,riskCode: item.riskCode,registNo: item.registNo,userName: item.userName}}'>
						<div class="firstLidiv fl fix">
							<div class="fldtitle fl">{{item.riskName}}</div>
							<div class="fldtime fl" v-if="item.endDate.length > 0">保障期限：{{item.startDate}}至{{item.endDate.substring(0,10)}}</div>
						</div>
						<!--右侧图片 车险-->
						<img class="firstLiimg fr" src="static/image/01.png" v-if="item.riskCode == '0801' || item.riskCode == '0802'">
						<!--右侧图片 学平险-->
						<img class="firstLiimg fr" src="static/image/02.png" v-if="item.riskCode == '1116'">
						<!--右侧图片 其他-->
						<img class="firstLiimg fr" src="static/image/03.png" v-if="item.riskCode !== '0801' && item.riskCode !== '0802' && item.riskCode !== '1116'">
					</router-link>
					<!--车险 在线理赔-->
					<a href="/wxweb/claim/main/index" v-if="(item.riskCode == '0801' || item.riskCode == '0802') && item.registNo == ''"><div class="fldbutton1">在线理赔</div></a>
					<a :href="'/wxweb/claim/case/caseInfoPage?reportNo='+item.registNo" v-if="(item.riskCode == '0801'  || item.riskCode == '0802') && item.registNo !== ''"><div class="fldbutton1">在线理赔</div></a>
					<!--车险 理赔进度-->
					<router-link to="hintView" v-if="(item.riskCode == '0801' || item.riskCode == '0802') && item.registNo == ''"><div class="fldbutton2">理赔进度</div></router-link>
					<a :href="'/wxweb/claim/case/caseInfoPage?reportNo='+item.registNo" v-if="(item.riskCode == '0801' || item.riskCode == '0802') && item.registNo !== ''"><div class="fldbutton2">理赔进度</div></a>
					<!--学平险 在线理赔-->
					<a href="/wxweb/report/case/index" v-if="item.riskCode == '1116' && item.registNo == ''"><div class="fldbutton1">在线理赔</div></a>
					<a :href="'/wxweb/report/case/caseClaimSelect?registNo='+item.registNo+'&userName='+item.userName" v-if="item.riskCode == '1116' && item.registNo !== ''"><div class="fldbutton1">在线理赔</div></a>
					<!--学平险 理赔进度-->
					<router-link to="hintView" v-if="item.riskCode == '1116' && item.registNo == ''"><div class="fldbutton2">理赔进度</div></router-link>
					<a :href="'/wxweb/report/case/caseClaimSelect?registNo='+item.registNo+'&userName='+item.userName" v-if="item.riskCode == '1116' && item.registNo !== ''"><div class="fldbutton2">理赔进度</div></a>
				</li>
			</ul>
			<ul class="secondList">
				<li>
					<router-link to="historyPolicy" class="secondLitop fix">
						<p>历史保单</p>
						<img class="secondLiimg fr" src="static/image/triangle.png">
					</router-link>
				</li>
				<li>
					<div @click="isShow = true" class="secondLitop fix">
						<p>常见问题</p>
						<img src="static/image/triangle.png">
					</div>
					<div @click="isShow = false" v-show="isShow" class="secondLibottom">
						<p>1、有些保单没有在线理赔，该怎么办？</p>
						<p>部分险种在线理赔功能尚在开发中，请您联系95589进行报案申请理赔。</p>
						<p>2、对部分保单有疑问，需要怎么解决？</p>
						<p>如您对保单显示或理赔有疑问，请您联系95589进行反馈。</p>
					</div>
				</li>
				<li>
					<a href="/wxweb/my/service/index" class="secondLitop fix">
						<p>我的服务进度</p>
						<img class="secondLiimg fr" src="static/image/triangle.png">
					</a>
				</li>
			</ul>
		</div>
		<!--logo-->
		<div class="logo fix">
			<img src="static/image/logo.png">
			<p>如有疑问，请致电服务热线95589</p>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
			hint: '',
			seen: false,
			isShow: '',
			rreturn: '',
			palte1: '',
		}
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	methods:{
		getData:function(){
			let _this = this;
			// 初始接口，获取我的保单
			this.$http.post(Util.ajaxPath.devProductUrl+'myPolicySearch',{emulateJSON : true}).then(function (res){
				_this.rreturn = res.body;
				if(_this.rreturn.succ == false){
					this.hint = true;
				}else{
					if(_this.rreturn.data.policy == ''){
						this.hint = true;
					}else{
						this.hint = false;
						_this.palte1 = _this.rreturn.data.policy;
					};
				};
			});
		},
		// secLiBshow:function(){
		// 	this.seen = !this.seen;
		// 	console.log(this.seen)
		// 	if(this.seen == true){
		// 		this.isShow = true;
		// 	}else{
		// 		this.isShow = false;
		// 	}
		// }
	}
}
</script>
<style lang="scss">
.index_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.home_content{
		padding-top: 1rem;
		.hint{ padding: 0.2rem; height: 1.6rem; line-height: 1.6rem; text-align: center; font-size: 0.26rem; color: #000; }
		.firstList{
			padding: 0.2rem;
			li{ width: 100%; height: 1.6rem; border: 1px solid #cbcbcb; position: relative; }
			li+li{ margin-top: 0.2rem; }
			.firstLidiv{ padding-left: 0.3rem; width: 5rem; }
			.fldtitle{ padding-top: 0.2rem; width: 5rem; height: 0.26rem; line-height: 0.26rem; font-size: 0.26rem; font-weight: bold; color: #000; }
			.fldtime{ padding-top: 0.2rem; width: 5rem; height: 0.22rem; line-height: 0.22rem; font-size: 0.2rem; color: #797979; }
			.firstLiimg{ width: 1.6rem; height: 1.6rem; background: #006cb7; }
			.fldbutton1{ width: 1.6rem; height: 0.4rem; line-height: 0.4rem; text-align: center; font-size: 0.24rem; color: #000; border: 1px solid #cbcbcb; border-radius: 0.6rem; position: absolute; left: 0.3rem; top: 1.08rem; z-index: 50; }
			.fldbutton2{ width: 1.6rem; height: 0.4rem; line-height: 0.4rem; text-align: center; font-size: 0.24rem; color: #000; border: 1px solid #cbcbcb; border-radius: 0.6rem; position: absolute; left: 2.2rem; top: 1.08rem; z-index: 50; }
		}
		.secondList{
			margin-top: 0.2rem; padding-bottom: 0.6rem; width: 100%; border-top: 1px solid #cbcbcb;
			li{ border-bottom: 1px solid #cbcbcb; }
			.secondLitop{
				height: 0.8rem; line-height: 0.8rem;
				p{ float: left; text-indent: 0.2rem; font-size: 0.24rem; color: #797979; }
				img{ float: right; margin: 0.25rem 0.2rem 0 0; width: 0.3rem; height: 0.3rem; }
			}
			.secondLibottom{
				padding: 0.3rem; border-top: 1px solid #cbcbcb;
				p{ line-height: 0.4rem; font-size: 0.24rem; color: #797979; }
			}
		}
	}
	.logo{
		margin: 0 auto; padding-bottom: 0.6rem; width: 4.1rem;
		img{ float: left; display: block; width: 0.36rem; height: 0.36rem; }
		p{ float: left; padding-left: 0.1rem; line-height: 0.36rem; font-size: 0.24rem; color: #797979; }
	}
}
</style>