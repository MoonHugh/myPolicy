<template>
	<div class="hintView_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="index">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">我的保单</div>
		</div>
		<!--正文-->
		<div class="hintView_content">
			<div class="hint">
				<span>您暂时还没有任何进行中的理赔</span>
				<div class="borderline">
					<h6>保险理赔流程</h6>
					<ul>
						<li class="fix"><img src="static/image/11.png"><p>1、报案并提及相关信息</p></li>
						<li class="fix"><img src="static/image/12.png"><p>2、跟踪理赔状态</p></li>
						<li class="fix"><img src="static/image/13.png"><p>3、查看理赔结果</p></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
		}
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	methods:{
		getData:function(){
		},
	}
}
</script>
<style lang="scss">
.hintView_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.hintView_content{
		padding-top: 1rem;
		.hint{
			span{ display: block; height: 1.6rem; line-height: 1.6rem; text-align: center; font-size: 0.32rem; color: #006cb7; }
			.borderline{ margin: 0 0.2rem; border: 1px solid #cbcbcb; }
			h6{ height: 1rem; line-height: 1rem; text-align: center; font-size: 0.24rem; font-weight: normal; }
			li{ padding: 0 0 0.6rem 1rem; }
			img{ float: left; width: 1rem; height: 1rem; }
			p{ float: left; padding-left: 0.6rem; height: 1rem; line-height: 1rem; font-size: 0.24rem; }
		}
	}
}
</style>