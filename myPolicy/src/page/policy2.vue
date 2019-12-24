<template>
	<div class="policy2_main">
		<!--顶部导航-->
		<div class="top_title">
			<div @click="$router.history.go(-1)">
				<img class="top_back" src="static/image/back.png">
			</div>
			<div class="top_word">我的保单</div>
		</div>
		<!--正文-->
		<div class="policy2_content">
			<div class="contitle fix">
				<div class="contitlele fl">
					<p>{{riskName}}</p>
					<p>保单号：{{subPolicyNo}}</p>
				</div>
				<img class="contitleri fr" src="static/image/07.png" v-if="riskCode == '0801' || riskCode == '0802'">
				<img class="contitleri fr" src="static/image/08.png" v-if="riskCode == '1116'">
				<img class="contitleri fr" src="static/image/09.png" v-if="riskCode !== '0801' && riskCode !== '0802' && riskCode !== '1116'">
			</div>
			<ul class="firstList">
				<li>投保人：{{applicatName}}</li>
				<li>被保险人：{{insuredName}}</li>
				<li>生效日期：{{startDate}}</li>
				<li>结束日期：{{endDate}}</li>
				<li>保费（含税）：{{premium}}</li>
				<li>
					<div>险种信息及保额</div>
					<div class="flli" v-for="item in kindList">{{item.kindName}}：{{item.sumInsured}}元</div>
				</li>
			</ul>
			<ul class="secondList">
				<li>
					<div @click="secLiBshow(1)" class="secondLitop fix">
						<p>理赔流程</p>
						<img src="static/image/triangle.png">
					</div>
					<div @click="isShow = false" v-show="isShow == 1" class="secondLibottom">
						<p>1、{{hint1}}</p>
						<p>{{hint2}}</p>
						<p>2、审核材料</p>
						<p>根据理赔要求确认材料齐全后，提交审核。</p>
						<p>3、赔付完成</p>
					</div>
				</li>
				<li>
					<div @click="secLiBshow(2)" class="secondLitop fix">
						<p>常见问题</p>
						<img src="static/image/triangle.png">
					</div>
					<div @click="isShow = false" v-show="isShow == 2" class="secondLibottom">
						<p>1、有些保单没有在线理赔，该怎么办？</p>
						<p>部分险种在线理赔功能尚在开发中，请您联系95589进行报案申请理赔。</p>
						<p>2、对部分保单有疑问，需要怎么解决？</p>
						<p>如您对保单显示或理赔有疑问，请您联系95589进行反馈。</p>
					</div>
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
			subPolicyNo: '',
			riskCode: '',
			isShow: '',
			hint1: '',
			hint2: '',
			rreturn: '',
			riskName: '',
			insuredName: '',
			applicatName: '',
			startDate: '',
			endDate: '',
			premium: '',
			kindList: '',
		}
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	created(){
		this.subPolicyNo = this.$route.query.subPolicyNo;
		this.riskCode = this.$route.query.riskCode;
	},
	methods:{
		getData:function(){
			let _this = this;
			if(this.riskCode == '0801' || this.riskCode == '0802' || this.riskCode == '1116'){
				this.hint1 = "在线报案";
				this.hint2 = "在报案页面，根据页面要求填写相关信息。";
			}else{
				this.hint1 = "报案";
				this.hint2 = "拨打95589进行报案，根据客服要求提供相关信息。";
			};
			// 初始接口，获取我的保单详情
			this.$http.post(Util.ajaxPath.devProductUrl+'myPolicyDetails',{subPolicyNo: this.subPolicyNo,riskCode: this.riskCode},{emulateJSON : true}).then(function (res){
				_this.rreturn = res.body;
				if(_this.rreturn.succ == true){
					if(this.riskCode == '1116'){
						this.riskName = _this.rreturn.data.noCarDetails.riskName;
						this.applicatName = _this.rreturn.data.noCarDetails.appliName;
						this.insuredName = _this.rreturn.data.noCarDetails.insuredName;
						this.startDate = _this.rreturn.data.noCarDetails.startDate;
						this.endDate = _this.rreturn.data.noCarDetails.endDate;
						this.premium = _this.rreturn.data.noCarDetails.sumPriceTaxTotal;
						this.kindList = _this.rreturn.data.noCarDetails.kindList;
					}else{
						this.riskName = _this.rreturn.data.carDetails.policy.riskName;
						this.applicatName = _this.rreturn.data.carDetails.policy.applicatName;
						this.insuredName = _this.rreturn.data.carDetails.policy.insuredName;
						this.startDate = _this.rreturn.data.carDetails.policy.startDate;
						this.endDate = _this.rreturn.data.carDetails.policy.endDate;
						this.premium = _this.rreturn.data.carDetails.policy.premium;
						this.kindList = _this.rreturn.data.carDetails.policy.kindList;
					}
				};
			});
		},
		secLiBshow:function(cur){
			this.isShow = cur;
		}
	}
}
</script>
<style lang="scss">
.policy2_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.policy2_content{
		padding-top: 1rem;
		.contitle{
			height: 1.4rem; border-bottom: 1px solid #006cb7;
			.contitlele{ padding-left: 0.4rem; }
			p{ padding-top: 0.3rem; height: 0.26rem; line-height: 0.26rem; font-size: 0.26rem; font-weight: bold; color: #000; }
			p:nth-child(2n){ height: 0.22rem; line-height: 0.22rem; font-size: 0.22rem; font-weight: normal; color: #797979; }
			.contitleri{ width: 1.4rem; height: 1.4rem; }
		}
		.firstList{
			padding: 0.4rem; min-height: 4.4rem;
			li{ line-height: 0.5rem; font-size: 0.24rem; color: #000; }
			.flli{ padding-left: 0.4rem; color: #7a7a7a; }
		}
		.apply{ margin-bottom: 0.2rem; height: 1rem; border-top: 1px solid #cbcbcb; border-bottom: 1px solid #cbcbcb; }
		.applycon{
			margin: 0 auto; width: 2rem; line-height: 1rem;
			img{ float: left; padding-top: 0.2rem; width: 0.6rem; height: 0.6rem; }
			p{ float: right; font-size: 0.24rem; color: #797979; }
		}
		.secondList{
			margin-top: 0.2rem; width: 100%; border-top: 1px solid #cbcbcb;
			li{ border-bottom: 1px solid #cbcbcb; }
			li:last-child{ margin-bottom: 0.6rem; }
			.secondLitop{
				height: 0.8rem; line-height: 0.8rem;
				p{ float: left; text-indent: 0.2rem; font-size: 0.24rem; color: #797979; }
				img{ float: right; margin: 0.25rem 0.2rem 0 0; width: 0.3rem; height: 0.3rem; transform:rotate(90deg); }
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