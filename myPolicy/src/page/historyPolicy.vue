<template>
	<div class="historyPolicy_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="index">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">我的保单</div>
		</div>
		<!--正文-->
		<div class="historyPolicy_content">
			<div class="hint" v-show="hint">没有历史保单！</div>
			<ul class="firstList">
				<li v-for="item in palte1" v-if="item.count > 0">
					<div class="top_bor1"></div>
					<div class="top_bor2"></div>
					<router-link class="top_con fix" :to='{path: "historyPolicyDetails", query: {riskCode: item.riskCode}}'>
						<div class="firstLidiv fl fix">
							<div class="fldtitle fl">{{item.riskName}}</div>
							<div class="fldtime fl">共{{item.count}}张保单</div>
						</div>
						<img class="firstLiimg fr" src="static/image/07.png">
						<p>已过期</p>
					</router-link>
				</li>
				<li v-for="item in palte2" v-if="item.count > 0">
					<div class="top_bor1"></div>
					<div class="top_bor2"></div>
					<router-link class="top_con fix" :to='{path: "historyPolicyDetails", query: {riskCode: item.riskCode}}'>
						<div class="firstLidiv fl fix">
							<div class="fldtitle fl">{{item.riskName}}</div>
							<div class="fldtime fl">共{{item.count}}张保单</div>
						</div>
						<img class="firstLiimg fr" src="static/image/08.png" v-if="item.riskCode == '1116'">
						<img class="firstLiimg fr" src="static/image/09.png" v-if="item.riskCode !== '1116'">
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
			hint: '',
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
	methods:{
		getData:function(){
			let _this = this;
			// 初始接口，获取历史保单
			this.$http.post(Util.ajaxPath.devProductUrl+'historyPolicy',{emulateJSON : true}).then(function (res){
				_this.rreturn = res.body;
				if(_this.rreturn.succ == false){
					this.hint = true;
				}else{
					if(_this.rreturn.data.hisPolicy !== ''){
						this.palte1 = _this.rreturn.data.hisPolicy;
					};
					if(_this.rreturn.data.noCarPolicy !== ''){
						this.palte2 = _this.rreturn.data.noCarPolicy.historyPolicy;
					};
					if(_this.rreturn.data.hisPolicy == '' && _this.rreturn.data.noCarPolicy == ''){
						this.hint = true;
					};
				};
			});
		},
	}
}
</script>
<style lang="scss">
.historyPolicy_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.historyPolicy_content{
		padding-top: 1rem;
		.hint{ padding: 0.2rem; height: 1.6rem; line-height: 1.6rem; text-align: center; font-size: 0.26rem; color: #000; }
		.firstList{
			padding: 0.2rem;
			li+li{ margin-top: 0.2rem; }
			.top_bor1{ margin: 0 0.2rem; height: 0.1rem; border-top: 1px solid #cbcbcb; border-left: 1px solid #cbcbcb; border-right: 1px solid #cbcbcb; }
			.top_bor2{ margin: 0 0.1rem; height: 0.1rem; border-top: 1px solid #cbcbcb; border-left: 1px solid #cbcbcb; border-right: 1px solid #cbcbcb; }
			.top_con{ display: block; width: 100%; height: 1.6rem; border: 1px solid #cbcbcb; position: relative; }
			.firstLidiv{ padding-left: 0.3rem; width: 5rem; }
			.fldtitle{ padding-top: 0.2rem; width: 5rem; height: 0.26rem; line-height: 0.26rem; font-size: 0.26rem; font-weight: bold; color: #000; }
			.fldtime{ padding-top: 0.2rem; width: 5rem; height: 0.2rem; line-height: 0.2rem; font-size: 0.2rem; color: #797979; }
			.firstLiimg{ width: 1.6rem; height: 1.6rem; background: #585858; }
			p{ width: 1.6rem; height: 1.6rem; line-height: 1.6rem; text-align: center; font-size: 0.28rem; font-weight: bold; color: #fff; position: absolute; right: 0; top: 0; }
		}
	}
}
</style>